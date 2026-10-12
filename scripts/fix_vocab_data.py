import json
import re
import urllib.request
import urllib.parse
import time
import os

print("=== STARTING VOCABULARY AUDIT & REPAIR SCRIPT ===")

# -------------------------------------------------------------
# 1. FIX ENGLISH VOCABULARY
# -------------------------------------------------------------
with open('src/data/englishVocab.json', 'r', encoding='utf-8') as f:
    en_vocab = json.load(f)

print(f"Loaded {len(en_vocab)} English words.")

# Curated high-precision dictionary for placeholder words
EN_FIX_DICT = {
    'blog': 'nhật ký trực tuyến, trang blog chia sẻ kiến thức',
    'bored': 'buồn chán, cảm thấy tẻ nhạt không có gì làm',
    'cannot': 'không thể, không có khả năng làm gì',
    'dvd': 'đĩa kỹ thuật số DVD lưu trữ video',
    'girlfriend': 'bạn gái, người yêu (nữ)',
    'grandparent': 'ông bà (ông nội, bà nội, ông ngoại, bà ngoại)',
    'website': 'trang web, cổng thông tin điện tử',
    'those': 'những cái đó, những người đó (chỉ số nhiều ở xa)',
    'based': 'dựa trên, căn cứ vào, có trụ sở tại',
    'got': 'đã nhận được, đã có được (quá khứ của get)',
    'co': 'viết tắt của công ty (Company), đồng hành',
    'went': 'đã đi (thì quá khứ của động từ go)',
    'located': 'nằm ở, tọa lạc tại, định vị vị trí',
    'led': 'đã dẫn dắt, dẫn đầu (quá khứ của lead); đèn LED',
    'www': 'mạng lưới toàn cầu (World Wide Web)',
    'italian': 'thuộc về nước Ý, tiếng Ý, người Ý',
    'app': 'ứng dụng phần mềm trên di động hoặc máy tính',
    'smartphone': 'điện thoại thông minh đa chức năng',
    'failed': 'thất bại, không thành công, hỏng hóc',
    'healthcare': 'dịch vụ chăm sóc sức khỏe, ngành y tế',
    'marketplace': 'thị trường buôn bán, sàn thương mại điện tử',
    'upcoming': 'sắp tới, chuẩn bị diễn ra',
    'regulatory': 'thuộc về quy định, quy chuẩn, điều tiết',
    'ongoing': 'đang diễn ra, đang tiếp tục tiến hành',
    'strongly': 'một cách mạnh mẽ, quyết liệt, sâu sắc',
    'ran': 'đã chạy, đã vận hành (quá khứ của run)',
    'amazed': 'kinh ngạc, hết sức sửng sốt trước điều kỳ diệu',
    'exclusively': 'dành riêng, độc quyền, chỉ duy nhất',
    'dm': 'tin nhắn trực tiếp (Direct Message) trên mạng xã hội',
    'gotten': 'đã nhận được, đã đạt được (quá khứ phân từ của get)',
    'lit': 'được thắp sáng (quá khứ của light); tuyệt vời, sôi động',
    'vocabulary': 'từ vựng, vốn từ ngữ, kho từ',
    'fundraising': 'hoạt động gây quỹ từ thiện, quyên góp vốn',
    'impressed': 'bị ấn tượng sâu sắc, cảm kích, khâm phục',
    'electro': 'thuộc về điện tử, dòng nhạc điện tử',
    'emotionally': 'về mặt cảm xúc, một cách xúc động',
    'shocked': 'bị chấn động, bàng hoàng, kinh ngạc tột độ',
    'mickey': 'chuột Mickey; tiếng lóng chỉ sự đùa cợt lố bịch',
    'hath': 'dạng cổ kính của has (ngôi thứ 3 số ít của have)',
    'eff': 'chữ cái F; tiếng lóng nói trại né tránh từ chửi thề',
    'allegedly': 'được cho là, bị cáo buộc là (chưa có bằng chứng)',
    'thrilled': 'vô cùng hào hứng, phấn khích tột độ',
    'clarinet': 'kèn clarinet (nhạc cụ hơi bằng gỗ)',
    'adc': 'bộ chuyển đổi tín hiệu tương tự sang số (ADC)',
    'ads': 'các mẩu quảng cáo (danh từ số nhiều của ad)',
    'usb': 'cổng kết nối USB, thiết bị nhớ USB lưu trữ dữ liệu',
    'gps': 'hệ thống định vị toàn cầu GPS qua vệ tinh',
    'rpg': 'trò chơi nhập vai điện tử (Role-Playing Game)',
    'jpeg': 'định dạng nén ảnh kỹ thuật số JPEG',
    'wav': 'định dạng tệp âm thanh không nén chuẩn WAV',
    'activex': 'công nghệ điều khiển phần mềm ActiveX của Microsoft',
    'eta': 'thời gian dự kiến đến nơi (Estimated Time of Arrival)',
    'heroin': 'chất ma túy gây nghiện heroin',
    'gigabyte': 'đơn vị đo dung lượng bộ nhớ Gigabyte (GB)',
    'sybase': 'hệ quản trị cơ sở dữ liệu quan hệ Sybase',
    'both': 'cả hai, cả người này lẫn người kia',
    'person': 'con người, một cá nhân',
    'piece': 'mảnh, mẩu, miếng, tác phẩm nghệ thuật',
    'she': 'cô ấy, bà ấy, chị ấy (đại từ nhân xưng giống cái)',
    'which': 'cái nào, điều nào, người nào trong số đã biết',
    'already': 'đã xong, đã diễn ra từ trước, rồi',
    'whether': 'liệu rằng có... hay không',
    'submit': 'nộp, đệ trình, chịu phục tùng',
    'rather': 'thà rằng, thích hơn, đúng hơn là',
    'award': 'trao thưởng, phần thưởng, giải thưởng danh giá',
    'otherwise': 'nếu không thì, bằng không; theo cách khác',
    'studio': 'xưởng phim, phòng thu âm, phòng làm việc nghệ sĩ',
    'nor': 'cũng không, và cũng không',
    'seem': 'có vẻ như, dường như, trông như thể',
    'neither': 'cả hai đều không, không cái nào trong hai',
    'shoulder': 'bờ vai; gánh vác trách nhiệm trên vai',
    'wildlife': 'động thực vật hoang dã, thiên nhiên tự nhiên',
    'dial': 'mặt đồng hồ số; quay số điện thoại, điều chỉnh đài',
    'apart': 'tách rời, riêng biệt; apart from: ngoại trừ',
    'excluding': 'ngoại trừ, không bao gồm trong danh sách',
    'annex': 'sáp nhập lãnh thổ, nhà phụ, phần phụ lục thêm vào',
    'freelance': 'làm việc tự do độc lập không thuộc biên chế cố định',
    'outfit': 'bộ trang phục đồng bộ; bộ dụng cụ trang bị',
    'propaganda': 'hoạt động tuyên truyền, tài liệu vận động tư tưởng',
    'descend': 'đi xuống, hạ xuống dốc; có nguồn gốc bắt nguồn từ',
    'ibid': 'ở cùng một chỗ, cùng nguồn tài liệu vừa trích dẫn',
    'whichever': 'bất cứ cái nào, cái nào tùy ý lựa chọn',
    'qos': 'chất lượng dịch vụ mạng máy tính (Quality of Service)',
    'toward': 'hướng về, về phía (dạng phổ biến trong tiếng Anh-Mỹ)',
    'towards': 'hướng về, về phía (dạng phổ biến trong tiếng Anh-Anh)',
    'arm': 'cánh tay của cơ thể',
    'arms': 'vũ khí, súng đạn (danh từ số nhiều)',
    'good': 'tốt, giỏi, hữu ích, lương thiện',
    'goods': 'hàng hóa, thương phẩm chuyên chở (danh từ số nhiều)',
    'thank': 'cảm ơn, bày tỏ lòng biết ơn',
    'thanks': 'lời cảm ơn, sự cảm tạ (danh từ số nhiều)',
    'content': 'nội dung, thông tin hàm chứa bên trong',
    'contents': 'mục lục, các thành phần chứa bên trong (số nhiều)',
    'cloth': 'mảnh vải, khăn lau bằng vải dệt',
    'clothes': 'quần áo, trang phục mặc hàng ngày (danh từ số nhiều)',
    'jean': 'vải bông chéo thô (chất liệu làm quần bò)',
    'jeans': 'quần bò, quần jean (danh từ số nhiều)',
    'custom': 'phong tục, tập quán, truyền thống lâu đời',
    'customs': 'cơ quan hải quan, thủ tục kiểm tra hải quan (số nhiều)',
    'premise': 'tiền đề, giả định làm cơ sở cho lập luận',
    'premises': 'khuôn viên, cơ sở mặt bằng kinh doanh (số nhiều)',
    'ethic': 'nguyên tắc đạo đức, chuẩn mực luân lý',
    'ethics': 'môn đạo đức học, hệ thống quy chuẩn đạo đức nghề nghiệp',
    'remain': 'còn lại, duy trì trạng thái, ở lại',
    'remains': 'tàn tích, di tích khảo cổ, hài cốt người quá cố (số nhiều)'
}

# Repair English words
for w in en_vocab:
    word_lower = w['word'].lower()
    
    # 1. Direct fix from dictionary
    if word_lower in EN_FIX_DICT:
        w['vietnameseMeaning'] = EN_FIX_DICT[word_lower]
    
    # 2. Fix .. in vietnameseMeaning
    m = w.get('vietnameseMeaning', '')
    if '..' in m:
        cleaned_m = re.sub(r'\.{2,}', '', m).strip()
        cleaned_m = re.sub(r',\s*,', ',', cleaned_m).strip(' ,;')
        w['vietnameseMeaning'] = cleaned_m if cleaned_m else EN_FIX_DICT.get(word_lower, m.replace('..', ''))
    
    # 3. Clean dummy sentence in English
    ex = w.get('example', '')
    if 'plays an important role in our daily life' in ex.lower():
        pos = w.get('partOfSpeech', 'noun').lower()
        word = w['word']
        meaning = w.get('vietnameseMeaning', '')
        if 'verb' in pos:
            w['example'] = f"Many people {word} carefully when working on important projects."
            w['exampleVi'] = f"Nhiều người {meaning.split(',')[0]} cẩn thận khi làm các dự án quan trọng."
        elif 'adj' in pos:
            w['example'] = f"This approach is very {word} and provides great results."
            w['exampleVi'] = f"Phương pháp này rất {meaning.split(',')[0]} và mang lại kết quả tuyệt vời."
        elif 'adv' in pos:
            w['example'] = f"The team completed the task {word} as planned."
            w['exampleVi'] = f"Đội ngũ đã hoàn thành nhiệm vụ một cách {meaning.split(',')[0]} như kế hoạch."
        else:
            w['example'] = f"We observed that the {word} was essential for the entire system."
            w['exampleVi'] = f"Chúng tôi nhận thấy rằng {meaning.split(',')[0]} là yếu tố cần thiết cho toàn bộ hệ thống."

with open('src/data/englishVocab.json', 'w', encoding='utf-8') as f:
    json.dump(en_vocab, f, ensure_ascii=False, indent=2)

print("English vocabulary cleaned and updated successfully!")

# -------------------------------------------------------------
# 2. FIX CHINESE VOCABULARY
# -------------------------------------------------------------
with open('src/data/chineseVocab.json', 'r', encoding='utf-8') as f:
    zh_vocab = json.load(f)

print(f"Loaded {len(zh_vocab)} Chinese words.")

# Curated High-frequency HSK Chinese dictionary fixes
ZH_MANUAL_DICT = {
    '大': 'to, lớn, rộng lớn',
    '出': 'ra ngoài, xuất hiện, phát sinh',
    '就': 'thì, liền, ngay, chính là',
    '快': 'nhanh chóng, sắp sửa, mau lên',
    '跑步': 'chạy bộ, tập chạy thể dục',
    '为什么': 'tại sao, vì sao, vì lý do gì',
    '一起': 'cùng nhau, cùng một nơi, đồng thời',
    '知道': 'biết, hiểu rõ, nắm bắt thông tin',
    '必须': 'phải, bắt buộc, nhất thiết phải',
    '不但': 'không những, không chỉ',
    '参加': 'tham gia, dự, góp mặt',
    '差': 'kém, thiếu, chênh lệch, sai biệt',
    '除了': 'ngoài ra, trừ ra, ngoại trừ',
    '复习': 'ôn tập, ôn lại bài học',
    '跟': 'cùng, với, đi theo; gót chân',
    '记得': 'nhớ, còn nhớ, ghi nhớ trong lòng',
    '经常': 'thường xuyên, hay, thường lệ',
    '请假': 'xin nghỉ phép, xin nghỉ học/làm',
    '为': 'vì, cho, để, vì lợi ích của',
    '才': 'mới, vừa mới, chỉ; tài năng',
    '终于': 'cuối cùng, rốt cuộc thì',
    '比如': 'ví dụ như, chẳng hạn như',
    '不管': 'bất kể, dù cho, cho dù thế nào',
    '不仅': 'không chỉ, không những',
    '参观': 'tham quan, đi thăm và chiêm ngưỡng',
    '可能': 'có thể, khả năng, có lẽ',
    '上班': 'đi làm, vào ca làm việc',
    '但是': 'nhưng, nhưng mà, tuy nhiên',
    '踢足球': 'đá bóng, chơi môn bóng đá',
    '因为': 'bởi vì, do vì nguyên nhân',
    '所以': 'cho nên, vì vậy, do đó',
    '正在': 'đang, đang trong lúc tiến hành',
    '左边': 'bên trái, phía bên trái',
    '城市': 'thành phố, đô thị',
    '词典': 'từ điển, sách tra cứu từ ngữ',
    '傻': 'ngốc nghếch, khờ dại, ngớ ngẩn',
    '凡是': 'phàm là, hễ là, bất cứ cái gì',
    '缺席': 'vắng mặt, không có mặt, nghỉ học/làm',
    '一丛': 'một bụi cây, một lùm cây nhỏ',
    '一万公尺': 'mười nghìn mét (10 km)',
    '一万的': 'mười nghìn, số lượng một vạn',
    '一下倾盆': 'mưa trút nước bất ngờ, mưa như xối',
    '一下子': 'trong chớp mắt, bỗng chốc, một thoáng',
    '一不做': 'đã không làm thì thôi (nhất bất tố)',
    '一丘之貉': 'cá mè một lứa, cùng một giuộc như nhau',
    '一丛柔毛': 'chùm lông tơ mềm mại',
    '一丝': 'một chút, một sợi, mảy may',
    '一丝不挂': 'không một mảnh vải che thân, trần truồng',
    '三叉体': 'vật thể ba chạc, hình ba nhánh',
    '下毒': 'bỏ độc, đầu độc, đánh thuốc độc',
    '不惊慌地': 'một cách bình tĩnh, không hề hoảng sợ',
    '不间断的': 'liên tục, không ngừng nghỉ, không gián đoạn',
    '难度': 'độ khó, mức độ khó khăn',
    '十分': 'vô cùng, rất, hết sức (mười phần)',
    '难道': 'chẳng lẽ, há lẽ nào, lẽ nào lại',
    '成立': 'thành lập, thiết lập, được công nhận',
    '创造': 'sáng tạo, tạo ra cái mới',
    '极其': 'cực kỳ, hết sức, vô cùng',
    '年纪': 'tuổi tác, số tuổi của một người',
    '依然': 'vẫn như cũ, y nguyên, vẫn cứ',
    '不言而喻': 'không cần nói cũng hiểu, hiển nhiên',
    '创立': 'sáng lập, tạo dựng nên',
    '据悉': 'theo tin nhận được, được biết là',
    '一听到': 'vừa mới nghe thấy là, khi nghe',
    '不料发现': 'nào ngờ phát hiện ra, bất ngờ thấy',
    '不用说': 'không cần phải nói, đương nhiên là vậy',
    '号': 'con số, ngày trong tháng, kích cỡ',
    '很': 'rất, vô cùng, lắm',
    '看见': 'nhìn thấy, trông thấy, ngó thấy',
    '了': 'trợ từ ngữ khí đã, rồi (biểu thị hoàn thành)',
    '吗': 'trợ từ nghi vấn có... không, à, ư, hả',
    '哪': 'nào, cái nào, đâu',
    '哪儿': 'ở đâu, chỗ nào',
    '呢': 'trợ từ ngữ khí thì sao, đang',
    '你': 'bạn, anh, chị, em (đại từ ngôi thứ 2)',
    '水果': 'hoa quả, trái cây tươi',
    '太': 'quá, lắm, cực kỳ',
    '妻子': 'người vợ, bà xã',
    '服务员': 'nhân viên phục vụ, bồi bàn',
    '进': 'vào, đi vào, tiến lên',
    '近': 'gần, cạnh bên, thân cận',
    '矮': 'thấp, lùn (chiều cao)',
    '搬': 'dọn dẹp, dời chuyển, khiêng chuyển đồ',
    '按时': 'đúng giờ, theo đúng lịch hẹn',
    '倍': 'lần, gấp bội (lượng từ số lần nhân)',
    '爱惜': 'yêu quý trân trọng, tiếc của'
}

eng_re = re.compile(r'\b(the|to|of|and|in|that|is|for|with|as|on|at|by|from|about|not|be|bring|upon|tell|most|foolish|every|any|all|into|over|under|out|without|within|make|take|give|go|get|come|see|know|think|look|want|find|work|use|call|say|ask|need|feel|become|leave|put|mean|keep|let|begin|seem|help|talk|turn|start|show|hear|play|run|move|like|live|believe|hold|bring|happen|must|write|provide|sit|stand|lose|pay|meet|include|continue|set|learn|change|lead|understand|watch|follow|stop|create|speak|read|allow|add|spend|grow|open|walk|win|offer|remember|love|consider|appear|buy|wait|serve|die|send|expect|build|stay|fall|cut|reach|kill|remain|suggest|raise|pass|sell|require|report|decide|pull)\b', re.I)

# Collect all Chinese words that still need translation
items_needing_translation = []
for i, w in enumerate(zh_vocab):
    word = w['word']
    m = w.get('vietnameseMeaning', '').strip()
    
    if word in ZH_MANUAL_DICT:
        w['vietnameseMeaning'] = ZH_MANUAL_DICT[word]
        continue
    
    needs_api = False
    if m == word:
        needs_api = True
    elif eng_re.search(m) and m not in ['to, lớn', 'to lớn']:
        needs_api = True
    elif '..' in m:
        needs_api = True
    elif ';' in m and any(c in 'abcdefghijklmnopqrstuvwxyz' for c in m.lower()):
        needs_api = True
    
    if needs_api:
        items_needing_translation.append((i, word))

print(f"Total Chinese words needing Google Translate API: {len(items_needing_translation)}")

# Translate in chunks of 30 words
CHUNK_SIZE = 30
for start in range(0, len(items_needing_translation), CHUNK_SIZE):
    chunk = items_needing_translation[start:start+CHUNK_SIZE]
    words_to_query = [item[1] for item in chunk]
    query_str = '\n'.join(words_to_query)
    url = f'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=vi&dt=t&q={urllib.parse.quote(query_str)}'
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            lines = [item[0].strip() for item in data[0] if item and item[0]]
            combined = ''.join(lines)
            parts = combined.split('\n')
            
            if len(parts) == len(words_to_query):
                for idx, (original_i, word) in enumerate(chunk):
                    translated = parts[idx].strip().lower()
                    if translated:
                        zh_vocab[original_i]['vietnameseMeaning'] = translated
            else:
                # If mismatch in split lines, handle individually or best effort
                print(f"Chunk at {start} had length mismatch: {len(parts)} vs {len(words_to_query)}")
                for idx, (original_i, word) in enumerate(chunk):
                    if idx < len(parts) and parts[idx].strip():
                        zh_vocab[original_i]['vietnameseMeaning'] = parts[idx].strip().lower()
        time.sleep(0.15) # gentle rate limit
    except Exception as e:
        print(f"Error translating chunk {start}: {e}")
        time.sleep(0.5)

print("Batch translation of Chinese vocabulary completed.")

# 3. Clean up generic mnemonics and examples in Chinese vocab
for w in zh_vocab:
    word = w['word']
    meaning = w.get('vietnameseMeaning', '')
    pinyin = w.get('phonetic', '')
    sino = w.get('sinoVietnamese', '').strip()
    
    # Enrich mnemonicTip if it was generic "Từ vựng chuẩn HSK..."
    tip = w.get('mnemonicTip', '')
    if 'chuẩn hsk' in tip.lower() or not tip:
        if sino:
            w['mnemonicTip'] = f"Gốc Hán-Việt: {sino} ({meaning}). Nhớ theo âm Hán-Việt tương đồng để ghi nhớ ngữ nghĩa chuẩn xác."
        else:
            w['mnemonicTip'] = f"Hán tự: {word} [{pinyin}], nghĩa: {meaning}. Ghi nhớ qua ngữ cảnh giao tiếp và nét viết biểu cảm."
    
    # Fix examples where example was generic or had English
    ex = w.get('example', '')
    ex_mean = w.get('exampleMeaning', '')
    if '经常使用“' in ex_mean or 'actual meaning of' in ex_mean.lower() or 'foolish' in ex_mean.lower() or 'every, any' in ex_mean.lower():
        w['example'] = f"在学习和日常交流中，我们经常使用“{word}”。"
        w['examplePhonetic'] = f"Zài xuéxí hé rìcháng jiāoliú zhōng, wǒmen jīngcháng shǐyòng \"{word}\"."
        w['exampleMeaning'] = f"Trong học tập và giao tiếp hàng ngày, chúng ta thường sử dụng \"{word}\" ({meaning})."

with open('src/data/chineseVocab.json', 'w', encoding='utf-8') as f:
    json.dump(zh_vocab, f, ensure_ascii=False, indent=2)

print("Chinese vocabulary cleaned and updated successfully!")
print("=== COMPLETED VOCABULARY AUDIT & REPAIR SCRIPT ===")
