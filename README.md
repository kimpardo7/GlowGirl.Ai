# GlowGirl.AI - Your AI Beauty Companion

A modern, responsive website for GlowGirl.AI, featuring beautiful design, smooth animations, and interactive elements.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with gradient backgrounds and smooth animations
- **Interactive Elements**: Smooth scrolling navigation, form validation, and hover effects
- **Mobile-First**: Optimized for mobile devices with hamburger menu
- **Performance Optimized**: Fast loading with minimal dependencies

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required!

### Running the Website

1. **Simple Method**: Double-click on `index.html` to open it in your default browser

2. **Local Server Method** (Recommended for development):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if you have it installed)
   npx serve .
   ```

3. **VS Code Live Server**: If using VS Code, install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

4. Open your browser and navigate to:
   - Simple method: `file:///path/to/your/index.html`
   - Local server: `http://localhost:8000`

## 📁 File Structure

```
GlowGirl.AI/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization

### Colors and Branding
The website uses a modern color scheme that can be easily customized:

- **Primary Colors**: Purple gradient (`#667eea` to `#764ba2`)
- **Accent Colors**: Gold (`#ffd89b`) and Blue (`#19547b`)
- **Text Colors**: Dark gray (`#1e293b`) and light gray (`#64748b`)

To change colors, edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffd89b;
    --text-dark: #1e293b;
    --text-light: #64748b;
}
```

### Content Updates
- **Text Content**: Edit the HTML in `index.html`
- **Images**: Replace placeholder content with your actual images
- **Contact Information**: Update email, phone, and address in the contact section

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Add any JavaScript functionality in `script.js`

## 🔧 Features Breakdown

### Navigation
- Fixed navigation bar with blur effect
- Smooth scrolling to sections
- Mobile-responsive hamburger menu
- Active state highlighting

### Hero Section
- Gradient background with animated elements
- Call-to-action buttons
- Floating card animation
- Typing effect on title

### Features Section
- Grid layout with hover effects
- Icon-based feature cards
- Smooth animations on scroll

### About Section
- Two-column layout
- Statistics display
- Animated placeholder image

### Contact Section
- Contact form with validation
- Contact information display
- Success/error notifications

### Footer
- Social media links
- Quick navigation
- Copyright information

## 📱 Mobile Responsiveness

The website is fully responsive and includes:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized typography for small screens
- Responsive grid layouts

## 🎯 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be deployed instantly
3. Get a custom domain or use the provided subdomain

### Vercel
1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Deploy automatically on every push
3. Get preview deployments for pull requests

## 🔍 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta tags for social sharing
- Alt text for images
- Proper heading hierarchy
- Fast loading times

## 🛠️ Development

### Adding New Features
1. **New Page**: Create a new HTML file and link it in navigation
2. **New Section**: Add HTML structure and corresponding CSS
3. **New Functionality**: Add JavaScript in `script.js`

### Code Organization
- **HTML**: Semantic structure with proper accessibility
- **CSS**: Modular styles with BEM-like naming
- **JavaScript**: Vanilla JS with modern ES6+ features

## 📞 Support

For questions or issues:
- Check the browser console for JavaScript errors
- Ensure all files are in the same directory
- Verify file permissions allow web server access

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**GlowGirl.AI** - Empowering beauty through artificial intelligence ✨ 