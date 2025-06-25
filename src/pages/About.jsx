import { useState, useEffect } from 'react'
import { fetchContent } from '../utils/contentLoader'
import './About.css'

function About() {
  const [aboutContent, setAboutContent] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const pages = await fetchContent('pages')
        setAboutContent(pages.about || {})
      } catch (error) {
        console.error('Error loading about content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  if (loading) {
    return (
      <div className="about-page">
        <div className="container">
          <div className="about-hero">
            <h1 className="page-title">Loading...</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1 className="page-title">{aboutContent.title || "Our Story"}</h1>
          {aboutContent.heroText ? (
            <div 
              className="hero-text"
              dangerouslySetInnerHTML={{ __html: aboutContent.heroText }}
            />
          ) : (
            <p className="hero-text">
              Founded on the belief that great burgers bring people together, Humble Burger started as a small family dream and has grown into a beloved community gathering place.
            </p>
          )}
        </section>

        {/* Story Section */}
        <section className="story-section py-16">
          <div className="story-content">
            <div className="story-text">
              <h2>{aboutContent.storyTitle || "From Humble Beginnings"}</h2>
              {aboutContent.storyContent && (
                <div dangerouslySetInnerHTML={{ 
                  __html: aboutContent.storyContent
                }} />
              )}
            </div>            <div className="story-image">
              <div className="image-placeholder">
                {aboutContent.storyImageEmoji || "👩‍🍳"}
                <p>{aboutContent.storyImageCaption || "Chef Maria Rodriguez"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section py-16">
          <h2 className="section-title text-center mb-8">
            {aboutContent.valuesTitle || "Our Values"}
          </h2>
          <div className="values-grid">
            {(aboutContent.values || [
              { icon: "🌱", title: "Sustainability", description: "We partner with local farms and suppliers who share our commitment to sustainable practices and environmental responsibility." },
              { icon: "🤝", title: "Community", description: "We believe in giving back to our community and supporting local initiatives that make our neighborhood stronger." },
              { icon: "⭐", title: "Quality", description: "Every ingredient is carefully selected and every burger is made to order, ensuring the highest quality in every bite." },
              { icon: "❤️", title: "Passion", description: "Our team is passionate about food and hospitality, and it shows in everything we do, from cooking to customer service." }
            ]).map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                {typeof value.description === 'string' && value.description.includes('<p>') ? (
                  <div dangerouslySetInnerHTML={{ __html: value.description }} />
                ) : (
                  <p>{value.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>        {/* Team Section */}
        <section className="team-section py-16">
          <div className="container">
            <h2 className="section-title text-center mb-8">
              {aboutContent.teamSectionTitle || "Meet Our Team"}
            </h2>
            <div className="team-grid">
              {(aboutContent.teamMembers || [
                { emoji: "👩‍🍳", name: "Maria Rodriguez", role: "Founder & Head Chef", bio: "Maria's passion for cooking started in her grandmother's kitchen. She brings 15 years of culinary experience to every burger." },
                { emoji: "👨‍💼", name: "James Thompson", role: "General Manager", bio: "James ensures every customer has an exceptional experience. His attention to detail keeps everything running smoothly." },
                { emoji: "👩‍🍳", name: "Sarah Kim", role: "Sous Chef", bio: "Sarah's creativity and precision in the kitchen help maintain our high standards and develop new menu items." }
              ]).map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-image">{member.emoji}</div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  {typeof member.bio === 'string' && member.bio.includes('<p>') ? (
                    <div className="member-bio" dangerouslySetInnerHTML={{ __html: member.bio }} />
                  ) : (
                    <p className="member-bio">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
