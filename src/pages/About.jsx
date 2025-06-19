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
          <p className="hero-text">
            {aboutContent.heroText || "Founded on the belief that great burgers bring people together, Humble Burger started as a small family dream and has grown into a beloved community gathering place."}
          </p>
        </section>

        {/* Story Section */}
        <section className="story-section py-16">
          <div className="story-content">
            <div className="story-text">
              <h2>{aboutContent.storyTitle || "From Humble Beginnings"}</h2>
              <div dangerouslySetInnerHTML={{ 
                __html: aboutContent.storyContent ? 
                  aboutContent.storyContent.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') : 
                  `<p>It all started in 2018 when Chef Maria Rodriguez decided to pursue her passion for creating the perfect burger. After years of perfecting her recipes in her home kitchen, she opened the first Humble Burger location with a simple mission: serve honest, delicious food made with love.</p><p>What began as a small neighborhood spot has grown into a local institution, but we've never forgotten our roots. Every burger is still hand-crafted with the same care and attention that Maria put into those first burgers.</p>`
              }} />
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                👩‍🍳
                <p>Chef Maria Rodriguez</p>
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
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section py-16">
          <div className="container">
            <h2 className="section-title text-center mb-8">Meet Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image">👩‍🍳</div>
                <h3>Maria Rodriguez</h3>
                <p className="member-role">Founder & Head Chef</p>
                <p className="member-bio">
                  Maria's passion for cooking started in her grandmother's kitchen. 
                  She brings 15 years of culinary experience to every burger.
                </p>
              </div>
              <div className="team-member">
                <div className="member-image">👨‍💼</div>
                <h3>James Thompson</h3>
                <p className="member-role">General Manager</p>
                <p className="member-bio">
                  James ensures every customer has an exceptional experience. 
                  His attention to detail keeps everything running smoothly.
                </p>
              </div>
              <div className="team-member">
                <div className="member-image">👩‍🍳</div>
                <h3>Sarah Kim</h3>
                <p className="member-role">Sous Chef</p>
                <p className="member-bio">
                  Sarah's creativity and precision in the kitchen help maintain 
                  our high standards and develop new menu items.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
