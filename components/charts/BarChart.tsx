"use client"

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface BarChartProps {
    data: {
        labels: string[]
        values: number[]
    }
    config: {
        colors: string[]
        yAxis: string
        showLegend: boolean
    }
}

export default function BarChart({ data, config }: BarChartProps) {
    const chartData = data.labels.map((label, index) => ({
        name: label,
        value: data.values[index]
    }))

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: config.yAxis, angle: -90, position: "left" }} />
                <Tooltip />
                {config.showLegend && <Legend />}
                <Bar dataKey="value" fill={config.colors[0]} />
            </RechartsBarChart>
        </ResponsiveContainer>
    )
} 