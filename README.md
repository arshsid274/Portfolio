# Portfolio Website

A modern, interactive portfolio website built with React and Three.js, featuring 3D animations, smooth scrolling, and responsive design.

## 🚀 Features

- **Interactive 3D Elements**: MacBook model with Three.js integration
- **Smooth Animations**: GSAP and Framer Motion powered transitions
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Performance Optimized**: Lazy loading and code splitting
- **3D Globe**: Interactive globe component using Cobe
- **Resume Download**: Direct PDF download functionality

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP, Framer Motion
- **Styling**: Tailwind CSS, CSS3
- **Icons**: FontAwesome, React Icons, Tabler Icons
- **Testing**: Vitest, React Testing Library
- **Deployment**: Vercel

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── Components/          # Reusable UI components
│   │   ├── ui/             # UI utility components
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── Macbook.jsx     # 3D MacBook model
│   │   └── ...
│   ├── constants/          # App constants and data
│   ├── utils/              # Utility functions
│   └── App.jsx             # Main application component
├── pages/                  # Page components
│   ├── Home.jsx
│   ├── Work.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   └── Contact.jsx
├── public/
│   ├── models/             # 3D model files
│   ├── tech/               # Technology icons
│   └── assets/             # Static assets
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🎨 Sections

- **Home**: Interactive 3D MacBook showcase with video content
- **Work**: Portfolio of projects and achievements
- **Skills**: Technical skills and technologies
- **Experience**: Professional experience and background
- **Contact**: Contact information and social links

## 🔧 Key Components

- **MacbookScroll**: Interactive 3D MacBook with scroll-based animations
- **InteractiveBackground**: Dynamic background effects
- **Globe**: 3D interactive globe component
- **Navbar**: Responsive navigation with smooth scrolling
- **ErrorBoundary**: Graceful error handling for 3D components

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎯 Performance Features

- Lazy loading for optimal performance
- Code splitting for faster initial load
- Optimized 3D models and textures
- Efficient asset loading
- Error boundaries for stability

## 🚀 Deployment

The project is configured for deployment on Vercel:

```bash
npm run build
```

Deploy to Vercel or your preferred hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- GitHub: [arshsid274](https://github.com/arshsid274)
- Twitter: [@arshsid274](https://twitter.com/arshsid274)

---

Built with ❤️ using React and Three.js