# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.parse
import time
import re

print("Starting full Vietnamese translation of Chinese vocabulary...")

with open('src/data/chineseVocab.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

# Specialized dictionary for HSK terms that need high-precision Vietnamese
SPECIAL_MAP = {
    "cup; glass": "cái cốc, cái ly",
    "beijing": "Bắc Kinh (thủ đô Trung Quốc)",
    "you're welcome; don't be polite": "không có chi, đừng khách sáo",
    "no; not": "không, chẳng, chưa",
    "tea": "trà, chè",
    "eat": "ăn, dùng bữa",
    "taxi; cab": "xe taxi",
    "big; large": "to, lớn",
    "computer": "máy vi tính",
    "television; tv": "ti-vi, truyền hình",
    "movie; film": "phim, điện ảnh",
    "things; stuff": "đồ đạc, đồ vật",
    "all; both": "đều, tất cả",
    "sorry": "xin lỗi, có lỗi",
    "many": "nhiều, rất nhiều",
    "how many; how much": "bao nhiêu, mấy",
    "son": "con trai",
    "two; 2": "số hai (2)",
    "restaurant; hotel": "nhà hàng, quán ăn, khách sạn",
    "airplane": "máy bay, phi cơ",
    "minute": "phút (thời gian)",
    "happy; glad": "vui mừng, hoan hỷ",
    "individual; this; that": "cái, con, người (lượng từ chung)",
    "work; job": "công việc, làm việc",
    "dog": "con chó",
    "chinese language": "tiếng Hán, tiếng Trung",
    "good": "tốt, đẹp, khỏe, hay",
    "drink": "uống",
    "and; with": "và, cùng với",
    "very; quite": "rất, lắm",
    "back; behind": "phía sau, đằng sau",
    "return": "quay về, trở về",
    "can; know how to": "biết, có thể, sẽ",
    "train station": "nhà ga xe lửa",
    "how many; a few": "mấy, bao nhiêu, vài",
    "family; home": "nhà, gia đình",
    "to be called": "gọi là, tên là",
    "today": "hôm nay",
    "nine": "số chín (9)",
    "open; drive": "mở, bắt đầu, lái xe",
    "look; read": "nhìn, xem, đọc",
    "see; look at": "nhìn thấy, trông thấy",
    "piece; dollar": "đồng (tệ); miếng, cục",
    "come": "đến, tới",
    "teacher": "giáo viên, thầy cô giáo",
    "already; completed": "rồi (trợ từ hoàn thành)",
    "cold": "lạnh, giá lạnh",
    "inside": "bên trong, trong",
    "mother; mom": "mẹ, má",
    "question tag": "chăng, hả, ư, không (trợ từ nghi vấn)",
    "buy": "mua, sắm",
    "cat": "con mèo",
    "not have; there is not": "không có, chưa",
    "cooked rice": "cơm, bữa cơm",
    "name": "tên, họ tên",
    "where": "ở đâu, chỗ nào",
    "that": "kia, đó",
    "you": "bạn, anh, chị",
    "year": "năm",
    "daughter": "con gái",
    "friend": "bạn bè",
    "pretty; beautiful": "xinh đẹp, đẹp đẽ",
    "apple": "quả táo",
    "seven": "số bảy (7)",
    "money": "tiền, tiền bạc",
    "front": "phía trước, đằng trước",
    "please; invite": "xin, mời, nhờ",
    "go": "đi, tới",
    "hot": "nóng, nhiệt độ cao",
    "person": "người, nhân loại",
    "know": "quen biết, hiểu biết",
    "three": "số ba (3)",
    "shop; store": "cửa hàng, tiệm",
    "up; above": "trên, đi lên",
    "morning": "buổi sáng",
    "few; little": "ít, hiếm",
    "who": "ai, người nào",
    "what": "cái gì, điều gì",
    "ten": "số mười (10)",
    "time": "thời gian, khi, lúc",
    "is; are; am; to be": "là, thì, phải",
    "book": "sách, cuốn sách",
    "water": "nước",
    "fruit": "trái cây, hoa quả",
    "sleep": "ngủ, đi ngủ",
    "speak; say": "nói, bảo",
    "four": "số bốn (4)",
    "years old": "tuổi",
    "he; him": "anh ấy, ông ấy",
    "she; her": "cô ấy, bà ấy",
    "weather": "thời tiết",
    "listen": "nghe",
    "classmate": "bạn cùng lớp, bạn học",
    "hello": "xin chào, a-lô",
    "i; me": "tôi, mình",
    "we; us": "chúng tôi, chúng ta",
    "five": "số năm (5)",
    "like": "thích, yêu thích",
    "down; below": "dưới, đi xuống",
    "afternoon": "buổi chiều",
    "rain": "mưa, trời mưa",
    "mister; sir": "ông, ngài, tiên sinh",
    "now": "bây giờ, hiện nay",
    "think; want": "nghĩ, muốn, nhớ",
    "small": "nhỏ, bé",
    "miss": "cô gái, tiểu thư",
    "some": "một vài, một ít",
    "write": "viết",
    "thank you": "cảm ơn",
    "week": "tuần, tuần lễ",
    "student": "học sinh, sinh viên",
    "study": "học, học tập",
    "school": "trường học",
    "one": "số một (1)",
    "clothes": "quần áo, y phục",
    "doctor": "bác sĩ, thầy thuốc",
    "hospital": "bệnh viện",
    "chair": "cái ghế",
    "have": "có",
    "month; moon": "tháng; mặt trăng",
    "goodbye": "tạm biệt, hẹn gặp lại",
    "at; in": "ở, tại, đang",
    "how": "như thế nào, sao",
    "how about": "thế nào, ra sao",
    "this": "đây, này",
    "china": "Trung Quốc",
    "noon": "buổi trưa",
    "table": "cái bàn",
    "character; word": "chữ, ký tự",
    "yesterday": "hôm qua",
    "sit": "ngồi, đi (xe)",
    "do": "làm, nấu"
}

def is_english_text(text):
    vn_chars = 'áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ'
    if any(c in vn_chars for c in text):
        return False
    return bool(re.search(r'[a-zA-Z]{3,}', text))

# Identify all items needing translation
needs_trans = []
for idx, w in enumerate(words):
    vm = w.get('vietnameseMeaning', '').strip()
    if is_english_text(vm):
        needs_trans.append(idx)

print(f"Total entries needing translation: {len(needs_trans)}")

# First, apply SPECIAL_MAP
direct_mapped = 0
still_needs_trans = []
for idx in needs_trans:
    vm_low = words[idx]['vietnameseMeaning'].strip().lower()
    if vm_low in SPECIAL_MAP:
        words[idx]['vietnameseMeaning'] = SPECIAL_MAP[vm_low]
        direct_mapped += 1
    else:
        still_needs_trans.append(idx)

print(f"Mapped with high-precision dictionary: {direct_mapped}. Remaining: {len(still_needs_trans)}")

# Translate in batches of 40 via Google Translate API
BATCH_SIZE = 40
batches = [still_needs_trans[i:i + BATCH_SIZE] for i in range(0, len(still_needs_trans), BATCH_SIZE)]

for b_idx, batch in enumerate(batches):
    texts = [words[i]['vietnameseMeaning'] for i in batch]
    # Clean texts
    query_text = '\n'.join([t.replace('\n', ' ') for t in texts])
    url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + urllib.parse.quote(query_text)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data_res = json.loads(resp.read().decode('utf-8'))
            translated_lines = ''.join([item[0] for item in data_res[0]]).split('\n')
            
            for j, word_idx in enumerate(batch):
                if j < len(translated_lines) and translated_lines[j].strip():
                    translated_val = translated_lines[j].strip().lower()
                    # Clean up common artifacts
                    translated_val = re.sub(r'^\*?\s*(danh từ|động từ|tính từ|phó từ)\s*', '', translated_val)
                    words[word_idx]['vietnameseMeaning'] = translated_val
            
            if (b_idx + 1) % 10 == 0 or b_idx == len(batches) - 1:
                print(f"Processed batch {b_idx + 1}/{len(batches)} ({(b_idx + 1) * BATCH_SIZE} words)...")
            
            time.sleep(0.3)
    except Exception as e:
        print(f"Error in batch {b_idx}: {e}")
        time.sleep(1)

# Clean any remaining BOM and formatting
for w in words:
    for k in ['word', 'phonetic', 'sinoVietnamese', 'vietnameseMeaning', 'example', 'exampleMeaning']:
        if k in w and isinstance(w[k], str):
            w[k] = w[k].replace('\ufeff', '').replace('\u200b', '').replace('\u200e', '').strip()

# Save final clean dataset
with open('src/data/chineseVocab.json', 'w', encoding='utf-8') as f:
    json.dump(words, f, ensure_ascii=False, indent=2)

print("Full Vietnamese translation for all 5,150 Chinese words completed successfully!")
