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
    return <div /> // Prevent flash of loading content
  }

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        {aboutContent.title && (
          <section className="about-hero">
            <h1 className="page-title">{aboutContent.title}</h1>
            {aboutContent.heroText && (
              <div 
                className="hero-text"
                dangerouslySetInnerHTML={{ __html: aboutContent.heroText }}
              />
            )}
          </section>
        )}

        {/* Story Section */}
        <section className="story-section py-16">
          <div className="story-content">
            <div className="story-text">
              {aboutContent.storyTitle && <h2>{aboutContent.storyTitle}</h2>}
              {aboutContent.storyContent && (
                <div dangerouslySetInnerHTML={{ 
                  __html: aboutContent.storyContent
                }} />
              )}
            </div>            <div className="story-image">
              <div className="image-placeholder">
                {aboutContent.storyImageEmoji && aboutContent.storyImageEmoji}
                {aboutContent.storyImageCaption && <p>{aboutContent.storyImageCaption}</p>}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        {aboutContent.valuesTitle && aboutContent.values && (
          <section className="values-section py-16">
            <h2 className="section-title text-center mb-8">
              {aboutContent.valuesTitle}
            </h2>
            <div className="values-grid">
              {aboutContent.values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
              ))}
            </div>
          </section>
        )}

        {/* Team Section */}
        {aboutContent.teamSectionTitle && aboutContent.teamMembers && (
          <section className="team-section py-16">
            <div className="container">
              <h2 className="section-title text-center mb-8">
                {aboutContent.teamSectionTitle}
              </h2>
              <div className="team-grid">
                {aboutContent.teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-image">{member.emoji}</div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  {member.bio && member.bio.includes('<p>') ? (
                    <div className="member-bio" dangerouslySetInnerHTML={{ __html: member.bio }} />
                  ) : (
                    <p className="member-bio">{member.bio}</p>
                  )}
                </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default About
