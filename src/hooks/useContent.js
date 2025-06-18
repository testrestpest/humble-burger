// Hook to load content from markdown files or fallback to static data
import { useState, useEffect } from 'react'

export const useContent = (type, fallbackData = []) => {
  const [content, setContent] = useState(fallbackData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In development, use fallback data
    // In production with Netlify CMS, this would load from the markdown files
    const loadContent = async () => {
      try {
        // This is where you'd fetch from your CMS in production
        // For now, we'll use the fallback data
        setContent(fallbackData)
      } catch (error) {
        console.error('Failed to load content:', error)
        setContent(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [type])

  return { content, loading }
}

export default useContent
