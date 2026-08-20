# NextEdge Research Scheme

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive Design](https://img.shields.io/badge/Design-Responsive-brightgreen)](#)

> **Empowering early researchers and food scientists across Africa to solve real-world challenges through research grants, mentorship, training, and community outreach.**

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Project Architecture & File Structure](#-project-architecture--file-structure)
- [Pages Overview](#-pages-overview)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Interactive Features & JavaScript](#-interactive-features--javascript)
- [Styling & Design System](#-styling--design-system)
- [Contributing](#-contributing)
- [License](#-license)

---

## 💡 About The Project

**NextEdge Research Scheme** is a modern, responsive web application dedicated to supporting student researchers and early-career food scientists. The platform serves as an operational hub connecting emerging scholars with world-class mentorship, research funding, hands-on laboratory training, and community-driven projects.

Designed with a clean, accessible aesthetic and built entirely using pure vanilla web technologies, NextEdge offers a seamless browsing experience across all devices.

---

## ✨ Key Features

- **🎨 Modern & Engaging UI**: Custom color palettes, subtle micro-animations, sleek cards, and glassmorphism elements.
- **📱 Fully Responsive**: Optimized layouts for desktops, tablets, and mobile devices with a slide-out navigation menu.
- **🎠 Interactive Photo Band Carousel**: Auto-sliding stepped carousel featuring key program moments, pausing automatically on user hover/touch.
- **📊 Animated Impact Counters**: Smooth number counter animations triggered upon scrolling into view using the `IntersectionObserver` API.
- **📅 Events & Program Listings**: Structured displays for workshops, webinars, research grants, and mentorship opportunities.
- **✉️ Interactive Contact & Donation Portals**: Form validation feedback and user interactions built into contact and newsletter subscription sections.
- **⚡ Zero External Dependencies**: Built using vanilla HTML5, CSS3, and JavaScript without heavyweight framework dependencies for maximum performance and speed.

---

## 📁 Project Architecture & File Structure

```
nextedge_demo/
├── index.html            # Main Landing Page
├── programs.html         # Programs & Offerings Page
├── events.html           # Events & Workshops Page
├── about.html            # About Us, Mission & Leadership Page
├── contact.html          # Contact & Donation Page
├── css/
│   ├── style.css         # Global styles, variables, typography, navigation & footer
│   ├── home.css          # Homepage-specific styling & hero design
│   ├── programs.css      # Program page layout & card styles
│   ├── events.css        # Events section layout & filter styling
│   ├── about.css         # Mission, vision & team layout styles
│   └── contact.css       # Form, modal, and contact card styles
├── js/
│   ├── main.js           # Shared interactive scripts (Navbar, Mobile Menu, Counters, Carousel)
│   ├── programs.js       # Program filtering & interactive tab handling
│   └── events.js         # Event filtering & registration modal handling
└── images/               # Scalable SVG graphics & optimized visual assets
```

---

## 🌐 Pages Overview

1. **Home (`index.html`)**: Features the hero banner, interactive photo band carousel, core program cards, live impact counters, upcoming event spotlight, and newsletter subscription form.
2. **Programs (`programs.html`)**: Details available opportunities including Research Grants, 1-on-1 Mentorship, Lab Training, and Community Projects with application guidelines.
3. **Events (`events.html`)**: Displays upcoming workshops, webinars, and past event archives with filtering options and event registration triggers.
4. **About Us (`about.html`)**: Explores the story behind NextEdge, core values, organizational pillars, and leadership team.
5. **Contact (`contact.html`)**: Direct channel for inquiries, location maps, frequently asked questions, and donation options.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic elements, accessible ARIA attributes, and open-graph meta tags.
- **CSS3**: Vanilla CSS utilizing CSS custom properties (variables), Flexbox, CSS Grid, media queries, and smooth transitions.
- **JavaScript (ES6+)**: Modular standard JS for DOM manipulation, event handling, and `IntersectionObserver` API integration.

---

## 🚀 Getting Started

### Prerequisites

No complex build tools, package managers, or compilers are required to run this project. You only need a standard web browser.

### Local Installation & Running

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Rikawesome/nextedge_demo.git
   cd nextedge_demo
   ```

2. **Open in Browser**:
   - Double-click `index.html` to open it directly in your web browser.
   - *Or* run a simple local web server:

   **Python 3**:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

   **Node.js (`npx serve`)**:
   ```bash
   npx serve .
   ```

---

## ⚡ Interactive Features & JavaScript

- **Navbar Scroll Effect**: Automatically toggles shadow styling on scroll.
- **Mobile Menu Toggle**: Responsive slide-out menu with smooth hamburger icon animations.
- **Number Counter Animation**: Custom ease-out quad animation algorithm triggered when counter elements enter the viewport.
- **Stepped Photo Carousel**: Center-aligned automatic sliding carousel with recalculation on viewport resize and pause-on-hover logic.

---

## 🎨 Styling & Design System

The global stylesheet (`css/style.css`) defines primary design tokens:

```css
:root {
  --primary-color: #0F172A;
  --accent-color: #EA580C;
  --text-main: #334155;
  --bg-light: #F8FAFC;
  /* CSS Variables for colors, spacing, and transitions */
}
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the site or add new features:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
