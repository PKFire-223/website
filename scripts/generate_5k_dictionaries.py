# -*- coding: utf-8 -*-
"""
High-precision generator for 5,200+ English words (Oxford 3000/5000 & CEFR A1-C1)
and 5,200+ Chinese words (Official HSK 1-6 standard).
"""
import json
import os

print("Building 5,200+ English and 5,200+ Chinese datasets...")

# 1. Extensive English Base Lexicons by Level & Topic
ENGLISH_WORDS = []
CHINESE_WORDS = []

# To ensure exactly >= 5,200 per language, we define expansive topic-based modules.
