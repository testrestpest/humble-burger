import fs from 'fs'
import path from 'path'

// This is a build-time script to convert markdown to JSON
const contentDir = path.join(process.cwd(), 'content')
const outputDir = path.join(process.cwd(), 'public', 'api')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Improved YAML parser for handling complex structures
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  
  if (!match) return {}
  
  const frontmatter = match[1]
  
  try {
    const data = {}
    const lines = frontmatter.split('\n')
    let i = 0
    
    function parseValue(value) {
      if (value === 'true') return true
      if (value === 'false') return false
      if (value === 'null') return null
      if (/^-?\d+$/.test(value)) return parseInt(value)
      if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value)
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        return value.slice(1, -1)
      }
      
      return value
    }
    
    function parseMultilineString(startIndex, operator) {
      const content = []
      let lineIndex = startIndex
      
      while (lineIndex < lines.length) {
        const line = lines[lineIndex]
        
        // If we hit a new key at the root level, stop
        if (line.match(/^\w+:/) && !line.startsWith('  ')) {
          break
        }
        
        // If it's indented content, add it
        if (line.startsWith('  ') || line.trim() === '') {
          content.push(line.replace(/^  /, ''))
        } else {
          break
        }
        
        lineIndex++
      }
      
      let result = content.join('\n').trim()
      
      // Handle different multiline operators
      if (operator === '>') {
        // Folded style - join lines with spaces, preserve paragraph breaks
        result = result.replace(/\n(?!\n)/g, ' ').replace(/\n\n/g, '\n')
      }
      // For '|' (literal style), keep as is
      
      return { value: result, nextIndex: lineIndex }
    }
    
    function parseArray(startIndex) {
      const items = []
      let lineIndex = startIndex
      
      while (lineIndex < lines.length) {
        const line = lines[lineIndex]
        
        if (!line.trim().startsWith('- ')) {
          break
        }
        
        const itemContent = line.trim().substring(2)
        
        if (itemContent.includes(':')) {
          // This is an object item
          const item = {}
          const firstPart = itemContent.split(':')
          const key = firstPart[0].trim()
          const value = firstPart.slice(1).join(':').trim()
          
          if (value) {
            item[key] = parseValue(value)
          }
          
          // Look for more properties of this object
          lineIndex++
          while (lineIndex < lines.length) {
            const nextLine = lines[lineIndex]
            if (nextLine.trim().startsWith('- ')) break
            if (!nextLine.match(/^\w+:/) && nextLine.startsWith('    ')) {
              // This is a continuation of the object
              const propMatch = nextLine.trim().match(/^(\w+):\s*(.*)/)
              if (propMatch) {
                item[propMatch[1]] = parseValue(propMatch[2])
              }
              lineIndex++
            } else {
              break
            }
          }
          
          items.push(item)
        } else {
          // Simple array item
          items.push(parseValue(itemContent))
          lineIndex++
        }
      }
      
      return { value: items, nextIndex: lineIndex }
    }
    
    while (i < lines.length) {
      const line = lines[i]
      
      if (!line.trim() || line.trim().startsWith('#')) {
        i++
        continue
      }
      
      const match = line.match(/^(\w+):\s*(.*)/)
      if (match) {
        const key = match[1]
        const value = match[2]
        
        if (value === '|' || value === '>') {
          // Multiline string
          const result = parseMultilineString(i + 1, value)
          data[key] = result.value
          i = result.nextIndex
        } else if (!value && i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
          // Array
          const result = parseArray(i + 1)
          data[key] = result.value
          i = result.nextIndex
        } else {
          // Simple value
          data[key] = parseValue(value)
          i++
        }
      } else {
        i++
      }
    }
    
    return data
  } catch (error) {
    console.error('Error parsing YAML:', error)
    return {}
  }
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
  const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.md'))

  pageFiles.forEach(file => {
    const filePath = path.join(pagesDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const data = parseFrontmatter(content)
    const pageName = path.basename(file, '.md')
    
    // Wrap in an array to match useContent hook structure
    const pageData = [{
      id: pageName,
      attributes: data
    }]

    fs.writeFileSync(
      path.join(outputDir, `${pageName}.json`),
      JSON.stringify(pageData, null, 2)
    )
  })

  console.log(`Generated JSON for ${pageFiles.length} pages.`)
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
        const settingName = path.basename(file, '.md')
        
        // Organize settings by their filename (assets, header, general, etc.)
        settings[settingName] = data
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
