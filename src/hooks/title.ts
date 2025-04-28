import { useEffect } from 'react'

export const useTabTitle = () => {
    const defaultTitle = "Crspy"
    const awayTitle = "Lonely tab"

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