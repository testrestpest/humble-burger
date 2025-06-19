// Utility to fetch and parse markdown content from CMS
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
        return []
    }
  } catch (error) {
    console.error('Error fetching content:', error)
    return getFallbackData(type)
  }
}

const fetchMenuItems = async () => {
  // For now, return fallback data
  // In production, this would integrate with Netlify CMS API or build process
  return getFallbackMenuItems()
}

const fetchSettings = async () => {
  return getFallbackSettings()
}

const fetchPages = async () => {
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
