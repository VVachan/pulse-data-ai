# local_test_predict.py
import joblib, pandas as pd, numpy as np, json, os

CSV = "Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv"
MODEL = "ddos_model.pkl"
SCALER = "minmax_scaler.pkl"
LABEL_ENCODER = "label_encoder.pkl"
METADATA = "model_metadata.pkl"

# 1) load CSV
if not os.path.exists(CSV):
    raise SystemExit(f"CSV not found at {CSV} - put it in Backend folder")

df = pd.read_csv(CSV)
# find a DDoS row (case-insensitive)
ddos_rows = df[df.columns[df.columns.str.lower().str.contains('label')][0]] if any(df.columns.str.lower().str.contains('label')) else None

# safer selection:
label_col = None
for c in df.columns:
    if "label" in str(c).lower() or "attack" in str(c).lower() or "class" in str(c).lower():
        label_col = c
        break
if label_col is None:
    raise SystemExit("Label column not found in CSV")

ddos_df = df[df[label_col].astype(str).str.upper().str.contains("DDOS")]
if ddos_df.shape[0] == 0:
    raise SystemExit("No DDoS rows found in CSV (no 'DDoS' in label).")

row = ddos_df.iloc[0]   # pick first DDoS example
print("Using DDoS sample index:", row.name)

# 2) prepare features (drop label)
X = row.drop(labels=[label_col]).to_frame().T

# convert numeric where possible
X = X.apply(pd.to_numeric, errors='coerce').fillna(0)

# 3) load model + optional scaler + metadata + label encoder
model = joblib.load(MODEL)
scaler = joblib.load(SCALER) if os.path.exists(SCALER) else None
label_encoder = joblib.load(LABEL_ENCODER) if os.path.exists(LABEL_ENCODER) else None
meta = joblib.load(METADATA) if os.path.exists(METADATA) else None

# 4) align columns if metadata exists
if meta and "feature_names" in meta:
    feature_names = meta["feature_names"]
    for c in feature_names:
        if c not in X.columns:
            X[c] = 0
    X = X[feature_names]
else:
    # try to use model.feature_names_in_ if present
    if hasattr(model, "feature_names_in_"):
        feature_names = list(model.feature_names_in_)
        for c in feature_names:
            if c not in X.columns:
                X[c] = 0
        X = X[feature_names]
    else:
        # fallback: use the columns we have (model may accept this if trained same order)
        pass

# 5) scale if scaler exists
if scaler is not None:
    X_proc = scaler.transform(X)
else:
    X_proc = X.values

# 6) predict
pred = model.predict(X_proc)
probs = None
if hasattr(model, "predict_proba"):
    probs = model.predict_proba(X_proc)

# decode label if encoder exists
if label_encoder is not None:
    pred_label = label_encoder.inverse_transform(pred)[0]
else:
    pred_label = str(pred[0])

print("Prediction:", pred_label)
if probs is not None:
    # show probabilities for top classes if label encoder exists
    if label_encoder is not None:
        classes = label_encoder.inverse_transform(np.arange(len(probs[0])))
        print("Probabilities:", dict(zip(classes, probs[0].round(4))))
    else:
        print("Probabilities (raw):", probs[0].round(4))

# print the sample a bit (short)
print("\nSample features (first 10):")
print(X.iloc[0].head(10).to_dict())
