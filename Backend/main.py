from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import csv
from datetime import datetime
import os
from typing import Dict, Any

# Initialize app
app = FastAPI(title="DDoS Detection API", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- load model + helpers if present ---
MODEL_P = "ddos_model.pkl"
META_P = "model_metadata.pkl"
SCALER_P = "minmax_scaler.pkl"
LABEL_ENCODER_P = "label_encoder.pkl"

model = None
expected_features = []
scaler = None
label_encoder = None
meta_label_classes = None

# load model
try:
    model = joblib.load(MODEL_P)
    print("✅ Model loaded:", MODEL_P)
except Exception as e:
    print("❌ Failed to load model:", e)
    model = None

# load metadata
if os.path.exists(META_P):
    try:
        meta = joblib.load(META_P)
        expected_features = meta.get("feature_names", [])
        meta_label_classes = meta.get("label_classes", None)
        print(f"✅ Loaded metadata ({len(expected_features)} features)")
    except Exception as e:
        print("⚠️ Failed to load metadata:", e)
        expected_features = []
else:
    expected_features = []

# load scaler
if os.path.exists(SCALER_P):
    try:
        scaler = joblib.load(SCALER_P)
        print("✅ Loaded scaler:", SCALER_P)
    except Exception as e:
        print("⚠️ Failed to load scaler:", e)
        scaler = None

# load label encoder
if os.path.exists(LABEL_ENCODER_P):
    try:
        label_encoder = joblib.load(LABEL_ENCODER_P)
        print("✅ Loaded label encoder:", LABEL_ENCODER_P)
    except Exception as e:
        print("⚠️ Failed to load label encoder:", e)
        label_encoder = None


@app.get("/")
def home():
    return {"message": "DDoS Detection API running!"}


@app.post("/predict")
def predict(data: Dict[str, Any]):
    """
    Accepts arbitrary JSON with feature names as keys.
    Example: {"Destination_Port":80, "Flow_Duration":1000, ...}
    """
    if model is None:
        return {"error": "Model not loaded"}

    # Build dataframe from incoming JSON
    try:
        df = pd.DataFrame([data])
    except Exception as e:
        return {"error": f"Invalid input JSON: {e}"}

    # Ensure column names exactly match metadata if metadata exists
    if expected_features:
        for col in expected_features:
            if col not in df.columns:
                df[col] = 0
        df = df[expected_features]
    elif hasattr(model, "feature_names_in_"):
        for col in model.feature_names_in_:
            if col not in df.columns:
                df[col] = 0
        df = df[list(model.feature_names_in_)]
    else:
        df = df.copy()

    # Convert to numeric (coerce non-numeric → NaN) then fill NaN with 0
    df = df.apply(pd.to_numeric, errors="coerce").fillna(0)

    # Apply scaler if available
    X = df
    if scaler is not None:
        try:
            X = pd.DataFrame(scaler.transform(df), columns=df.columns)
        except Exception as e:
            print("⚠️ Scaler transform failed:", e)
            X = df

    # Predict
    try:
        pred_num = model.predict(X)[0]
    except Exception as e:
        return {"error": f"Prediction failed: {e}"}

    # Probabilities if available
    prob_dict = {}
    if hasattr(model, "predict_proba"):
        try:
            probs = model.predict_proba(X)[0]
            if label_encoder is not None:
                classes = label_encoder.classes_.tolist()
                prob_dict = dict(zip(classes, [round(float(p), 4) for p in probs]))
            elif meta_label_classes is not None:
                prob_dict = dict(zip(meta_label_classes, [round(float(p), 4) for p in probs]))
            else:
                prob_dict = {str(i): round(float(p), 4) for i, p in enumerate(probs)}
        except Exception as e:
            print("⚠️ predict_proba failed:", e)
            prob_dict = {}

    # --- FIXED: robust label decoding ---
    try:
        if label_encoder is not None:
            label = label_encoder.inverse_transform([int(pred_num)])[0]
        elif meta_label_classes is not None and int(pred_num) < len(meta_label_classes):
            label = meta_label_classes[int(pred_num)]
        else:
            label = "DDoS Attack" if int(pred_num) == 1 else "BENIGN"
    except Exception as e:
        print("⚠️ Label decode failed:", e)
        label = "BENIGN" if int(pred_num) == 0 else "DDoS Attack"

    # Force uppercase check for detection
    alert = True if "DDOS" in label.upper() or "ATTACK" in label.upper() else False

    # Log prediction
    try:
        with open("predictions_log.csv", "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([datetime.now().isoformat(), data, label])
    except Exception as e:
        print("⚠️ Could not write log:", e)

    return {
        "prediction": label,
        "probabilities": prob_dict,
        "alert": alert,
        "status": "Prediction saved successfully ✅"
    }


@app.get("/features")
def features():
    if expected_features:
        return {"expected_features": expected_features}
    elif hasattr(model, "feature_names_in_"):
        return {"expected_features": list(model.feature_names_in_)}
    else:
        return {"message": "No feature metadata found"}
