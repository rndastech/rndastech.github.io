# OS-Style Portfolio Website

A modern, interactive portfolio website designed like an operating system desktop interface. Built with React and Vite for optimal performance and user experience.

## ✨ Features

- **OS-Style Desktop Interface** - Complete with desktop icons, taskbar, and windows
- **Window Management** - Drag, resize, minimize, maximize, and close windows
- **Interactive Applications** - Portfolio sections presented as desktop applications
- **Weather Widget** - Live weather data for Kolkata, India in the taskbar
- **Smooth Animations** - Modern transitions and hover effects
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Real-time Clock** - Live time and date in the taskbar

## 🚀 Applications

- **👨‍💻 About Me** - Personal introduction and professional highlights
- **💼 Projects** - Showcase of development work and technical capabilities
- **🛠️ Skills** - Technical expertise and proficiency levels
- **📧 Contact** - Get in touch form and contact information
- **📄 Resume** - Professional experience and achievements

## 🛠️ Technologies Used

- **React** - Frontend framework for building the user interface
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with animations and transitions
- **JavaScript ES6+** - Modern JavaScript features
- **CSS Grid & Flexbox** - Responsive layout systems

## 🎨 Design Features

- **Glassmorphism Effects** - Beautiful translucent windows with backdrop blur
- **Gradient Backgrounds** - Dynamic animated background gradients
- **Modern UI Components** - Clean, professional interface elements
- **Accessibility** - ARIA labels and keyboard navigation support
- **Performance Optimized** - Smooth 60fps animations and interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/os-portfolio.git
   cd os-portfolio
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5174`

**Note:** The weather widget uses the free Open-Meteo API (no API key required) and automatically shows live weather data for Kolkata, India.

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The build files will be generated in the \`dist\` directory.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Usage

1. **Desktop Icons** - Double-click any desktop icon to open an application
2. **Window Management** - Drag windows around, resize them, or use the control buttons
3. **Taskbar** - Click on taskbar items to restore minimized windows
4. **Start Button** - Quick access to applications

## 🔧 Customization

The portfolio is designed to be easily customizable:

- Update personal information in the app components (\`src/components/apps/\`)
- Modify colors and styling in the CSS files
- Add new applications by creating new components
- Customize desktop icons and their positions

## 📄 Project Structure

\`\`\`
src/
├── components/
│   ├── apps/           # Portfolio application components
│   ├── Desktop.jsx     # Main desktop interface
│   ├── Window.jsx      # Window management component
│   ├── Taskbar.jsx     # Bottom taskbar component
│   ├── DesktopIcon.jsx # Desktop icon component
│   └── WindowContent.jsx # Window content router
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
\`\`\`

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern operating system interfaces
- Icons and emojis for visual elements
- React community for excellent documentation and resources

## 📞 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/os-portfolio](https://github.com/yourusername/os-portfolio)

---

Made with ❤️ and React+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
