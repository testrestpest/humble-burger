# Humble Burger Website

A modern, responsive website for Humble Burger restaurant built with React, Vite, and Netlify CMS.

## 🚀 Features

- **Modern React Frontend**: Built with Vite for fast development and building
- **Netlify CMS Integration**: Easy content management with a user-friendly admin interface
- **Responsive Design**: Looks great on all devices
- **Editable Menu Items**: Add, edit, and remove menu items through the CMS
- **Contact Form**: Netlify Forms integration for customer inquiries
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Hosting**: Netlify
- **CMS**: Netlify CMS
- **Styling**: CSS3 with custom properties
- **Authentication**: Netlify Identity

## 🏗️ Setup & Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd humble-burger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 🌐 Deployment to Netlify

### Method 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Enable Netlify Identity**
   - In your Netlify site dashboard, go to "Identity"
   - Click "Enable Identity"
   - Go to "Settings" → "Registration" → "Invite only"
   - Go to "Settings" → "Git Gateway" → "Enable Git Gateway"

4. **Create Admin User**
   - Go to "Identity" → "Invite users"
   - Enter your email address
   - Check your email and complete signup
   - Visit `yoursite.netlify.app/admin` to access the CMS

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## 📝 Content Management

### Accessing the CMS

1. Visit `yoursite.netlify.app/admin`
2. Log in with your Netlify Identity credentials
3. Start editing content!

### Content Types

- **Menu Items**: Add, edit, and organize menu items by category
- **Pages**: Edit home, about, and contact page content
- **Site Settings**: Update site title, logo, and social links

### Adding Menu Items

1. Go to the CMS admin panel
2. Click "Menu Items"
3. Click "New Menu Items"
4. Fill in the details:
   - Name
   - Description  
   - Price
   - Category (burgers, sides, drinks, desserts)
   - Image (optional)
   - Emoji (optional)
   - Featured (checkbox)
   - Available (checkbox)
5. Click "Publish"

## 🎨 Customization

### Colors

Edit the CSS custom properties in `src/index.css`:

```css
:root {
  --primary-color: #d97706;    /* Main orange */
  --primary-dark: #b45309;     /* Darker orange */
  --secondary-color: #1f2937;  /* Dark gray */
  --accent-color: #f59e0b;     /* Light orange */
  /* ... more colors */
}
```

### Fonts

The site uses:
- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

Change fonts in `index.html` and `src/index.css`.

## 📧 Contact Form

The contact form uses Netlify Forms. To receive form submissions:

1. The form in `src/pages/Contact.jsx` includes `data-netlify="true"`
2. Form submissions will appear in your Netlify dashboard under "Forms"
3. Set up email notifications in Netlify → Site settings → Forms → Form notifications

## 🔧 Configuration Files

- `netlify.toml`: Netlify build settings and redirects
- `public/admin/config.yml`: Netlify CMS configuration
- `vite.config.js`: Vite build configuration
- `package.json`: Dependencies and scripts

## 📱 Features Included

- Responsive navigation with mobile menu
- Hero section with call-to-action buttons
- Featured menu items showcase
- Filterable menu page by category
- About page with team and values
- Contact page with form and business info
- Footer with hours and contact details

## 🚀 Going Live Checklist

- [ ] Update site title and description
- [ ] Add real menu items through CMS
- [ ] Update contact information
- [ ] Add real business hours
- [ ] Update social media links
- [ ] Add real photos (replace emoji placeholders)
- [ ] Set up custom domain (optional)
- [ ] Test contact form submissions
- [ ] Enable Google Analytics (optional)

## 🆘 Support

For issues or questions:
1. Check the [Netlify CMS documentation](https://www.netlifycms.org/docs/)
2. Visit [Netlify support](https://www.netlify.com/support/)
3. Check [React documentation](https://react.dev/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
