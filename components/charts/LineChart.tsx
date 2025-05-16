"use client"

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface LineChartProps {
    data: any[]
    config: {
        xAxis: string
        yAxis: string
        colors: string[]
    }
}

export default function LineChart({ data, config }: LineChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" label={{ value: config.xAxis, position: "bottom" }} />
                <YAxis label={{ value: config.yAxis, angle: -90, position: "left" }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={config.colors[0]} strokeWidth={2} />
            </RechartsLineChart>
        </ResponsiveContainer>
    )
} 