import joblib

model = joblib.load("ddos_model.pkl")

print("✅ Model loaded successfully!")
print("Type of model:", type(model))
print("Model parameters:")
print(model.get_params())

try:
    print("\nFeature names:")
    print(model.feature_names_in_)
except AttributeError:
    print("\nNo feature_names_in_ attribute (normal for this model).")
