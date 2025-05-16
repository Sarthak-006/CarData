"use server"

import type { CarData } from "@/types/car-data"

interface AnalysisTools {
  type: "function"
  function: {
    name: string
    description: string
    parameters: {
      type: "object"
      properties: Record<string, any>
      required: string[]
    }
  }
}

const analysisTools: AnalysisTools[] = [
  {
    type: "function",
    function: {
      name: "analyze_driving_patterns",
      description: "Analyze vehicle driving patterns including speed, fuel efficiency, and diagnostics to provide comprehensive insights",
      parameters: {
        type: "object",
        properties: {
          efficiency_analysis: {
            type: "object",
            properties: {
              current_mpg: { type: "number" },
              potential_savings: {
                type: "object",
                properties: {
                  monthly_fuel_cost: { type: "number" },
                  potential_monthly_savings: { type: "number" },
                  improvement_tips: { type: "array", items: { type: "string" } }
                }
              },
              efficiency_factors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    factor: { type: "string" },
                    impact: { type: "string" },
                    recommendation: { type: "string" }
                  }
                }
              }
            }
          },
          driving_habits: {
            type: "object",
            properties: {
              aggressive_acceleration_count: { type: "number" },
              hard_braking_count: { type: "number" },
              optimal_speed_percentage: { type: "number" },
              idle_time_percentage: { type: "number" },
              recommendations: { type: "array", items: { type: "string" } }
            }
          },
          maintenance_insights: {
            type: "object",
            properties: {
              current_health_score: { type: "number" },
              warning_signs: { type: "array", items: { type: "string" } },
              predicted_issues: { type: "array", items: { type: "string" } },
              maintenance_due: { type: "array", items: { type: "string" } },
              estimated_costs: { type: "object", patternProperties: { ".*": { type: "number" } } }
            }
          },
          comparative_analysis: {
            type: "object",
            properties: {
              percentile_ranking: {
                type: "object",
                properties: {
                  fuel_efficiency: { type: "number" },
                  maintenance_score: { type: "number" },
                  driving_score: { type: "number" }
                }
              },
              potential_improvements: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    metric: { type: "string" },
                    current_value: { type: "number" },
                    target_value: { type: "number" },
                    benefit: { type: "string" }
                  }
                }
              }
            }
          }
        },
        required: ["efficiency_analysis", "driving_habits", "maintenance_insights", "comparative_analysis"]
      }
    }
  }
]

interface AnalysisCache {
  insights: {
    insights: string;
    model_info: {
      name: string;
      version: string;
      timestamp: string;
    };
    data_points: {
      total_records: number;
      time_range: {
        start: string;
        end: string;
      };
      metrics_analyzed: string[];
    };
    visualizations: Array<{
      type: string;
      title: string;
      data: any;
      config: Record<string, any>;
    }>;
  };
  timestamp: number;
  dataHash: string;
}

let insightsCache: AnalysisCache | null = null;

function calculateDataHash(data: CarData[]): string {
  // Simple hash of key data points to detect significant changes
  return data
    .slice(0, 10) // Only hash last 10 records
    .map(d => `${d.speed}${d.fuelLevel}${d.engineTemp}`)
    .join('');
}

function prepareDataSummary(carData: CarData[]) {
  const summary = {
    speed: {
      avg: carData.reduce((sum, d) => sum + d.speed, 0) / carData.length,
      max: Math.max(...carData.map(d => d.speed)),
      min: Math.min(...carData.map(d => d.speed))
    },
    fuel: {
      avgLevel: carData.reduce((sum, d) => sum + d.fuelLevel, 0) / carData.length,
      efficiency: carData.reduce((sum, d) => sum + d.fuelEfficiency, 0) / carData.length
    },
    diagnostics: {
      errorCodes: [...new Set(carData.filter(d => d.diagnostics?.errorCode).map(d => d.diagnostics.errorCode))]
    },
    timeRange: {
      start: carData[0].timestamp,
      end: carData[carData.length - 1].timestamp
    }
  };
  return summary;
}

// Add rate limiting and retry logic
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

async function callGroqAPI(messages: any[], tools: any[], model: string = "llama-3.1-8b-instant") {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          tools,
          tool_choice: tools.length > 0 ? { type: "function", function: { name: tools[0].function.name } } : undefined,
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 429) {
          if (retries < MAX_RETRIES - 1) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retries + 1)));
            retries++;
            continue;
          }
          throw new Error("Rate limit exceeded after retries");
        }

        throw new Error(`API request failed: ${errorData.error?.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (retries === MAX_RETRIES - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retries + 1)));
      retries++;
    }
  }
}

export async function generateDataInsights(carData: CarData[]): Promise<any> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ API key not configured");
  }

  if (!carData || carData.length === 0) {
    throw new Error("No vehicle data available for analysis");
  }

  const currentHash = calculateDataHash(carData);

  // Check cache validity (15 minutes)
  if (insightsCache &&
    Date.now() - insightsCache.timestamp < 15 * 60 * 1000 &&
    insightsCache.dataHash === currentHash) {
    return insightsCache.insights;
  }

  const dataSummary = prepareDataSummary(carData);

  try {
    const result = await callGroqAPI(
      [
        {
          role: "system",
          content: "You are an automotive data analyst. Analyze the provided vehicle data summary and return insights using the provided function. Focus on patterns in speed, fuel efficiency, and diagnostics."
        },
        {
          role: "user",
          content: `Analyze this vehicle data summary and provide structured insights: ${JSON.stringify(dataSummary)}`
        }
      ],
      analysisTools
    );

    const toolCall = result.choices[0].message.tool_calls?.[0];

    if (!toolCall) {
      throw new Error("No analysis results received");
    }

    const analysis = JSON.parse(toolCall.function.arguments);
    const insights = {
      insights: generateInsightsSummary(analysis),
      model_info: {
        name: "LLaMA",
        version: "3.1-8b",
        timestamp: new Date().toISOString()
      },
      data_points: {
        total_records: carData.length,
        time_range: dataSummary.timeRange,
        metrics_analyzed: ["speed", "fuel_efficiency", "diagnostics"]
      },
      visualizations: generateVisualizations(analysis)
    };

    // Update cache
    insightsCache = {
      insights,
      timestamp: Date.now(),
      dataHash: currentHash
    };

    return insights;
  } catch (error) {
    console.error("Error generating insights:", error);
    if (insightsCache) {
      return insightsCache.insights;
    }
    throw error;
  }
}

function generateInsightsSummary(analysis: any): string {
  const effAnalysis = analysis?.efficiency_analysis || {}
  const drivingHabits = analysis?.driving_habits || {}
  const maintenance = analysis?.maintenance_insights || {}
  const comparison = analysis?.comparative_analysis || {}

  const currentMpg = effAnalysis?.current_mpg?.toFixed(1) || '0.0'
  const monthlySavings = effAnalysis?.potential_savings?.potential_monthly_savings?.toFixed(2) || '0.00'
  const healthScore = maintenance?.current_health_score?.toFixed(0) || '0'
  const drivingScore = comparison?.percentile_ranking?.driving_score?.toFixed(0) || '0'

  return `
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-bold mb-3">💰 Cost & Efficiency Insights</h3>
        <ul class="space-y-2">
          <li>Current efficiency: ${currentMpg} MPG</li>
          <li>Potential monthly savings: $${monthlySavings}</li>
          ${effAnalysis?.potential_savings?.improvement_tips?.map((tip: string) =>
    `<li class="text-emerald-600">💡 ${tip}</li>`
  ).join('')}
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-bold mb-3">🚗 Driving Style Analysis</h3>
        <ul class="space-y-2">
          <li>Driving score: ${drivingScore}/100 (Better than ${comparison?.percentile_ranking?.driving_score || 0}% of drivers)</li>
          <li>Aggressive accelerations: ${drivingHabits?.aggressive_acceleration_count || 0} times</li>
          <li>Hard braking events: ${drivingHabits?.hard_braking_count || 0} times</li>
          ${drivingHabits?.recommendations?.map((rec: string) =>
    `<li class="text-emerald-600">💡 ${rec}</li>`
  ).join('')}
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-bold mb-3">🔧 Maintenance & Health</h3>
        <ul class="space-y-2">
          <li>Vehicle health score: ${healthScore}/100</li>
          ${maintenance?.warning_signs?.map((warning: string) =>
    `<li class="text-amber-600">⚠️ ${warning}</li>`
  ).join('')}
          ${maintenance?.maintenance_due?.map((task: string) =>
    `<li class="text-blue-600">📅 Due soon: ${task}</li>`
  ).join('')}
          ${maintenance?.predicted_issues?.map((issue: string) =>
    `<li class="text-red-600">🔍 Watch out: ${issue}</li>`
  ).join('')}
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-bold mb-3">📈 Improvement Opportunities</h3>
        <ul class="space-y-2">
          ${comparison?.potential_improvements?.map((imp: any) =>
    `<li>
              ${imp.metric}: ${imp.current_value} → ${imp.target_value}
              <br/>
              <span class="text-emerald-600">Benefit: ${imp.benefit}</span>
            </li>`
  ).join('')}
        </ul>
      </div>
    </div>
  `
}

function generateVisualizations(analysis: any) {
  return [
    {
      type: "line",
      title: "Speed Distribution",
      data: analysis.driving_habits?.speed_distribution || [],
      config: {
        xAxis: "Speed Range (mph)",
        yAxis: "Frequency",
        colors: ["#10B981"]
      }
    },
    {
      type: "gauge",
      title: "Vehicle Health Score",
      data: {
        value: analysis.maintenance_insights?.current_health_score || 0,
        min: 0,
        max: 100,
        thresholds: [
          { value: 30, color: "#EF4444" },
          { value: 70, color: "#F59E0B" },
          { value: 100, color: "#10B981" }
        ]
      },
      config: {
        unit: "score",
        showThresholds: true
      }
    },
    {
      type: "bar",
      title: "Efficiency Comparison",
      data: {
        labels: ["Your MPG", "Average MPG", "Target MPG"],
        values: [
          analysis.efficiency_analysis?.current_mpg || 0,
          analysis.comparative_analysis?.average_mpg || 0,
          analysis.efficiency_analysis?.target_mpg || 0
        ]
      },
      config: {
        colors: ["#10B981", "#6B7280", "#3B82F6"],
        yAxis: "Miles Per Gallon",
        showLegend: true
      }
    }
  ];
}

export async function generateMaintenanceRecommendations(diagnosticData: any): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    return "GROQ API key not configured. Please add it to your environment variables."
  }

  if (!diagnosticData || !Array.isArray(diagnosticData) || diagnosticData.length === 0) {
    return "No diagnostic data available for analysis."
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are an automotive maintenance expert. Based on the diagnostic data provided, suggest maintenance actions the vehicle owner should take. Prioritize safety issues and provide cost estimates when possible."
          },
          {
            role: "user",
            content: `Provide maintenance recommendations based on these diagnostics: ${JSON.stringify(diagnosticData)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("GROQ API error:", errorData)

      if (response.status === 429) {
        return "Service is currently experiencing high demand. Please try again in a few moments."
      }

      throw new Error(`API request failed: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error generating maintenance recommendations:", error)
    return "Failed to generate maintenance recommendations. Please try again later."
  }
}

export async function generateValueEstimate(carData: CarData[]): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    return "GROQ API key not configured. Please add it to your environment variables."
  }

  if (!carData || carData.length === 0) {
    return "No vehicle data available for analysis."
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a vehicle data valuation expert. Based on the provided vehicle data, estimate the potential market value of this data to different types of buyers (insurance companies, urban planners, automotive manufacturers, etc.). Provide a range of values and explain your reasoning."
          },
          {
            role: "user",
            content: `Estimate the value of this vehicle data: ${JSON.stringify(carData)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("GROQ API error:", errorData)

      if (response.status === 429) {
        return "Service is currently experiencing high demand. Please try again in a few moments."
      }

      throw new Error(`API request failed: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error generating value estimate:", error)
    return "Failed to generate value estimate. Please try again later."
  }
}
