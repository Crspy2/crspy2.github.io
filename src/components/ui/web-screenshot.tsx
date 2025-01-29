import { memo } from "react"
import { encode } from "qss"

interface WebScreenshotProps {
    url: string
    width?: number
    height?: number
    className?: string
}

export const WebScreenshot = memo(({ url, width = 200, height = 150, className }: WebScreenshotProps) => {
    const params = encode({
        url,
        screenshot: true,
        meta: false,
        embed: "screenshot.url",
        colorScheme: "dark",
        "viewport.isMobile": true,
        "viewport.deviceScaleFactor": 1,
        "viewport.width": width * 3,
        "viewport.height": height * 3,
    })
    const src = `https://api.microlink.io/?${params}`

    return (
        <img src={src} alt={`Screenshot of ${url}`} className={className} />
    )
})