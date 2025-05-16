"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface GaugeChartProps {
    data: {
        value: number
        min: number
        max: number
        thresholds: Array<{
            value: number
            color: string
        }>
    }
    config: {
        unit: string
        showThresholds: boolean
    }
}

export default function GaugeChart({ data, config }: GaugeChartProps) {
    const normalizedValue = ((data.value - data.min) / (data.max - data.min)) * 100
    const remainingValue = 100 - normalizedValue

    // Find the appropriate color based on thresholds
    const getColor = (value: number) => {
        const threshold = data.thresholds
            .slice()
            .reverse()
            .find(t => value >= t.value)
        return threshold?.color || "#gray"
    }

    const gaugeData = [
        { name: "value", value: normalizedValue },
        { name: "remaining", value: remainingValue }
    ]

    return (
        <div className="relative w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={gaugeData}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="60%"
                        outerRadius="80%"
                        dataKey="value"
                    >
                        <Cell fill={getColor(data.value)} />
                        <Cell fill="#e5e7eb" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">{data.value}</div>
                <div className="text-sm text-gray-500">{config.unit}</div>
            </div>
            {config.showThresholds && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                    <span>{data.min}</span>
                    <span>{data.max}</span>
                </div>
            )}
        </div>
    )
} 