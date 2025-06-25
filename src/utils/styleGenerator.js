// Generate CSS custom properties from CMS styling settings
export const generateCustomCSS = (settings) => {
  if (!settings) return ''

  const { colors, typography, layout } = settings
  
  let css = ':root {\n'

  // Color variables
  if (colors) {
    if (colors.header) {
      css += `  --header-bg: ${colors.header.backgroundColor || '#ffffff'};\n`
      css += `  --header-text: ${colors.header.textColor || '#333333'};\n`
      css += `  --header-logo: ${colors.header.logoColor || '#333333'};\n`
      css += `  --header-active: ${colors.header.activeLinkColor || '#ff6b35'};\n`
      css += `  --header-hover: ${colors.header.hoverColor || '#ff8c5a'};\n`
    }
    
    if (colors.footer) {
      css += `  --footer-bg: ${colors.footer.backgroundColor || '#2c2c2c'};\n`
      css += `  --footer-text: ${colors.footer.textColor || '#ffffff'};\n`
      css += `  --footer-link: ${colors.footer.linkColor || '#ff6b35'};\n`
    }
    
    if (colors.primary) {
      css += `  --primary-color: ${colors.primary.main || '#ff6b35'};\n`
      css += `  --primary-hover: ${colors.primary.hover || '#e55a2b'};\n`
      css += `  --secondary-color: ${colors.primary.secondary || '#4a90e2'};\n`
    }
    
    if (colors.background) {
      css += `  --bg-page: ${colors.background.page || '#ffffff'};\n`
      css += `  --bg-section: ${colors.background.section || '#f8f9fa'};\n`
      css += `  --bg-card: ${colors.background.card || '#ffffff'};\n`
    }
    
    if (colors.text) {
      css += `  --text-heading: ${colors.text.heading || '#2c2c2c'};\n`
      css += `  --text-body: ${colors.text.body || '#666666'};\n`
      css += `  --text-muted: ${colors.text.muted || '#999999'};\n`
    }
  }

  // Typography variables
  if (typography) {
    if (typography.fonts) {
      css += `  --font-heading: '${typography.fonts.heading || 'Inter'}', sans-serif;\n`
      css += `  --font-body: '${typography.fonts.body || 'Inter'}', sans-serif;\n`
    }
    
    if (typography.sizes) {
      css += `  --size-hero: ${typography.sizes.heroTitle || '4rem'};\n`
      css += `  --size-page-title: ${typography.sizes.pageTitle || '2.5rem'};\n`
      css += `  --size-section-title: ${typography.sizes.sectionTitle || '1.75rem'};\n`
      css += `  --size-body: ${typography.sizes.body || '1rem'};\n`
    }
    
    if (typography.weights) {
      css += `  --weight-heading: ${typography.weights.heading || '700'};\n`
      css += `  --weight-body: ${typography.weights.body || '400'};\n`
    }
  }

  // Layout variables
  if (layout) {
    if (layout.container) {
      css += `  --container-max-width: ${layout.container.maxWidth || '1280px'};\n`
      css += `  --section-padding: ${layout.container.sectionPadding || '4rem'};\n`
      css += `  --border-radius: ${layout.container.cardRadius || '12px'};\n`
    }
    
    if (layout.menuGrid) {
      css += `  --menu-columns-desktop: ${layout.menuGrid.desktop || '3'};\n`
      css += `  --menu-columns-tablet: ${layout.menuGrid.tablet || '2'};\n`
      css += `  --menu-gap: ${layout.menuGrid.gap || '2rem'};\n`
    }
  }

  css += '}\n'
  return css
}

// Generate Google Fonts import URL
export const generateFontImport = (typography) => {
  if (!typography?.fonts) return ''
  
  const fonts = new Set()
  
  if (typography.fonts.heading && typography.fonts.heading !== 'Inter') {
    fonts.add(typography.fonts.heading)
  }
  
  if (typography.fonts.body && typography.fonts.body !== 'Inter' && typography.fonts.body !== typography.fonts.heading) {
    fonts.add(typography.fonts.body)
  }
  
  if (typography.fonts.customFont) {
    return typography.fonts.customFont
  }
  
  if (fonts.size === 0) return ''
  
  const fontList = Array.from(fonts).map(font => `${font}:300,400,500,600,700,800`).join('&family=')
  return `https://fonts.googleapis.com/css2?family=${fontList}&display=swap`
}