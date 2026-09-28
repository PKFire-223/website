# -*- coding: utf-8 -*-
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

# --- ENGLISH A1 (120 words) ---
u_a1 = "Unit 1: Giao tiếp thường nhật & Bản thân"
a1_w = [
    ("Hello", "/həˈləʊ/", "thán từ", "xin chào", "Hello, nice to meet you!", "Xin chào, rất vui được gặp bạn!", "say hello", "Chào hỏi lịch thiệp."),
    ("Goodbye", "/ɡʊdˈbaɪ/", "thán từ", "tạm biệt", "Goodbye, see you tomorrow.", "Tạm biệt, hẹn gặp lại ngày mai.", "say goodbye", "Chào tạm biệt kinh điển."),
    ("Name", "/neɪm/", "danh từ", "tên gọi, họ tên", "What is your full name?", "Tên đầy đủ của bạn là gì?", "full name", "Xác định danh tính cá nhân."),
    ("Friend", "/frend/", "danh từ", "người bạn", "She is my closest friend.", "Cô ấy là người bạn thân nhất của tôi.", "best friend", "Mối quan hệ bạn bè gắn bó."),
    ("Family", "/ˈfæm.əl.i/", "danh từ", "gia đình", "I love spending time with my family.", "Tôi thích dành thời gian bên gia đình.", "family member", "Tổ ấm thiêng liêng."),
    ("Father", "/ˈfɑː.ðər/", "danh từ", "bố, người cha", "My father is an engineer.", "Bố tôi là một kỹ sư.", "father and son", "Trụ cột gia đình."),
    ("Mother", "/ˈmʌð.ər/", "danh từ", "mẹ, người mẹ", "My mother cooks delicious meals.", "Mẹ tôi nấu những bữa ăn rất ngon.", "caring mother", "Tình mẫu tử thiêng liêng."),
    ("Brother", "/ˈbrʌð.ər/", "danh từ", "anh/em trai", "My brother is a college student.", "Anh trai tôi là một sinh viên đại học.", "older brother", "Anh em ruột thịt."),
    ("Sister", "/ˈsɪs.tər/", "danh từ", "chị/em gái", "My sister plays the piano beautifully.", "Em gái tôi chơi đàn dương cầm rất hay.", "younger sister", "Chị em gái yêu thương."),
    ("Child", "/tʃaɪld/", "danh từ", "đứa trẻ, con cái", "The child is laughing joyfully.", "Đứa trẻ đang cười một cách vui sướng.", "happy child", "Số nhiều là children."),
    ("Baby", "/ˈbeɪ.bi/", "danh từ", "em bé sơ sinh", "The baby fell asleep peacefully.", "Em bé đã ngủ say một cách yên bình.", "newborn baby", "Em bé mới sinh."),
    ("Man", "/mæn/", "danh từ", "người đàn ông", "A polite man held the door open.", "Một người đàn ông lịch sự đã giữ cửa mở.", "young man", "Số nhiều là men."),
    ("Woman", "/ˈwʊm.ən/", "danh từ", "người phụ nữ", "She is an inspiring woman.", "Cô ấy là một người phụ nữ truyền cảm hứng.", "wise woman", "Số nhiều là women /wɪm.ɪn/."),
    ("Boy", "/bɔɪ/", "danh từ", "cậu bé", "The boy loves reading adventure novels.", "Cậu bé thích đọc tiểu thuyết phiêu lưu.", "school boy", "Bé trai hoặc thiếu niên."),
    ("Girl", "/ɡɜːl/", "danh từ", "cô bé", "The little girl drew a colorful rainbow.", "Cô bé vẽ một chiếc cầu vồng nhiều màu sắc.", "little girl", "Bé gái hoặc thiếu nữ."),
    ("Home", "/həʊm/", "danh từ", "tổ ấm, gia đình", "There is no place like home.", "Không có nơi nào ấm áp như tổ ấm gia đình.", "at home", "Home mang tình cảm ấm áp."),
    ("House", "/haʊs/", "danh từ", "ngôi nhà", "They moved into a spacious house.", "Họ chuyển đến một ngôi nhà rộng rãi.", "buy a house", "Công trình nhà ở vật chất."),
    ("Room", "/ruːm/", "danh từ", "căn phòng", "My room has a sunny window.", "Phòng tôi có cửa sổ đón nắng.", "living room", "Không gian sinh hoạt."),
    ("School", "/skuːl/", "danh từ", "trường học", "Students arrive at school early.", "Học sinh đến trường từ sáng sớm.", "primary school", "Nơi truyền thụ tri thức."),
    ("Teacher", "/ˈtiː.tʃər/", "danh từ", "thầy cô giáo", "Our English teacher is passionate.", "Giáo viên tiếng Anh của chúng tôi rất nhiệt huyết.", "good teacher", "Người dẫn dắt tương lai."),
    ("Student", "/ˈstjuː.dənt/", "danh từ", "học sinh, sinh viên", "Diligent students achieve high scores.", "Những học sinh chăm chỉ đạt điểm số cao.", "college student", "Người tiếp thu tri thức."),
    ("Book", "/bʊk/", "danh từ", "cuốn sách", "Books are bridges to wisdom.", "Sách là cây cầu dẫn tới trí tuệ.", "read a book", "Kho tàng tri thức vô tận."),
    ("Pen", "/pen/", "danh từ", "cây bút mực", "Sign your signature with a pen.", "Hãy ký tên bạn bằng chiếc bút mực.", "ballpoint pen", "Dụng cụ ghi chép."),
    ("Table", "/ˈteɪ.bəl/", "danh từ", "cái bàn", "Set the dinner table carefully.", "Hãy dọn bàn ăn cẩn thận nhé.", "dining table", "Đồ nội thất mặt phẳng."),
    ("Chair", "/tʃeər/", "danh từ", "chiếc ghế", "Pull up a chair and join us.", "Hãy kéo ghế lại và cùng tham gia với chúng tôi.", "comfortable chair", "Đồ dùng để ngồi."),
    ("Door", "/dɔːr/", "danh từ", "cánh cửa", "Please lock the door at night.", "Xin hãy khóa cửa vào ban đêm.", "open the door", "Lối ra vào."),
    ("Window", "/ˈwɪn.dəʊ/", "danh từ", "cửa sổ", "The window overlooks a green park.", "Cửa sổ nhìn ra một công viên xanh mát.", "window view", "Khung đón ánh sáng."),
    ("Water", "/ˈwɔː.tər/", "danh từ", "nước uống", "Drink pure water every morning.", "Hãy uống nước tinh khiết mỗi sáng.", "glass of water", "Cội nguồn sự sống."),
    ("Food", "/fuːd/", "danh từ", "thức ăn, thực phẩm", "Eat wholesome, nourishing food.", "Hãy ăn những món ăn lành mạnh, bổ dưỡng.", "fresh food", "Dinh dưỡng nuôi cơ thể."),
    ("Bread", "/bred/", "danh từ", "bánh mì", "Warm bread with honey is delicious.", "Bánh mì ấm ăn với mật ong thật ngon miệng.", "slice of bread", "Lương thực căn bản."),
]
for item in a1_w:
    en("A1", u_a1, *item)

u_a1_2 = "Unit 2: Ẩm thực & Thói quen"
a1_w2 = [
    ("Rice", "/raɪs/", "danh từ", "cơm, gạo", "Rice is eaten daily in Vietnam.", "Cơm được ăn hàng ngày ở Việt Nam.", "steamed rice", "Hạt ngọc trời ban."),
    ("Meat", "/miːt/", "danh từ", "thịt", "Lean meat provides good protein.", "Thịt nạc cung cấp lượng đạm tốt.", "fresh meat", "Thực phẩm giàu đạm."),
    ("Fish", "/fɪʃ/", "danh từ", "cá", "Salmon is a nutritious oily fish.", "Cá hồi là một loại cá giàu dinh dưỡng.", "fresh fish", "Thực phẩm sông biển."),
    ("Egg", "/eɡ/", "danh từ", "quả trứng", "Start your morning with a boiled egg.", "Bắt đầu buổi sáng với một quả trứng luộc.", "fried egg", "Bữa ăn giàu protein."),
    ("Milk", "/mɪlk/", "danh từ", "sữa tươi", "Drink milk to strengthen your bones.", "Uống sữa để xương thêm chắc khỏe.", "warm milk", "Giàu canxi và khoáng chất."),
    ("Tea", "/tiː/", "danh từ", "trà, nước chè", "Enjoy a soothing cup of herbal tea.", "Thưởng thức một tách trà thảo mộc êm dịu.", "green tea", "Nét văn hóa tao nhã."),
    ("Coffee", "/ˈkɒf.i/", "danh từ", "cà phê", "Black coffee sharpens mental focus.", "Cà phê đen giúp trí óc tỉnh táo và tập trung.", "hot coffee", "Thức uống tỉnh táo."),
    ("Apple", "/ˈæp.əl/", "danh từ", "quả táo", "Eat a crisp apple as a healthy snack.", "Ăn một quả táo giòn như món ăn nhẹ lành mạnh.", "red apple", "Trái cây giàu chất xơ."),
    ("Orange", "/ˈɒr.ɪndʒ/", "danh từ", "quả cam", "Fresh oranges are packed with vitamin C.", "Cam tươi chứa đầy vitamin C.", "orange juice", "Nước ép thơm mát."),
    ("Banana", "/bəˈnɑː.nə/", "danh từ", "quả chuối", "Bananas give endurance for athletes.", "Chuối mang lại sức bền cho vận động viên.", "ripe banana", "Nạp kali nhanh chóng."),
    ("Eat", "/iːt/", "động từ", "ăn uống", "We eat meals together as a family.", "Chúng tôi ăn cơm cùng nhau như một gia đình.", "eat well", "Hành động nạp năng lượng."),
    ("Drink", "/drɪŋk/", "động từ", "uống nước", "Drink plenty of fluids in summer.", "Uống nhiều nước vào mùa hè.", "drink water", "Bù nước cho cơ thể."),
    ("Sleep", "/sliːp/", "động từ", "ngủ nghỉ", "Sleep deeply for eight hours.", "Hãy ngủ sâu trong tám tiếng.", "sleep well", "Hồi phục tế bào cơ thể."),
    ("Wake", "/weɪk/", "động từ", "thức giấc", "Wake up with gratitude each day.", "Hãy thức dậy với lòng biết ơn mỗi ngày.", "wake up early", "Khởi đầu ngày mới."),
    ("Walk", "/wɔːk/", "động từ", "đi bộ", "We walk along the quiet beach.", "Chúng tôi đi bộ dọc theo bãi biển thanh bình.", "walk slowly", "Vận động nhẹ nhàng."),
    ("Run", "/rʌn/", "động từ", "chạy bộ", "Run for fifteen minutes every day.", "Hãy chạy bộ mười lăm phút mỗi ngày.", "run fast", "Rèn luyện thể lực."),
    ("Read", "/riːd/", "động từ", "đọc sách", "Read inspiring stories of courage.", "Hãy đọc những câu chuyện can trường truyền cảm hứng.", "read books", "Nuôi dưỡng tâm hồn."),
    ("Write", "/raɪt/", "động từ", "viết lách", "Write your diary every evening.", "Hãy viết nhật ký vào mỗi buổi tối.", "write clearly", "Ghi lại tư tưởng."),
    ("Listen", "/ˈlɪs.ən/", "động từ", "lắng nghe", "Listen attentively to good advice.", "Hãy chăm chú lắng nghe lời khuyên hay.", "listen closely", "Âm 't' câm: /ˈlɪs.ən/."),
    ("Speak", "/spiːk/", "động từ", "nói chuyện", "Speak words of kindness and truth.", "Hãy nói những lời nhân ái và chân thành.", "speak English", "Diễn đạt bằng lời nói."),
    ("Buy", "/baɪ/", "động từ", "mua sắm", "Buy only what brings genuine value.", "Chỉ mua những gì mang lại giá trị thực sự.", "buy groceries", "Giao dịch sở hữu."),
    ("Sell", "/sel/", "động từ", "bán hàng", "They sell handcrafted artisan goods.", "Họ bán những món đồ thủ công mỹ nghệ tinh xảo.", "sell goods", "Cung cấp cho thị trường."),
    ("Open", "/ˈəʊ.pən/", "động từ", "mở ra", "Open the door to new possibilities.", "Hãy mở cánh cửa đón những cơ hội mới.", "open wide", "Mở rộng giới hạn."),
    ("Close", "/kləʊz/", "động từ", "đóng lại", "Close the book and reflect on lessons.", "Hãy khép sách lại và suy ngẫm bài học.", "close down", "Khép lại kết thúc."),
    ("Help", "/help/", "động từ/danh từ", "giúp đỡ", "Always be ready to help a neighbor.", "Hãy luôn sẵn sàng giúp đỡ láng giềng.", "help out", "Tương thân tương ái."),
    ("Work", "/wɜːk/", "động từ/danh từ", "làm việc", "Do honest work with diligence.", "Lao động chân chính bằng sự cần mẫn.", "work hard", "Lao động tạo giá trị."),
    ("Play", "/pleɪ/", "động từ", "vui chơi", "Kids play soccer in the yard.", "Lũ trẻ chơi bóng đá trong sân.", "play sports", "Thư giãn tinh thần."),
    ("Live", "/lɪv/", "động từ", "sinh sống", "Live with integrity and honor.", "Hãy sống chính trực và trọn vẹn danh dự.", "live happily", "Cuộc sống có ý nghĩa."),
    ("Like", "/laɪk/", "động từ", "thích thú", "I like simple and honest things.", "Tôi thích những điều giản dị và chân thật.", "like very much", "Có cảm tình tốt."),
    ("Love", "/lʌv/", "động từ/danh từ", "yêu thương", "Love is the greatest human virtue.", "Tình yêu thương là đức tính cao đẹp nhất của con người.", "fall in love", "Cảm xúc thiêng liêng."),
]
for item in a1_w2:
    en("A1", u_a1_2, *item)

u_a1_3 = "Unit 3: Thời gian, Phương tiện & Không gian"
a1_w3 = [
    ("Time", "/taɪm/", "danh từ", "thời gian", "Value every second of your time.", "Hãy trân trọng từng giây phút thời gian của bạn.", "on time", "Tài sản vô giá nhất."),
    ("Day", "/deɪ/", "danh từ", "ngày", "Make each day a masterpiece.", "Hãy biến mỗi ngày thành một tuyệt tác.", "sunny day", "Chu kỳ 24 giờ."),
    ("Night", "/naɪt/", "danh từ", "đêm tối", "The starry night is calm and silent.", "Đêm đầy sao thật êm đềm và tĩnh lặng.", "good night", "Thời gian nghỉ ngơi."),
    ("Morning", "/ˈmɔː.nɪŋ/", "danh từ", "buổi sáng", "Early morning air is crisp and pure.", "Không khí sớm mai thật trong lành và thanh khiết.", "early morning", "Bình minh lên."),
    ("Evening", "/ˈiːv.nɪŋ/", "danh từ", "buổi tối", "Rest and unwind in the evening.", "Hãy nghỉ ngơi và thư giãn vào buổi tối.", "in the evening", "Hoàng hôn buông."),
    ("Today", "/təˈdeɪ/", "danh từ", "hôm nay", "Today is full of new beginnings.", "Hôm nay tràn ngập những khởi đầu mới mẻ.", "today only", "Hiện tại quý giá."),
    ("Tomorrow", "/təˈmɒr.əʊ/", "danh từ", "ngày mai", "Tomorrow promises brighter horizons.", "Ngày mai hứa hẹn những chân trời tươi sáng hơn.", "see you tomorrow", "Tương lai gần."),
    ("Yesterday", "/ˈjes.tə.deɪ/", "danh từ", "hôm qua", "Yesterday is history, learn from it.", "Hôm qua đã là lịch sử, hãy học từ nó.", "yesterday evening", "Quá khứ vừa qua."),
    ("Hour", "/aʊər/", "danh từ", "giờ đồng hồ", "Dedicate one hour daily to study.", "Hãy dành một giờ mỗi ngày để học tập.", "per hour", "Âm 'h' câm: /aʊər/."),
    ("Minute", "/ˈmɪn.ɪt/", "danh từ", "phút", "Give me a minute to finish this.", "Cho tôi một phút để hoàn tất việc này nhé.", "just a minute", "60 giây ngắn ngủi."),
    ("Car", "/kɑːr/", "danh từ", "xe hơi, ô tô", "Modern electric cars are whisper-quiet.", "Xe điện hiện đại chạy êm ru như tiếng thì thầm.", "drive a car", "Phương tiện cá nhân."),
    ("Bus", "/bʌs/", "danh từ", "xe buýt", "Take the express bus downtown.", "Hãy đón tuyến xe buýt nhanh vào trung tâm.", "bus station", "Phương tiện công cộng."),
    ("Train", "/treɪn/", "danh từ", "xe lửa, tàu hỏa", "The high-speed train arrived on time.", "Chuyến tàu cao tốc đã đến ga đúng giờ.", "catch a train", "Phương tiện đường ray."),
    ("Plane", "/pleɪn/", "danh từ", "máy bay", "The plane flew above the clouds.", "Chiếc máy bay lướt đi trên những đám mây.", "by plane", "Phương tiện hàng không."),
    ("Boat", "/bəʊt/", "danh từ", "thuyền bè", "A small boat sailed across the bay.", "Một chiếc thuyền nhỏ giương buồm băng qua vịnh.", "fishing boat", "Phương tiện đường thủy."),
    ("Bicycle", "/ˈbaɪ.sɪ.kəl/", "danh từ", "xe đạp", "Riding a bicycle keeps you fit.", "Đạp xe đạp giúp bạn luôn cân đối khỏe mạnh.", "ride a bicycle", "Bảo vệ môi trường."),
    ("Road", "/rəʊd/", "danh từ", "con đường", "The mountain road is scenic and winding.", "Con đường núi uốn lượn phong cảnh hữu tình.", "open road", "Lối đi giao thông."),
    ("Street", "/striːt/", "danh từ", "phố xá", "Streets in Hanoi are bustling and vibrant.", "Đường phố ở Hà Nội thật nhộn nhịp và sống động.", "main street", "Đường phố dân cư."),
    ("City", "/ˈsɪt.i/", "danh từ", "thành phố", "Metropolitan cities attract talent.", "Những thành phố lớn thu hút nhiều nhân tài.", "big city", "Đô thị hiện đại."),
    ("Village", "/ˈvɪl.ɪdʒ/", "danh từ", "ngôi làng", "Life in the mountain village is peaceful.", "Cuộc sống ở ngôi làng vùng núi thật thanh bình.", "ancient village", "Làng quê mộc mạc."),
    ("Shop", "/ʃɒp/", "danh từ", "cửa tiệm", "A local coffee shop with cozy seats.", "Một quán cà phê địa phương với những chỗ ngồi ấm cúng.", "coffee shop", "Nơi buôn bán nhỏ."),
    ("Market", "/ˈmɑː.kɪt/", "danh từ", "khu chợ", "The morning market is packed with fresh produce.", "Chợ buổi sáng đầy ắp nông sản tươi ngon.", "supermarket", "Nơi trao đổi hàng hóa."),
    ("Money", "/ˈmʌn.i/", "danh từ", "tiền tệ", "Invest money in books and education.", "Hãy đầu tư tiền bạc vào sách vở và giáo dục.", "save money", "Phương tiện thanh toán."),
    ("Price", "/praɪs/", "danh từ", "giá cả", "Fair prices encourage honest trade.", "Mức giá hợp lý khuyến khích thương mại lành mạnh.", "good price", "Số tiền phải trả."),
    ("Bag", "/bæɡ/", "danh từ", "cặp xách, túi", "Carry a reusable canvas bag.", "Hãy mang theo túi vải tái sử dụng.", "handbag", "Đựng đồ cá nhân."),
    ("Box", "/bɒks/", "danh từ", "chiếc hộp", "A wooden box filled with memories.", "Chiếc hộp gỗ chứa đầy những kỷ niệm.", "small box", "Vật chứa hình khối."),
    ("Paper", "/ˈpeɪ.pər/", "danh từ", "giấy viết", "Write your thoughts on crisp white paper.", "Hãy viết suy nghĩ lên trang giấy trắng tinh khôi.", "sheet of paper", "Vật liệu ghi chép."),
    ("Letter", "/ˈlet.ər/", "danh từ", "lá thư, chữ cái", "Handwritten letters carry heartfelt warmth.", "Những lá thư viết tay mang hơi ấm chân tình.", "write a letter", "Thư từ giao tiếp."),
    ("Picture", "/ˈpɪk.tʃər/", "danh từ", "bức tranh, ảnh", "A picture paints a thousand words.", "Một bức tranh đáng giá bằng vạn lời nói.", "take a picture", "Hình ảnh nghệ thuật."),
    ("Clock", "/klɒk/", "danh từ", "đồng hồ", "The antique clock chimed twelve times.", "Chiếc đồng hồ cổ điểm chuông mười hai tiếng.", "wall clock", "Dụng cụ đo giờ."),
]
for item in a1_w3:
    en("A1", u_a1_3, *item)

u_a1_4 = "Unit 4: Tự nhiên, Màu sắc & Cảm xúc"
a1_w4 = [
    ("Sun", "/sʌn/", "danh từ", "mặt trời", "The morning sun banishes shadows.", "Mặt trời sớm mai xua tan bóng tối.", "sunshine", "Nguồn năng lượng Trái Đất."),
    ("Moon", "/muːn/", "danh từ", "mặt trăng", "The autumn moon is round and bright.", "Vầng trăng thu tròn vành vạnh và sáng tỏ.", "full moon", "Trăng thanh gió mát."),
    ("Star", "/stɑːr/", "danh từ", "ngôi sao", "Aim for the stars in your endeavors.", "Hãy nhắm tới các vì sao trong nỗ lực của bạn.", "bright star", "Vật thể tỏa sáng bầu trời."),
    ("Sky", "/skaɪ/", "danh từ", "bầu trời", "The sky turns golden at dusk.", "Bầu trời chuyển sang sắc vàng lúc hoàng hôn.", "blue sky", "Vòm trời bao la."),
    ("Rain", "/reɪn/", "danh từ/động từ", "cơn mưa", "Gentle rain revives the dry land.", "Cơn mưa êm dịu làm hồi sinh mảnh đất khô cằn.", "heavy rain", "Nước tưới mát vạn vật."),
    ("Wind", "/wɪnd/", "danh từ", "ngọn gió", "A refreshing sea wind cooled our faces.", "Cơn gió biển mát rượi xua đi cái nóng trên gương mặt.", "gentle wind", "Không khí chuyển dịch."),
    ("Tree", "/triː/", "danh từ", "cây xanh", "Ancient banyan trees guard the village.", "Cây đa cổ thụ che chở cho cả ngôi làng.", "green tree", "Bóng râm tự nhiên."),
    ("Flower", "/flaʊ.ər/", "danh từ", "bông hoa", "Orchids are elegant and resilient flowers.", "Hoa phong lan là loài hoa thanh nhã và kiên cường.", "fresh flower", "Sắc đẹp tạo hóa."),
    ("River", "/ˈrɪv.ər/", "danh từ", "dòng sông", "Rivers carry life wherever they flow.", "Những dòng sông mang sự sống đến mọi nơi chúng chảy qua.", "river bank", "Dòng nước trong lành."),
    ("Sea", "/siː/", "danh từ", "biển cả", "The turquoise sea stretched to the horizon.", "Vùng biển xanh ngọc bích trải dài đến tận chân trời.", "deep sea", "Đại dương mênh mông."),
    ("Dog", "/dɒɡ/", "danh từ", "chú chó", "Dogs show unwavering loyalty.", "Loài chó thể hiện sự trung thành son sắt.", "faithful dog", "Người bạn trung thành."),
    ("Cat", "/kæt/", "danh từ", "con mèo", "The cat purred contentedly in the sun.", "Chú mèo kêu rừ rừ thỏa mãn dưới ánh mặt trời.", "playful cat", "Vật cưng êm ái."),
    ("Bird", "/bɜːd/", "danh từ", "loài chim", "Songbirds greet the morning sun.", "Những chú chim hót ca chào đón ánh ban mai.", "flying bird", "Tự do cất cánh."),
    ("Fish", "/fɪʃ/", "danh từ", "con cá", "Goldfish swim calmly in the pond.", "Cá vàng bơi lội thanh thản trong hồ.", "swim like a fish", "Sinh vật dưới nước."),
    ("Eye", "/aɪ/", "danh từ", "đôi mắt", "Her eyes shone with sincere joy.", "Đôi mắt cô ấy ánh lên niềm vui chân thành.", "bright eyes", "Cửa sổ tâm hồn."),
    ("Hand", "/hænd/", "danh từ", "bàn tay", "Hold hands and walk forward together.", "Hãy nắm tay nhau và cùng bước về phía trước.", "give a hand", "Bàn tay lao động."),
    ("Heart", "/hɑːt/", "danh từ", "trái tim", "Follow what brings true joy to your heart.", "Hãy đi theo điều gì mang lại niềm vui đích thực cho trái tim.", "warm heart", "Nơi chứa đựng cảm xúc."),
    ("Smile", "/smaɪl/", "danh từ/động từ", "nụ cười", "A kind smile costs nothing but gives much.", "Một nụ cười nhân hậu không tốn kém gì nhưng cho đi rất nhiều.", "bright smile", "Lan tỏa niềm vui."),
    ("Happy", "/ˈhæp.i/", "tính từ", "hạnh phúc", "Be happy with what you currently have.", "Hãy hạnh phúc với những gì bạn đang có hiện tại.", "happy life", "Cảm xúc an lạc."),
    ("Good", "/ɡʊd/", "tính từ", "tốt đẹp", "Good character endures forever.", "Phẩm hạnh tốt đẹp trường tồn mãi mãi.", "good work", "Chuẩn mực đạo đức."),
    ("Red", "/red/", "tính từ", "màu đỏ", "Red roses symbolize affection.", "Hoa hồng đỏ tượng trưng cho tình cảm nồng nàn.", "bright red", "Màu sắc nhiệt huyết."),
    ("Blue", "/bluː/", "tính từ", "màu xanh da trời", "The calm blue ocean soothes the mind.", "Đại dương xanh biếc êm dịu làm thanh thản tâm trí.", "ocean blue", "Màu bình yên."),
    ("Green", "/ɡriːn/", "tính từ", "màu xanh lá", "Green forests protect our ecosystem.", "Những khu rừng xanh bảo vệ hệ sinh thái của chúng ta.", "green nature", "Màu của sự sống."),
    ("Yellow", "/ˈjel.əʊ/", "tính từ", "màu vàng", "Golden yellow autumn leaves carpet the path.", "Những chiếc lá thu vàng óng trải thảm con đường.", "yellow leaves", "Màu của sự tươi vui."),
    ("White", "/waɪt/", "tính từ", "màu trắng", "White clouds sail across azure skies.", "Những đám mây trắng trôi qua bầu trời xanh biếc.", "snow white", "Màu thuần khiết."),
    ("Black", "/blæk/", "tính từ", "màu đen", "The black night sky was illuminated by stars.", "Bầu trời đêm đen thẳm được thắp sáng bởi những vì sao.", "black coffee", "Màu huyền bí."),
    ("Hot", "/hɒt/", "tính từ", "nóng", "Drink cool lemonade on hot afternoons.", "Hãy uống nước chanh mát vào những buổi trưa nóng nực.", "hot summer", "Nhiệt độ cao."),
    ("Cold", "/kəʊld/", "tính từ", "lạnh giá", "Crisp cold winter air refreshes breathing.", "Không khí mùa đông lạnh se làm tươi mới từng nhịp thở.", "cold winter", "Nhiệt độ thấp."),
    ("Warm", "/wɔːm/", "tính từ", "ấm áp", "A warm embrace gives reassurance.", "Một cái ôm ấm áp mang lại sự an tâm tuyệt vời.", "warm tea", "Nhiệt độ dễ chịu."),
    ("Easy", "/ˈiː.zi/", "tính từ", "dễ dàng", "Simple steps make daunting tasks easy.", "Từng bước giản dị giúp những việc to tát trở nên dễ dàng.", "take it easy", "Thuận lợi không khó khăn."),
]
for item in a1_w4:
    en("A1", u_a1_4, *item)

print(f"Total so far: {len(words)} words.")
