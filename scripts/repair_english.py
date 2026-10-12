import json, re

print("Loading englishVocab.json...")
with open('src/data/englishVocab.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

# 1. Master dictionary of critical corrections for common words
CORE_FIXES = {
    'bread': {
        'pos': 'noun',
        'phonetic': '/bred/',
        'phoneticUk': '/bred/',
        'phoneticUs': '/bred/',
        'vn': 'bánh mì',
        'ex': 'She bought a fresh loaf of bread from the local bakery.',
        'exVn': 'Cô ấy đã mua một ổ bánh mì mới ra lò từ tiệm bánh địa phương.',
        'colloc': ['fresh bread', 'slice of bread', 'loaf of bread'],
        'tip': 'Danh từ chỉ bánh mì, món ăn sáng phổ biến làm từ bột mì.'
    },
    'break': {
        'pos': 'verb',
        'phonetic': '/breɪk/',
        'phoneticUk': '/breɪk/',
        'phoneticUs': '/breɪk/',
        'vn': 'làm vỡ, bẻ gãy, đập vỡ; giờ nghỉ giải lao',
        'ex': 'Let\'s take a short coffee break before continuing the meeting.',
        'exVn': 'Chúng ta hãy nghỉ giải lao uống cà phê một lát trước khi tiếp tục cuộc họp.',
        'colloc': ['take a break', 'break the rules', 'break a record'],
        'tip': 'Vừa là động từ làm vỡ, vừa là danh từ giờ nghỉ ngơi giữa giờ.'
    },
    'breakfast': {
        'pos': 'noun',
        'phonetic': '/ˈbrekfəst/',
        'phoneticUk': '/ˈbrekfəst/',
        'phoneticUs': '/ˈbrekfəst/',
        'vn': 'bữa ăn sáng, bữa điểm tâm',
        'ex': 'A nutritious breakfast gives you energy for the whole morning.',
        'exVn': 'Một bữa sáng đầy đủ dinh dưỡng mang lại cho bạn năng lượng cho cả buổi sáng.',
        'colloc': ['have breakfast', 'cook breakfast', 'healthy breakfast'],
        'tip': 'Break (phá vỡ) + fast (nhịn ăn) = bữa ăn kết thúc cơn đói qua đêm.'
    },
    'main': {
        'pos': 'adjective',
        'phonetic': '/meɪn/',
        'phoneticUk': '/meɪn/',
        'phoneticUs': '/meɪn/',
        'vn': 'chính, chủ yếu, quan trọng nhất',
        'ex': 'The main objective of this course is to build confidence in speaking.',
        'exVn': 'Mục tiêu chính của khóa học này là xây dựng sự tự tin khi giao tiếp.',
        'colloc': ['main idea', 'main entrance', 'main reason'],
        'tip': 'Tính từ chỉ điều trọng yếu, cốt lõi nhất trong một hệ thống.'
    },
    'plane': {
        'pos': 'noun',
        'phonetic': '/pleɪn/',
        'phoneticUk': '/pleɪn/',
        'phoneticUs': '/pleɪn/',
        'vn': 'máy bay, phi cơ; mặt phẳng',
        'ex': 'The passenger plane landed smoothly despite the heavy rain.',
        'exVn': 'Chiếc máy bay chở khách đã hạ cánh êm ái bất chấp trời mưa lớn.',
        'colloc': ['catch a plane', 'board a plane', 'passenger plane'],
        'tip': 'Viết tắt của airplane/aeroplane (máy bay), hoặc mặt phẳng trong hình học.'
    },
    'school': {
        'pos': 'noun',
        'phonetic': '/skuːl/',
        'phoneticUk': '/skuːl/',
        'phoneticUs': '/skuːl/',
        'vn': 'trường học, nhà trường',
        'ex': 'The children walk to school together every morning.',
        'exVn': 'Lũ trẻ cùng nhau đi bộ đến trường mỗi buổi sáng.',
        'colloc': ['go to school', 'high school', 'elementary school'],
        'tip': 'Cơ sở giáo dục nơi học sinh học tập và rèn luyện.'
    },
    'soup': {
        'pos': 'noun',
        'phonetic': '/suːp/',
        'phoneticUk': '/suːp/',
        'phoneticUs': '/suːp/',
        'vn': 'món súp, món canh',
        'ex': 'A hot bowl of chicken soup warms you up on cold winter nights.',
        'exVn': 'Một bát súp gà nóng hổi giúp làm ấm cơ thể vào những đêm đông lạnh giá.',
        'colloc': ['bowl of soup', 'chicken soup', 'hot soup'],
        'tip': 'Món ăn dạng nước nấu từ rau củ, thịt hầm nóng hổi.'
    },
    'hat': {
        'pos': 'noun',
        'phonetic': '/hæt/',
        'phoneticUk': '/hæt/',
        'phoneticUs': '/hæt/',
        'vn': 'cái mũ, nón',
        'ex': 'Remember to wear a wide hat to protect yourself from the sun.',
        'exVn': 'Hãy nhớ đội một chiếc mũ rộng vành để bảo vệ bản thân khỏi ánh nắng mặt trời.',
        'colloc': ['wear a hat', 'straw hat', 'take off one\'s hat'],
        'tip': 'Vật dụng đội đầu che nắng che mưa.'
    },
    'meal': {
        'pos': 'noun',
        'phonetic': '/miːl/',
        'phoneticUk': '/miːl/',
        'phoneticUs': '/miːl/',
        'vn': 'bữa ăn, bữa cơm',
        'ex': 'Enjoying a home-cooked meal with family is the best feeling.',
        'exVn': 'Thưởng thức bữa cơm nấu tại nhà cùng gia đình là cảm giác tuyệt vời nhất.',
        'colloc': ['three meals a day', 'home-cooked meal', 'hearty meal'],
        'tip': 'Bữa ăn trong ngày như bữa sáng, bữa trưa, bữa tối.'
    },
    'orange': {
        'pos': 'noun',
        'phonetic': '/ˈɒrɪndʒ/',
        'phoneticUk': '/ˈɒrɪndʒ/',
        'phoneticUs': '/ˈɔːrɪndʒ/',
        'vn': 'quả cam; màu cam',
        'ex': 'Freshly squeezed orange juice is packed with vitamin C.',
        'exVn': 'Nước cam tươi vừa vắt chứa rất nhiều vitamin C.',
        'colloc': ['orange juice', 'peel an orange', 'bright orange'],
        'tip': 'Quả cam mọng nước hoặc gam màu cam rực rỡ.'
    },
    'cat': {
        'pos': 'noun',
        'phonetic': '/kæt/',
        'phoneticUk': '/kæt/',
        'phoneticUs': '/kæt/',
        'vn': 'con mèo',
        'ex': 'The lazy cat spent the entire afternoon sleeping in the sun.',
        'exVn': 'Chú mèo lười biếng dành cả buổi chiều ngủ sưởi nắng.',
        'colloc': ['pet cat', 'stray cat', 'black cat'],
        'tip': 'Loài động vật bốn chân dễ thương, bắt chuột giỏi.'
    },
    'butter': {
        'pos': 'noun',
        'phonetic': '/ˈbʌtə(r)/',
        'phoneticUk': '/ˈbʌtə/',
        'phoneticUs': '/ˈbʌtər/',
        'vn': 'bơ (làm từ sữa)',
        'ex': 'Spread a generous layer of butter over the warm pancake.',
        'exVn': 'Hãy phết một lớp bơ dày lên chiếc bánh kếp nóng hổi.',
        'colloc': ['melted butter', 'peanut butter', 'spread butter'],
        'tip': 'Thực phẩm thơm ngậy làm từ chất béo của sữa.'
    },
    'bicycle': {
        'pos': 'noun',
        'phonetic': '/ˈbaɪsɪkl/',
        'phoneticUk': '/ˈbaɪsɪkl/',
        'phoneticUs': '/ˈbaɪsɪkl/',
        'vn': 'xe đạp',
        'ex': 'Riding a bicycle to work helps stay healthy and protects the environment.',
        'exVn': 'Đạp xe đạp đi làm giúp giữ gìn sức khỏe và bảo vệ môi trường.',
        'colloc': ['ride a bicycle', 'mountain bicycle', 'bicycle lane'],
        'tip': 'Phương tiện hai bánh chuyển động bằng bàn đạp.'
    },
    'address': {
        'pos': 'noun',
        'phonetic': '/əˈdres/',
        'phoneticUk': '/əˈdres/',
        'phoneticUs': '/ˈædres/',
        'vn': 'địa chỉ nhà; bài diễn văn',
        'ex': 'Please confirm your shipping address before placing the order.',
        'exVn': 'Vui lòng xác nhận địa chỉ giao hàng của bạn trước khi đặt hàng.',
        'colloc': ['home address', 'email address', 'change of address'],
        'tip': 'Địa chỉ để nhận thư từ, hàng hóa hoặc xác định vị trí.'
    },
    'brother': {
        'pos': 'noun',
        'phonetic': '/ˈbrʌðə(r)/',
        'phoneticUk': '/ˈbrʌðə/',
        'phoneticUs': '/ˈbrʌðər/',
        'vn': 'anh trai, em trai',
        'ex': 'My older brother taught me how to ride a bike when I was six.',
        'exVn': 'Anh trai tôi đã dạy tôi đi xe đạp khi tôi sáu tuổi.',
        'colloc': ['older brother', 'younger brother', 'twin brother'],
        'tip': 'Người anh em ruột thịt trong gia đình.'
    },
    'bottle': {
        'pos': 'noun',
        'phonetic': '/ˈbɒtl/',
        'phoneticUk': '/ˈbɒtl/',
        'phoneticUs': '/ˈbɑːtl/',
        'vn': 'chai, lọ',
        'ex': 'Don\'t forget to bring a reusable water bottle when going to the gym.',
        'exVn': 'Đừng quên mang theo một bình nước có thể tái sử dụng khi đi tập gym.',
        'colloc': ['water bottle', 'glass bottle', 'plastic bottle'],
        'tip': 'Đồ chứa chất lỏng có miệng hẹp và nắp đậy.'
    },
    'card': {
        'pos': 'noun',
        'phonetic': '/kɑːd/',
        'phoneticUk': '/kɑːd/',
        'phoneticUs': '/kɑːrd/',
        'vn': 'thẻ, thiếp, danh thiếp, quân bài',
        'ex': 'You can pay for groceries conveniently with a contactless credit card.',
        'exVn': 'Bạn có thể thanh toán đồ tạp hóa thuận tiện bằng thẻ tín dụng không tiếp xúc.',
        'colloc': ['credit card', 'birthday card', 'business card'],
        'tip': 'Tấm thẻ cứng dùng để nhận diện, thanh toán hoặc chúc mừng.'
    },
    'drink': {
        'pos': 'verb',
        'phonetic': '/drɪŋk/',
        'phoneticUk': '/drɪŋk/',
        'phoneticUs': '/drɪŋk/',
        'vn': 'uống (nước, đồ uống); đồ uống',
        'ex': 'Drinking enough water every day improves digestion and energy levels.',
        'exVn': 'Uống đủ nước mỗi ngày giúp cải thiện tiêu hóa và mức năng lượng.',
        'colloc': ['drink water', 'have a drink', 'soft drink'],
        'tip': 'Hành động nạp chất lỏng vào cơ thể.'
    },
    'bank': {
        'pos': 'noun',
        'phonetic': '/bæŋk/',
        'phoneticUk': '/bæŋk/',
        'phoneticUs': '/bæŋk/',
        'vn': 'ngân hàng; bờ sông, bờ đê',
        'ex': 'He went to the local bank to open a new savings account.',
        'exVn': 'Anh ấy đã đến ngân hàng địa phương để mở một tài khoản tiết kiệm mới.',
        'colloc': ['commercial bank', 'river bank', 'bank account'],
        'tip': 'Tổ chức tài chính giữ tiền hoặc dải đất dọc bờ nước.'
    },
    'book': {
        'pos': 'noun',
        'phonetic': '/bʊk/',
        'phoneticUk': '/bʊk/',
        'phoneticUs': '/bʊk/',
        'vn': 'cuốn sách; đặt chỗ (vé, phòng)',
        'ex': 'Reading an inspiring book before bed helps reduce stress.',
        'exVn': 'Đọc một cuốn sách truyền cảm hứng trước khi ngủ giúp giảm căng thẳng.',
        'colloc': ['read a book', 'book a ticket', 'favorite book'],
        'tip': 'Tập hợp các trang giấy in chữ hoặc hành động đặt vé.'
    },
    'water': {
        'pos': 'noun',
        'phonetic': '/ˈwɔːtə(r)/',
        'phoneticUk': '/ˈwɔːtə/',
        'phoneticUs': '/ˈwɑːtər/',
        'vn': 'nước (chất lỏng)',
        'ex': 'Make sure to stay hydrated by drinking pure water throughout the day.',
        'exVn': 'Hãy chắc chắn duy trì lượng nước cho cơ thể bằng cách uống nước tinh khiết suốt cả ngày.',
        'colloc': ['pure water', 'mineral water', 'glass of water'],
        'tip': 'Chất lỏng trong suốt duy trì mọi sự sống trên Trái Đất.'
    },
    'watch': {
        'pos': 'noun',
        'phonetic': '/wɒtʃ/',
        'phoneticUk': '/wɒtʃ/',
        'phoneticUs': '/wɑːtʃ/',
        'vn': 'đồng hồ đeo tay; theo dõi, xem',
        'ex': 'He checked his watch and realized he was twenty minutes early.',
        'exVn': 'Anh ấy nhìn đồng hồ và nhận ra mình đã đến sớm hai mươi phút.',
        'colloc': ['wrist watch', 'watch a movie', 'keep watch'],
        'tip': 'Đồng hồ nhỏ đeo ở cổ tay hoặc hành động quan sát.'
    },
    'train': {
        'pos': 'noun',
        'phonetic': '/treɪn/',
        'phoneticUk': '/treɪn/',
        'phoneticUs': '/treɪn/',
        'vn': 'tàu hỏa, xe lửa; rèn luyện, đào tạo',
        'ex': 'Taking the high-speed train is the most comfortable way to travel.',
        'exVn': 'Đi tàu hỏa cao tốc là cách thoải mái nhất để đi du lịch.',
        'colloc': ['catch a train', 'train station', 'passenger train'],
        'tip': 'Phương tiện đường sắt chở khách hoặc việc tập luyện.'
    },
    'table': {
        'pos': 'noun',
        'phonetic': '/ˈteɪbl/',
        'phoneticUk': '/ˈteɪbl/',
        'phoneticUs': '/ˈteɪbl/',
        'vn': 'cái bàn; bảng biểu',
        'ex': 'The family gathered around the wooden dining table for dinner.',
        'exVn': 'Cả gia đình quây quần quanh chiếc bàn ăn bằng gỗ để dùng bữa tối.',
        'colloc': ['dining table', 'round table', 'set the table'],
        'tip': 'Đồ nội thất mặt phẳng có chân để đặt đồ đạc.'
    },
    'chair': {
        'pos': 'noun',
        'phonetic': '/tʃeə(r)/',
        'phoneticUk': '/tʃeə/',
        'phoneticUs': '/tʃer/',
        'vn': 'cái ghế',
        'ex': 'Pull up a comfortable chair and join our conversation.',
        'exVn': 'Hãy kéo một chiếc ghế thoải mái lại và tham gia cuộc trò chuyện cùng chúng tôi.',
        'colloc': ['comfortable chair', 'office chair', 'wooden chair'],
        'tip': 'Đồ nội thất có tựa lưng dùng để ngồi.'
    },
    'store': {
        'pos': 'noun',
        'phonetic': '/stɔː(r)/',
        'phoneticUk': '/stɔː/',
        'phoneticUs': '/stɔːr/',
        'vn': 'cửa hàng; lưu trữ, tích trữ',
        'ex': 'She walked down the street to the grocery store to buy some fruit.',
        'exVn': 'Cô ấy đi bộ xuống phố đến cửa hàng tạp hóa để mua một ít trái cây.',
        'colloc': ['grocery store', 'department store', 'convenience store'],
        'tip': 'Nơi bán hàng hóa hoặc hành động cất giữ.'
    },
    'spring': {
        'pos': 'noun',
        'phonetic': '/sprɪŋ/',
        'phoneticUk': '/sprɪŋ/',
        'phoneticUs': '/sprɪŋ/',
        'vn': 'mùa xuân; suối nước; lò xo',
        'ex': 'In spring, cherry blossoms bloom and the weather turns mild.',
        'exVn': 'Vào mùa xuân, hoa anh đào nở rộ và thời tiết trở nên ấm áp.',
        'colloc': ['spring break', 'hot spring', 'early spring'],
        'tip': 'Mùa đầu tiên trong năm tượng trưng cho sức sống mới.'
    },
    'fall': {
        'pos': 'verb',
        'phonetic': '/fɔːl/',
        'phoneticUk': '/fɔːl/',
        'phoneticUs': '/fɔːl/',
        'vn': 'ngã, rơi xuống; mùa thu (Mỹ)',
        'ex': 'Autumn leaves fall gently onto the sidewalks in October.',
        'exVn': 'Những chiếc lá mùa thu rơi nhẹ nhàng xuống vỉa hè vào tháng mười.',
        'colloc': ['fall in love', 'fall asleep', 'fall down'],
        'tip': 'Hành động rơi từ trên cao xuống hoặc từ chỉ mùa thu ở Bắc Mỹ.'
    },
    'light': {
        'pos': 'noun',
        'phonetic': '/laɪt/',
        'phoneticUk': '/laɪt/',
        'phoneticUs': '/laɪt/',
        'vn': 'ánh sáng, đèn; nhẹ (không nặng)',
        'ex': 'Natural sunlight filled the living room through the large window.',
        'exVn': 'Ánh sáng mặt trời tự nhiên tràn ngập phòng khách qua ô cửa sổ lớn.',
        'colloc': ['natural light', 'traffic light', 'turn on the light'],
        'tip': 'Nguồn sáng giúp nhìn rõ vạn vật hoặc đồ vật nhẹ cân.'
    },
    'sound': {
        'pos': 'noun',
        'phonetic': '/saʊnd/',
        'phoneticUk': '/saʊnd/',
        'phoneticUs': '/saʊnd/',
        'vn': 'âm thanh, tiếng động; nghe có vẻ',
        'ex': 'The soothing sound of ocean waves helped her relax instantly.',
        'exVn': 'Âm thanh êm dịu của sóng biển đã giúp cô ấy thư giãn ngay lập tức.',
        'colloc': ['sound effect', 'pleasant sound', 'sound of nature'],
        'tip': 'Những gì tai nghe và cảm nhận được qua sóng âm.'
    },
    'agree': {
        'pos': 'verb',
        'phonetic': '/əˈɡriː/',
        'phoneticUk': '/əˈɡriː/',
        'phoneticUs': '/əˈɡriː/',
        'vn': 'đồng ý, tán thành',
        'ex': 'Both parties agreed to sign the new partnership contract.',
        'exVn': 'Cả hai bên đã đồng ý ký hợp đồng hợp tác mới.',
        'colloc': ['agree with', 'agree to a proposal', 'completely agree'],
        'tip': 'Đồng lòng, cùng quan điểm với ý kiến của người khác.'
    }
}

# 2. General cleaners for Vietnamese meanings
def clean_vietnamese_meaning(vm, word):
    if not vm:
        return ""
    # remove trailing closing parentheses without matching open paren
    vm = re.sub(r'^[^\(]*?\)\s*', '', vm)
    # remove prefixes like '+ up, together)', '+ the)', '+ động tính từ quá khứ)'
    vm = re.sub(r'^\+\s*[^)]*?\)\s*', '', vm)
    # remove spilled phonetic strings like /pə'li:s'ɔfisə/
    vm = re.sub(r'/[^/]+/', '', vm)
    # remove trailing standalone parenthesis
    vm = re.sub(r'\s*\)\s*$', '', vm)
    # remove weird dictionary artifacts
    vm = re.sub(r'\bfeeding\b|\bbrethren\b|\bplatan\b|\bplaying card\b|\bstrong drink\b|\bnitroglyxerin\b|\bofficer\b', '', vm, flags=re.IGNORECASE)
    # remove specific phrase fragments
    vm = vm.replace('mauð/,', '').replace('cuộc chọi gà, with might and main', 'chính, chủ yếu').replace('cây tiêu huyền plane-tree', 'máy bay, mặt phẳng')
    # replace duplicate commas or dangling punctuation
    vm = re.sub(r',\s*,+', ',', vm)
    vm = re.sub(r'^\s*[,;\-\.]\s*', '', vm)
    vm = re.sub(r'\s*[,;\-\.]\s*$', '', vm)
    vm = vm.strip()
    return vm

# 3. Dynamic natural sentence generator for templated words
def generate_vivid_example(word, pos, vn_meaning, level):
    # Short primary meaning
    first_vn = vn_meaning.split(',')[0].split(';')[0].strip()
    if not first_vn:
        first_vn = word

    # Clean word
    w = word.strip()
    pos_lower = (pos or 'noun').lower()

    # Variety of sentence patterns per part of speech
    hash_val = sum(ord(c) for c in w)

    if 'verb' in pos_lower:
        patterns = [
            (f"She tried to {w} carefully to achieve the best possible result.",
             f"Cô ấy đã cố gắng {first_vn} một cách cẩn thận để đạt được kết quả tốt nhất có thể."),
            (f"They decided to {w} after discussing the detailed plan with the team.",
             f"Họ đã quyết định {first_vn} sau khi thảo luận kế hoạch chi tiết cùng cả nhóm."),
            (f"You should always {w} when working in a professional environment.",
             f"Bạn nên luôn {first_vn} khi làm việc trong một môi trường chuyên nghiệp."),
            (f"It took them several weeks to learn how to {w} effectively.",
             f"Họ đã mất vài tuần để học cách {first_vn} một cách hiệu quả.")
        ]
        ex, ex_vn = patterns[hash_val % len(patterns)]
        colloc = [f"to {w} carefully", f"{w} effectively", f"plan to {w}"]
    elif 'adj' in pos_lower:
        patterns = [
            (f"The manager gave a very {w} explanation during the morning briefing.",
             f"Người quản lý đã đưa ra lời giải thích rất {first_vn} trong buổi họp ngắn sáng nay."),
            (f"Everyone was impressed by the {w} design of the newly released product.",
             f"Mọi người đều ấn tượng với thiết kế {first_vn} của sản phẩm mới ra mắt."),
            (f"Maintaining a {w} attitude helps you overcome difficult daily challenges.",
             f"Duy trì một thái độ {first_vn} giúp bạn vượt qua những thử thách khó khăn hằng ngày."),
            (f"The project became {w} thanks to the relentless efforts of the entire team.",
             f"Dự án đã trở nên {first_vn} nhờ vào nỗ lực không ngừng của toàn đội ngũ.")
        ]
        ex, ex_vn = patterns[hash_val % len(patterns)]
        colloc = [f"very {w}", f"{w} feature", f"{w} approach"]
    elif 'adv' in pos_lower:
        patterns = [
            (f"The speaker addressed the audience {w} throughout the entire keynote.",
             f"Diễn giả đã chia sẻ trước khán giả một cách {first_vn} trong suốt bài phát biểu chính."),
            (f"She managed to complete all tasks {w} before the strict deadline.",
             f"Cô ấy đã xoay xở hoàn thành mọi nhiệm vụ một cách {first_vn} trước thời hạn nghiêm ngặt."),
            (f"The software operates {w} even under heavy network traffic.",
             f"Phần mềm hoạt động một cách {first_vn} ngay cả khi lưu lượng mạng cao.")
        ]
        ex, ex_vn = patterns[hash_val % len(patterns)]
        colloc = [f"act {w}", f"speak {w}", f"perform {w}"]
    else:  # noun or default
        patterns = [
            (f"The modern {w} plays an essential role in improving everyday productivity.",
             f"{first_vn.capitalize()} hiện đại đóng một vai trò thiết yếu trong việc nâng cao năng suất hằng ngày."),
            (f"We gathered around to inspect the new {w} placed in the center of the hall.",
             f"Chúng tôi quây quần lại để quan sát {first_vn} mới được đặt ở giữa hội trường."),
            (f"Understanding the key function of each {w} makes the entire process smoother.",
             f"Hiểu được chức năng then chốt của từng {first_vn} giúp toàn bộ quy trình diễn ra suôn sẻ hơn."),
            (f"They introduced a reliable {w} that received positive feedback from customers.",
             f"Họ đã giới thiệu một {first_vn} đáng tin cậy và nhận được phản hồi tích cực từ khách hàng.")
        ]
        ex, ex_vn = patterns[hash_val % len(patterns)]
        colloc = [f"important {w}", f"role of {w}", f"modern {w}"]

    tip = f"{pos.capitalize() if pos else 'Từ vựng'}: {first_vn} - thường gặp trong các chủ đề thực tế."
    return ex, ex_vn, colloc, tip

fixed_count = 0
cleaned_vm_count = 0
fixed_ex_count = 0

for item in en_data:
    w_lower = item.get('word', '').strip().lower()

    # 1. Apply core fixes if present
    if w_lower in CORE_FIXES:
        fix = CORE_FIXES[w_lower]
        item['partOfSpeech'] = fix['pos']
        item['phonetic'] = fix['phonetic']
        item['phoneticUk'] = fix['phoneticUk']
        item['phoneticUs'] = fix['phoneticUs']
        item['vietnameseMeaning'] = fix['vn']
        item['definitions'] = [fix['vn']]
        item['example'] = fix['ex']
        item['exampleMeaning'] = fix['exVn']
        item['collocations'] = fix['colloc']
        item['mnemonicTip'] = fix['tip']
        fixed_count += 1
        continue

    # 2. Clean up vietnameseMeaning
    old_vm = item.get('vietnameseMeaning', '')
    new_vm = clean_vietnamese_meaning(old_vm, w_lower)
    if new_vm and new_vm != old_vm:
        item['vietnameseMeaning'] = new_vm
        item['definitions'] = [new_vm]
        cleaned_vm_count += 1

    # 3. Check if example is generic or broken fragment
    ex = item.get('example', '')
    is_generic = (
        'enhances your practical vocabulary' in ex or
        'before making any final decision' in ex or
        'and suitable for everyone' in ex or
        ex.startswith('To ') or
        ex.startswith('A loaf') or
        ex.startswith('School fish') or
        'Brother uterine' in ex or
        ex.startswith('+ ') or
        len(ex) < 12
    )

    if is_generic:
        new_ex, new_ex_vn, new_colloc, new_tip = generate_vivid_example(
            item.get('word', ''),
            item.get('partOfSpeech', 'noun'),
            item.get('vietnameseMeaning', ''),
            item.get('level', 'A1')
        )
        item['example'] = new_ex
        item['exampleMeaning'] = new_ex_vn
        # Update collocations if they are robotic
        curr_colloc = item.get('collocations', [])
        if any('actively' in c or 'effectively' in c or 'key ' in c or 'modern ' in c for c in curr_colloc):
            item['collocations'] = new_colloc
        if 'Động từ: hành động' in item.get('mnemonicTip', ''):
            item['mnemonicTip'] = new_tip
        fixed_ex_count += 1

print(f"Repairs completed:")
print(f"- Core words meticulously fixed: {fixed_count}")
print(f"- Vietnamese meanings cleaned from artifacts: {cleaned_vm_count}")
print(f"- Generic / broken examples replaced with vivid ones: {fixed_ex_count}")

with open('src/data/englishVocab.json', 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

print("Saved updated englishVocab.json successfully.")
