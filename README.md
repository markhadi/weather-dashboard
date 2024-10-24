# ⛅ Weather Dashboard

A modern, responsive weather dashboard built with React and TypeScript that provides real-time weather information and forecasts.

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/React-18.x-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.x-blue)

[Live Demo](#) | [Report Bug](#) | [Request Feature](#)

![Weather Dashboard Preview](/api/placeholder/800/400)

## ✨ Features

- 🌡️ Real-time weather data display
- 📅 5-day weather forecast
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 🔍 Search history management
- ⚡ Smart API rate limiting
- 🎯 Interactive UI with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeather API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/markhadi/weather-dashboard.git
```

2. Install dependencies

```bash
cd weather-dashboard
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenWeather API key

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

## 🛠️ Built With

- **Frontend Framework**: [React](https://reactjs.org/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Weather Data**: [OpenWeather API](https://openweathermap.org/api)

## 📖 Project Structure

```
weather-dashboard/
├── src/
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── types/           # TypeScript type definitions
│   ├── lib/             # Utility functions
│   └── constants/       # Application constants
├── public/              # Static assets
└── ...config files
```

## 🎯 Core Features Breakdown

### Weather Display

- Current temperature and "feels like" temperature
- Humidity and wind information
- Weather condition with icon
- Detailed 5-day forecast

### User Interface

- Responsive design for all screen sizes
- Dark/Light theme toggle
- Interactive animations and transitions
- Loading states and error handling

### Search Functionality

- City search with history
- Recent searches management
- Rate limit monitoring

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:

- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop screens

## 🔧 Configuration

Environment variables required:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5
```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/weather-dashboard](https://github.com/yourusername/weather-dashboard)

## 🙏 Acknowledgments

- [OpenWeather API](https://openweathermap.org/api)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
