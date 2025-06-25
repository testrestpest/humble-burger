import { useEffect, useState } from 'react'
import { fetchContent } from '../utils/contentLoader'
import { generateCustomCSS, generateFontImport } from '../utils/styleGenerator'

function StyleProvider({ children }) {
  const [stylesLoaded, setStylesLoaded] = useState(false)

  useEffect(() => {
    const loadStyles = async () => {
      try {
        const settings = await fetchContent('settings')
        
        // Generate and inject custom CSS
        const customCSS = generateCustomCSS(settings)
        
        // Remove existing custom styles
        const existingStyle = document.getElementById('cms-custom-styles')
        if (existingStyle) {
          existingStyle.remove()
        }
        
        // Inject new custom styles
        if (customCSS) {
          const styleElement = document.createElement('style')
          styleElement.id = 'cms-custom-styles'
          styleElement.textContent = customCSS
          document.head.appendChild(styleElement)
        }
        
        // Handle Google Fonts
        const fontImportURL = generateFontImport(settings.typography)
        
        // Remove existing font imports
        const existingFontLink = document.getElementById('cms-google-fonts')
        if (existingFontLink) {
          existingFontLink.remove()
        }
        
        // Inject new font imports
        if (fontImportURL) {
          const linkElement = document.createElement('link')
          linkElement.id = 'cms-google-fonts'
          linkElement.rel = 'stylesheet'
          linkElement.href = fontImportURL
          document.head.appendChild(linkElement)
        }
        
        setStylesLoaded(true)
      } catch (error) {
        console.error('Error loading custom styles:', error)
        setStylesLoaded(true) // Still render children even if styles fail
      }
    }

    loadStyles()
  }, [])

  // Render children immediately, styles will apply when loaded
  return children
}

export default StyleProvider