// Generate CSS custom properties from CMS styling settings - COLORS ONLY
export const generateCustomCSS = (settings) => {
  if (!settings) return ''

  const { colors } = settings
  
  let css = ':root {\n'

  // Color variables only - using flat structure
  if (colors) {
    // Header colors
    if (colors.headerBackgroundColor) css += `  --header-bg: ${colors.headerBackgroundColor};\n`
    if (colors.headerTextColor) css += `  --header-text: ${colors.headerTextColor};\n`
    if (colors.headerLogoColor) css += `  --header-logo: ${colors.headerLogoColor};\n`
    if (colors.headerActiveLinkColor) css += `  --header-active: ${colors.headerActiveLinkColor};\n`
    if (colors.headerHoverColor) css += `  --header-hover: ${colors.headerHoverColor};\n`
    
    // Footer colors
    if (colors.footerBackgroundColor) css += `  --footer-bg: ${colors.footerBackgroundColor};\n`
    if (colors.footerTextColor) css += `  --footer-text: ${colors.footerTextColor};\n`
    if (colors.footerLinkColor) css += `  --footer-link: ${colors.footerLinkColor};\n`
    
    // Primary colors
    if (colors.primaryMain) css += `  --primary-color: ${colors.primaryMain};\n`
    if (colors.primaryHover) css += `  --primary-hover: ${colors.primaryHover};\n`
    if (colors.primarySecondary) css += `  --secondary-color: ${colors.primarySecondary};\n`
    
    // Background colors
    if (colors.backgroundPage) css += `  --bg-page: ${colors.backgroundPage};\n`
    if (colors.backgroundSection) css += `  --bg-section: ${colors.backgroundSection};\n`
    if (colors.backgroundCard) css += `  --bg-card: ${colors.backgroundCard};\n`
    
    // Text colors
    if (colors.textHeading) css += `  --text-heading: ${colors.textHeading};\n`
    if (colors.textBody) css += `  --text-body: ${colors.textBody};\n`
    if (colors.textMuted) css += `  --text-muted: ${colors.textMuted};\n`
  }

  css += '}\n'
  return css
}

// No font imports - keeping original fonts
export const generateFontImport = () => {
  return ''
}