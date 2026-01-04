# DataGuard

🛡️ **AI-powered DDoS Detection & Secure Dataset Analysis Portal**

Detect and analyze DDoS attacks with machine learning precision. Upload CSV datasets, get instant AI-powered threat analysis, and download detailed reports.

## 🎯 Features

- ✅ **Real-time DDoS Detection** - ML-powered attack identification
- ✅ **Secure Upload** - Drag-and-drop CSV file analysis
- ✅ **AI Assistant** - 24/7 intelligent support chatbot
- ✅ **Analysis Reports** - Download results as PDF
- ✅ **Privacy-First** - Client-side processing, no permanent storage
- ✅ **Beautiful UI** - Cyber-themed interface with glassmorphism

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Python 3.8+ (for backend)

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
cd Backend

# Install Python dependencies
pip install fastapi uvicorn joblib pandas scikit-learn

# Train the ML model (optional)
python train_model.py

# Start the FastAPI server
python main.py
```

## 🔐 Firebase Configuration

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Create a `.env.local` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📁 Project Structure

```
pulse-data-ai/
├── src/              # React frontend
│   ├── components/   # UI components
│   ├── pages/        # Page components
│   ├── lib/          # Utilities & auth
│   └── App.tsx       # Main app
├── Backend/          # FastAPI server
│   ├── main.py       # API endpoints
│   ├── train_model.py # ML model training
│   └── *.csv         # Training datasets
├── public/           # Static assets
├── package.json      # Node dependencies
└── vite.config.ts    # Vite configuration
```

## 🔗 API Endpoints

### POST `/predict`
Analyze a dataset for DDoS attacks
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"Destination_Port":80, "Flow_Duration":1000, ...}'
```

### GET `/features`
Get expected feature names
```bash
curl http://localhost:8000/features
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **UI Framework**: shadcn/ui components
- **State Management**: TanStack React Query
- **Routing**: React Router v6
- **Authentication**: Firebase
- **Backend**: FastAPI (Python)
- **ML**: scikit-learn (Random Forest)
- **Charts**: Recharts
- **PDF Export**: jsPDF

## 📊 Model Details

- **Algorithm**: Random Forest Classifier
- **Training Data**: ISCX DDoS Dataset
- **Accuracy**: ~95%
- **Features**: Network traffic metrics
- **Output**: Binary classification + confidence scores

## 🚀 Deployment

### Vercel (Frontend)
```bash
npm run build
vercel --prod
```

### Firebase Hosting
```bash
firebase deploy
```

## 📜 License

MIT License - feel free to use this project for educational and commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues, questions, or suggestions, please open a GitHub issue or contact the team.

---

**Made with ❤️ for cybersecurity professionals and developers**
