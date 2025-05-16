"use client"

import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface LineChartProps {
    data: {
        timestamp: string
        speed: number
    }[]
    config: {
        xAxis: string
        yAxis: string
        unit: string
    }
}

export default function LineChart({ data, config }: LineChartProps) {
    const chartData = {
        labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: `${config.yAxis} (${config.unit})`,
                data: data.map(d => d.speed),
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: config.yAxis,
                },
            },
            x: {
                title: {
                    display: true,
                    text: config.xAxis,
                },
            },
        },
    }

    return <Line data={chartData} options={options} />
} 