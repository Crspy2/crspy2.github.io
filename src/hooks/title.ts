import { useEffect } from 'react'

export const useTabTitle = () => {
    const defaultTitle = "Crspy"
    const awayTitle = "Lonely tab"

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Set a 15-second delay before changing to "lonely" title
                timeoutId = setTimeout(() => {
                    document.title = awayTitle
                }, 15000)
            } else {
                // Clear timeout and restore default title when tab becomes active
                if (timeoutId) {
                    clearTimeout(timeoutId)
                    timeoutId = null
                }
                document.title = defaultTitle
            }
        }
        

        document.addEventListener('visibilitychange', handleVisibilityChange)
        document.title = defaultTitle

        // Cleanup
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            document.title = defaultTitle
        }
    }, [])
}