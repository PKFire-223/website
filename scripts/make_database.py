# -*- coding: utf-8 -*-
import json
import os

print("Generating 1,120 items database...")
items = []

# --- 1. ENGLISH A1 (120) ---
# Load from scripts/en_a1.json
with open("scripts/en_a1.json", "r", encoding="utf-8") as f:
    items.extend(json.load(f))

# Let's generate A2, B1, B2, C1 and HSK1..5 programmatically with authentic data
print(f"Loaded {len(items)} items from A1.")
