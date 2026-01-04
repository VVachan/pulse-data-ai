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

---

## 🌐 Live Deployment

**🎉 Frontend is already deployed!** Visit here:

🔗 **[https://pulsedatagaurd.web.app/auth](https://pulsedatagaurd.web.app/auth)**

**Firebase Authentication Console:**
🔐 **[https://console.firebase.google.com/u/0/project/pulsedatagaurd/authentication/users](https://console.firebase.google.com/u/0/project/pulsedatagaurd/authentication/users)**

---

## 🚀 Clone & Run Locally (5 Minutes)

### For Your Friend - Just Do This:

```bash
# 1. Clone the repository
git clone https://github.com/VVachan/pulse-data-ai.git
cd pulse-data-ai

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

✅ **Done!** Open http://localhost:5173 in your browser

### To Make Login Work (Optional):

Create a `.env.local` file in the root directory with Firebase credentials:
```env
VITE_FIREBASE_API_KEY=AIzaSyB_KZ...
VITE_FIREBASE_AUTH_DOMAIN=pulsedatagaurd.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=pulsedatagaurd
VITE_FIREBASE_STORAGE_BUCKET=pulsedatagaurd.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

---

## 📋 What Works Out of the Box?

| Feature | Status |
|---------|--------|
| **Home / About / Privacy Pages** | ✅ Works |
| **UI & Design** | ✅ Works |
| **AI Chat Assistant** | ✅ Works |
| **Upload & Analysis Simulation** | ✅ Works |
| **PDF Download** | ✅ Works |
| **Login/Signup** | ⚠️ Needs .env.local |
| **DDoS API Backend** | ⚠️ Optional (pip install required) |

---

## 🔧 If You Want Backend (DDoS Prediction API)

```bash
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Train ML model
python train_model.py

# Start API server
python main.py
```

API will run on http://localhost:8000

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

## �️ Tech Stack

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

## 🔗 API Endpoints (Backend Optional)

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

## 🚀 Deployment

✅ **Already Deployed on Firebase Hosting!**

- **Live URL**: https://pulsedatagaurd.web.app/auth
- **Firebase Project**: https://console.firebase.google.com/u/0/project/pulsedatagaurd/authentication/users

To deploy your own version:
```bash
firebase deploy --only hosting
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
