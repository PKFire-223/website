# -*- coding: utf-8 -*-
import json
import re

print("Starting Chinese vocabulary quality overhaul...")

# Common English to Vietnamese translation dictionary for HSK and Chinese terms
EN_TO_VI_DICT = {
    "love": "yêu, thương yêu, say mê",
    "eight": "số tám (8)",
    "dad": "bố, ba, cha",
    "father": "bố, cha",
    "mother": "mẹ, má",
    "mum": "mẹ, má",
    "measure word for books": "cuốn, quyển (lượng từ cho sách vở)",
    "dish (type of food); vegetables": "món ăn; rau củ",
    "make a phone call": "gọi điện thoại",
    "indicates possession, like adding 's to a noun": "của (trợ từ kết cấu biểu thị sở hữu)",
    "a dot; a little; o'clock": "chút, ít; giờ (đồng hồ); điểm",
    "to read; to study": "đọc; học tập",
    "minute; (measure word for time)": "phút (thời gian)",
    "happy; glad; cheerful": "vui vẻ, phấn khởi, vui mừng",
    "can; be able to": "có thể, biết (làm gì)",
    "good; well": "tốt, đẹp, hay, khỏe",
    "number; day of month": "ngày; số",
    "drink": "uống",
    "and; with": "và; cùng với",
    "very; quite": "rất, lắm",
    "behind; back; after": "phía sau, đằng sau; sau này",
    "return; go back": "quay về, trở về",
    "meeting; can; will": "hội, cuộc họp; biết, sẽ",
    "how many; how much": "mấy, bao nhiêu",
    "home; family": "nhà, gia đình",
    "to be called; to call": "gọi là, tên là",
    "today": "hôm nay",
    "nine": "số chín (9)",
    "open; start": "mở, bắt đầu, lái xe",
    "look; watch; see": "nhìn, xem, trông thấy",
    "see; catch sight of": "nhìn thấy, trông thấy",
    "block; lump; yuan (currency)": "đồng (tệ); khối, miếng, cục",
    "come; arrive": "đến, tới",
    "teacher": "giáo viên, thầy cô giáo",
    "particle indicating completed action": "rồi (trợ từ ngữ khí/thì hoàn thành)",
    "cold": "lạnh, lạnh lẽo",
    "inside; interior": "bên trong, trong",
    "zero": "số không (0)",
    "six": "số sáu (6)",
    "mother; mom": "mẹ",
    "question particle": "chăng, hả, ư, không (trợ từ nghi vấn)",
    "buy": "mua",
    "cat": "con mèo",
    "haven't; not have": "không có, chưa",
    "it doesn't matter; never mind": "không sao, không có chi",
    "cooked rice; meal": "cơm, bữa ăn",
    "name": "tên gọi",
    "which; which one": "nào, cái nào",
    "there; that place": "đó, kia, nơi đó",
    "that; those": "kia, đó",
    "you": "bạn, anh, chị (ngôi thứ 2 số ít)",
    "year": "năm",
    "daughter": "con gái",
    "friend": "bạn bè",
    "pretty; beautiful": "xinh đẹp, đẹp đẽ",
    "apple": "quả táo",
    "seven": "số bảy (7)",
    "money": "tiền bạc",
    "front; forward; ahead": "phía trước, đằng trước",
    "please; invite": "xin, mời, nhờ",
    "go; leave": "đi, tới",
    "hot; warm": "nóng, nhiệt độ cao",
    "person; people": "người, nhân loại",
    "know; recognize": "quen biết, nhận ra",
    "three": "số ba (3)",
    "shop; store": "cửa hàng, tiệm buôn",
    "up; on; above; go up": "trên, phía trên; đi lên; đi làm/đi học",
    "morning": "buổi sáng",
    "few; little": "ít, hiếm",
    "who; whom": "ai (đại từ nghi vấn)",
    "what": "cái gì, điều gì",
    "ten": "số mười (10)",
    "time; moment": "khi, lúc, thời gian",
    "to be": "thì, là, ở (đúng, phải)",
    "book": "sách, cuốn sách",
    "water": "nước",
    "fruit": "hoa quả, trái cây",
    "sleep; go to bed": "ngủ, đi ngủ",
    "speak; say": "nói, phát biểu",
    "four": "số bốn (4)",
    "age; years old": "tuổi (năm tuổi)",
    "he; him": "anh ấy, ông ấy, cậu ấy",
    "she; her": "cô ấy, bà ấy, chị ấy",
    "weather": "thời tiết",
    "listen; hear": "nghe",
    "fellow student; schoolmate": "bạn cùng học, bạn học",
    "feed; hello (on phone)": "alo (nghe điện thoại); cho ăn",
    "i; me": "tôi, mình, tao",
    "we; us": "chúng tôi, chúng ta",
    "five": "số năm (5)",
    "like; be fond of": "thích, yêu thích",
    "under; down; below; get off": "dưới, phía dưới; đi xuống",
    "afternoon": "buổi chiều",
    "rain; to rain": "trời mưa, cơn mưa",
    "gentleman; sir; husband": "ông, ngài, chồng",
    "now; at present": "bây giờ, hiện tại",
    "think; believe; miss": "nghĩ, muốn, nhớ nhung",
    "small; tiny; little": "nhỏ, bé",
    "miss; young lady": "cô gái, tiểu thư",
    "some; a few": "một vài, một số",
    "write": "viết, biên soạn",
    "thank; thanks": "cảm ơn",
    "week": "tuần, tuần lễ",
    "student; pupil": "học sinh, sinh viên",
    "study; learn": "học, học tập",
    "school": "trường học",
    "one": "số một (1)",
    "clothes": "quần áo, trang phục",
    "doctor": "bác sĩ, thầy thuốc",
    "hospital": "bệnh viện",
    "chair": "ghế ngồi",
    "have; there is": "có, tồn tại",
    "month": "tháng, mặt trăng",
    "goodbye; see you again": "tạm biệt, hẹn gặp lại",
    "in; at; on": "ở, tại, đang (làm gì)",
    "how; how is": "như thế nào, làm sao",
    "how about; how is it": "thế nào, ra sao",
    "this; these": "đây, này",
    "china": "Trung Quốc",
    "noon; midday": "buổi trưa",
    "desk; table": "cái bàn",
    "character; word": "chữ Hán, ký tự",
    "yesterday": "ngày hôm qua",
    "sit": "ngồi, đi (tàu xe)",
    "do; make": "làm, nấu",
    "hardworking; diligent; industrious": "chăm chỉ, cần cù, siêng năng",
    "long; length | grow; chief (Kangxi radical 168)": "dài, chiều dài; trưởng thành, lớn lên"
}

# Load chinese vocab
with open('src/data/chineseVocab.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

updated_count = 0
cleaned_bom_count = 0

for item in data:
    # 1. Clean BOM & invisible zero-width spaces
    for key in ['word', 'phonetic', 'sinoVietnamese', 'vietnameseMeaning', 'example', 'exampleMeaning']:
        if key in item and isinstance(item[key], str):
            orig = item[key]
            cleaned = orig.replace('\ufeff', '').replace('\u200b', '').replace('\u200e', '').strip()
            if cleaned != orig:
                item[key] = cleaned
                cleaned_bom_count += 1

    # 2. Fix Sino-Vietnamese placeholders like "Hán Việt của 的"
    if 'sinoVietnamese' in item:
        sv = item['sinoVietnamese'].strip()
        if sv.startswith('Hán Việt của ') or not sv:
            char = item['word']
            # Fallback mappings for common particles
            particle_map = {
                '的': 'Đích', '了': 'Liễu', '吗': 'Ma', '呢': 'Ni',
                '吧': 'Ba', '得': 'Đắc', '地': 'Địa', '着': 'Trước',
                '过': 'Quá', '啊': 'A', '喂': 'Úy', '个': 'Cá'
            }
            if char in particle_map:
                item['sinoVietnamese'] = particle_map[char]
            else:
                item['sinoVietnamese'] = 'Hán tự ' + char

    # 3. Translate English meanings to Vietnamese
    vm = item.get('vietnameseMeaning', '').strip()
    vm_lower = vm.lower()

    if vm_lower in EN_TO_VI_DICT:
        item['vietnameseMeaning'] = EN_TO_VI_DICT[vm_lower]
        updated_count += 1
    else:
        # Check partial or semicolon-separated English
        parts = [p.strip() for p in re.split(r'[;/|]', vm) if p.strip()]
        translated_parts = []
        is_english = False
        for p in parts:
            p_low = p.lower()
            if p_low in EN_TO_VI_DICT:
                translated_parts.append(EN_TO_VI_DICT[p_low])
                is_english = True
            elif p_low.startswith('to '):
                verb_stem = p_low[3:]
                if verb_stem in EN_TO_VI_DICT:
                    translated_parts.append(EN_TO_VI_DICT[verb_stem])
                    is_english = True

        if is_english and translated_parts:
            item['vietnameseMeaning'] = '; '.join(translated_parts)
            updated_count += 1

    # 4. Fix placeholder example sentences like "这是八的一个常见用法。"
    ex = item.get('example', '')
    ex_m = item.get('exampleMeaning', '')
    if '一个常见用法' in ex:
        word = item['word']
        # Provide natural example sentences
        if word == '爱':
            item['example'] = '我很爱我的家人。'
            item['exampleMeaning'] = 'Tôi rất yêu gia đình của mình.'
        elif word == '八':
            item['example'] = '我们早上八点准时出发。'
            item['exampleMeaning'] = 'Chúng ta xuất phát đúng tám giờ sáng.'
        elif word == '爸爸':
            item['example'] = '我爸爸在一家医院工作。'
            item['exampleMeaning'] = 'Bố tôi làm việc ở một bệnh viện.'
        elif word == '菜':
            item['example'] = '妈妈做的中国菜非常美味。'
            item['exampleMeaning'] = 'Món ăn Trung Quốc mẹ nấu vô cùng ngon miệng.'
        elif word == '本':
            item['example'] = '桌子上放着三本汉语书。'
            item['exampleMeaning'] = 'Trên bàn đặt ba cuốn sách tiếng Hán.'
        elif word == '大':
            item['example'] = '北京是一个非常大的城市。'
            item['exampleMeaning'] = 'Bắc Kinh là một thành phố rất lớn.'
        elif word == '小':
            item['example'] = '这个书包太小了。'
            item['exampleMeaning'] = 'Chiếc cặp sách này quá nhỏ rồi.'
        elif word == '好':
            item['example'] = '今天的天气特别好。'
            item['exampleMeaning'] = 'Thời tiết hôm nay đặc biệt tốt.'
        elif word == '多':
            item['example'] = '今天超市里有很多人。'
            item['exampleMeaning'] = 'Hôm nay trong siêu thị có rất nhiều người.'
        elif word == '少':
            item['example'] = '他平时说话很少。'
            item['exampleMeaning'] = 'Bình thường anh ấy nói rất ít.'
        elif word == '吃':
            item['example'] = '你想吃米饭还是面条？'
            item['exampleMeaning'] = 'Bạn muốn ăn cơm hay ăn mì sợi?'
        elif word == '喝':
            item['example'] = '请喝一杯热茶吧。'
            item['exampleMeaning'] = 'Xin mời uống một ly trà nóng.'
        elif word == '看':
            item['example'] = '他喜欢晚上看书。'
            item['exampleMeaning'] = 'Anh ấy thích đọc sách vào buổi tối.'
        elif word == '听':
            item['example'] = '你在听什么音乐？'
            item['exampleMeaning'] = 'Bạn đang nghe bản nhạc gì thế?'
        elif word == '买':
            item['example'] = '我想买一斤新鲜的苹果。'
            item['exampleMeaning'] = 'Tôi muốn mua một cân táo tươi.'
        elif word == '去':
            item['example'] = '明天我们一起去图书馆。'
            item['exampleMeaning'] = 'Ngày mai chúng ta cùng nhau đi thư viện nhé.'
        elif word == '来':
            item['example'] = '欢迎你来我们家做客。'
            item['exampleMeaning'] = 'Hoan nghênh bạn đến nhà chúng tôi làm khách.'
        elif word == '学':
            item['example'] = '学汉语需要每天坚持练习。'
            item['exampleMeaning'] = 'Học tiếng Hán cần kiên trì luyện tập mỗi ngày.'
        elif word == '做':
            item['example'] = '周末你通常做什么？'
            item['exampleMeaning'] = 'Cuối tuần bạn thường làm việc gì?'
        else:
            item['example'] = f'他在学习“{word}”这个词的用法。'
            item['exampleMeaning'] = f'Anh ấy đang học cách dùng của từ “{word}”.'

# Save cleaned & updated database
with open('src/data/chineseVocab.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Chinese vocabulary overhaul complete!")
print(f"Cleaned BOM/Unicode artifacts: {cleaned_bom_count}")
print(f"Updated translated meanings: {updated_count}")
