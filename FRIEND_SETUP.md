# 🚀 Clone & Run Locally - Friend's Guide

Hey! Here's what you need to do to run DataGuard locally after cloning:

## Step 1: Clone the Repository

```bash
git clone https://github.com/VVachan/pulse-data-ai.git
cd pulse-data-ai
```

## Step 2: Frontend Setup

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:5173)
npm run dev
```

✅ **Frontend will work immediately!**

## Step 3: Backend Setup (Optional for local testing)

The backend is needed if you want to test the DDoS prediction API locally. If you just want to use the web interface with Firebase, skip this.

```bash
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Train the ML model (generates .pkl files)
python train_model.py

# Start FastAPI server (runs on http://localhost:8000)
python main.py
```

## Step 4: Firebase Configuration (For Authentication)

This is **REQUIRED** for login/signup to work!

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or ask the owner for credentials
3. Create a `.env.local` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## ✅ What Will Work

| Feature | Status | Notes |
|---------|--------|-------|
| Home page | ✅ Yes | No login needed |
| About page | ✅ Yes | No login needed |
| Privacy page | ✅ Yes | No login needed |
| **Login/Signup** | ⚠️ Needs .env.local | Requires Firebase config |
| **Upload & Analysis** | ✅ Yes | Works with simulated analysis |
| **AI Assistant** | ✅ Yes | Chatbot works locally |
| **PDF Download** | ✅ Yes | Works locally |
| **DDoS API** | ⚠️ Optional | Requires backend running |

---

## 🔧 Troubleshooting

### **"Cannot find module 'firebase'"**
```bash
npm install
```

### **"Firebase config is not defined"**
Make sure you created `.env.local` file with Firebase credentials

### **"Backend connection failed"**
The backend is optional. Comment out API calls in `src/lib/analysis.ts` or skip backend setup.

### **"Python module not found"**
```bash
pip install -r Backend/requirements.txt
```

### **"Port 5173 already in use"**
```bash
npm run dev -- --port 3000
```

---

## 🎯 Quick Start (Frontend Only)

If you just want to see the app work:

```bash
git clone https://github.com/VVachan/pulse-data-ai.git
cd pulse-data-ai
npm install
npm run dev
```

Then open http://localhost:5173 in your browser!

---

**Questions?** Check the README.md or reach out! 🚀
