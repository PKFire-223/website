# -*- coding: utf-8 -*-
import json
import os

words = []

# ==========================================
# HELPER TO ADD ENGLISH
# ==========================================
def add_en(level, unit, raw_list):
    for idx, item in enumerate(raw_list):
        word, phonetic, pos, vn_meaning, ex, ex_vn, colloc, tip = item
        words.append({
            "id": f"en-{level.lower()}-{len(words)+1:04d}",
            "language": "en",
            "level": level,
            "unit": unit,
            "word": word,
            "phonetic": phonetic,
            "partOfSpeech": pos,
            "vietnameseMeaning": vn_meaning,
            "example": ex,
            "exampleMeaning": ex_vn,
            "collocations": [colloc] if colloc else [],
            "mnemonicTip": tip or "Ghi nhớ qua ngữ cảnh và luyện phát âm đều đặn."
        })

# ==========================================
# HELPER TO ADD CHINESE
# ==========================================
def add_zh(level, unit, raw_list):
    for idx, item in enumerate(raw_list):
        word, pinyin, pos, han_viet, vn_meaning, ex, ex_pinyin, ex_vn, colloc, tip = item
        words.append({
            "id": f"zh-{level.lower()}-{len(words)+1:04d}",
            "language": "zh",
            "level": level,
            "unit": unit,
            "word": word,
            "phonetic": pinyin,
            "partOfSpeech": pos,
            "sinoVietnamese": han_viet,
            "vietnameseMeaning": vn_meaning,
            "example": ex,
            "examplePhonetic": ex_pinyin,
            "exampleMeaning": ex_vn,
            "collocations": [colloc] if colloc else [],
            "mnemonicTip": tip or f"Hán-Việt là '{han_viet}' tương đồng giúp bạn ghi nhớ nhanh."
        })

print("Helper ready.")
