// Generate CSS custom properties from CMS styling settings
export const generateCustomCSS = (settings) => {
  if (!settings) return ''

  const { colors, typography, layout } = settings
  
  let css = ':root {\n'

  // Color variables
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

  // Typography variables (font sizes and weights)
  if (typography && typography.sizes) {
    if (typography.sizes.heroTitle) css += `  --hero-title-size: ${typography.sizes.heroTitle};\n`
    if (typography.sizes.pageTitle) css += `  --page-title-size: ${typography.sizes.pageTitle};\n`
    if (typography.sizes.pageTitleMobile) css += `  --page-title-size-mobile: ${typography.sizes.pageTitleMobile};\n`
    if (typography.sizes.pageTitleXs) css += `  --page-title-size-xs: ${typography.sizes.pageTitleXs};\n`
    if (typography.sizes.sectionTitle) css += `  --section-title-size: ${typography.sizes.sectionTitle};\n`
    if (typography.sizes.sectionTitleMobile) css += `  --section-title-size-mobile: ${typography.sizes.sectionTitleMobile};\n`
    if (typography.sizes.sectionTitleXs) css += `  --section-title-size-xs: ${typography.sizes.sectionTitleXs};\n`
    if (typography.sizes.body) css += `  --body-text-size: ${typography.sizes.body};\n`
    if (typography.sizes.heroTextXs) css += `  --hero-text-xs: ${typography.sizes.heroTextXs};\n`
    if (typography.sizes.valueCardH3Xs) css += `  --value-card-h3-xs: ${typography.sizes.valueCardH3Xs};\n`
    if (typography.sizes.teamMemberH3Xs) css += `  --team-member-h3-xs: ${typography.sizes.teamMemberH3Xs};\n`
    if (typography.sizes.valueIconXs) css += `  --value-icon-xs: ${typography.sizes.valueIconXs};\n`
  }

  if (typography && typography.weights) {
    if (typography.weights.heading) css += `  --heading-font-weight: ${typography.weights.heading};\n`
    if (typography.weights.body) css += `  --body-font-weight: ${typography.weights.body};\n`
  }

  // Layout variables
  if (layout && layout.container) {
    if (layout.container.maxWidth) css += `  --max-container-width: ${layout.container.maxWidth};\n`
    if (layout.container.sectionPadding) css += `  --section-padding: ${layout.container.sectionPadding};\n`
    if (layout.container.cardRadius) css += `  --card-border-radius: ${layout.container.cardRadius};\n`
  }

  css += '}\n'
  return css
}

// Generate Google Font import URL
export const generateFontImport = (settings) => {
  if (!settings || !settings.typography || !settings.typography.fonts) return ''

  const { heading, body, customFont } = settings.typography.fonts
  let fontFamilies = []

  if (heading && heading !== 'Inter') { // Inter is already imported in index.css
    fontFamilies.push(heading.replace(/\s/g, '+'))
  }
  if (body && body !== 'Inter' && body !== heading) {
    fontFamilies.push(body.replace(/\s/g, '+'))
  }

  if (customFont) {
    return customFont // Return custom URL directly if provided
  }

  if (fontFamilies.length > 0) {
    return `https://fonts.googleapis.com/css2?family=${fontFamilies.join('&family=')}&display=swap`
  }
  return ''
}
