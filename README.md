# SnapSolve - Your AI-Powered Study Assistant

<!-- ![SnapSolve Logo](./frontend/src/assets/logo.png) -->

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://snap-solve-ecodejr.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## 📚 Overview

SnapSolve is an intelligent educational platform that combines AI-powered tools to enhance learning experiences. Whether you're studying complex topics, solving math problems, or analyzing text, SnapSolve provides comprehensive assistance through multiple features.

### Key Features

- 📸 **Image Analysis**: Upload images of problems or text for instant analysis
- 💬 **AI Chat**: Engage with our AI tutor for detailed explanations
- 📖 **Study Guide Generation**: Create comprehensive study materials
- 📝 **Text Analysis**: Get in-depth analysis of written content

## 🚀 Live Demo

Experience SnapSolve in action: [Live Demo](https://snap-solve-ecodejr.vercel.app)

## 🛠️ Technologies Used

- **Frontend**:
  - React.js
  - TailwindCSS
  - Axios
  - React Router

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Google AI API

## 🏗️ Project Structure

```
SnapSolve/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── utils/        # Utility functions
│   └── public/           # Static files
└── backend/              # Node.js backend server
    ├── routes/          # API routes
    ├── ai/             # AI integration
    └── db/             # Database configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Google AI API Key
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/EcodeJR/snapsolve.git
cd snapsolve
```

2. **Set up the backend**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=8080
MONGODB_URI=your_mongodb_uri
AI_API_KEY=your_google_ai_api_key
JWT_SECRET_KEY=your_jwt_secret
```

3. **Set up the frontend**
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_NODE_ENV=development
VITE_API_URL_DEV=http://localhost:8080
VITE_API_URL_PROD=your_production_api_url
```

### Running the Application

1. **Start the backend server**
```bash
cd backend
npm run dev
```

2. **Start the frontend development server**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Contact

EcodeJR - [@EcodeJR](https://twitter.com/EcodeJR)

Project Link: [https://github.com/EcodeJR/snapsolve](https://github.com/EcodeJR/snapsolve)

## 🙏 Acknowledgments

- [Google AI API](https://ai.google.dev/)
- [React.js](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- All contributors and supporters

---

Made with ❤️ by [EcodeJR](https://github.com/EcodeJR)