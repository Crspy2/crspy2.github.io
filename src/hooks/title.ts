import { useEffect } from 'react'

export const useTabTitle = () => {
    const defaultTitle = "Crspy's Portfolio"
    const awayTitle = "Warning: Tab feeling neglected"

    useEffect(() => {
        const handleVisibilityChange = () => {
            document.title = document.hidden ? awayTitle : defaultTitle
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        document.title = defaultTitle

        // Cleanup
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            document.title = defaultTitle
        }
    }, [])
}