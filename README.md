# 🚀 Full-Stack Developer Portfolio

A stunning, modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Designed to impress recruiters and hiring managers at top tech companies.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Modern & Elegant Design**: Purple-accented color scheme with glassmorphism effects
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards configured
- **Performance Focused**: Fast loading times and optimized assets
- **GitHub Pages Ready**: Configured for seamless deployment

## 📂 Sections

- **Hero Section**: Eye-catching introduction with animated background
- **About Section**: Skills showcase with tech stack display
- **Projects Section**: Featured work with live demos and GitHub links
- **Experience Section**: Professional timeline with achievements
- **Contact Section**: Working contact form with social links
- **Responsive Navbar**: Smooth navigation with mobile menu

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **Build Tool**: Next.js Static Export

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`):
   - Update name, title, and tagline
   - Add your profile image
   - Update social media links

2. **About Section** (`components/About.tsx`):
   - Customize your philosophy and skills
   - Update tech stack and statistics

3. **Projects Section** (`components/Projects.tsx`):
   - Add your projects with images, descriptions, and links
   - Update tech stack badges

4. **Experience Section** (`components/Experience.tsx`):
   - Add your work experience
   - Update achievements and certifications

5. **Contact Section** (`components/Contact.tsx`):
   - Update email, phone, and location
   - Configure EmailJS or API route for form submission

### Update Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --purple-primary: #8b5cf6;  /* Main purple */
  --purple-secondary: #a78bfa; /* Secondary purple */
  --purple-light: #ede9fe;     /* Light purple */
}
```

### Update Metadata

Edit `app/layout.tsx` to update SEO information:
- Page title
- Description
- Keywords
- Open Graph images
- Social media URLs

## 📦 Build for Production

Build the static site:

```bash
npm run build
```

The output will be in the `out` directory, ready for deployment.

## 🌐 Deployment to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Source: "GitHub Actions"
4. The workflow will automatically deploy on every push to `main`

### Method 2: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm install -g gh-pages
   gh-pages -d out
   ```

### Important Notes

- Update `basePath` in `next.config.ts` if your repository name is different from "portfolio"
- The `.github/workflows/deploy.yml` file is already configured
- Make sure GitHub Pages is enabled in your repository settings

## 📝 Customization Checklist

- [ ] Update personal name and branding in all components
- [ ] Add your profile photo to `public` folder
- [ ] Update social media links (GitHub, LinkedIn, Twitter)
- [ ] Add your actual projects with screenshots
- [ ] Update work experience and achievements
- [ ] Configure contact form (EmailJS or API route)
- [ ] Add your resume PDF to `public` folder
- [ ] Update SEO metadata in `app/layout.tsx`
- [ ] Replace repository name in `next.config.ts` basePath
- [ ] Update OG image for social sharing

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Contact

Feel free to reach out if you have any questions or suggestions!

---

**Made with ❤️ using Next.js**
