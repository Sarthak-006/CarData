"use client"

import React from "react"

interface PatternProps {
    className?: string;
}

// Lightning McQueen checkerboard racing pattern
export function LightningPattern({ className = "" }: PatternProps) {
    return (
        <div className={`relative ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 opacity-10"
            >
                <g clipPath="url(#clip0_lightning)">
                    <rect width="10" height="10" fill="#E53E3E" />
                    <rect x="20" width="10" height="10" fill="#E53E3E" />
                    <rect x="40" width="10" height="10" fill="#E53E3E" />
                    <rect x="10" y="10" width="10" height="10" fill="#E53E3E" />
                    <rect x="30" y="10" width="10" height="10" fill="#E53E3E" />
                    <rect x="50" y="10" width="10" height="10" fill="#E53E3E" />
                    <rect y="20" width="10" height="10" fill="#E53E3E" />
                    <rect x="20" y="20" width="10" height="10" fill="#E53E3E" />
                    <rect x="40" y="20" width="10" height="10" fill="#E53E3E" />
                    <rect x="10" y="30" width="10" height="10" fill="#E53E3E" />
                    <rect x="30" y="30" width="10" height="10" fill="#E53E3E" />
                    <rect x="50" y="30" width="10" height="10" fill="#E53E3E" />
                    <rect y="40" width="10" height="10" fill="#E53E3E" />
                    <rect x="20" y="40" width="10" height="10" fill="#E53E3E" />
                    <rect x="40" y="40" width="10" height="10" fill="#E53E3E" />
                    <rect x="10" y="50" width="10" height="10" fill="#E53E3E" />
                    <rect x="30" y="50" width="10" height="10" fill="#E53E3E" />
                    <rect x="50" y="50" width="10" height="10" fill="#E53E3E" />
                </g>
                <defs>
                    <clipPath id="clip0_lightning">
                        <rect width="60" height="60" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}

// Fillmore's peace pattern
export function FillmorePattern({ className = "" }: PatternProps) {
    return (
        <div className={`relative ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 opacity-10"
            >
                <circle cx="50" cy="50" r="30" stroke="#2F855A" strokeWidth="2" />
                <path d="M50 20L50 80" stroke="#2F855A" strokeWidth="2" />
                <path d="M20 50L80 50" stroke="#2F855A" strokeWidth="2" />
                <circle cx="50" cy="50" r="15" stroke="#2F855A" strokeWidth="2" />
                <circle cx="50" cy="50" r="5" fill="#2F855A" />
                <path d="M20 20L80 80" stroke="#2F855A" strokeWidth="1" />
                <path d="M80 20L20 80" stroke="#2F855A" strokeWidth="1" />
            </svg>
        </div>
    )
}

// Doc Hudson's track pattern
export function DocPattern({ className = "" }: PatternProps) {
    return (
        <div className={`relative ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 opacity-10"
            >
                <path d="M10 10C30 10 70 10 90 10C90 30 90 70 90 90C70 90 30 90 10 90C10 70 10 30 10 10Z" stroke="#2B6CB0" strokeWidth="2" />
                <path d="M25 25C45 25 55 25 75 25C75 45 75 55 75 75C55 75 45 75 25 75C25 55 25 45 25 25Z" stroke="#2B6CB0" strokeWidth="2" />
                <path d="M40 40C45 40 55 40 60 40C60 45 60 55 60 60C55 60 45 60 40 60C40 55 40 45 40 40Z" fill="#2B6CB0" fillOpacity="0.2" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#2B6CB0" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="#2B6CB0" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
        </div>
    )
}

// Mater's tow hooks pattern
export function MaterPattern({ className = "" }: PatternProps) {
    return (
        <div className={`relative ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 opacity-10"
            >
                <path d="M20 20C25 15 35 15 40 20C45 25 45 35 40 40C35 45 25 45 20 40C15 35 15 25 20 20Z" stroke="#A0522D" strokeWidth="2" />
                <path d="M60 20C65 15 75 15 80 20C85 25 85 35 80 40C75 45 65 45 60 40C55 35 55 25 60 20Z" stroke="#A0522D" strokeWidth="2" />
                <path d="M20 60C25 55 35 55 40 60C45 65 45 75 40 80C35 85 25 85 20 80C15 75 15 65 20 60Z" stroke="#A0522D" strokeWidth="2" />
                <path d="M60 60C65 55 75 55 80 60C85 65 85 75 80 80C75 85 65 85 60 80C55 75 55 65 60 60Z" stroke="#A0522D" strokeWidth="2" />
                <line x1="30" y1="30" x2="70" y2="70" stroke="#A0522D" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="70" y1="30" x2="30" y2="70" stroke="#A0522D" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
        </div>
    )
}

// Export all patterns in one component
export function CarsPatterns() {
    return (
        <div className="hidden">
            <LightningPattern />
            <FillmorePattern />
            <DocPattern />
            <MaterPattern />
        </div>
    )
} 