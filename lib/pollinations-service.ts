/**
 * This service handles interactions with Pollinations.ai for generating images.
 * It creates URLs based on specific prompts related to Pixar Cars characters.
 */

interface PerformanceData {
    speed: {
        average: number
        overSpeedPercentage: number
    }
    fuel: {
        efficiency: number
        consumptionRate: number
    }
    diagnostics: {
        errorCount: number
        errorPercentage: number
    }
}

interface CarImageCollection {
    speed: string
    fuel: string
    diagnostics: string
}

/**
 * Generates Pollinations.ai URLs for Cars-themed visualizations based on performance data
 */
export function generateCarsImages(data: PerformanceData): CarImageCollection {
    // Create dynamic image prompts based on data values
    const speedPrompt = encodeURIComponent(
        `lightning mcqueen race car pixar character with speedometer showing ${data.speed.average} mph, ${data.speed.overSpeedPercentage > 15 ? 'driving dangerously with a concerned expression' : 'looking confident and focused'
        }, digital dashboard, 3D animation, pixar cars movie style, studio quality`
    )

    const fuelPrompt = encodeURIComponent(
        `fillmore vw bus character from pixar cars movie checking ${data.fuel.efficiency < 25 ? 'a low fuel gauge with worried expression' : 'a healthy fuel gauge with happy expression'
        }, showing ${data.fuel.efficiency} mpg, eco-friendly environment, bright colors, 3D animation, pixar cars movie style, studio quality`
    )

    const diagnosticPrompt = encodeURIComponent(
        `doc hudson pixar cars character in auto shop ${data.diagnostics.errorPercentage > 20
            ? 'examining engine with serious expression and multiple warning lights'
            : 'with tools looking pleased at healthy engine'
        }, ${data.diagnostics.errorCount} warning lights ${data.diagnostics.errorPercentage > 20 ? 'flashing red' : 'mostly green'}, 
    3D animation, pixar cars movie style, studio quality`
    )

    // Build Pollinations.ai URLs with unique IDs to avoid caching
    const uniqueId = () => Math.random().toString(36).substring(2, 10)

    return {
        speed: `https://pollinations.ai/p/${speedPrompt}/${uniqueId()}`,
        fuel: `https://pollinations.ai/p/${fuelPrompt}/${uniqueId()}`,
        diagnostics: `https://pollinations.ai/p/${diagnosticPrompt}/${uniqueId()}`
    }
}

/**
 * Get predefined Pollinations.ai image URLs for demo/development purposes
 * These are fallback URLs in case the dynamic generation fails
 */
export function getPresetCarsImages(data: PerformanceData): CarImageCollection {
    // Speed analysis visualizations
    const speedImages = [
        "https://pollinations.ai/p/a%20lightning%20mcqueen%20race%20car%20with%20speedometer%20showing%2038%20mph%2C%20pixar%20cars%20style%2C%203d%20animation",
        "https://pollinations.ai/p/lightning%20mcqueen%20race%20car%20from%20pixar%20cars%20movie%20looking%20at%20dashboard%20with%20speed%20gauge%2C%203d%20render%2C%20studio%20quality"
    ]

    // Fuel efficiency visualizations
    const fuelImages = [
        "https://pollinations.ai/p/fillmore%20vw%20bus%20character%20from%20pixar%20cars%20checking%20fuel%20gauge%20showing%2024%20mpg%2C%203d%20animation%2C%20studio%20quality",
        "https://pollinations.ai/p/fillmore%20hippie%20van%20from%20pixar%20cars%20talking%20about%20fuel%20efficiency%2C%20organic%20fuel%2C%203d%20render%2C%20movie%20style"
    ]

    // Diagnostic visualizations
    const diagnosticImages = [
        "https://pollinations.ai/p/doc%20hudson%20car%20character%20examining%20engine%20with%2012%20warning%20lights%2C%20pixar%20cars%20style%2C%20auto%20shop%20scene%2C%203d%20render",
        "https://pollinations.ai/p/doc%20hudson%20from%20pixar%20cars%20movie%20in%20an%20auto%20shop%20checking%20diagnostics%2C%203d%20animation%2C%20movie%20quality"
    ]

    // Select appropriate images based on performance metrics
    const speedIndex = data.speed.overSpeedPercentage > 15 ? 0 : 1
    const fuelIndex = data.fuel.efficiency < 24 ? 0 : 1
    const diagnosticIndex = data.diagnostics.errorPercentage > 15 ? 0 : 1

    return {
        speed: speedImages[speedIndex],
        fuel: fuelImages[fuelIndex],
        diagnostics: diagnosticImages[diagnosticIndex]
    }
} 