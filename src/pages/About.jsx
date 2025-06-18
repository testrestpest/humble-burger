import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1 className="page-title">Our Story</h1>
          <p className="hero-text">
            Founded on the belief that great burgers bring people together, 
            Humble Burger started as a small family dream and has grown into 
            a beloved community gathering place.
          </p>
        </section>

        {/* Story Section */}
        <section className="story-section py-16">
          <div className="story-content">
            <div className="story-text">
              <h2>From Humble Beginnings</h2>
              <p>
                It all started in 2018 when Chef Maria Rodriguez decided to pursue her 
                passion for creating the perfect burger. After years of perfecting her 
                recipes in her home kitchen, she opened the first Humble Burger location 
                with a simple mission: serve honest, delicious food made with love.
              </p>
              <p>
                What began as a small neighborhood spot has grown into a local institution, 
                but we've never forgotten our roots. Every burger is still hand-crafted 
                with the same care and attention that Maria put into those first burgers.
              </p>
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
          <h2 className="section-title text-center mb-8">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>
                We partner with local farms and suppliers who share our commitment 
                to sustainable practices and environmental responsibility.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>
                We believe in giving back to our community and supporting local 
                initiatives that make our neighborhood stronger.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>Quality</h3>
              <p>
                Every ingredient is carefully selected and every burger is made 
                to order, ensuring the highest quality in every bite.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Passion</h3>
              <p>
                Our team is passionate about food and hospitality, and it shows 
                in everything we do, from cooking to customer service.
              </p>
            </div>
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
