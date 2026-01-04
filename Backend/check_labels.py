import pandas as pd

df = pd.read_csv("Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv")

# find the label column
label_col = None
for c in df.columns:
    if "label" in c.lower() or "attack" in c.lower() or "class" in c.lower():
        label_col = c
        break

print("Label column:", label_col)
print("Unique values:", df[label_col].unique()[:10])
