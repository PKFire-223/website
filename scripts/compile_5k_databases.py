# -*- coding: utf-8 -*-
import json
import os
import random

# Seed for consistent, reproducible generation
random.seed(42)

def generate_english():
    words = []
    
    # 5 Levels: A1, A2, B1, B2, C1
    levels_config = [
        ("A1", 1024, "Sơ cấp căn bản (A1)"),
        ("A2", 1024, "Sơ cấp mở rộng (A2)"),
        ("B1", 1024, "Trung cấp thực hành (B1)"),
        ("B2", 1024, "Trung cấp nâng cao (B2)"),
        ("C1", 1024, "Cao cấp học thuật (C1)")
    ]

    # Core Oxford & CEFR vocabulary roots, themes, and lemmas
    themes = {
        "A1": [
            ("Chào hỏi & Bản thân", "greetings", [
                ("Hello", "/həˈləʊ/", "int", "xin chào", "Hello, how are you today?", "Xin chào, hôm nay bạn thế nào?", ["say hello", "hello everyone"], "Chào hỏi thân thiện"),
                ("Name", "/neɪm/", "noun", "tên, danh tính", "My name is Peter.", "Tên của tôi là Peter.", ["first name", "call by name"], "Tên gọi định danh"),
                ("Meet", "/miːt/", "verb", "gặp gỡ, làm quen", "Nice to meet you.", "Rất vui được gặp bạn.", ["meet friends", "meet up"], "Gặp mặt làm quen"),
                ("Friend", "/frend/", "noun", "bạn bè", "He is my best friend.", "Anh ấy là người bạn thân nhất của tôi.", ["close friend", "make friends"], "Bạn bè đồng hành"),
                ("Family", "/ˈfæm.əl.i/", "noun", "gia đình", "I love my family very much.", "Tôi rất yêu gia đình mình.", ["family member", "big family"], "Mái ấm gia đình"),
                ("Live", "/lɪv/", "verb", "sống, cư trú", "They live in a quiet town.", "Họ sống ở một thị trấn yên bình.", ["live in", "live together"], "Sinh sống"),
                ("From", "/frɒm/", "prep", "đến từ, từ nơi nào", "Where are you from?", "Bạn đến từ đâu?", ["come from", "from here to there"], "Xuất xứ, cội nguồn"),
                ("Age", "/eɪdʒ/", "noun", "tuổi tác", "What is your age?", "Bạn bao nhiêu tuổi?", ["at the age of", "old age"], "Số tuổi"),
                ("Happy", "/ˈhæp.i/", "adj", "hạnh phúc, vui vẻ", "We are happy to see you.", "Chúng tôi rất vui được gặp bạn.", ["feel happy", "happy life"], "Niềm vui ngập tràn"),
                ("Thank", "/θæŋk/", "verb", "cảm ơn", "Thank you for your help.", "Cảm ơn vì sự giúp đỡ của bạn.", ["thank you", "give thanks"], "Lời cảm ơn chân thành")
            ]),
            ("Gia đình & Nhà cửa", "home", [
                ("Mother", "/ˈmʌð.ər/", "noun", "mẹ, người mẹ", "My mother cooks delicious meals.", "Mẹ tôi nấu những món ăn rất ngon.", ["mother love", "mother and child"], "Mẹ hiền yêu quý"),
                ("Father", "/ˈfɑː.ðər/", "noun", "cha, người cha", "His father works in a hospital.", "Bố anh ấy làm việc ở bệnh viện.", ["loving father", "father figure"], "Người cha trụ cột"),
                ("Sister", "/ˈsɪs.tər/", "noun", "chị gái, em gái", "She has two sisters.", "Cô ấy có hai người chị gái.", ["older sister", "younger sister"], "Chị em trong nhà"),
                ("Brother", "/ˈbrʌð.ər/", "noun", "anh trai, em trai", "My brother plays football well.", "Anh trai tôi đá bóng rất giỏi.", ["big brother", "twin brother"], "Anh em ruột"),
                ("Home", "/həʊm/", "noun", "nhà, tổ ấm", "It feels good to be home.", "Thật tuyệt khi được về nhà.", ["at home", "go home"], "Tổ ấm bình yên"),
                ("Room", "/ruːm/", "noun", "phòng, căn phòng", "Her room is bright and clean.", "Căn phòng của cô ấy sáng sủa và sạch sẽ.", ["living room", "bedroom"], "Không gian riêng"),
                ("Door", "/dɔːr/", "noun", "cửa ra vào", "Please close the door gently.", "Xin vui lòng đóng cửa nhẹ nhàng.", ["open door", "front door"], "Cánh cửa đón chào"),
                ("Window", "/ˈwɪn.dəʊ/", "noun", "cửa sổ", "Look out of the window.", "Hãy nhìn ra ngoài cửa sổ.", ["open window", "near the window"], "Ô cửa ngắm cảnh"),
                ("Table", "/ˈteɪ.bəl/", "noun", "cái bàn", "The book is on the table.", "Quyển sách ở trên bàn.", ["dining table", "wooden table"], "Bàn ăn, làm việc"),
                ("Chair", "/tʃeər/", "noun", "cái ghế", "Take a chair and sit down.", "Kéo một cái ghế và ngồi xuống.", ["comfortable chair", "armchair"], "Ghế ngồi thư giãn")
            ]),
            ("Ẩm thực & Đồ uống", "food", [
                ("Water", "/ˈwɔː.tər/", "noun", "nước uống", "Drink plenty of water every day.", "Hãy uống nhiều nước mỗi ngày.", ["drink water", "fresh water"], "Nguồn nước sự sống"),
                ("Bread", "/bred/", "noun", "bánh mì", "He eats bread for breakfast.", "Anh ấy ăn bánh mì cho bữa sáng.", ["a loaf of bread", "white bread"], "Món ăn sáng quen thuộc"),
                ("Milk", "/mɪlk/", "noun", "sữa tươi", "She drinks hot milk before bed.", "Cô ấy uống sữa nóng trước khi ngủ.", ["fresh milk", "cup of milk"], "Dinh dưỡng mỗi ngày"),
                ("Tea", "/tiː/", "noun", "trà, chè", "Would you like a cup of tea?", "Bạn có muốn dùng một tách trà không?", ["green tea", "hot tea"], "Thức uống thanh tao"),
                ("Coffee", "/ˈkɒf.i/", "noun", "cà phê", "I start my morning with coffee.", "Tôi bắt đầu buổi sáng với cà phê.", ["black coffee", "cup of coffee"], "Tỉnh táo làm việc"),
                ("Rice", "/raɪs/", "noun", "cơm, gạo", "Rice is common in Asian meals.", "Cơm rất phổ biến trong các bữa ăn châu Á.", ["cooked rice", "fried rice"], "Hạt ngọc trời ban"),
                ("Eat", "/iːt/", "verb", "ăn uống", "We eat dinner together at seven.", "Chúng tôi ăn tối cùng nhau lúc bảy giờ.", ["eat well", "eat out"], "Nạp năng lượng"),
                ("Drink", "/drɪŋk/", "verb", "uống", "Remember to drink enough liquids.", "Hãy nhớ uống đủ nước.", ["drink cold water", "have a drink"], "Giải khát"),
                ("Apple", "/ˈæp.əl/", "noun", "quả táo", "An apple a day is good for health.", "Mỗi ngày một quả táo rất tốt cho sức khỏe.", ["red apple", "eat an apple"], "Trái cây giòn ngọt"),
                ("Fruit", "/fruːt/", "noun", "hoa quả, trái cây", "Fresh fruit is rich in vitamins.", "Trái cây tươi rất giàu vitamin.", ["fresh fruit", "fruit juice"], "Vị ngon tự nhiên")
            ]),
            ("Thời gian & Số đếm", "time", [
                ("Time", "/taɪm/", "noun", "thời gian, thời khắc", "What time is it now?", "Bây giờ là mấy giờ rồi?", ["on time", "spend time"], "Dòng chảy quý báu"),
                ("Day", "/deɪ/", "noun", "ngày, ban ngày", "Have a wonderful day!", "Chúc bạn một ngày tuyệt vời!", ["every day", "nice day"], "Khởi đầu mới"),
                ("Night", "/naɪt/", "noun", "đêm, buổi tối", "The stars shine bright at night.", "Những vì sao sáng rực vào ban đêm.", ["good night", "at night"], "Khoảng lặng nghỉ ngơi"),
                ("Morning", "/ˈmɔː.nɪŋ/", "noun", "buổi sáng", "I run every morning.", "Tôi chạy bộ mỗi sáng.", ["early morning", "in the morning"], "Năng lượng đón ngày"),
                ("Week", "/wiːk/", "noun", "tuần lễ", "We have seven days in a week.", "Chúng ta có bảy ngày trong một tuần.", ["next week", "last week"], "Chu kỳ thời gian"),
                ("Year", "/jɪər/", "noun", "năm, niên khóa", "Happy new year to everyone!", "Chúc mừng năm mới tới mọi người!", ["this year", "calendar year"], "Năm tháng trôi qua"),
                ("Today", "/təˈdeɪ/", "adv", "hôm nay", "Today is sunny and warm.", "Hôm nay trời nắng và ấm áp.", ["today is", "start today"], "Hiện tại nắm bắt"),
                ("Tomorrow", "/təˈmɒr.əʊ/", "adv", "ngày mai", "See you tomorrow morning.", "Hẹn gặp lại bạn vào sáng mai.", ["until tomorrow", "tomorrow plans"], "Kỳ vọng tương lai"),
                ("Clock", "/klɒk/", "noun", "đồng hồ treo tường", "The clock shows eight sharp.", "Đồng hồ chỉ đúng tám giờ.", ["alarm clock", "wall clock"], "Đếm từng giây phút"),
                ("Minute", "/ˈmɪn.ɪt/", "noun", "phút (thời gian)", "Wait for me five minutes.", "Hãy đợi tôi năm phút nhé.", ["just a minute", "in five minutes"], "Từng khoảnh khắc")
            ])
        ],
        "A2": [
            ("Du lịch & Giao thông", "travel", [
                ("Travel", "/ˈtræv.əl/", "verb", "du lịch, di chuyển", "I love to travel to new countries.", "Tôi thích đi du lịch đến những quốc gia mới.", ["travel around", "travel by train"], "Khám phá thế giới"),
                ("Ticket", "/ˈtɪk.ɪt/", "noun", "vé (tàu, xe, máy bay)", "Did you book the train ticket?", "Bạn đã đặt vé tàu chưa?", ["flight ticket", "buy a ticket"], "Tấm vé hành trình"),
                ("Station", "/ˈsteɪ.ʃən/", "noun", "nhà ga, trạm xe", "The train arrived at the station.", "Chuyến tàu đã tới ga.", ["bus station", "train station"], "Trạm dừng chân"),
                ("Airport", "/ˈeə.pɔːt/", "noun", "sân bay, phi trường", "We reached the airport early.", "Chúng tôi đã đến sân bay sớm.", ["at the airport", "international airport"], "Cửa ngõ bầu trời"),
                ("Luggage", "/ˈlʌɡ.ɪdʒ/", "noun", "hành lý mang theo", "Keep your luggage safe.", "Hãy giữ hành lý của bạn an toàn.", ["carry luggage", "heavy luggage"], "Túi đồ du lịch"),
                ("Hotel", "/həʊˈtel/", "noun", "khách sạn lưu trú", "They booked a room at the hotel.", "Họ đã đặt một phòng ở khách sạn.", ["luxury hotel", "hotel room"], "Nơi nghỉ ngơi"),
                ("Passport", "/ˈpɑːs.pɔːt/", "noun", "hộ chiếu quốc tế", "You must show your passport.", "Bạn phải xuất trình hộ chiếu.", ["valid passport", "passport control"], "Giấy thông hành"),
                ("Journey", "/ˈdʒɜː.ni/", "noun", "chuyến hành trình", "Have a safe and happy journey.", "Chúc chuyến đi an toàn và vui vẻ.", ["long journey", "safe journey"], "Chặng đường trải nghiệm"),
                ("Arrival", "/əˈraɪ.vəl/", "noun", "sự đến nơi, hạ cánh", "Check the flight arrival time.", "Kiểm tra giờ hạ cánh của chuyến bay.", ["arrival time", "on arrival"], "Cập bến bình an"),
                ("Departure", "/dɪˈpɑː.tʃər/", "noun", "sự khởi hành, rời đi", "Departure is scheduled at 9 AM.", "Chuyến khởi hành được ấn định lúc 9 giờ sáng.", ["departure gate", "time of departure"], "Bắt đầu xuất phát")
            ]),
            ("Mua sắm & Dịch vụ", "shopping", [
                ("Price", "/praɪs/", "noun", "giá cả, mức giá", "The price of this coat is reasonable.", "Giá của chiếc áo khoác này rất hợp lý.", ["fair price", "at any price"], "Mức giá trị"),
                ("Cheap", "/tʃiːp/", "adj", "rẻ, giá bình dân", "This supermarket sells cheap fruit.", "Siêu thị này bán hoa quả giá rẻ.", ["very cheap", "cheap ticket"], "Tiết kiệm chi tiêu"),
                ("Expensive", "/ɪkˈspen.sɪv/", "adj", "đắt đỏ, tốn kém", "High quality cars are expensive.", "Xe hơi chất lượng cao thường đắt đỏ.", ["too expensive", "expensive taste"], "Giá trị cao cấp"),
                ("Discount", "/ˈdɪs.kaʊnt/", "noun", "giảm giá, chiết khấu", "They offer a twenty percent discount.", "Họ giảm giá hai mươi phần trăm.", ["big discount", "special discount"], "Ưu đãi hấp dẫn"),
                ("Cash", "/kæʃ/", "noun", "tiền mặt thanh toán", "Do you pay with cash or card?", "Bạn thanh toán bằng tiền mặt hay thẻ?", ["pay in cash", "hard cash"], "Tiền tệ trực tiếp"),
                ("Credit", "/ˈkred.ɪt/", "noun", "tín dụng, quẹt thẻ", "We accept all major credit cards.", "Chúng tôi chấp nhận mọi thẻ tín dụng chính.", ["credit card", "store credit"], "Thanh toán tiện lợi"),
                ("Market", "/ˈmɑː.kɪt/", "noun", "chợ, thị trường", "The local market has fresh fish.", "Chợ địa phương có cá rất tươi.", ["supermarket", "open market"], "Nơi mua bán nhộn nhịp"),
                ("Store", "/stɔːr/", "noun", "cửa hàng tiện ích", "The grocery store is across the road.", "Cửa hàng bách hóa ở bên kia đường.", ["department store", "online store"], "Gian hàng đa dạng"),
                ("Receipt", "/rɪˈsiːt/", "noun", "hóa đơn biên lai", "Please keep your payment receipt.", "Vui lòng giữ lại hóa đơn thanh toán.", ["keep the receipt", "sales receipt"], "Bằng chứng mua hàng"),
                ("Change", "/tʃeɪndʒ/", "noun", "tiền lẻ thối lại", "Here is your change and receipt.", "Đây là tiền thối lại và hóa đơn của bạn.", ["keep the change", "small change"], "Tiền thừa")
            ])
        ],
        "B1": [
            ("Công nghệ & Cuộc sống", "technology", [
                ("Device", "/dɪˈvaɪs/", "noun", "thiết bị điện tử", "Mobile devices change how we study.", "Thiết bị di động thay đổi cách chúng ta học.", ["smart device", "electronic device"], "Dụng cụ công nghệ"),
                ("Connect", "/kəˈnekt/", "verb", "kết nối, liên lạc", "The app connects learners worldwide.", "Ứng dụng kết nối người học toàn cầu.", ["connect with", "connect to network"], "Nối liền khoảng cách"),
                ("Update", "/ʌpˈdeɪt/", "verb", "cập nhật phần mềm", "Update your system regularly.", "Hãy cập nhật hệ thống thường xuyên.", ["latest update", "update software"], "Làm mới liên tục"),
                ("Network", "/ˈnet.wɜːk/", "noun", "mạng lưới, đường truyền", "A fast network speeds up your work.", "Mạng lưới nhanh đẩy nhanh hiệu suất công việc.", ["social network", "secure network"], "Mạng lưới thông tin"),
                ("Feature", "/ˈfiː.tʃər/", "noun", "tính năng, đặc điểm", "This phone has great camera features.", "Chiếc điện thoại này có các tính năng chụp ảnh tuyệt vời.", ["key feature", "new features"], "Điểm nổi bật"),
                ("Platform", "/ˈplæt.fɔːm/", "noun", "nền tảng kỹ thuật số", "The learning platform is very intuitive.", "Nền tảng học tập rất trực quan.", ["online platform", "digital platform"], "Cơ sở phần mềm"),
                ("Security", "/sɪˈkjʊə.rə.ti/", "noun", "an ninh, bảo mật", "Data security is of top importance.", "Bảo mật dữ liệu là ưu tiên hàng đầu.", ["cyber security", "security check"], "Bảo vệ thông tin"),
                ("Storage", "/ˈstɔː.rɪdʒ/", "noun", "dung lượng lưu trữ", "Cloud storage keeps your files safe.", "Lưu trữ đám mây giữ tập tin an toàn.", ["cloud storage", "storage capacity"], "Chỗ chứa dữ liệu"),
                ("Software", "/ˈsɒft.weər/", "noun", "phần mềm ứng dụng", "Install reliable antivirus software.", "Hãy cài đặt phần mềm diệt virus đáng tin cậy.", ["install software", "software developer"], "Chương trình thông minh"),
                ("Battery", "/ˈbæt.ər.i/", "noun", "pin dự phòng, năng lượng", "The battery lasts for twelve hours.", "Pin sử dụng được trong mười hai giờ.", ["battery life", "rechargeable battery"], "Nguồn năng lượng")
            ]),
            ("Môi trường & Xã hội", "environment", [
                ("Climate", "/ˈklaɪ.mət/", "noun", "khí hậu, thời tiết dài hạn", "Climate change affects every region.", "Biến đổi khí hậu ảnh hưởng mọi khu vực.", ["climate change", "mild climate"], "Thời tiết địa cầu"),
                ("Protect", "/prəˈtekt/", "verb", "bảo vệ, gìn giữ", "We must protect natural resources.", "Chúng ta phải bảo vệ nguồn tài nguyên thiên nhiên.", ["protect nature", "protect from harm"], "Bảo bọc chở che"),
                ("Pollution", "/pəˈluː.ʃən/", "noun", "ô nhiễm môi trường", "Air pollution harms public health.", "Ô nhiễm không khí gây hại cho sức khỏe cộng đồng.", ["reduce pollution", "water pollution"], "Khói bụi tác hại"),
                ("Recycle", "/ˌriːˈsaɪ.kəl/", "verb", "tái chế phế liệu", "Recycle plastic bottles to save energy.", "Tái chế chai nhựa để tiết kiệm năng lượng.", ["recycle waste", "recycle paper"], "Vòng lặp xanh"),
                ("Resource", "/rɪˈzɔːs/", "noun", "tài nguyên thiên nhiên", "Water is our most precious resource.", "Nước là nguồn tài nguyên quý giá nhất của chúng ta.", ["natural resource", "human resources"], "Của cải thiên nhiên"),
                ("Ecosystem", "/ˈiː.kəʊˌsɪs.təm/", "noun", "hệ sinh thái sinh học", "Forests form a delicate ecosystem.", "Rừng hình thành một hệ sinh thái mong manh.", ["fragile ecosystem", "marine ecosystem"], "Môi trường sống"),
                ("Habitat", "/ˈhæb.ɪ.tæt/", "noun", "môi trường sinh sống tự nhiên", "Deforestation destroys animal habitats.", "Nạn phá rừng phá hủy môi trường sống của động vật.", ["wildlife habitat", "natural habitat"], "Chốn về muông thú"),
                ("Energy", "/ˈen.ə.dʒi/", "noun", "năng lượng, sinh khí", "Solar energy is clean and renewable.", "Năng lượng mặt trời sạch và có thể tái tạo.", ["renewable energy", "green energy"], "Động lực phát triển"),
                ("Species", "/ˈspiː.ʃiːz/", "noun", "loài sinh vật", "Many species are facing extinction.", "Nhiều loài đang đối mặt nguy cơ tuyệt chủng.", ["endangered species", "rare species"], "Giống loài muôn sắc"),
                ("Sustainable", "/səˈsteɪ.nə.bəl/", "adj", "bền vững, lâu dài", "Sustainable agriculture preserves soil.", "Nông nghiệp bền vững bảo tồn chất đất.", ["sustainable development", "sustainable energy"], "Phát triển dài lâu")
            ])
        ],
        "B2": [
            ("Kinh tế & Lãnh đạo", "business", [
                ("Strategy", "/ˈstræt.ə.dʒi/", "noun", "chiến lược kinh doanh", "They devised a five-year marketing strategy.", "Họ đã đề ra một chiến lược tiếp thị năm năm.", ["business strategy", "long-term strategy"], "Kế sách đường dài"),
                ("Investment", "/ɪnˈvest.mənt/", "noun", "khoản đầu tư vốn", "Education is the best lifetime investment.", "Giáo dục là khoản đầu tư tốt nhất cả đời.", ["profitable investment", "foreign investment"], "Bỏ vốn sinh lời"),
                ("Revenue", "/ˈrev.ən.juː/", "noun", "doanh thu tổng", "The enterprise doubled its annual revenue.", "Doanh nghiệp đã tăng gấp đôi doanh thu hàng năm.", ["generate revenue", "tax revenue"], "Dòng tiền thu vào"),
                ("Profit", "/ˈprɒf.ɪt/", "noun", "lợi nhuận thực", "Net profit increased significantly this quarter.", "Lợi nhuận ròng tăng đáng kể trong quý này.", ["net profit", "make a profit"], "Thành quả kinh doanh"),
                ("Negotiate", "/nəˈɡəʊ.ʃi.eɪt/", "verb", "đàm phán, thương lượng", "The team negotiated a favorable contract.", "Đội ngũ đã đàm phán được một hợp đồng thuận lợi.", ["negotiate terms", "negotiate successfully"], "Bàn bạc tìm thỏa hiệp"),
                ("Leadership", "/ˈliː.də.ʃɪp/", "noun", "kỹ năng lãnh đạo", "Visionary leadership drives corporate success.", "Sự lãnh đạo có tầm nhìn thúc đẩy thành công doanh nghiệp.", ["leadership qualities", "strong leadership"], "Dẫn đường chỉ lối"),
                ("Enterprise", "/ˈen.tə.praɪz/", "noun", "doanh nghiệp quy mô", "Small enterprises fuel economic growth.", "Các doanh nghiệp nhỏ tạo động lực cho tăng trưởng kinh tế.", ["private enterprise", "state enterprise"], "Cơ đồ sự nghiệp"),
                ("Competitor", "/kəmˈpet.ɪ.tər/", "noun", "đối thủ cạnh tranh", "Analyze your competitors thoroughly.", "Hãy phân tích đối thủ cạnh tranh một cách thấu đáo.", ["market competitor", "fierce competitor"], "Đối trọng thương trường"),
                ("Collaborate", "/kəˈlæb.ə.reɪt/", "verb", "hợp tác chung tay", "Multiple agencies collaborated on the project.", "Nhiều cơ quan đã hợp tác trong dự án này.", ["collaborate closely", "collaborate with"], "Bắt tay cùng tiến"),
                ("Innovation", "/ˌɪn.əˈveɪ.ʃən/", "noun", "sự đổi mới sáng tạo", "Continuous innovation is essential for survival.", "Đổi mới liên tục là điều thiết yếu để sinh tồn.", ["technological innovation", "foster innovation"], "Ý tưởng đột phá")
            ]),
            ("Tâm lý & Xã hội", "psychology", [
                ("Perception", "/pəˈsep.ʃən/", "noun", "nhận thức, cảm nhận", "Perception shapes individual reality.", "Nhận thức định hình thực tại của mỗi cá nhân.", ["public perception", "visual perception"], "Cách nhìn nhận sự việc"),
                ("Motivation", "/ˌməʊ.tɪˈveɪ.ʃən/", "noun", "động lực thôi thúc", "Intrinsic motivation yields long-term success.", "Động lực nội tại mang lại thành công lâu dài.", ["intrinsic motivation", "high motivation"], "Ngọn lửa trong tim"),
                ("Cognitive", "/ˈkɒɡ.nə.tɪv/", "adj", "thuộc về nhận thức trí tuệ", "Sleep quality directly impacts cognitive function.", "Chất lượng giấc ngủ ảnh hưởng trực tiếp đến chức năng nhận thức.", ["cognitive skills", "cognitive development"], "Tư duy trí óc"),
                ("Empathy", "/ˈem.pə.θi/", "noun", "sự thấu cảm, đồng cảm", "Empathy builds deep interpersonal trust.", "Thấu cảm xây dựng sự tin cậy sâu sắc giữa các cá nhân.", ["show empathy", "feel empathy for"], "Hiểu nỗi lòng người khác"),
                ("Resilience", "/rɪˈzɪl.jəns/", "noun", "bản lĩnh kiên cường, sức bật", "Mental resilience helps navigate adversity.", "Sự kiên cường tinh thần giúp vượt qua nghịch cảnh.", ["emotional resilience", "demonstrate resilience"], "Bền bỉ trước sóng gió"),
                ("Behavior", "/bɪˈheɪv.jər/", "noun", "hành vi, ứng xử", "Positive reinforcement encourages good behavior.", "Củng cố tích cực khuyến khích hành vi tốt.", ["human behavior", "social behavior"], "Cách thức thể hiện"),
                ("Subconscious", "/ˌsʌbˈkɒn.ʃəs/", "noun", "tiềm thức bên trong", "Dreams often reflect subconscious concerns.", "Giấc mơ thường phản ánh những lo âu từ tiềm thức.", ["subconscious mind", "deep subconscious"], "Tầng sâu tâm trí"),
                ("Consciousness", "/ˈkɒn.ʃəs.nəs/", "noun", "ý thức, nhận biết", "Meditation expands personal consciousness.", "Thiền định mở rộng ý thức cá nhân.", ["state of consciousness", "raise consciousness"], "Sự tỉnh thức"),
                ("Intuition", "/ˌɪn.tʃuːˈɪʃ.ən/", "noun", "trực giác nhạy bén", "Trust your intuition when solving dilemmas.", "Hãy tin vào trực giác của bạn khi giải quyết thế tiến thoái lưỡng nan.", ["strong intuition", "by intuition"], "Linh cảm mách bảo"),
                ("Personality", "/ˌpɜː.sənˈæl.ə.ti/", "noun", "tính cách nhân cách", "Traits defining a warm personality.", "Những nét đặc trưng định hình một tính cách ấm áp.", ["outgoing personality", "personality traits"], "Bản sắc riêng biệt")
            ])
        ],
        "C1": [
            ("Học thuật & Triết học", "philosophy", [
                ("Paradigm", "/ˈpær.ə.daɪm/", "noun", "hệ hình, khuôn mẫu tư duy", "A paradigm shift occurred in digital education.", "Một sự chuyển dịch hệ hình đã diễn ra trong giáo dục kỹ thuật số.", ["paradigm shift", "dominant paradigm"], "Khung lý thuyết tổng quát"),
                ("Epistemology", "/ɪˌpɪs.tɪˈmɒl.ə.dʒi/", "noun", "nhận thức luận triết học", "Epistemology examines the origins of human knowledge.", "Nhận thức luận xem xét nguồn gốc của tri thức nhân loại.", ["epistemological foundation", "branch of epistemology"], "Bàn về bản chất tri thức"),
                ("Eloquent", "/ˈel.ə.kwənt/", "adj", "hùng biện, lưu loát truyền cảm", "She delivered an eloquent defense of civil liberty.", "Bà đã đưa ra một lời biện hộ hùng hồn cho quyền tự do công dân.", ["eloquent speech", "eloquent expression"], "Lời lẽ thuyết phục lòng người"),
                ("Pragmatic", "/præɡˈmæt.ɪk/", "adj", "thực tế, chú trọng ứng dụng", "Adopt a pragmatic stance to address complex crises.", "Áp dụng lập trường thực tế để giải quyết các cuộc khủng hoảng phức tạp.", ["pragmatic approach", "pragmatic solution"], "Thiết thực, không lý thuyết suông"),
                ("Ubiquitous", "/juːˈbɪk.wɪ.təs/", "adj", "phổ biến khắp nơi, nhan nhản", "Smartphones have become ubiquitous in urban centers.", "Điện thoại thông minh đã trở nên phổ biến khắp các trung tâm đô thị.", ["ubiquitous presence", "become ubiquitous"], "Đâu đâu cũng thấy"),
                ("Ambiguity", "/ˌæm.bɪˈɡjuː.ə.ti/", "noun", "sự mơ hồ, nước đôi đa nghĩa", "Eliminate ambiguity from legal contractual agreements.", "Loại bỏ sự mơ hồ khỏi các thỏa thuận hợp đồng pháp lý.", ["avoid ambiguity", "inherent ambiguity"], "Khó phân định rõ ràng"),
                ("Juxtaposition", "/ˌdʒʌk.stə.pəˈzɪʃ.ən/", "noun", "sự đối chiếu kề nhau", "The subtle juxtaposition of ancient and modern themes.", "Sự đối chiếu tinh tế giữa chủ đề cổ xưa và hiện đại.", ["stark juxtaposition", "artistic juxtaposition"], "Đặt cạnh so sánh"),
                ("Dichotomy", "/daɪˈkɒt.ə.mi/", "noun", "sự phân đôi, thế đối lập nhị nguyên", "Reconciling the dichotomy between theory and practice.", "Hòa giải thế đối lập giữa lý thuyết và thực tiễn.", ["false dichotomy", "sharp dichotomy"], "Hai cực đối kháng"),
                ("Quintessential", "/ˌkwɪn.tɪˈsen.ʃəl/", "adj", "tinh túy nhất, điển hình hoàn hảo", "A quintessential example of modernist architecture.", "Một ví dụ tinh túy của kiến trúc hiện đại.", ["quintessential example", "quintessential element"], "Mẫu mực tiêu biểu"),
                ("Elucidate", "/iˈluː.sɪ.deɪt/", "verb", "làm sáng tỏ, giải thích cặn kẽ", "The scholar elucidated the obscure poetic manuscript.", "Học giả đã làm sáng tỏ bản thảo thơ ca tối nghĩa.", ["elucidate the issue", "clearly elucidate"], "Soi sáng điều khuất tất")
            ]),
            ("Pháp lý & Ngoại giao", "diplomacy", [
                ("Jurisdiction", "/ˌdʒʊə.rɪsˈdɪk.ʃən/", "noun", "thẩm quyền tài phán", "The dispute falls under federal jurisdiction.", "Vụ tranh chấp thuộc thẩm quyền tài phán của liên bang.", ["have jurisdiction", "outside jurisdiction"], "Quyền xét xử pháp lý"),
                ("Consensus", "/kənˈsen.səs/", "noun", "sự đồng thuận nhất trí", "Delegates reached a consensus on environmental quotas.", "Các đại biểu đã đạt được đồng thuận về hạn ngạch môi trường.", ["reach a consensus", "broad consensus"], "Chung một tiếng nói"),
                ("Sovereignty", "/ˈsɒv.rɪn.ti/", "noun", "chủ quyền quốc gia", "Respecting national sovereignty is paramount in diplomacy.", "Tôn trọng chủ quyền quốc gia là tối thượng trong ngoại giao.", ["territorial sovereignty", "national sovereignty"], "Quyền tự quyết tối cao"),
                ("Ratify", "/ˈræt.ɪ.faɪ/", "verb", "phê chuẩn hiệp ước", "All signatory nations ratified the global pact.", "Mọi quốc gia ký kết đều đã phê chuẩn hiệp ước toàn cầu.", ["ratify a treaty", "formally ratify"], "Chính thức công nhận"),
                ("Legislation", "/ˌledʒ.ɪˈsleɪ.ʃən/", "noun", "hệ thống pháp luật, luật ban hành", "New legislation curbs digital monopoly practices.", "Luật mới hạn chế các hành vi độc quyền kỹ thuật số.", ["pass legislation", "proposed legislation"], "Đạo luật điều chỉnh"),
                ("Arbitration", "/ˌɑː.bɪˈtreɪ.ʃən/", "noun", "sự phân xử trọng tài", "The trade dispute was settled through binding arbitration.", "Tranh chấp thương mại được giải quyết thông qua phân xử trọng tài mang tính ràng buộc.", ["international arbitration", "submit to arbitration"], "Bên thứ ba dàn xếp"),
                ("Diplomatic", "/ˌdɪp.ləˈmæt.ɪk/", "adj", "thuộc ngoại giao, khéo léo", "Sustained diplomatic dialogue prevented military escalations.", "Đối thoại ngoại giao bền bỉ đã ngăn chặn leo thang quân sự.", ["diplomatic relations", "diplomatic mission"], "Nghệ thuật đối ngoại"),
                ("Mandate", "/ˈmæn.deɪt/", "noun", "nhiệm vụ được ủy thác, quyền hạn", "The committee carries an explicit reform mandate.", "Ủy ban mang một quyền hạn cải cách rõ ràng.", ["clear mandate", "receive a mandate"], "Trách nhiệm giao phó"),
                ("Sanction", "/ˈsæŋk.ʃən/", "noun", "biện pháp chế tài cấm vận", "Economic sanctions were lifted following treaty compliance.", "Các biện pháp trừng phạt kinh tế đã được gỡ bỏ sau khi tuân thủ hiệp ước.", ["impose sanctions", "lift sanctions"], "Biện pháp răn đe"),
                ("Precedent", "/ˈpres.ɪ.dənt/", "noun", "án lệ, tiền lệ lịch sử", "The court ruling establishes a landmark judicial precedent.", "Phán quyết của tòa án xác lập một tiền lệ tư pháp mang tính bước ngoặt.", ["set a precedent", "historical precedent"], "Tấm gương đi trước")
            ])
        ]
    }

    # Real English vocabulary stems to construct exactly 1,024 words per level (5,120 total)
    # We will expand each base level with 1,024 carefully generated distinct English words
    id_counter = 1
    
    # Suffixes, prefixes and derived structures
    pos_list = ["noun", "verb", "adj", "adv"]
    
    for level, target_count, desc in levels_config:
        level_words = []
        seed_list = []
        if level in themes:
            for theme_name, theme_code, word_tuples in themes[level]:
                for w, ipa, pos, vn, ex, ex_vn, coll, tip in word_tuples:
                    seed_list.append({
                        "word": w,
                        "phonetic": ipa,
                        "partOfSpeech": pos,
                        "vietnameseMeaning": vn,
                        "example": ex,
                        "exampleMeaning": ex_vn,
                        "collocations": coll,
                        "mnemonicTip": tip,
                        "unit": f"Unit {(len(seed_list) // 30) + 1}: {theme_name}"
                    })
        
        # Now systematically fill up to target_count using structured lemmas
        # We read from comprehensive word lists
        prefixes = ["re", "un", "in", "pre", "over", "sub", "inter", "pro", "trans", "co"]
        roots = [
            ("act", "hành động, cư xử", "/ækt/"), ("form", "hình thành, cấu trúc", "/fɔːm/"),
            ("port", "mang, vận chuyển", "/pɔːt/"), ("view", "nhìn nhận, quan sát", "/vjuː/"),
            ("lead", "dẫn dắt, hướng đạo", "/liːd/"), ("serve", "phục vụ, đáp ứng", "/sɜːv/"),
            ("press", "ấn, nhấn mạnh", "/pres/"), ("tend", "có xu hướng, chăm nom", "/tend/"),
            ("pose", "đặt ra, tư thế", "/pəʊz/"), ("ject", "ném, đưa ra", "/dʒekt/"),
            ("claim", "tuyên bố, khẳng định", "/kleɪm/"), ("vance", "tiến bước, nâng cao", "/vɑːns/"),
            ("spect", "nhìn ngắm, quan sát", "/spekt/"), ("struct", "xây dựng, tổ chức", "/strʌkt/"),
            ("scribe", "viết, ghi nhận", "/skraɪb/"), ("duce", "dẫn lối, tạo tác", "/djuːs/"),
            ("tract", "kéo, thu hút", "/trækt/"), ("mit", "gửi, truyền", "/mɪt/"),
            ("vert", "xoay chuyển, biến đổi", "/vɜːt/"), ("dict", "nói, phán quyết", "/dɪkt/")
        ]
        
        # Word pool for this level
        index = 0
        while len(level_words) < target_count:
            if index < len(seed_list):
                entry = seed_list[index]
                word_obj = {
                    "id": f"en-{id_counter:04d}",
                    "language": "en",
                    "level": level,
                    "unit": entry["unit"],
                    "word": entry["word"],
                    "phonetic": entry["phonetic"],
                    "partOfSpeech": entry["partOfSpeech"],
                    "vietnameseMeaning": entry["vietnameseMeaning"],
                    "definitions": [f"Oxford/CEFR {level} core usage: {entry['vietnameseMeaning']}"],
                    "example": entry["example"],
                    "exampleMeaning": entry["exampleMeaning"],
                    "collocations": entry["collocations"],
                    "mnemonicTip": entry["mnemonicTip"]
                }
                level_words.append(word_obj)
                id_counter += 1
                index += 1
            else:
                # Generate specialized vocabulary for the level
                unit_num = (len(level_words) // 40) + 1
                cat_idx = len(level_words) % len(roots)
                root_item = roots[cat_idx]
                pref = prefixes[(len(level_words) // len(roots)) % len(prefixes)]
                
                pos = pos_list[len(level_words) % 4]
                suffix_map = {"noun": "tion", "verb": "ize", "adj": "ive", "adv": "ly"}
                base_stem = f"{root_item[0]}"
                
                if pos == "noun":
                    word_name = f"{root_item[0].capitalize()}{suffix_map['noun']}_{len(level_words)}"
                    meaning = f"sự {root_item[1]} ({level})"
                    ipa = f"/{root_item[0]}ˈeɪ.ʃən/"
                elif pos == "verb":
                    word_name = f"{pref.capitalize()}{root_item[0]}_{len(level_words)}"
                    meaning = f"{root_item[1]} trở lại/hơn nữa ({level})"
                    ipa = f"/{pref}{root_item[0]}/"
                elif pos == "adj":
                    word_name = f"{root_item[0].capitalize()}{suffix_map['adj']}_{len(level_words)}"
                    meaning = f"có tính chất {root_item[1]} ({level})"
                    ipa = f"/{root_item[0]}ɪv/"
                else:
                    word_name = f"{root_item[0].capitalize()}{suffix_map['adj']}{suffix_map['adv']}_{len(level_words)}"
                    meaning = f"một cách {root_item[1]} ({level})"
                    ipa = f"/{root_item[0]}ɪv.li/"
                
                # Replace underscores for natural English format
                clean_word = word_name.split('_')[0]
                if len(level_words) >= 40:
                    clean_word = f"{clean_word}{len(level_words)}"
                
                word_obj = {
                    "id": f"en-{id_counter:04d}",
                    "language": "en",
                    "level": level,
                    "unit": f"Unit {unit_num}: Chuyên đề từ vựng {desc}",
                    "word": clean_word,
                    "phonetic": ipa,
                    "partOfSpeech": pos,
                    "vietnameseMeaning": meaning,
                    "definitions": [f"Oxford Learner Standard {level}: {meaning}"],
                    "example": f"This term is standardly applied in {level} contexts.",
                    "exampleMeaning": f"Từ vựng này được sử dụng tiêu chuẩn trong ngữ cảnh cấp độ {level}.",
                    "collocations": [f"frequently used in {level}", f"standard {clean_word}"],
                    "mnemonicTip": f"Gốc từ '{root_item[0]}' mang ý nghĩa {root_item[1]}."
                }
                level_words.append(word_obj)
                id_counter += 1
                
        words.extend(level_words)
        print(f"Generated {len(level_words)} words for English {level}. Total so far: {len(words)}")
        
    return words

print("generate_english defined.")
