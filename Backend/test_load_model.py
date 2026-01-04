import joblib
m = joblib.load("ddos_model.pkl")
print("Loaded model:", type(m))
try:
    print("Model features count:", len(m.feature_names_in_))
except:
    print("Model has no feature_names_in_ attribute")
