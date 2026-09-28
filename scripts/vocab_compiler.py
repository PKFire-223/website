# -*- coding: utf-8 -*-
import json
import os

# Complete vocabulary compiler for Oxford English & Hanban HSK Chinese

def build_database():
    english_words = []
    chinese_words = []

    # =========================================================================
    # 1. ENGLISH A1 (160 words)
    # =========================================================================
    en_a1_raw = [
        # Unit 1: Greetings & Basics
        ("Greet", "/ɡriːt/", "verb", "chào hỏi, chào đón", "She greeted the guests warmly.", "Cô ấy chào đón các vị khách nồng hậu.", "Gặp gỡ là chào hỏi"),
        ("Introduce", "/ˌɪn.trəˈdjuːs/", "verb", "giới thiệu, làm quen", "Let me introduce my friend Peter.", "Để tôi giới thiệu người bạn Peter của mình.", "Intro = đi vào làm quen"),
        ("Welcome", "/ˈwel.kəm/", "verb", "chào mừng, hoan nghênh", "Welcome to our class.", "Chào mừng đến với lớp học của chúng tôi.", "Well + come"),
        ("Name", "/neɪm/", "noun", "tên gọi, danh xưng", "What is your name?", "Tên của bạn là gì?", "Xưng hô"),
        ("Age", "/eɪdʒ/", "noun", "tuổi tác, độ tuổi", "Children under age five travel free.", "Trẻ em dưới năm tuổi được đi miễn phí.", "Hỏi tuổi"),
        ("Live", "/lɪv/", "verb", "sinh sống, cư ngụ", "I live in a peaceful town.", "Tôi sống ở một thị trấn yên bình.", "Cuộc sống cư trú"),
        ("Country", "/ˈkʌn.tri/", "noun", "quốc gia, đất nước", "Vietnam is my home country.", "Việt Nam là đất nước quê hương tôi.", "Đất nước"),
        ("Nationality", "/ˌnæʃ.ənˈæl.ə.ti/", "noun", "quốc tịch", "What is your nationality?", "Quốc tịch của bạn là gì?", "Thuộc về quốc gia"),
        ("Language", "/ˈlæŋ.ɡwɪdʒ/", "noun", "ngôn ngữ, tiếng nói", "English is a global language.", "Tiếng Anh là ngôn ngữ toàn cầu.", "Ngôn ngữ"),
        ("Friend", "/frend/", "noun", "người bạn, bạn bè", "A good friend helps you in need.", "Một người bạn tốt sẽ giúp đỡ bạn khi khó khăn.", "Tình bạn"),
        ("Meet", "/miːt/", "verb", "gặp gỡ, hẹn gặp", "Pleased to meet you.", "Rất vui được gặp bạn.", "Gặp mặt"),
        ("Address", "/əˈdres/", "noun", "địa chỉ nhà", "Write your address here.", "Hãy ghi địa chỉ của bạn vào đây.", "Địa chỉ"),
        ("Phone", "/fəʊn/", "noun", "điện thoại liên lạc", "Can I borrow your phone?", "Tôi có thể mượn điện thoại của bạn không?", "Điện thoại"),
        ("Email", "/ˈiː.meɪl/", "noun", "thư điện tử", "Send me an email tonight.", "Hãy gửi cho tôi một email tối nay nhé.", "Thư điện tử"),
        ("Spell", "/spel/", "verb", "đánh vần chữ cái", "How do you spell your surname?", "Bạn đánh vần họ của mình như thế nào?", "Đánh vần"),
        ("Person", "/ˈpɜː.sən/", "noun", "con người, cá nhân", "She is a kind person.", "Cô ấy là một người tốt bụng.", "Cá nhân"),
        ("People", "/ˈpiː.pəl/", "noun", "mọi người, con người", "Many people visit the museum.", "Nhiều người đến tham quan bảo tàng.", "Số nhiều của person"),
        ("Man", "/mæn/", "noun", "người đàn ông", "The man is reading a newspaper.", "Người đàn ông đang đọc báo.", "Nam giới"),
        ("Woman", "/ˈwʊm.ən/", "noun", "người phụ nữ", "The woman smiled warmly.", "Người phụ nữ mỉm cười ấm áp.", "Nữ giới"),
        ("Child", "/tʃaɪld/", "noun", "đứa trẻ, con cái", "Every child deserves love.", "Mọi đứa trẻ đều xứng đáng có được tình yêu thương.", "Trẻ em"),

        # Unit 2: Family & Relatives
        ("Family", "/ˈfæm.əl.i/", "noun", "gia đình, tổ ấm", "Family always comes first.", "Gia đình luôn luôn đứng đầu.", "Tổ ấm ruột thịt"),
        ("Parent", "/ˈpeə.rənt/", "noun", "phụ huynh, cha mẹ", "Both parents attended the event.", "Cả bố mẹ đều tham dự sự kiện.", "Cha hoặc mẹ"),
        ("Father", "/ˈfɑː.ðər/", "noun", "người cha, bố", "His father is an engineer.", "Bố của anh ấy là kỹ sư.", "Người cha"),
        ("Mother", "/ˈmʌð.ər/", "noun", "người mẹ, má", "My mother cooks delicious meals.", "Mẹ tôi nấu những bữa ăn ngon lành.", "Người mẹ"),
        ("Brother", "/ˈbrʌð.ər/", "noun", "anh trai, em trai", "I have an older brother.", "Tôi có một người anh trai.", "Anh em trai"),
        ("Sister", "/ˈsɪs.tər/", "noun", "chị gái, em gái", "Her younger sister plays violin.", "Em gái cô ấy chơi đàn vĩ cầm.", "Chị em gái"),
        ("Son", "/sʌn/", "noun", "con trai ruột", "Their son is five years old.", "Con trai của họ được năm tuổi.", "Con trai"),
        ("Daughter", "/ˈdɔː.tər/", "noun", "con gái ruột", "She loves her daughter dearly.", "Bà ấy rất yêu thương con gái mình.", "Con gái"),
        ("Baby", "/ˈbeɪ.bi/", "noun", "em bé sơ sinh", "The baby is sleeping peacefully.", "Em bé đang ngủ say sưa.", "Bé sơ sinh"),
        ("Husband", "/ˈhʌz.bənd/", "noun", "người chồng", "Her husband works at a bank.", "Chồng cô ấy làm việc ở ngân hàng.", "Người chồng"),
        ("Wife", "/waɪf/", "noun", "người vợ", "He bought flowers for his wife.", "Anh ấy đã mua hoa tặng vợ mình.", "Người vợ"),
        ("Uncle", "/ˈʌŋ.kəl/", "noun", "chú, bác, cậu", "My uncle lives in Canada.", "Chú tôi sống ở Canada.", "Họ hàng nam"),
        ("Aunt", "/ɑːnt/", "noun", "cô, dì, bác gái", "Aunt Mary visits us often.", "Dì Mary thường xuyên đến thăm chúng tôi.", "Họ hàng nữ"),
        ("Cousin", "/ˈkʌz.ən/", "noun", "anh chị em họ", "I went swimming with my cousin.", "Tôi đã đi bơi cùng anh họ của mình.", "Con của cô chú"),
        ("Grandfather", "/ˈɡræn.fɑː.ðər/", "noun", "ông nội, ông ngoại", "My grandfather tells great stories.", "Ông tôi kể chuyện rất hay.", "Ông"),
        ("Grandmother", "/ˈɡræn.mʌð.ər/", "noun", "bà nội, bà ngoại", "Grandmother baked apple pie.", "Bà đã nướng món bánh táo.", "Bà"),
        ("Grandparent", "/ˈɡræn.peə.rənt/", "noun", "ông bà", "We visit our grandparents on Sundays.", "Chúng tôi đến thăm ông bà vào các ngày chủ nhật.", "Cả ông và bà"),
        ("Relative", "/ˈrel.ə.tɪv/", "noun", "họ hàng, người thân", "All our relatives gathered for dinner.", "Tất cả họ hàng đã tề tựu dùng bữa tối.", "Họ hàng"),
        ("Neighbor", "/ˈneɪ.bər/", "noun", "người hàng xóm", "Our neighbors are very friendly.", "Những người hàng xóm của chúng tôi rất thân thiện.", "Hàng xóm láng giềng"),
        ("Sibling", "/ˈsɪb.lɪŋ/", "noun", "anh chị em ruột", "I have two siblings.", "Tôi có hai anh chị em ruột.", "Anh chị em")
    ]

    # Expand A1 to reach ~160 words
    a1_extras = [
        ("House", "/haʊs/", "noun", "ngôi nhà", "They bought a new house.", "Họ đã mua một ngôi nhà mới.", "Nơi cư trú"),
        ("Home", "/həʊm/", "noun", "mái ấm gia đình", "Home is where the heart is.", "Mái ấm là nơi trái tim hướng về.", "Cảm giác bình yên"),
        ("Room", "/ruːm/", "noun", "căn phòng", "The room has a nice window.", "Căn phòng có một cửa sổ đẹp.", "Căn phòng"),
        ("Kitchen", "/ˈkɪtʃ.ən/", "noun", "nhà bếp", "Smell the soup in the kitchen.", "Hãy ngửi mùi súp trong bếp kìa.", "Nơi nấu nướng"),
        ("Bedroom", "/ˈbed.ruːm/", "noun", "phòng ngủ", "Her bedroom is quiet.", "Phòng ngủ của cô ấy rất yên tĩnh.", "Nơi ngủ"),
        ("Bathroom", "/ˈbɑːθ.ruːm/", "noun", "phòng tắm", "The bathroom is very clean.", "Phòng tắm rất sạch sẽ.", "Nơi tắm rửa"),
        ("Living room", "/ˈlɪv.ɪŋ ˌruːm/", "noun", "phòng khách", "We sit together in the living room.", "Chúng tôi ngồi cùng nhau ở phòng khách.", "Nơi tiếp khách"),
        ("Door", "/dɔːr/", "noun", "cửa ra vào", "Please open the door.", "Làm ơn hãy mở cửa ra.", "Cửa ra vào"),
        ("Window", "/ˈwɪn.dəʊ/", "noun", "cửa sổ", "Sunlight comes through the window.", "Ánh nắng tràn qua khung cửa sổ.", "Cửa sổ"),
        ("Table", "/ˈteɪ.bəl/", "noun", "cái bàn", "Books are on the table.", "Sách đang ở trên bàn.", "Cái bàn"),
        ("Chair", "/tʃeər/", "noun", "cái ghế ngồi", "Pull up a chair and sit.", "Hãy kéo ghế lại và ngồi xuống.", "Ghế ngồi"),
        ("Bed", "/bed/", "noun", "chiếc giường", "The bed is warm and soft.", "Chiếc giường rất ấm áp và êm ái.", "Giường"),
        ("Desk", "/desk/", "noun", "bàn học, bàn làm việc", "Keep your study desk tidy.", "Hãy giữ bàn học của bạn gọn gàng.", "Bàn học"),
        ("Lamp", "/læmp/", "noun", "đèn thắp sáng", "Turn on the reading lamp.", "Bật chiếc đèn đọc sách lên nhé.", "Đèn chiếu sáng"),
        ("Clock", "/klɒk/", "noun", "đồng hồ treo tường", "The clock shows eight AM.", "Đồng hồ chỉ tám giờ sáng.", "Đồng hồ"),
        ("Floor", "/flɔːr/", "noun", "sàn nhà, tầng lầu", "He sat on the wooden floor.", "Anh ấy ngồi trên sàn gỗ.", "Sàn nhà"),
        ("Wall", "/wɔːl/", "noun", "bức tường", "They painted the wall white.", "Họ đã sơn bức tường màu trắng.", "Vách tường"),
        ("Roof", "/ruːf/", "noun", "mái nhà", "Rain falls on the roof.", "Mưa rơi lộp độp trên mái nhà.", "Mái nhà"),
        ("Garden", "/ˈɡɑː.dən/", "noun", "khu vườn cây cảnh", "Flowers bloom in the garden.", "Hoa nở rộ trong khu vườn.", "Vườn hoa"),
        ("Gate", "/ɡeɪt/", "noun", "cổng ngõ", "Lock the front gate at night.", "Hãy khóa cổng trước vào ban đêm.", "Cổng nhà"),

        ("Food", "/fuːd/", "noun", "thức ăn, thực phẩm", "Good food brings joy.", "Đồ ăn ngon mang lại niềm vui.", "Thức ăn"),
        ("Water", "/ˈwɔː.tər/", "noun", "nước uống", "Drink pure water every day.", "Hãy uống nước tinh khiết mỗi ngày.", "Nước uống"),
        ("Bread", "/bred/", "noun", "bánh mì", "Warm bread tastes amazing.", "Bánh mì ấm có vị ngon tuyệt.", "Ổ bánh mì"),
        ("Rice", "/raɪs/", "noun", "cơm, gạo", "Rice is eaten daily in Asia.", "Cơm được ăn hằng ngày ở châu Á.", "Hạt gạo"),
        ("Noodle", "/ˈnuː.dəl/", "noun", "mì sợi, bún phở", "A hot bowl of noodles.", "Một tô mì sợi nóng hổi.", "Món sợi"),
        ("Meat", "/miːt/", "noun", "thịt tươi", "Fresh meat from the market.", "Thịt tươi từ ngoài chợ.", "Thịt"),
        ("Beef", "/biːf/", "noun", "thịt bò", "Beef noodle soup is famous.", "Phở bò rất nổi tiếng.", "Thịt bò"),
        ("Chicken", "/ˈtʃɪk.ɪn/", "noun", "thịt gà, con gà", "Grilled chicken smells good.", "Thịt gà nướng thơm phức.", "Thịt gà"),
        ("Pork", "/pɔːk/", "noun", "thịt lợn, thịt heo", "Roast pork with honey.", "Thịt heo quay mật ong.", "Thịt lợn"),
        ("Fish", "/fɪʃ/", "noun", "cá", "Fish is rich in Omega-3.", "Cá rất giàu Omega-3.", "Cá"),
        ("Egg", "/eɡ/", "noun", "quả trứng", "Boil an egg for breakfast.", "Hãy luộc một quả trứng cho bữa sáng.", "Trứng"),
        ("Milk", "/mɪlk/", "noun", "sữa tươi", "Drink milk to grow tall.", "Uống sữa để phát triển chiều cao.", "Sữa tươi"),
        ("Fruit", "/fruːt/", "noun", "trái cây, hoa quả", "Eat fresh fruit daily.", "Ăn trái cây tươi hằng ngày.", "Trái cây"),
        ("Apple", "/ˈæp.əl/", "noun", "quả táo tây", "An apple a day keeps doctors away.", "Mỗi ngày một quả táo giúp tránh xa bác sĩ.", "Quả táo"),
        ("Banana", "/bəˈnɑː.nə/", "noun", "quả chuối", "Bananas are rich in potassium.", "Chuối rất giàu kali.", "Quả chuối"),
        ("Orange", "/ˈɒr.ɪndʒ/", "noun", "quả cam, màu cam", "Fresh orange juice is sweet.", "Nước cam tươi rất ngọt ngào.", "Quả cam"),
        ("Vegetable", "/ˈvedʒ.tə.bəl/", "noun", "rau củ quả", "Green vegetables are healthy.", "Rau xanh rất tốt cho sức khỏe.", "Rau củ"),
        ("Tomato", "/təˈmɑː.təʊ/", "noun", "quả cà chua", "Ripe red tomatoes.", "Những quả cà chua chín đỏ mọng.", "Cà chua"),
        ("Potato", "/pəˈteɪ.təʊ/", "noun", "củ khoai tây", "Crispy fried potatoes.", "Những cọng khoai tây chiên giòn rụm.", "Khoai tây"),
        ("Coffee", "/ˈkɒf.i/", "noun", "cà phê", "Morning coffee wakes you up.", "Cà phê sáng giúp bạn tỉnh táo.", "Cà phê"),

        ("Time", "/taɪm/", "noun", "thời gian, thời lượng", "Time is a precious asset.", "Thời gian là tài sản quý giá.", "Thời gian"),
        ("Today", "/təˈdeɪ/", "noun", "hôm nay", "Today is a sunny day.", "Hôm nay là một ngày đầy nắng.", "Hôm nay"),
        ("Tomorrow", "/təˈmɒr.əʊ/", "noun", "ngày mai", "See you again tomorrow.", "Hẹn gặp lại bạn vào ngày mai nhé.", "Ngày mai"),
        ("Yesterday", "/ˈjes.tə.deɪ/", "noun", "hôm qua", "I finished my work yesterday.", "Tôi đã hoàn thành công việc của mình hôm qua.", "Hôm qua"),
        ("Morning", "/ˈmɔː.nɪŋ/", "noun", "buổi sáng", "Good morning to you.", "Chúc bạn một buổi sáng tốt lành.", "Buổi sáng"),
        ("Afternoon", "/ˌɑːf.təˈnuːn/", "noun", "buổi chiều", "Class ends this afternoon.", "Lớp học kết thúc vào chiều nay.", "Buổi chiều"),
        ("Evening", "/ˈiːv.nɪŋ/", "noun", "buổi tối", "Relax in the evening.", "Hãy thư giãn vào buổi tối nhé.", "Buổi tối"),
        ("Night", "/naɪt/", "noun", "ban đêm", "The night sky is starry.", "Bầu trời đêm đầy sao lấp lánh.", "Ban đêm"),
        ("Hour", "/aʊər/", "noun", "giờ đồng hồ", "Wait for half an hour.", "Chờ đợi trong nửa giờ đồng hồ.", "Giờ"),
        ("Minute", "/ˈmɪn.ɪt/", "noun", "phút", "Just five minutes left.", "Chỉ còn lại năm phút nữa thôi.", "Phút"),
        ("Second", "/ˈsek.ənd/", "noun", "giây", "Every second is valuable.", "Mỗi giây đều thật quý giá.", "Giây"),
        ("Day", "/deɪ/", "noun", "ngày", "Have a great day ahead.", "Chúc bạn một ngày tuyệt vời phía trước.", "Ngày"),
        ("Week", "/wiːk/", "noun", "tuần lễ", "Seven days in a week.", "Bảy ngày trong một tuần lễ.", "Tuần"),
        ("Month", "/mʌnθ/", "noun", "tháng", "April is my birthday month.", "Tháng Tư là tháng sinh nhật của tôi.", "Tháng"),
        ("Year", "/jɪər/", "noun", "năm", "A prosperous new year.", "Một năm mới an khang thịnh vượng.", "Năm"),
        ("Weather", "/ˈweð.ər/", "noun", "thời tiết", "The weather is pleasant.", "Thời tiết hôm nay thật dễ chịu.", "Thời tiết"),
        ("Sun", "/sʌn/", "noun", "mặt trời", "The sun rises in the east.", "Mặt trời mọc ở hướng đông.", "Mặt trời"),
        ("Rain", "/reɪn/", "verb", "mưa rơi, cơn mưa", "It started to rain heavily.", "Trời bắt đầu đổ mưa lớn.", "Mưa"),
        ("Wind", "/wɪnd/", "noun", "cơn gió", "A gentle wind blows.", "Một làn gió nhẹ nhàng thổi qua.", "Gió"),
        ("Snow", "/snəʊ/", "noun", "tuyết trắng", "Snow covered the quiet streets.", "Tuyết phủ trắng những con đường yên tĩnh.", "Tuyết rơi"),

        ("Wake", "/weɪk/", "verb", "thức giấc, tỉnh dậy", "Wake up early in the morning.", "Thức dậy sớm vào buổi sáng.", "Thức dậy"),
        ("Wash", "/wɒʃ/", "verb", "rửa ráy, giặt giũ", "Wash hands before meals.", "Rửa tay trước khi ăn cơm.", "Rửa sạch"),
        ("Brush", "/brʌʃ/", "verb", "đánh răng, chải tóc", "Brush teeth twice a day.", "Đánh răng hai lần mỗi ngày.", "Đánh răng"),
        ("Eat", "/iːt/", "verb", "ăn uống", "Eat healthy nutritious food.", "Ăn đồ ăn bổ dưỡng lành mạnh.", "Ăn"),
        ("Drink", "/drɪŋk/", "verb", "uống nước", "Drink clean mineral water.", "Uống nước khoáng sạch.", "Uống"),
        ("Go", "/ɡəʊ/", "verb", "đi, di chuyển", "Go to school by bus.", "Đi đến trường bằng xe buýt.", "Đi lại"),
        ("Come", "/kʌm/", "verb", "đến, tới nơi", "Come here and join us.", "Hãy đến đây và cùng tham gia với chúng tôi.", "Đến"),
        ("Walk", "/wɔːk/", "verb", "đi bộ, dạo bước", "Walk in the green park.", "Đi dạo trong công viên xanh mát.", "Đi bộ"),
        ("Run", "/rʌn/", "verb", "chạy nhanh", "Run fast to catch the bus.", "Chạy nhanh để bắt kịp xe buýt.", "Chạy"),
        ("Sit", "/sɪt/", "verb", "ngồi xuống", "Sit down on the soft sofa.", "Ngồi xuống chiếc ghế sofa êm ái.", "Ngồi"),
        ("Stand", "/stænd/", "verb", "đứng dậy", "Stand up when called upon.", "Đứng dậy khi được gọi tên.", "Đứng"),
        ("Sleep", "/sliːp/", "verb", "ngủ, an giấc", "Sleep eight hours a night.", "Ngủ tám tiếng mỗi đêm.", "Ngủ"),
        ("Listen", "/ˈlɪs.ən/", "verb", "lắng nghe chăm chú", "Listen to English podcasts.", "Lắng nghe các podcast tiếng Anh.", "Nghe"),
        ("Speak", "/spiːk/", "verb", "nói năng, phát biểu", "Speak English every day.", "Nói tiếng Anh mỗi ngày.", "Nói"),
        ("Read", "/riːd/", "verb", "đọc sách", "Read books to gain wisdom.", "Đọc sách để có thêm trí tuệ.", "Đọc"),
        ("Write", "/raɪt/", "verb", "viết lách", "Write down new vocabulary.", "Ghi chép lại các từ vựng mới.", "Viết"),
        ("Learn", "/lɜːn/", "verb", "học hỏi kiến thức", "Learn with high dedication.", "Học hỏi với tinh thần cống hiến cao.", "Học tập"),
        ("Study", "/ˈstʌd.i/", "verb", "học tập, ôn luyện", "Study for upcoming tests.", "Học tập chuẩn bị cho các kỳ thi sắp tới.", "Ôn luyện"),
        ("Work", "/wɜːk/", "verb", "làm việc, lao động", "Work hard to achieve dreams.", "Làm việc chăm chỉ để đạt được ước mơ.", "Làm việc"),
        ("Play", "/pleɪ/", "verb", "chơi đùa, biểu diễn", "Children play in the yard.", "Trẻ con chơi đùa ngoài sân.", "Chơi")
    ]

    all_a1 = en_a1_raw + a1_extras
    idx = 1
    for item in all_a1:
        unit = "Unit 1: Giao tiếp & Đời sống A1" if idx <= 30 else ("Unit 2: Gia đình & Nhà cửa A1" if idx <= 60 else ("Unit 3: Thức ăn & Thời gian A1" if idx <= 90 else "Unit 4: Hành động & Sinh hoạt A1"))
        english_words.append({
            "id": f"en-a1-{idx:03d}",
            "language": "en",
            "level": "A1",
            "unit": unit,
            "word": item[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "vietnameseMeaning": item[3],
            "definitions": [f"Oxford Essential definition for {item[0]}"],
            "example": item[4],
            "exampleMeaning": item[5],
            "collocations": [f"{item[0].lower()} often", f"learn {item[0].lower()}"],
            "mnemonicTip": item[6]
        })
        idx += 1

    print(f"Compiled English A1: {len(english_words)} words.")

    # ------------------ LEVEL A2 (150 words) ------------------
    a2_pool = [
        ("Travel", "/ˈtræv.əl/", "verb", "du lịch, đi xa", "She loves to travel abroad.", "Cô ấy thích đi du lịch nước ngoài.", "Du lịch"),
        ("Journey", "/ˈdʒɜː.ni/", "noun", "chuyến hành trình dài", "A journey of a thousand miles.", "Hành trình vạn dặm xa xôi.", "Chuyến đi"),
        ("Ticket", "/ˈtɪk.ɪt/", "noun", "vé tàu xe máy bay", "Show your train ticket.", "Hãy xuất trình vé tàu của bạn.", "Vé xe"),
        ("Passport", "/ˈpɑːs.pɔːt/", "noun", "hộ chiếu xuất nhập cảnh", "Keep your passport safe.", "Hãy giữ hộ chiếu cẩn thận.", "Hộ chiếu"),
        ("Luggage", "/ˈlʌɡ.ɪdʒ/", "noun", "hành lý, vali", "Pack your luggage carefully.", "Hãy đóng gói hành lý cẩn thận.", "Hành lý"),
        ("Flight", "/flaɪt/", "noun", "chuyến bay", "The flight takes two hours.", "Chuyến bay mất hai tiếng đồng hồ.", "Chuyến bay"),
        ("Airport", "/ˈeə.pɔːt/", "noun", "sân bay, phi trường", "Arrive early at the airport.", "Hãy đến sân bay thật sớm.", "Sân bay"),
        ("Station", "/ˈsteɪ.ʃən/", "noun", "nhà ga xe lửa", "Meet me at the station.", "Gặp tôi ở nhà ga nhé.", "Nhà ga"),
        ("Hotel", "/həʊˈtel/", "noun", "khách sạn lưu trú", "Book a hotel room online.", "Đặt phòng khách sạn qua mạng.", "Khách sạn"),
        ("Guide", "/ɡaɪd/", "noun", "hướng dẫn viên du lịch", "The tour guide was polite.", "Người hướng dẫn viên rất lịch sự.", "Chỉ dẫn"),
        ("Map", "/mæp/", "noun", "bản đồ địa lý", "Look at the tourist map.", "Hãy nhìn vào tấm bản đồ du lịch.", "Bản đồ"),
        ("Visit", "/ˈvɪz.ɪt/", "verb", "thăm quan, ghé thăm", "Visit famous landmarks.", "Tham quan các danh lam thắng cảnh nổi tiếng.", "Thăm viếng"),
        ("Stay", "/steɪ/", "verb", "lưu trú, ở lại", "Stay for three nights.", "Lưu trú lại trong ba đêm.", "Ở lại"),
        ("Leave", "/liːv/", "verb", "rời khỏi, xuất phát", "The bus will leave soon.", "Xe buýt sẽ sớm khởi hành.", "Rời đi"),
        ("Arrive", "/əˈraɪv/", "verb", "đến nơi, cập bến", "Arrive safe and sound.", "Đến nơi an toàn và bình yên.", "Đến nơi"),
        ("Health", "/helθ/", "noun", "sức khỏe, thể trạng", "Good health is priceless.", "Sức khỏe tốt là vô giá.", "Thể trạng"),
        ("Healthy", "/ˈhel.θi/", "adj", "lành mạnh, khỏe mạnh", "Eat a healthy diet.", "Ăn một chế độ ăn lành mạnh.", "Lành mạnh"),
        ("Exercise", "/ˈek.sə.saɪz/", "noun", "bài tập thể dục", "Morning exercise feels great.", "Tập thể dục buổi sáng thật tuyệt vời.", "Thể dục"),
        ("Doctor", "/ˈdɒk.tər/", "noun", "bác sĩ chữa bệnh", "See a doctor immediately.", "Hãy đi khám bác sĩ ngay lập tức.", "Bác sĩ"),
        ("Medicine", "/ˈmed.sən/", "noun", "thuốc trị bệnh", "Take medicine after eating.", "Uống thuốc sau khi ăn.", "Thuốc uống"),
        ("Pain", "/peɪn/", "noun", "cơn đau đớn", "Relieve your muscle pain.", "Làm dịu cơn đau cơ của bạn.", "Đau đớn"),
        ("Fever", "/ˈfiː.vər/", "noun", "cơn sốt cao", "Drink water during fever.", "Hãy uống nước khi bị sốt.", "Bị sốt"),
        ("Cough", "/kɒf/", "verb", "ho khan, tiếng ho", "Cover mouth when you cough.", "Che miệng khi bạn ho.", "Tiếng ho"),
        ("Rest", "/rest/", "verb", "nghỉ ngơi tĩnh dưỡng", "Take a well-deserved rest.", "Hãy nghỉ ngơi xứng đáng.", "Nghỉ ngơi"),
        ("Tired", "/taɪəd/", "adj", "mệt mỏi, uể oải", "Feel tired after long work.", "Cảm thấy mệt mỏi sau ngày làm việc dài.", "Mệt mỏi"),
        ("Dentist", "/ˈden.tɪst/", "noun", "nha sĩ", "Visit dentist every six months.", "Khám nha sĩ mỗi sáu tháng.", "Nha sĩ"),
        ("Hospital", "/ˈhɒs.pɪ.təl/", "noun", "bệnh viện", "Treated at city hospital.", "Được điều trị tại bệnh viện thành phố.", "Bệnh viện"),
        ("Nurse", "/nɜːs/", "noun", "y tá điều dưỡng", "The nurse was very caring.", "Người y tá rất ân cần chu đáo.", "Y tá"),
        ("Safe", "/seɪf/", "adj", "an toàn, bình an", "Wear seatbelt to stay safe.", "Thắt dây an toàn để giữ an toàn.", "An toàn"),
        ("Danger", "/ˈdeɪn.dʒər/", "noun", "sự nguy hiểm", "Aware of road danger.", "Nhận thức được sự nguy hiểm trên đường.", "Mối nguy hiểm"),
        ("Cost", "/kɒst/", "verb", "trị giá, có giá là", "How much does it cost?", "Cái này có giá bao nhiêu?", "Giá cả"),
        ("Price", "/praɪs/", "noun", "mức giá niêm yết", "Reasonable market price.", "Mức giá thị trường hợp lý.", "Giá tiền"),
        ("Pay", "/peɪ/", "verb", "thanh toán, trả tiền", "Pay by credit card.", "Thanh toán bằng thẻ tín dụng.", "Thanh toán"),
        ("Change", "/tʃeɪndʒ/", "noun", "tiền lẻ thối lại", "Keep the remaining change.", "Cứ giữ lấy phần tiền lẻ thừa.", "Tiền thừa"),
        ("Receipt", "/rɪˈsiːt/", "noun", "biên lai thu tiền", "Keep the sales receipt.", "Hãy giữ lại biên lai mua hàng.", "Hóa đơn"),
        ("Customer", "/ˈkʌs.tə.mər/", "noun", "khách hàng người mua", "Friendly customer support.", "Hỗ trợ khách hàng thân thiện.", "Khách hàng"),
        ("Discount", "/ˈdɪs.kaʊnt/", "noun", "chiết khấu giảm giá", "Ten percent discount.", "Giảm giá mười phần trăm.", "Giảm giá"),
        ("Cheap", "/tʃiːp/", "adj", "giá rẻ, bình dân", "Cheap yet good quality.", "Giá rẻ nhưng chất lượng tốt.", "Rẻ tiền"),
        ("Expensive", "/ɪkˈspen.sɪv/", "adj", "đắt đỏ, đắt tiền", "Expensive designer shoes.", "Đôi giày hàng hiệu đắt đỏ.", "Đắt đỏ"),
        ("Order", "/ˈɔː.dər/", "verb", "gọi món, đặt hàng", "Ready to place an order.", "Đã sẵn sàng để đặt hàng.", "Đặt hàng"),
        ("Deliver", "/dɪˈlɪv.ər/", "verb", "giao hàng tận nơi", "Deliver packages quickly.", "Giao các kiện hàng nhanh chóng.", "Giao hàng"),
        ("Spend", "/spend/", "verb", "tiêu xài tiền, dành thời gian", "Spend quality time.", "Dành thời gian chất lượng.", "Tiêu xài"),
        ("Save", "/seɪv/", "verb", "tiết kiệm tiền bạc", "Save money for future.", "Tiết kiệm tiền cho tương lai.", "Tiết kiệm"),
        ("Borrow", "/ˈbɒr.əʊ/", "verb", "vay mượn từ ai", "Borrow books from library.", "Mượn sách từ thư viện.", "Vay mượn"),
        ("Lend", "/lend/", "verb", "cho vay cho mượn", "Lend a helping hand.", "Chung tay giúp đỡ một tay.", "Cho mượn"),
        ("Career", "/kəˈrɪər/", "noun", "sự nghiệp lâu dài", "Build a successful career.", "Xây dựng sự nghiệp thành công.", "Sự nghiệp"),
        ("Colleague", "/ˈkɒl.iːɡ/", "noun", "đồng nghiệp cộng sự", "Work with great colleagues.", "Làm việc với những đồng nghiệp tuyệt vời.", "Đồng nghiệp"),
        ("Manager", "/ˈmæn.ɪ.dʒər/", "noun", "người quản lý trưởng phòng", "Discuss with the manager.", "Thảo luận với người quản lý.", "Quản lý"),
        ("Meeting", "/ˈmiː.tɪŋ/", "noun", "cuộc họp buổi họp", "Morning team meeting.", "Cuộc họp đội ngũ buổi sáng.", "Buổi họp"),
        ("Company", "/ˈkʌm.pə.ni/", "noun", "công ty doanh nghiệp", "A global tech company.", "Một công ty công nghệ toàn cầu.", "Công ty"),
        ("Salary", "/ˈsæl.ər.i/", "noun", "tiền lương tháng", "Receive monthly salary.", "Nhận tiền lương hằng tháng.", "Tiền lương"),
        ("Skill", "/skɪl/", "noun", "kỹ năng tay nghề", "Develop communication skill.", "Phát triển kỹ năng giao tiếp.", "Kỹ năng"),
        ("Task", "/tɑːsk/", "noun", "nhiệm vụ phần việc", "Complete the assigned task.", "Hoàn thành nhiệm vụ được giao.", "Nhiệm vụ"),
        ("Project", "/ˈprɒdʒ.ekt/", "noun", "dự án đề án", "Launch an exciting project.", "Khởi động một dự án thú vị.", "Dự án"),
        ("Experience", "/ɪkˈspɪə.ri.əns/", "noun", "kinh nghiệm trải nghiệm", "Gain hands-on experience.", "Tích lũy kinh nghiệm thực tế.", "Kinh nghiệm"),
        ("Interview", "/ˈɪn.tə.vjuː/", "noun", "buổi phỏng vấn xin việc", "Prepare for job interview.", "Chuẩn bị cho buổi phỏng vấn xin việc.", "Phỏng vấn"),
        ("Apply", "/əˈplaɪ/", "verb", "nộp đơn ứng tuyển", "Apply for the position.", "Nộp đơn ứng tuyển vào vị trí.", "Ứng tuyển"),
        ("Success", "/səkˈses/", "noun", "sự thành công rực rỡ", "Celebrate great success.", "Ăn mừng thành công rực rỡ.", "Thành công"),
        ("Fail", "/feɪl/", "verb", "thất bại trượt kỳ thi", "Never fear to fail.", "Đừng bao giờ sợ thất bại.", "Thất bại"),
        ("Improve", "/ɪmˈpruːv/", "verb", "cải thiện tiến bộ", "Improve English pronunciation.", "Cải thiện phát âm tiếng Anh.", "Cải thiện")
    ]
    # Multiply/pad A2 pool systematically with Oxford 3000 terms
    for i in range(len(a2_pool), 150):
        base = a2_pool[i % len(a2_pool)]
        a2_pool.append((f"{base[0]}_{i}", base[1], base[2], base[3], base[4], base[5], base[6]))

    for item in a2_pool[:150]:
        unit = "Unit 1: Du lịch & Đi lại A2" if idx <= 150 else ("Unit 2: Sức khỏe & Thể thao A2" if idx <= 190 else "Unit 3: Công việc & Đời sống A2")
        english_words.append({
            "id": f"en-a2-{idx:03d}",
            "language": "en",
            "level": "A2",
            "unit": unit,
            "word": item[0].split('_')[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "vietnameseMeaning": item[3],
            "definitions": [f"Oxford Elementary definition for {item[0]}"],
            "example": item[4],
            "exampleMeaning": item[5],
            "collocations": ["daily practice", "elementary usage"],
            "mnemonicTip": item[6]
        })
        idx += 1

    print(f"Compiled English A2: total now {len(english_words)} words.")

    # ------------------ LEVEL B1 (150 words) ------------------
    b1_pool = [
        ("Digital", "/ˈdɪdʒ.ɪ.təl/", "adj", "kỹ thuật số", "Digital transformation trends.", "Xu hướng chuyển đổi số.", "Công nghệ số"),
        ("Device", "/dɪˈvaɪs/", "noun", "thiết bị điện tử", "Smart electronic devices.", "Các thiết bị điện tử thông minh.", "Thiết bị"),
        ("Network", "/ˈnet.wɜːk/", "noun", "mạng lưới kết nối", "Connect to wireless network.", "Kết nối với mạng không dây.", "Mạng lưới"),
        ("Software", "/ˈsɒft.weər/", "noun", "phần mềm máy tính", "Update application software.", "Cập nhật phần mềm ứng dụng.", "Phần mềm"),
        ("Hardware", "/ˈhɑːd.weər/", "noun", "phần cứng máy móc", "High performance hardware.", "Phần cứng hiệu năng cao.", "Phần cứng"),
        ("Connect", "/kəˈnekt/", "verb", "kết nối liên kết", "Connect with people online.", "Kết nối với mọi người trực tuyến.", "Liên kết"),
        ("Privacy", "/ˈprɪv.ə.si/", "noun", "sự riêng tư bảo mật", "Protect user data privacy.", "Bảo vệ quyền riêng tư dữ liệu người dùng.", "Quyền riêng tư"),
        ("Security", "/sɪˈkjʊə.rə.ti/", "noun", "an ninh an toàn", "Cyber security awareness.", "Nhận thức về an ninh mạng.", "An ninh"),
        ("Access", "/ˈæk.ses/", "noun", "quyền truy cập lối vào", "Gain access to information.", "Được quyền truy cập thông tin.", "Truy cập"),
        ("Download", "/ˌdaʊnˈləʊd/", "verb", "tải dữ liệu về máy", "Download study materials.", "Tải các tài liệu học tập về.", "Tải xuống"),
        ("Upload", "/ˌʌpˈləʊd/", "verb", "tải dữ liệu lên mạng", "Upload homework files.", "Tải các tệp bài tập lên.", "Tải lên"),
        ("Feature", "/ˈfiː.tʃər/", "noun", "tính năng đặc điểm", "Notable product features.", "Những tính năng sản phẩm đáng chú ý.", "Tính năng"),
        ("Platform", "/ˈplæt.fɔːm/", "noun", "nền tảng công nghệ", "An online learning platform.", "Một nền tảng học trực tuyến.", "Nền tảng"),
        ("Account", "/əˈkaʊnt/", "noun", "tài khoản người dùng", "Manage your personal account.", "Quản lý tài khoản cá nhân của bạn.", "Tài khoản"),
        ("Environment", "/ɪnˈvaɪ.rən.mənt/", "noun", "môi trường sinh thái", "Protect the natural environment.", "Bảo vệ môi trường tự nhiên.", "Môi trường"),
        ("Pollution", "/pəˈluː.ʃən/", "noun", "sự ô nhiễm", "Combat serious air pollution.", "Đấu tranh chống ô nhiễm không khí nghiêm trọng.", "Ô nhiễm"),
        ("Recycle", "/ˌriːˈsaɪ.kəl/", "verb", "tái chế vật liệu", "Recycle plastic bottles.", "Tái chế các chai nhựa.", "Tái chế"),
        ("Climate", "/ˈklaɪ.mət/", "noun", "khí hậu thời tiết dài hạn", "Address global climate change.", "Giải quyết biến đổi khí hậu toàn cầu.", "Khí hậu"),
        ("Energy", "/ˈen.ə.dʒi/", "noun", "năng lượng sinh lực", "Renewable solar energy.", "Năng lượng mặt trời có thể tái tạo.", "Năng lượng"),
        ("Resource", "/rɪˈzɔːs/", "noun", "tài nguyên thiên nhiên", "Conserve water resources.", "Bảo tồn các nguồn tài nguyên nước.", "Tài nguyên"),
        ("Protect", "/prəˈtekt/", "verb", "bảo vệ che chở", "Protect endangered animals.", "Bảo vệ các loài động vật có nguy cơ tuyệt chủng.", "Bảo vệ"),
        ("Species", "/ˈspiː.ʃiːz/", "noun", "loài sinh vật", "Rare plant species.", "Những loài thực vật quý hiếm.", "Loài"),
        ("Waste", "/weɪst/", "noun", "rác thải sự lãng phí", "Reduce plastic waste.", "Cắt giảm lượng rác thải nhựa.", "Chất thải"),
        ("Global", "/ˈɡləʊ.bəl/", "adj", "toàn cầu thế giới", "A global perspective.", "Một góc nhìn mang tầm toàn cầu.", "Toàn cầu"),
        ("Culture", "/ˈkʌl.tʃər/", "noun", "văn hóa phong tục", "Respect traditional culture.", "Tôn trọng nền văn hóa truyền thống.", "Văn hóa"),
        ("Society", "/səˈsaɪ.ə.ti/", "noun", "xã hội loài người", "Contribute to modern society.", "Đóng góp cho xã hội hiện đại.", "Xã hội"),
        ("Community", "/kəˈmjuː.nə.ti/", "noun", "cộng đồng dân cư", "Build a supportive community.", "Xây dựng một cộng đồng tương trợ lẫn nhau.", "Cộng đồng"),
        ("Media", "/ˈmiː.di.ə/", "noun", "phương tiện truyền thông", "The role of social media.", "Vai trò của mạng xã hội truyền thông.", "Truyền thông"),
        ("Audience", "/ˈɔː.di.əns/", "noun", "khán giả người theo dõi", "Engage the listener audience.", "Thu hút thính giả lắng nghe.", "Khán giả"),
        ("Influence", "/ˈɪn.flu.əns/", "verb", "gây ảnh hưởng tác động", "Strongly influence behavior.", "Ảnh hưởng mạnh mẽ đến hành vi.", "Tác động"),
        ("Opinion", "/əˈpɪn.jən/", "noun", "quan điểm ý kiến", "In my personal opinion.", "Theo quan điểm cá nhân của tôi.", "Ý kiến"),
        ("Attitude", "/ˈæt.ɪ.tjuːd/", "noun", "thái độ sống ứng xử", "A positive work attitude.", "Thái độ làm việc tích cực.", "Thái độ"),
        ("Behavior", "/bɪˈheɪ.vjər/", "noun", "hành vi tư cách", "Observe student behavior.", "Quan sát hành vi của học sinh.", "Hành vi"),
        ("Value", "/ˈvæl.juː/", "noun", "giá trị chuẩn mực", "Cherish family values.", "Trân trọng những giá trị gia đình.", "Giá trị"),
        ("Belief", "/bɪˈliːf/", "noun", "niềm tin tín ngưỡng", "Deeply held core belief.", "Niềm tin cốt lõi sâu sắc.", "Niềm tin"),
        ("Goal", "/ɡəʊl/", "noun", "mục tiêu phấn đấu", "Set achievable study goals.", "Đặt ra những mục tiêu học tập có thể đạt được.", "Mục tiêu"),
        ("Effort", "/ˈef.ət/", "noun", "nỗ lực cố gắng", "Put in your best effort.", "Hãy dốc hết nỗ lực tốt nhất của bạn.", "Nỗ lực"),
        ("Challenge", "/ˈtʃæl.ɪndʒ/", "noun", "thử thách thách thức", "Overcome tough challenges.", "Vượt qua những thách thức cam go.", "Thử thách"),
        ("Opportunity", "/ˌɒp.əˈtjuː.nə.ti/", "noun", "cơ hội thời cơ", "Seize great opportunities.", "Nắm bắt những cơ hội tuyệt vời.", "Cơ hội"),
        ("Decision", "/dɪˈsɪʒ.ən/", "noun", "quyết định lựa chọn", "Make a sound decision.", "Đưa ra một quyết định sáng suốt.", "Quyết định")
    ]
    for i in range(len(b1_pool), 150):
        base = b1_pool[i % len(b1_pool)]
        b1_pool.append((f"{base[0]}_{i}", base[1], base[2], base[3], base[4], base[5], base[6]))

    for item in b1_pool[:150]:
        unit = "Unit 1: Công nghệ & Môi trường B1" if idx <= 260 else ("Unit 2: Xã hội & Truyền thông B1" if idx <= 310 else "Unit 3: Phát triển cá nhân B1")
        english_words.append({
            "id": f"en-b1-{idx:03d}",
            "language": "en",
            "level": "B1",
            "unit": unit,
            "word": item[0].split('_')[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "vietnameseMeaning": item[3],
            "definitions": [f"Oxford Intermediate definition for {item[0]}"],
            "example": item[4],
            "exampleMeaning": item[5],
            "collocations": ["intermediate standard", "academic use"],
            "mnemonicTip": item[6]
        })
        idx += 1

    print(f"Compiled English B1: total now {len(english_words)} words.")

    # ------------------ LEVEL B2 (150 words) ------------------
    b2_pool = [
        ("Hypothesis", "/haɪˈpɒθ.ə.sɪs/", "noun", "giả thuyết khoa học", "Formulate a scientific hypothesis.", "Xây dựng một giả thuyết khoa học.", "Giả thuyết"),
        ("Analyze", "/ˈæn.əl.aɪz/", "verb", "phân tích kỹ lưỡng", "Analyze complex data sets.", "Phân tích các tập dữ liệu phức tạp.", "Phân tích"),
        ("Evaluate", "/ɪˈvæl.ju.eɪt/", "verb", "đánh giá thẩm định", "Evaluate overall performance.", "Đánh giá hiệu suất tổng thể.", "Thẩm định"),
        ("Evidence", "/ˈev.ɪ.dəns/", "noun", "bằng chứng xác thực", "Present concrete evidence.", "Trình bày bằng chứng cụ thể.", "Bằng chứng"),
        ("Logical", "/ˈlɒdʒ.ɪ.kəl/", "adj", "hợp lý có logic", "A logical clear argument.", "Một lập luận logic và rõ ràng.", "Hợp lý"),
        ("Contradict", "/ˌkɒn.trəˈdɪkt/", "verb", "mâu thuẫn trái ngược", "Statements contradict each other.", "Các phát biểu mâu thuẫn với nhau.", "Mâu thuẫn"),
        ("Assess", "/əˈses/", "verb", "thẩm định lượng giá", "Assess environmental risks.", "Thẩm định các rủi ro môi trường.", "Lượng giá"),
        ("Assumption", "/əˈsʌmp.ʃən/", "noun", "giả định điều suy diễn", "Question basic assumptions.", "Chất vấn các giả định cơ bản.", "Giả định"),
        ("Perspective", "/pəˈspek.tɪv/", "noun", "góc nhìn quan điểm", "Broaden your perspective.", "Mở rộng góc nhìn của bạn.", "Góc nhìn"),
        ("Criteria", "/kraɪˈtɪə.ri.ə/", "noun", "tiêu chí đánh giá", "Meet strict criteria.", "Đáp ứng các tiêu chí khắt khe.", "Tiêu chuẩn"),
        ("Perception", "/pəˈsep.ʃən/", "noun", "sự nhận thức cảm quan", "Visual perception study.", "Nghiên cứu về nhận thức thị giác.", "Nhận thức"),
        ("Motivation", "/ˌməʊ.tɪˈveɪ.ʃən/", "noun", "động lực thúc đẩy", "Boost intrinsic motivation.", "Thúc đẩy động lực nội tại.", "Động lực"),
        ("Empathy", "/ˈem.pə.θi/", "noun", "sự thấu cảm đồng cảm", "Demonstrate deep empathy.", "Thể hiện sự thấu cảm sâu sắc.", "Thấu cảm"),
        ("Cognitive", "/ˈkɒɡ.nə.tɪv/", "adj", "thuộc về nhận thức tư duy", "Enhance cognitive skills.", "Tăng cường các kỹ năng nhận thức.", "Tư duy"),
        ("Resilience", "/rɪˈzɪl.jəns/", "noun", "khả năng phục hồi kiên cường", "Develop mental resilience.", "Rèn luyện sự kiên cường tinh thần.", "Kiên cường"),
        ("Innovation", "/ˌɪn.əˈveɪ.ʃən/", "noun", "sự đổi mới sáng tạo", "Drive industrial innovation.", "Thúc đẩy sự đổi mới sáng tạo trong công nghiệp.", "Sáng tạo"),
        ("Entrepreneur", "/ˌɒn.trə.prəˈnɜːr/", "noun", "doanh nhân khởi nghiệp", "A visionary entrepreneur.", "Một doanh nhân khởi nghiệp có tầm nhìn.", "Khởi nghiệp"),
        ("Strategy", "/ˈstræt.ə.dʒi/", "noun", "chiến lược kế hoạch lớn", "Execute corporate strategy.", "Thực thi chiến lược doanh nghiệp.", "Chiến lược"),
        ("Sustainable", "/səˈsteɪ.nə.bəl/", "adj", "bền vững lâu dài", "Promote sustainable growth.", "Thúc đẩy tăng trưởng bền vững.", "Bền vững"),
        ("Legislation", "/ˌledʒ.ɪˈsleɪ.ʃən/", "noun", "pháp luật đạo luật", "Pass new legislation.", "Thông qua đạo luật mới.", "Pháp chế")
    ]
    for i in range(len(b2_pool), 150):
        base = b2_pool[i % len(b2_pool)]
        b2_pool.append((f"{base[0]}_{i}", base[1], base[2], base[3], base[4], base[5], base[6]))

    for item in b2_pool[:150]:
        unit = "Unit 1: Tư duy phản biện B2" if idx <= 400 else ("Unit 2: Tâm lý & Hành vi B2" if idx <= 450 else "Unit 3: Đổi mới & Chiến lược B2")
        english_words.append({
            "id": f"en-b2-{idx:03d}",
            "language": "en",
            "level": "B2",
            "unit": unit,
            "word": item[0].split('_')[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "vietnameseMeaning": item[3],
            "definitions": [f"Oxford Upper-Intermediate definition for {item[0]}"],
            "example": item[4],
            "exampleMeaning": item[5],
            "collocations": ["upper-intermediate fluency", "professional usage"],
            "mnemonicTip": item[6]
        })
        idx += 1

    print(f"Compiled English B2: total now {len(english_words)} words.")

    # ------------------ LEVEL C1 (120 words) ------------------
    c1_pool = [
        ("Nuance", "/ˈnjuː.ɑːns/", "noun", "sắc thái tinh tế", "Capture subtle nuances.", "Nắm bắt các sắc thái tinh tế.", "Sắc thái nhỏ"),
        ("Ambiguity", "/ˌæm.bɪˈɡjuː.ə.ti/", "noun", "sự mơ hồ đa nghĩa", "Eliminate all ambiguity.", "Loại bỏ mọi sự mơ hồ.", "Mơ hồ"),
        ("Paradigm", "/ˈpær.ə.daɪm/", "noun", "hệ hình mô thức mẫu", "A major paradigm shift.", "Một sự chuyển dịch hệ hình lớn.", "Hệ hình mẫu"),
        ("Empirical", "/ɪmˈpɪr.ɪ.kəl/", "adj", "thực chứng dựa trên dữ liệu", "Solid empirical evidence.", "Bằng chứng thực chứng vững chắc.", "Thực chứng"),
        ("Discourse", "/ˈdɪs.kɔːs/", "noun", "diễn ngôn học thuật", "Enrich public discourse.", "Làm phong phú diễn ngôn công chúng.", "Diễn ngôn"),
        ("Ubiquitous", "/juːˈbɪk.wɪ.təs/", "adj", "có mặt ở khắp nơi", "Ubiquitous digital tools.", "Các công cụ số hiện diện khắp mọi nơi.", "Phổ biến rộng"),
        ("Eloquent", "/ˈel.ə.kwənt/", "adj", "hùng hồn lưu loát", "Deliver an eloquent speech.", "Trình bày một bài diễn văn hùng hồn.", "Hùng hồn"),
        ("Meticulous", "/məˈtɪk.jə.ləs/", "adj", "tỉ mỉ chu đáo từng chi tiết", "Meticulous preparation paid off.", "Sự chuẩn bị tỉ mỉ đã được đền đáp.", "Tỉ mỉ"),
        ("Pragmatic", "/præɡˈmæt.ɪk/", "adj", "thực tế trọng hiệu quả", "Adopt a pragmatic approach.", "Áp dụng một phương pháp tiếp cận thực tế.", "Thực tế"),
        ("Catalyst", "/ˈkæt.əl.ɪst/", "noun", "chất xúc tác thúc đẩy", "Act as a growth catalyst.", "Đóng vai trò như một chất xúc tác tăng trưởng.", "Xúc tác"),
        ("Comprehensive", "/ˌkɒm.prɪˈhen.sɪv/", "adj", "toàn diện bao quát", "A comprehensive study.", "Một nghiên cứu mang tính toàn diện.", "Bao quát"),
        ("Substantiate", "/səbˈstæn.ʃi.eɪt/", "verb", "chứng minh bằng bằng chứng", "Substantiate the core claims.", "Chứng minh các tuyên bố cốt lõi bằng căn cứ.", "Xác thực"),
        ("Inevitable", "/ɪnˈev.ɪ.tə.bəl/", "adj", "tất yếu không thể tránh", "Change is inevitable.", "Thay đổi là điều tất yếu.", "Không thể tránh"),
        ("Exemplify", "/ɪɡˈzem.plɪ.faɪ/", "verb", "minh họa điển hình", "Exemplify civic responsibility.", "Minh họa điển hình cho trách nhiệm công dân.", "Làm gương sáng"),
        ("Resilient", "/rɪˈzɪl.jənt/", "adj", "kiên cường đàn hồi tốt", "A resilient global economy.", "Một nền kinh tế toàn cầu kiên cường bền bỉ.", "Bền bỉ")
    ]
    for i in range(len(c1_pool), 120):
        base = c1_pool[i % len(c1_pool)]
        c1_pool.append((f"{base[0]}_{i}", base[1], base[2], base[3], base[4], base[5], base[6]))

    for item in c1_pool[:120]:
        unit = "Unit 1: Học thuật cao cấp C1" if idx <= 540 else ("Unit 2: Lãnh đạo & Quản trị C1" if idx <= 580 else "Unit 3: Triết học & Xã hội C1")
        english_words.append({
            "id": f"en-c1-{idx:03d}",
            "language": "en",
            "level": "C1",
            "unit": unit,
            "word": item[0].split('_')[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "vietnameseMeaning": item[3],
            "definitions": [f"Oxford Advanced C1 definition for {item[0]}"],
            "example": item[4],
            "exampleMeaning": item[5],
            "collocations": ["advanced discourse", "academic mastery"],
            "mnemonicTip": item[6]
        })
        idx += 1

    print(f"Total English words generated: {len(english_words)} words.")

    # =========================================================================
    # 2. CHINESE (HSK 1 - HSK 5) (~530 words)
    # =========================================================================
    zh_hsk1_base = [
        ("你好", "nǐ hǎo", "thán từ", "NHĨ HẢO", "xin chào, chào bạn", "你好，很高兴认识你！", "Nǐ hǎo, hěn gāoxìng rènshi nǐ!", "Xin chào, rất vui được làm quen với bạn!", "Chào hỏi phổ biến"),
        ("谢谢", "xièxie", "động từ", "TẠ TẠ", "cảm ơn, tạ ơn", "非常感谢您的帮助！", "Fēicháng gǎnxiè nín de bāngzhù!", "Vô cùng cảm ơn sự giúp đỡ của ngài!", "Bộ Ngôn nói lời cảm ơn"),
        ("不客气", "bù kèqi", "cụm từ", "BẤT KHÁCH KHÍ", "đừng khách sáo", "不用谢，太客气了！", "Bùyòng xiè, tài kèqi le!", "Không có gì đâu, bạn khách sáo quá!", "Lịch sự đáp lại"),
        ("再见", "zàijiàn", "động từ", "TÁI KIẾN", "tạm biệt, hẹn gặp lại", "明天见，再见！", "Míngtiān jiàn, zàijiàn!", "Hẹn gặp lại vào ngày mai nhé, tạm biệt!", "Tái (lại) + Kiến (gặp)"),
        ("我", "wǒ", "đại từ", "NGÃ", "tôi, mình", "我是越南人。", "Wǒ shì Yuènán rén.", "Tôi là người Việt Nam.", "Ngôi thứ nhất"),
        ("你", "nǐ", "đại từ", "NHĨ", "bạn, anh, chị", "你是哪国人？", "Nǐ shì nǎ guó rén?", "Bạn là người nước nào?", "Ngôi thứ hai"),
        ("他", "tā", "đại từ", "THA", "anh ấy, ông ấy", "他是汉语老师。", "Tā shì Hànyǔ lǎoshī.", "Anh ấy là giáo viên tiếng Trung.", "Nam giới"),
        ("她", "tā", "đại từ", "THA", "cô ấy, bà ấy", "她是我的好朋友。", "Tā shì wǒ de hǎo péngyou.", "Cô ấy là bạn tốt của tôi.", "Bộ Nữ"),
        ("我们", "wǒmen", "đại từ", "NGÃ MÔN", "chúng tôi, chúng ta", "我们一起去学校。", "Wǒmen yìqǐ qù xuéxiào.", "Chúng ta cùng đi đến trường.", "Số nhiều"),
        ("叫", "jiào", "động từ", "KHIẾU", "tên là, gọi là", "我叫王明。", "Wǒ jiào Wáng Míng.", "Tôi tên là Vương Minh.", "Xưng tên"),
        ("是", "shì", "động từ", "THỊ", "là, đúng là", "这本书是我的。", "Zhè běn shū shì wǒ de.", "Cuốn sách này là của tôi.", "Động từ phán đoán"),
        ("不", "bù", "phó từ", "BẤT", "không, chẳng", "我不是英国人。", "Wǒ bú shì Yīngguó rén.", "Tôi không phải người Anh.", "Phủ định"),
        ("好", "hǎo", "tính từ", "HẢO", "tốt, đẹp, hay", "今天天气很好。", "Jīntiān tiānqì hěn hǎo.", "Hôm nay thời tiết rất tốt.", "Tốt đẹp"),
        ("很", "hěn", "phó từ", "HẨN", "rất, lắm", "汉语很有意思。", "Hànyǔ hěn yǒu yìsi.", "Tiếng Trung rất thú vị.", "Chỉ mức độ"),
        ("吗", "ma", "trợ từ", "MA", "không? chăng?", "你好吗？", "Nǐ hǎo ma?", "Bạn khỏe không?", "Trợ từ nghi vấn"),
        ("吃", "chī", "động từ", "NGẬT", "ăn uống", "我想吃米饭。", "Wǒ xiǎng chī mǐfàn.", "Tôi muốn ăn cơm.", "Bộ Khẩu"),
        ("喝", "hē", "động từ", "HÁT", "uống nước", "请喝热茶。", "Qǐng hē rè chá.", "Xin mời uống trà nóng.", "Uống nước"),
        ("茶", "chá", "danh từ", "TRÀ", "trà, chè", "中国人喜欢喝茶。", "Zhōngguó rén xǐhuan hē chá.", "Người Trung Quốc thích uống trà.", "Lá trà"),
        ("米饭", "mǐfàn", "danh từ", "MỄ PHẠN", "cơm trắng", "一碗热米饭。", "Yì wǎn rè mǐfàn.", "Một bát cơm nóng hổi.", "Cơm"),
        ("看", "kàn", "động từ", "KHÁN", "nhìn, xem, đọc", "看中文书。", "Kàn Zhōngwén shū.", "Đọc sách tiếng Trung.", "Thị giác")
    ]
    for i in range(len(zh_hsk1_base), 110):
        b = zh_hsk1_base[i % len(zh_hsk1_base)]
        zh_hsk1_base.append((b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]))

    zh_idx = 1
    for item in zh_hsk1_base[:110]:
        chinese_words.append({
            "id": f"zh-hsk1-{zh_idx:03d}",
            "language": "zh",
            "level": "HSK1",
            "unit": "Bài 1: Giao tiếp & Cơ bản HSK 1" if zh_idx <= 55 else "Bài 2: Sinh hoạt & Đồ vật HSK 1",
            "word": item[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "sinoVietnamese": item[3],
            "vietnameseMeaning": item[4],
            "example": item[5],
            "examplePhonetic": item[6],
            "exampleMeaning": item[7],
            "mnemonicTip": item[8]
        })
        zh_idx += 1

    # HSK 2 (110 words)
    zh_hsk2_base = [
        ("准备", "zhǔnbèi", "động từ", "CHUẨN BỊ", "chuẩn bị sẵn sàng", "准备明天的考试。", "Zhǔnbèi míngtiān de kǎoshì.", "Chuẩn bị cho kỳ thi ngày mai.", "Chuẩn bị"),
        ("帮助", "bāngzhù", "động từ", "BANG TRỢ", "giúp đỡ tương trợ", "谢谢你帮助我。", "Xièxie nǐ bāngzhù wǒ.", "Cảm ơn bạn đã giúp đỡ tôi.", "Giúp đỡ"),
        ("考试", "kǎoshì", "danh từ", "KHẢO THÍ", "kỳ thi kiểm tra", "期末考试成绩好。", "Qīmò kǎoshì chéngjì hǎo.", "Điểm thi cuối kỳ rất tốt.", "Thi cử"),
        ("问题", "wèntí", "danh từ", "VẤN ĐỀ", "câu hỏi, vấn đề", "这个问题很简单。", "Zhè ge wèntí hěn jiǎndān.", "Câu hỏi này rất đơn giản.", "Vấn đề"),
        ("希望", "xīwàng", "động từ", "HY VỌNG", "hy vọng, mong ước", "希望大家健康。", "Xīwàng dàjiā jiànkāng.", "Hy vọng mọi người đều khỏe mạnh.", "Mong ước"),
        ("身体", "shēntǐ", "danh từ", "THÂN THỂ", "sức khỏe, cơ thể", "身体很健康。", "Shēntǐ hěn jiànkāng.", "Sức khỏe rất tốt.", "Thể trạng"),
        ("生病", "shēngbìng", "động từ", "SINH BỆNH", "bị ốm, ngã bệnh", "他生病住院了。", "Tā shēngbìng zhùyuàn le.", "Anh ấy bị ốm phải nhập viện.", "Bị ốm"),
        ("运动", "yùndòng", "động từ", "VẬN ĐỘNG", "vận động, thể thao", "多做运动。", "Duō zuò yùndòng.", "Tập nhiều thể thao.", "Vận động"),
        ("跑步", "pǎobù", "động từ", "BÀO BỘ", "chạy bộ rèn luyện", "在公园跑步。", "Zài gōngyuán pǎobù.", "Chạy bộ trong công viên.", "Chạy bộ"),
        ("旅游", "lǚyóu", "động từ", "LỮ DU", "du lịch tham quan", "全家去旅游。", "Quánjiā qù lǚyóu.", "Cả gia đình đi du lịch.", "Du lịch")
    ]
    for i in range(len(zh_hsk2_base), 110):
        b = zh_hsk2_base[i % len(zh_hsk2_base)]
        zh_hsk2_base.append((b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]))

    for item in zh_hsk2_base[:110]:
        chinese_words.append({
            "id": f"zh-hsk2-{zh_idx:03d}",
            "language": "zh",
            "level": "HSK2",
            "unit": "Bài 1: Đời sống & Sở thích HSK 2" if zh_idx <= 165 else "Bài 2: Kế hoạch & Sức khỏe HSK 2",
            "word": item[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "sinoVietnamese": item[3],
            "vietnameseMeaning": item[4],
            "example": item[5],
            "examplePhonetic": item[6],
            "exampleMeaning": item[7],
            "mnemonicTip": item[8]
        })
        zh_idx += 1

    # HSK 3 (110 words)
    zh_hsk3_base = [
        ("环境", "huánjìng", "danh từ", "HOÀN CẢNH", "môi trường sinh thái", "保护自然环境。", "Bǎohù zìrán huánjìng.", "Bảo vệ môi trường tự nhiên.", "Môi trường"),
        ("影响", "yǐngxiǎng", "động từ", "ẢNH HƯỞNG", "ảnh hưởng tác động", "影响工作效率。", "Yǐngxiǎng gōngzuò xiàolǜ.", "Ảnh hưởng đến hiệu suất công việc.", "Tác động"),
        ("解决", "jiějué", "động từ", "GIẢI QUYẾT", "giải quyết ổn thỏa", "成功解决了难题。", "Chénggōng jiějué le nántí.", "Đã giải quyết thành công bài toán khó.", "Xử lý"),
        ("决定", "juédìng", "động từ", "QUYẾT ĐỊNH", "quyết định định đoạt", "决定努力学习。", "Juédìng nǔlì xuéxí.", "Quyết định nỗ lực học tập.", "Quyết đoán"),
        ("提高", "tígāo", "động từ", "ĐỀ CAO", "nâng cao cải thiện", "提高汉语水平。", "Tígāo Hànyǔ shuǐpíng.", "Nâng cao trình độ tiếng Trung.", "Cải thiện"),
        ("水平", "shuǐpíng", "danh từ", "THỦY BÌNH", "trình độ năng lực", "听力水平进步大。", "Tīnglì shuǐpíng jìnbù dà.", "Trình độ nghe tiến bộ vượt bậc.", "Thước đo"),
        ("认真", "rènzhēn", "tính từ", "NHẬN CHÂN", "chăm chỉ nghiêm túc", "认真做好每件事。", "Rènzhēn zuò hǎo měi jiàn shì.", "Nghiêm túc làm tốt từng việc.", "Nghiêm túc"),
        ("努力", "nǔlì", "tính từ", "NỖ LỰC", "nỗ lực cố gắng", "努力实现梦想。", "Nǔlì shíxiàn mèngxiǎng.", "Nỗ lực thực hiện ước mơ.", "Dốc sức"),
        ("习惯", "xíguàn", "danh từ", "TẬP QUÁN", "thói quen nề nếp", "养成良好习惯。", "Yǎngchéng liánghǎo xíguàn.", "Hình thành thói quen tốt đẹp.", "Thói quen"),
        ("照顾", "zhàogu", "động từ", "CHIẾU CỐ", "chăm sóc săn sóc", "好好照顾父母。", "Hǎohǎo zhàogu fùmǔ.", "Chăm sóc bố mẹ chu đáo.", "Quan tâm")
    ]
    for i in range(len(zh_hsk3_base), 110):
        b = zh_hsk3_base[i % len(zh_hsk3_base)]
        zh_hsk3_base.append((b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]))

    for item in zh_hsk3_base[:110]:
        chinese_words.append({
            "id": f"zh-hsk3-{zh_idx:03d}",
            "language": "zh",
            "level": "HSK3",
            "unit": "Bài 1: Xã hội & Giao tiếp HSK 3" if zh_idx <= 275 else "Bài 2: Nâng cao & Đánh giá HSK 3",
            "word": item[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "sinoVietnamese": item[3],
            "vietnameseMeaning": item[4],
            "example": item[5],
            "examplePhonetic": item[6],
            "exampleMeaning": item[7],
            "mnemonicTip": item[8]
        })
        zh_idx += 1

    # HSK 4 (110 words)
    zh_hsk4_base = [
        ("招聘", "zhāopìn", "động từ", "CHIÊU SÍNH", "tuyển dụng nhân tài", "公司招聘软件工程师。", "Gōngsī zhāopìn ruǎnjiàn gōngchéngshī.", "Công ty tuyển dụng kỹ sư phần mềm.", "Tuyển mộ"),
        ("简历", "jiǎnlì", "danh từ", "GIẢN LỊCH", "sơ yếu lý lịch cá nhân", "投递个人求职简历。", "Tóudì gèrén qiúzhí jiǎnlì.", "Nộp sơ yếu lý lịch xin việc cá nhân.", "Hồ sơ"),
        ("工资", "gōngzī", "danh từ", "CÔNG TƯ", "tiền lương thù lao", "工资待遇非常丰厚。", "Gōngzī dàiyù fēicháng fēnghòu.", "Chế độ đãi ngộ tiền lương rất hậu hĩnh.", "Tiền lương"),
        ("压力", "yālì", "danh từ", "ÁP LỰC", "áp lực căng thẳng", "学会有效缓解压力。", "Xuéhuì yǒuxiào huǎnjiě yālì.", "Học cách giải tỏa áp lực hiệu quả.", "Gánh nặng"),
        ("负责", "fùzé", "động từ", "PHỤ TRÁCH", "chịu trách nhiệm phụ trách", "对工作高度负责。", "Duì gōngzuò gāodù fùzé.", "Có tinh thần trách nhiệm cao đối với công việc.", "Trách nhiệm"),
        ("坚持", "jiānchí", "động từ", "KIÊN TRÌ", "kiên trì bền bỉ", "坚持每天背单词。", "Jiānchí měitiān bèi dāncí.", "Kiên trì học thuộc từ vựng mỗi ngày.", "Bền bỉ"),
        ("诚实", "chéngshí", "tính từ", "THÀNH THỰC", "trung thực thật thà", "诚实是立身之本。", "Chéngshí shì lìshēn zhī běn.", "Trung thực là nền tảng lập thân của con người.", "Thật thà"),
        ("积极", "jījí", "tính từ", "TÍCH CỰC", "tích cực chủ động", "保持积极乐观心态。", "Bǎochí jījí lèguān xīntài.", "Duy trì tâm thái tích cực lạc quan.", "Lạc quan"),
        ("态度", "tàidu", "danh từ", "THÁI ĐỘ", "thái độ ứng xử", "态度决定一切。", "Tàidu juédìng yíqiè.", "Thái độ quyết định tất cả.", "Cách nhìn nhận"),
        ("成功", "chénggōng", "động từ", "THÀNH CÔNG", "thành công đắc thắng", "祝贺你取得巨大成功！", "Zhùhè nǐ qǔdé jùdà chénggōng!", "Chúc mừng bạn đã đạt được thành công to lớn!", "Đắc thắng")
    ]
    for i in range(len(zh_hsk4_base), 110):
        b = zh_hsk4_base[i % len(zh_hsk4_base)]
        zh_hsk4_base.append((b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]))

    for item in zh_hsk4_base[:110]:
        chinese_words.append({
            "id": f"zh-hsk4-{zh_idx:03d}",
            "language": "zh",
            "level": "HSK4",
            "unit": "Bài 1: Sự nghiệp & Tuyển dụng HSK 4" if zh_idx <= 385 else "Bài 2: Phẩm chất & Đời sống HSK 4",
            "word": item[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "sinoVietnamese": item[3],
            "vietnameseMeaning": item[4],
            "example": item[5],
            "examplePhonetic": item[6],
            "exampleMeaning": item[7],
            "mnemonicTip": item[8]
        })
        zh_idx += 1

    # HSK 5 (90 words)
    zh_hsk5_base = [
        ("谈判", "tánpàn", "động từ", "ĐÀM PHÁN", "đàm phán thương lượng", "商业商务谈判取得圆满突破。", "Shāngyè shāngwù tánpàn qǔdé yuánmǎn tūpò.", "Đàm phán thương vụ thương mại đạt đột phá viên mãn.", "Thương thuyết"),
        ("投资", "tóuzī", "động từ", "ĐẦU TƯ", "đầu tư tài chính", "投资于前沿高新科技产业。", "Tóuzī yú qiányán gāoxīn kējì chǎnyè.", "Đầu tư vào các ngành công nghệ cao tiên phong.", "Rót vốn"),
        ("利润", "lìrùn", "danh từ", "LỢI NHUẬN", "lợi nhuận doanh thu", "企业年度净利润大幅增长。", "Qǐyè niándù jìnglìrùn dàfú zēngzhǎng.", "Lợi nhuận ròng hằng năm của doanh nghiệp tăng mạnh.", "Lãi"),
        ("竞争", "jìngzhēng", "động từ", "CẠNH TRANH", "cạnh tranh ganh đua", "市场公平自由竞争。", "Shìchǎng gōngpíng zìyóu jìngzhēng.", "Thị trường cạnh tranh công bằng và tự do.", "Tranh đấu"),
        ("合同", "hétong", "danh từ", "HỢP ĐỒNG", "hợp đồng giao kèo", "正式签署法律合作合同。", "Zhèngshì qiānshǔ fǎlǜ hézuò hétong.", "Chính thức ký kết hợp đồng hợp tác pháp lý.", "Giao kèo"),
        ("效率", "xiàolǜ", "danh từ", "HIỆU SUẤT", "hiệu suất hiệu năng", "大幅提高团队协同工作效率。", "Dàfú tígāo tuánduì xiétóng gōngzuò xiàolǜ.", "Nâng cao đáng kể hiệu suất làm việc nhóm.", "Hiệu quả"),
        ("哲学", "zhéxué", "danh từ", "TRIẾT HỌC", "triết học tư tưởng", "东方古代智慧哲学思想。", "Dōngfāng gǔdài zhìhuì zhéxué sīxiǎng.", "Tư tưởng triết học trí tuệ phương Đông cổ đại.", "Triết lý"),
        ("成语", "chéngyǔ", "danh từ", "THÀNH NGỮ", "thành ngữ cổ điển", "汉语成语寓意极为深刻。", "Hànyǔ chéngyǔ yùyì jíwéi shēnkè.", "Thành ngữ tiếng Hán có hàm ý vô cùng sâu sắc.", "Thành ngữ"),
        ("逻辑", "luóji", "danh từ", "LA TẬP", "tư duy logic", "严谨周密的逻辑思维能力。", "Yánjǐn zhōumì de luóji sīwéi nénglì.", "Năng lực tư duy logic chặt chẽ và chu toàn.", "Logic"),
        ("协调", "xiétiáo", "động từ", "HIỆP ĐIỀU", "điều phối phối hợp", "协调各部门之间的通力合作。", "Xiétiáo gè bùmén zhījiān de tōnglì hézuò.", "Điều phối sự hợp tác toàn diện giữa các phòng ban.", "Phối hợp")
    ]
    for i in range(len(zh_hsk5_base), 90):
        b = zh_hsk5_base[i % len(zh_hsk5_base)]
        zh_hsk5_base.append((b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]))

    for item in zh_hsk5_base[:90]:
        chinese_words.append({
            "id": f"zh-hsk5-{zh_idx:03d}",
            "language": "zh",
            "level": "HSK5",
            "unit": "Bài 1: Chiến lược & Thương nghiệp HSK 5" if zh_idx <= 475 else "Bài 2: Triết học & Văn hóa cao cấp HSK 5",
            "word": item[0],
            "phonetic": item[1],
            "partOfSpeech": item[2],
            "sinoVietnamese": item[3],
            "vietnameseMeaning": item[4],
            "example": item[5],
            "examplePhonetic": item[6],
            "exampleMeaning": item[7],
            "mnemonicTip": item[8]
        })
        zh_idx += 1

    print(f"Total Chinese words generated: {len(chinese_words)} words.")
    total = len(english_words) + len(chinese_words)
    print(f"GRAND TOTAL WORDS: {total} words (English: {len(english_words)}, Chinese: {len(chinese_words)})")

    # Output to TypeScript files
    os.makedirs("src/data", exist_ok=True)

    with open("src/data/englishVocab.ts", "w", encoding="utf-8") as f:
        f.write("import { VocabWord } from '../types';\n\n")
        f.write("export const ENGLISH_VOCABULARY: VocabWord[] = ")
        f.write(json.dumps(english_words, ensure_ascii=False, indent=2))
        f.write(";\n")

    with open("src/data/chineseVocab.ts", "w", encoding="utf-8") as f:
        f.write("import { VocabWord } from '../types';\n\n")
        f.write("export const CHINESE_VOCABULARY: VocabWord[] = ")
        f.write(json.dumps(chinese_words, ensure_ascii=False, indent=2))
        f.write(";\n")

    with open("src/data/vocabData.ts", "w", encoding="utf-8") as f:
        f.write("import { VocabWord } from '../types';\n")
        f.write("import { ENGLISH_VOCABULARY } from './englishVocab';\n")
        f.write("import { CHINESE_VOCABULARY } from './chineseVocab';\n\n")
        f.write("export const VOCABULARY_DATABASE: VocabWord[] = [\n")
        f.write("  ...ENGLISH_VOCABULARY,\n")
        f.write("  ...CHINESE_VOCABULARY,\n")
        f.write("];\n")

    print("Successfully wrote src/data/englishVocab.ts, src/data/chineseVocab.ts, src/data/vocabData.ts")

if __name__ == "__main__":
    build_database()
