// Hook to load content from markdown files or fallback to static data
import { useState, useEffect } from 'react'

export const useContent = (type, fallbackData = []) => {
  const [content, setContent] = useState(fallbackData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/pages.json`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch pages: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data[type]) {
          // Wrap in array format expected by components
          setContent([{ id: type, attributes: data[type] }])
        } else {
          console.warn(`No content found for type: ${type}`)
          setContent(fallbackData)
        }
        
      } catch (error) {
        console.error('Failed to load content:', error)
        setError(error)
        setContent(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [type, fallbackData])

  return { content, loading, error }
}

export default useContent
