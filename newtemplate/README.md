# EliteStay – Next.js Hotel Booking Template

EliteStay is a modern and fully responsive Hotel Booking Template built with **Next.js, TypeScript, and Bootstrap**. It is designed for hotels, resorts, apartments, and accommodation businesses.

---

## 🚀 Tech Stack

- Next.js (App Router)
- TypeScript
- Bootstrap Grid System
- SCSS / CSS
- Next Image Optimization
- AOS Animations
- SEO Optimized Structure

---

## 📦 Installation

Download and extract the template package, then open the project folder in your terminal.

Install dependencies:

npm install

---

## ▶️ Run Development Server

npm run dev

Open your browser and visit:

[http://localhost:3000](http://localhost:3000)

---

## 🏗 Build for Production

npm run build
npm start

---

## 📁 Project Structure

app/ → Next.js app router pages and layouts
components/ → Reusable UI components
public/assets/ → Images, fonts, icons, static assets
styles/ → Global styles and custom CSS

---

## 🖼 Change Images

All images are stored inside:

public/assets/images/

To change an image, replace the file or update the path in the component:

src="/assets/images/your-image.jpg"

Always keep the leading slash.

---

## 📝 Edit Content

Page content can be edited inside:

app/(pages)/page-name/page.tsx

Sections are component-based, so you can edit content inside:

components/sections/

---

## 🎨 Styling

Template uses Bootstrap grid and custom CSS.
You can modify styles in:

styles/global.css
styles/components.css

---

## ⚙️ SEO Settings

Metadata is configured using Next.js metadata API.

Example:

export const metadata = {
title: "EliteStay – Hotel Booking Template",
description: "Modern hotel booking website template",
};

Update metadata inside each page file.

---

## 🧭 Sitemap & Robots

Static SEO files are included:

public/sitemap.xml
public/robots.txt

Update the domain URLs before deployment.

---

## 🚀 Deployment

You can deploy easily to:

- Vercel
- Netlify
- Any Node.js hosting
- cPanel Node environment

Build first:

npm run build

---

## 🧩 Customization

- Modular component structure
- Easy section enable/disable
- Replace images and text
- Update colors in CSS variables

---

## 📞 Support

Support is provided through the marketplace support tab.
Please do not include personal contact details inside the template files.

---

## 📄 License

This template is distributed under Envato licensing terms.
