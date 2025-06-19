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
      return pages || getFallbackPages()
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
  home: {
    title: "Welcome to Humble Burger",
    heroTitle: "Welcome to Humble Burger",
    heroSubtitle: "Where gourmet meets comfort. Every burger is crafted with passion, using the freshest ingredients and served with a smile."
  },
  about: {
    title: "Our Story",
    heroText: "Founded on the belief that great burgers bring people together, Humble Burger started as a small family dream and has grown into a beloved community gathering place.",
    storyTitle: "From Humble Beginnings",
    storyContent: "It all started in 2018 when Chef Maria Rodriguez decided to pursue her passion for creating the perfect burger. After years of perfecting her recipes in her home kitchen, she opened the first Humble Burger location with a simple mission: serve honest, delicious food made with love.\n\nWhat began as a small neighborhood spot has grown into a local institution, but we've never forgotten our roots. Every burger is still hand-crafted with the same care and attention that Maria put into those first burgers.",
    valuesTitle: "Our Values",
    values: [
      { icon: "🌱", title: "Sustainability", description: "We partner with local farms and suppliers who share our commitment to sustainable practices and environmental responsibility." },
      { icon: "🤝", title: "Community", description: "We believe in giving back to our community and supporting local initiatives that make our neighborhood stronger." },
      { icon: "⭐", title: "Quality", description: "Every ingredient is carefully selected and every burger is made to order, ensuring the highest quality in every bite." },
      { icon: "❤️", title: "Passion", description: "Our team is passionate about food and hospitality, and it shows in everything we do, from cooking to customer service." }
    ]
  },
  contact: {
    title: "Get in Touch",
    subtitle: "We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, don't hesitate to reach out.",
    address: "123 Burger Street, Food City, FC 12345",
    phone: "(555) 123-BURGER",
    email: "hello@humbleburger.com",
    hours: [
      { days: "Monday - Thursday", time: "11:00 AM - 10:00 PM" },
      { days: "Friday - Saturday", time: "11:00 AM - 11:00 PM" },
      { days: "Sunday", time: "12:00 PM - 9:00 PM" }
    ]
  }
})
