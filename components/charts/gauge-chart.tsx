"use client"

import { Doughnut } from "react-chartjs-2"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

interface GaugeChartProps {
    data: {
        current: number
        min: number
        max: number
    }
    config: {
        unit: string
    }
}

export default function GaugeChart({ data, config }: GaugeChartProps) {
    const { current, min, max } = data
    const remaining = max - current

    const chartData = {
        labels: [`Current (${config.unit})`, "Remaining"],
        datasets: [
            {
                data: [current, remaining],
                backgroundColor: [
                    "rgb(75, 192, 192)",
                    "rgb(234, 236, 244)"
                ],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = context.raw
                        return `${value.toFixed(1)} ${config.unit}`
                    },
                },
            },
        },
        cutout: "75%",
    }

    return (
        <div className="relative">
            <Doughnut data={chartData} options={options} />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-2xl font-bold">{current.toFixed(1)}</div>
                <div className="text-sm text-gray-500">{config.unit}</div>
            </div>
        </div>
    )
} 