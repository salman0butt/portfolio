# 🎨 Customization Guide

This guide will help you personalize your portfolio website with your own information.

## 🔧 Quick Start Checklist

### 1. Hero Section ([components/Hero.tsx](components/Hero.tsx))

Replace placeholder content with your information:

```typescript
// Line 46: Update your name
<span className="gradient-text">Salman</span>  // Change to your name

// Line 47: Update your title
<span>Full-Stack Developer</span>  // Change to your title

// Line 54-56: Update your tagline
Building scalable, elegant web applications using{' '}
<span className="text-purple-500 font-semibold">Next.js</span>,{' '}
<span className="text-purple-500 font-semibold">Nest.js</span>, and{' '}
<span className="text-purple-500 font-semibold">AWS</span>.

// Lines 77-109: Update social media links
href="https://github.com/yourusername"
href="https://linkedin.com/in/yourusername"
href="https://twitter.com/yourusername"
href="mailto:your.email@example.com"
```

**Add Your Profile Image:**
1. Add your image to the `public` folder (e.g., `profile.jpg`)
2. Replace the placeholder div (lines 121-126) with:
```typescript
<Image
  src="/profile.jpg"
  alt="Your Name"
  fill
  className="object-cover"
/>
```
3. Import Image: `import Image from 'next/image';`

---

### 2. About Section ([components/About.tsx](components/About.tsx))

**Update Philosophy and Description (Lines 59-74):**
```typescript
<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
  Your philosophy here...
</p>
```

**Customize Skills (Lines 8-24):**
```typescript
const skills = [
  {
    category: 'Your Category',
    icon: Code2,  // Choose from lucide-react icons
    technologies: ['Tech1', 'Tech2', 'Tech3']
  },
  // Add more skill categories...
];
```

**Update Statistics (Lines 148-152):**
```typescript
{ label: 'Years Experience', value: '5+' },
{ label: 'Projects Completed', value: '50+' },
// Update with your actual stats
```

---

### 3. Projects Section ([components/Projects.tsx](components/Projects.tsx))

**Replace Projects (Lines 7-75):**

```typescript
const projects = [
  {
    title: 'Your Project Title',
    description: 'Detailed description of your project...',
    image: '/your-project-image.jpg',  // Add image to public folder
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://your-project-live-url.com',
    githubUrl: 'https://github.com/yourusername/project',
    highlights: ['Key achievement 1', 'Key achievement 2', 'Key achievement 3']
  },
  // Add 4-6 of your best projects
];
```

**Tips for Project Images:**
- Use high-quality screenshots (1200x630px recommended)
- Save images in `public` folder
- Optimize images before uploading (use tools like TinyPNG)

---

### 4. Experience Section ([components/Experience.tsx](components/Experience.tsx))

**Update Work Experience (Lines 7-39):**

```typescript
const experiences = [
  {
    title: 'Your Job Title',
    company: 'Company Name',
    period: '2022 - Present',
    description: 'Brief description of your role...',
    achievements: [
      'Achievement 1 with metrics',
      'Achievement 2 with metrics',
      'Achievement 3 with metrics'
    ]
  },
  // Add all your relevant experience
];
```

**Update Achievements/Certifications (Lines 41-60):**

```typescript
const achievements = [
  {
    title: 'Your Certification/Award',
    organization: 'Issuing Organization',
    year: '2023',
    icon: Award  // Choose from lucide-react icons
  },
  // Add more achievements
];
```

---

### 5. Contact Section ([components/Contact.tsx](components/Contact.tsx))

**Update Contact Information (Lines 88-116):**

```typescript
// Email (Line 91)
href="mailto:your.email@example.com"
your.email@example.com

// Phone (Line 104)
href="tel:+1234567890"
+1 (234) 567-890

// Location (Line 123)
San Francisco, CA  // Change to your location

// Social Links (Lines 137-159)
href="https://github.com/yourusername"
href="https://linkedin.com/in/yourusername"
href="https://twitter.com/yourusername"
```

**Configure Form Submission:**

The contact form currently has a mock submission. To make it work:

**Option 1: EmailJS (Recommended for static sites)**

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Install: `npm install @emailjs/browser`
3. Update the `handleSubmit` function in `components/Contact.tsx`

**Option 2: Formspree**

1. Sign up at [Formspree](https://formspree.io/)
2. Add your form endpoint to the form action

---

### 6. Navigation & Footer

**Update Navbar ([components/Navbar.tsx](components/Navbar.tsx)):**

```typescript
// Line 50: Update your brand/logo
Salman.dev  // Change to your branding
```

**Update Footer ([components/Footer.tsx](components/Footer.tsx)):**

```typescript
// Line 16: Update copyright
© {currentYear} Salman. All rights reserved.  // Change to your name
```

---

### 7. SEO & Metadata ([app/layout.tsx](app/layout.tsx))

**Update Lines 15-42:**

```typescript
export const metadata: Metadata = {
  title: "Your Name - Full-Stack Developer | Your Skills",
  description: "Your professional description...",
  keywords: "Your keywords, separated, by commas",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - Full-Stack Developer Portfolio",
    description: "Your tagline...",
    url: "https://yourusername.github.io/portfolio",
    images: [
      {
        url: "/og-image.png",  // Create a 1200x630px image
        width: 1200,
        height: 630,
        alt: "Your Name - Full-Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Full-Stack Developer",
    description: "Your tagline...",
    images: ["/og-image.png"]
  }
};
```

---

### 8. Add Resume & Assets

**Resume:**
1. Export your resume as PDF
2. Save as `public/resume.pdf`
3. It will automatically work with the download button

**Favicon:**
1. Create a favicon (16x16px and 32x32px)
2. Save as `public/favicon.ico`

**OG Image:**
1. Create a 1200x630px image for social sharing
2. Save as `public/og-image.png`

---

## 🎨 Styling & Theme

### Change Color Scheme ([app/globals.css](app/globals.css))

```css
:root {
  --purple-primary: #8b5cf6;     /* Main color */
  --purple-secondary: #a78bfa;   /* Secondary color */
  --purple-light: #ede9fe;       /* Light accent */
}
```

Try these alternatives:
- **Blue:** `#3b82f6`, `#60a5fa`, `#dbeafe`
- **Green:** `#10b981`, `#34d399`, `#d1fae5`
- **Pink:** `#ec4899`, `#f472b6`, `#fce7f3`
- **Orange:** `#f59e0b`, `#fbbf24`, `#fef3c7`

### Typography

The site uses Inter and Space Grotesk fonts. To change:

```typescript
// In app/layout.tsx
import { Your_Font } from "next/font/google";

const yourFont = Your_Font({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

---

## 📊 Analytics (Optional)

### Google Analytics

1. Get your GA4 measurement ID from Google Analytics
2. Add to `app/layout.tsx` in the `<head>`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

---

## ✅ Final Checklist

Before deploying, make sure you've:

- [ ] Updated all personal information (name, email, phone)
- [ ] Added your profile photo
- [ ] Customized all sections with your content
- [ ] Added real projects with images and links
- [ ] Updated work experience and achievements
- [ ] Configured contact form
- [ ] Added resume PDF
- [ ] Updated SEO metadata
- [ ] Created and added OG image
- [ ] Updated social media links
- [ ] Changed color scheme (if desired)
- [ ] Tested on mobile devices
- [ ] Tested dark/light mode
- [ ] Run `npm run build` successfully

---

## 🚀 Ready to Deploy?

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions!

## 💡 Need Help?

If you get stuck:
1. Check the component file comments
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Check browser console for errors
4. Run `npm run build` to catch issues early

---

**Good luck with your portfolio! 🎉**
