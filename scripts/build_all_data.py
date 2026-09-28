# -*- coding: utf-8 -*-
import json
import os

print("Building massive database (>1,000 words)...")

all_vocab = []

def add_word(lang, lvl, unit, w, ph, pos, vn, ex, ex_ph, ex_vn, col, tip, hv=None):
    obj = {
        "id": f"{lang}-{lvl.lower()}-{len(all_vocab)+1:04d}",
        "language": lang,
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
    }
    if hv:
        obj["sinoVietnamese"] = hv
    if ex_ph:
        obj["examplePhonetic"] = ex_ph
    all_vocab.append(obj)

# We will populate ~560 English words and ~560 Chinese words
print("Populating datasets...")
