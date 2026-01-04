# train_model.py  — robust version (overwrite your old file with this)
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
import joblib
import os

CSV_PATH = "Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv"
OUT_MODEL = "ddos_model.pkl"
OUT_SCALER = "minmax_scaler.pkl"
OUT_LABEL_ENCODER = "label_encoder.pkl"

print("Loading CSV:", CSV_PATH)
if not os.path.exists(CSV_PATH):
    raise SystemExit(f"CSV file not found at {CSV_PATH} — put the file into the Backend folder.")

df = pd.read_csv(CSV_PATH)
print("Columns found:", len(df.columns))

# quick sanity print
print("First 3 rows (head):")
print(df.head(3))

# Replace infinities and drop rows with missing values
df = df.replace([np.inf, -np.inf], np.nan)
df = df.dropna()
print("After dropping NaN/inf, rows:", df.shape[0])

# Try to find label column automatically
label_col = None
for c in df.columns:
    name = str(c).lower()
    if "label" in name or "attack" in name or "class" in name:
        label_col = c
        break

if label_col is None:
    raise SystemExit("Label column not found. Open CSV and check column names.")

print(f"Using target column: '{label_col}'")

# Prepare X and y
X = df.drop(columns=[label_col])
y = df[label_col]

# If dataset is huge, optionally downsample for training (uncomment to enable)
MAX_ROWS = 100000  # change this if you want more/less
if X.shape[0] > MAX_ROWS:
    print(f"Dataset large ({X.shape[0]} rows). Sampling {MAX_ROWS} rows for faster training.")
    sample_idx = np.random.RandomState(1).choice(X.index, size=MAX_ROWS, replace=False)
    X = X.loc[sample_idx].reset_index(drop=True)
    y = y.loc[sample_idx].reset_index(drop=True)

# Convert features to numeric where possible, fill remaining NaN with 0
X = X.apply(pd.to_numeric, errors="coerce")
X = X.fillna(0)

# Save feature names for later (useful in API)
feature_names = list(X.columns)
print("Number of features used:", len(feature_names))

# Scale features (MinMax) and save scaler
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)
joblib.dump(scaler, OUT_SCALER)
print("Saved scaler to", OUT_SCALER)

# Encode labels if they are strings
label_encoder = None
if y.dtype == object or y.dtype.name == "category":
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y.astype(str))
    joblib.dump(label_encoder, OUT_LABEL_ENCODER)
    print("Saved label encoder to", OUT_LABEL_ENCODER)
else:
    y_encoded = y.values

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded if len(np.unique(y_encoded))>1 else None
)
print("Train shape:", X_train.shape, "Test shape:", X_test.shape)
# random forest
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("Model training completed.")

# Save model
joblib.dump(model, OUT_MODEL)
print("Saved model to", OUT_MODEL)

# Optional: print basic accuracy on test set
acc = model.score(X_test, y_test)
print(f"Test accuracy (approx): {acc:.4f}")

# Save a small metadata file (feature names + whether labels were encoded)
meta = {
    "feature_names": feature_names,
    "label_encoded": label_encoder is not None,
    "label_classes": label_encoder.classes_.tolist() if label_encoder is not None else None
}
joblib.dump(meta, "model_metadata.pkl")
print("Saved model metadata to model_metadata.pkl")

print("\n✅ Done. You can now use ddos_model.pkl, minmax_scaler.pkl, label_encoder.pkl (if created) in your backend.")

