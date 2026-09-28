# -*- coding: utf-8 -*-
"""
Master Vocab Dataset Builder: 1,120 items
Generates src/data/vocabData.ts
"""
import json
import os

all_words = []

def add_en(lvl, unit, w, ph, pos, vn, ex, ex_vn, col, tip):
    all_words.append({
        "id": f"en-{lvl.lower()}-{len(all_words)+1:04d}",
        "language": "en",
        "level": lvl,
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

def add_zh(lvl, unit, w, ph, pos, hv, vn, ex, ex_ph, ex_vn, col, tip):
    all_words.append({
        "id": f"zh-{lvl.lower()}-{len(all_words)+1:04d}",
        "language": "zh",
        "level": lvl,
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

print("Writing datasets...")
