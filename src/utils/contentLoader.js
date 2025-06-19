// Utility to fetch and parse content from generated JSON files
export const fetchContent = async (type) => {
  try {
    switch (type) {
      case 'menu':
        return await fetchMenuItems()
      case 'settings':
        return await fetchSettings()
      case 'pages':
        return await fetchPages()
      default:
        return getFallbackData(type)
    }
  } catch (error) {
    console.error('Error fetching content:', error)
    return getFallbackData(type)
  }
}

const fetchMenuItems = async () => {
  try {
    const response = await fetch('/api/menu.json')
    if (response.ok) {
      const items = await response.json()
      return items.length > 0 ? items : getFallbackMenuItems()
    }
  } catch (error) {
    console.log('Using fallback menu items')
  }
  return getFallbackMenuItems()
}

const fetchSettings = async () => {
  try {
    const response = await fetch('/api/settings.json')
    if (response.ok) {
      const settings = await response.json()
      return Object.keys(settings).length > 0 ? settings : getFallbackSettings()
    }
  } catch (error) {
    console.log('Using fallback settings')
  }
  return getFallbackSettings()
}

const fetchPages = async () => {
  try {
    const response = await fetch('/api/pages.json')
    if (response.ok) {
      const pages = await response.json()
      return pages.home || getFallbackPages()
    }
  } catch (error) {
    console.log('Using fallback pages')
  }
  return getFallbackPages()
}

const getFallbackData = (type) => {
  switch (type) {
    case 'menu':
      return getFallbackMenuItems()
    case 'settings':
      return getFallbackSettings()
    case 'pages':
      return getFallbackPages()
    default:
      return []
  }
}

// Fallback data when CMS content isn't available
const getFallbackMenuItems = () => [
  {
    id: 1,
    name: "Classic Humble Burger",
    description: "Our signature beef patty with lettuce, tomato, onion, and our special sauce on a brioche bun",
    price: "$12.99",
    category: "burgers",
    emoji: "🍔",
    featured: true,
    available: true
  },
  {
    id: 2,
    name: "BBQ Bacon Deluxe",
    description: "Smoky BBQ sauce, crispy bacon, caramelized onions, and cheddar cheese",
    price: "$15.99",
    category: "burgers",
    emoji: "🥓",
    featured: true,
    available: true
  },
  {
    id: 3,
    name: "Sweet Potato Fries",
    description: "Crispy sweet potato fries with a hint of cinnamon and sea salt",
    price: "$6.99",
    category: "sides",
    emoji: "🍟",
    featured: false,
    available: true
  }
]

const getFallbackSettings = () => ({
  siteTitle: "Humble Burger",
  siteDescription: "Gourmet burgers made with fresh, locally-sourced ingredients",
  logoText: "Humble Burger",
  logoEmoji: "🍔"
})

const getFallbackPages = () => ({
  title: "Welcome to Humble Burger",
  heroTitle: "Welcome to Humble Burger",
  heroSubtitle: "Where gourmet meets comfort. Every burger is crafted with passion, using the freshest ingredients and served with a smile."
})
