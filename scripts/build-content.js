import fs from 'fs'
import path from 'path'

// This is a build-time script to convert markdown to JSON
const contentDir = path.join(process.cwd(), 'content')
const outputDir = path.join(process.cwd(), 'public', 'api')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Parse frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  
  if (!match) return {}
  
  const frontmatter = match[1]
  const data = {}
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      
      // Convert boolean strings
      if (value === 'true') value = true
      if (value === 'false') value = false
      
      data[key] = value
    }
  })
  
  return data
}

// Process menu items
function processMenuItems() {
  const menuDir = path.join(contentDir, 'menu')
  const menuItems = []
  
  if (fs.existsSync(menuDir)) {
    const files = fs.readdirSync(menuDir)
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(menuDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const data = parseFrontmatter(content)
        
        if (data.name) {
          menuItems.push({
            id: path.basename(file, '.md'),
            ...data
          })
        }
      }
    })
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'menu.json'), 
    JSON.stringify(menuItems, null, 2)
  )
  
  console.log(`Generated ${menuItems.length} menu items`)
}

// Process pages
function processPages() {
  const pagesDir = path.join(contentDir, 'pages')
  const pages = {}
  
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir)
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(pagesDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const data = parseFrontmatter(content)
        const pageName = path.basename(file, '.md')
        pages[pageName] = data
      }
    })
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'pages.json'), 
    JSON.stringify(pages, null, 2)
  )
  
  console.log('Generated pages data')
}

// Process settings
function processSettings() {
  const settingsDir = path.join(contentDir, 'settings')
  const settings = {}
  
  if (fs.existsSync(settingsDir)) {
    const files = fs.readdirSync(settingsDir)
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(settingsDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const data = parseFrontmatter(content)
        Object.assign(settings, data)
      }
    })
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'settings.json'), 
    JSON.stringify(settings, null, 2)
  )
  
  console.log('Generated settings data')
}

// Run all processors
try {
  processMenuItems()
  processPages()
  processSettings()
  console.log('✅ Content processing complete!')
} catch (error) {
  console.error('❌ Error processing content:', error)
  process.exit(1)
}
