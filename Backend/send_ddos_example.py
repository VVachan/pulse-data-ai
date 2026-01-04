# send_ddos_example.py
import pandas as pd
import requests
import joblib
import os
import json

CSV = "Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv"
API = "http://127.0.0.1:8000/predict"
META = "model_metadata.pkl"

# 1) Load CSV
if not os.path.exists(CSV):
    raise SystemExit(f"CSV not found at {CSV} - put the file in the Backend folder")

df = pd.read_csv(CSV)

# 2) Find label column and a DDoS sample row
label_col = None
for c in df.columns:
    lc = str(c).lower()
    if "label" in lc or "attack" in lc or "class" in lc:
        label_col = c
        break
if label_col is None:
    raise SystemExit("Label column not found in CSV")

ddos_df = df[df[label_col].astype(str).str.upper().str.contains("DDOS")]
if ddos_df.shape[0] == 0:
    raise SystemExit("No DDoS rows found in CSV")

row = ddos_df.iloc[0]  # pick first DDoS sample

# 3) Load metadata (expected feature names) if available
expected_features = None
if os.path.exists(META):
    try:
        meta = joblib.load(META)
        expected_features = meta.get("feature_names", None)
        print(f"Loaded metadata with {len(expected_features)} features")
    except Exception as e:
        print("Warning: failed to load metadata:", e)
        expected_features = None

# 4) Build payload using expected features (preferred) or CSV row columns (fallback)
if expected_features:
    payload = {}
    for feat in expected_features:
        # if the row has the column (exact name), use it, otherwise set 0
        if feat in row.index:
            val = row[feat]
            # convert pandas/numpy types to python native
            if pd.isna(val):
                payload[feat] = 0
            else:
                try:
                    payload[feat] = val.item()
                except Exception:
                    payload[feat] = val
        else:
            payload[feat] = 0
else:
    # fallback: use all columns from the row except label
    payload = {}
    for k, v in row.drop(labels=[label_col]).to_dict().items():
        if pd.isna(v):
            payload[k] = 0
        else:
            try:
                payload[k] = v.item()
            except Exception:
                payload[k] = v

# 5) Send to API
print("Sending payload with", len(payload), "fields to API ...")
resp = requests.post(API, json=payload)
print("Status:", resp.status_code)
print("Response body:")
try:
    print(json.dumps(resp.json(), indent=2))
except Exception:
    print(resp.text)
