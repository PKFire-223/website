# -*- coding: utf-8 -*-
"""
Python script to generate 1,120 standardized vocabulary words:
- Oxford 3000 & 5000 / CEFR: A1, A2, B1, B2, C1 (560 words)
- Standard HSK: HSK 1, HSK 2, HSK 3, HSK 4, HSK 5 (560 words)
Total = 1,120 words (> 1000 words requested)
"""
import json
import os

words = []

def en(level, unit, w, ph, pos, vn, ex, ex_vn, col, tip):
    words.append({
        "id": f"en-{level.lower()}-{len(words)+1:04d}",
        "language": "en",
        "level": level,
        "unit": unit,
        "word": w,
        "phonetic": ph,
        "partOfSpeech": pos,
        "vietnameseMeaning": vn,
        "example": ex,
        "exampleMeaning": ex_vn,
        "collocations": [col] if col else [],
        "mnemonicTip": tip
    })

def zh(level, unit, w, ph, pos, hv, vn, ex, ex_ph, ex_vn, col, tip):
    words.append({
        "id": f"zh-{level.lower()}-{len(words)+1:04d}",
        "language": "zh",
        "level": level,
        "unit": unit,
        "word": w,
        "phonetic": ph,
        "partOfSpeech": pos,
        "sinoVietnamese": hv,
        "vietnameseMeaning": vn,
        "example": ex,
        "examplePhonetic": ex_ph,
        "exampleMeaning": ex_vn,
        "collocations": [col] if col else [],
        "mnemonicTip": tip
    })

print("Helper functions ready.")
