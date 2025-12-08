import csv
import json

csv_file = "truestate_assignment_dataset.csv"
json_file = "dataset.json"

data = []

with open(csv_file, encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Skip rows where all values are blank
        if not any(value.strip() for value in row.values()):
            continue
        data.append(row)

with open(json_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("JSON file created successfully!")
