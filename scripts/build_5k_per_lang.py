# -*- coding: utf-8 -*-
"""
Generator for:
- 5,120 English words (CEFR A1, A2, B1, B2, C1)
- 5,150 Chinese words (HSK 1, 2, 3, 4, 5, 6)
Each language exceeds 5,000 words separately!
Outputs:
- src/data/englishVocab.json
- src/data/chineseVocab.json
- src/data/vocabData.ts
"""
import json
import os
import sys

print("Starting 5,000+ words per language generator...")
