# -*- coding: utf-8 -*-
import json
import os

# Definition of Oxford English and HSK Chinese standard vocabularies
# Sourced from Oxford 3000 / Oxford 5000 and Hanban official HSK syllabi

def generate_english():
    words = []
    
    # ------------------ LEVEL A1 (160 words) ------------------
    a1_units = {
        "Unit 1: Chào hỏi, Làm quen & Bản thân": [
            ("Hello", "/həˈləʊ/", "thán từ", "xin chào", "Hello, nice to meet you.", "Xin chào, rất vui được gặp bạn.", "Chào hỏi cơ bản nhất"),
            ("Greet", "/ɡriːt/", "động từ", "chào đón, chào hỏi", "She greeted the guests warmly.", "Cô ấy chào đón các vị khách một cách nồng hậu.", "Gặp gỡ là chào hỏi"),
            ("Introduce", "/ˌɪn.trəˈdjuːs/", "động từ", "giới thiệu, làm quen", "Let me introduce my friend Peter.", "Để tôi giới thiệu người bạn Peter của mình.", "Intro = đi vào làm quen"),
            ("Welcome", "/ˈwel.kəm/", "động từ", "chào mừng, hoan nghênh", "Welcome to our class.", "Chào mừng đến với lớp học của chúng tôi.", "Well + come"),
            ("Name", "/neɪm/", "danh từ", "tên gọi, danh tính", "My name is John.", "Tên của tôi là John.", "Xưng hô"),
            ("Age", "/eɪdʒ/", "danh từ", "tuổi tác", "He is twenty years of age.", "Anh ấy hai mươi tuổi.", "Độ tuổi"),
            ("Live", "/lɪv/", "động từ", "sinh sống, cư ngụ", "I live in a peaceful town.", "Tôi sống ở một thị trấn yên bình.", "Cuộc sống cư trú"),
            ("Country", "/ˈkʌn.tri/", "danh từ", "đất nước, quốc gia", "Vietnam is my home country.", "Việt Nam là đất nước quê hương tôi.", "Quốc gia"),
            ("Nationality", "/ˌnæʃ.ənˈæl.ə.ti/", "danh từ", "quốc tịch", "What is your nationality?", "Quốc tịch của bạn là gì?", "Thuộc về quốc gia"),
            ("Language", "/ˈlæŋ.ɡwɪdʒ/", "danh từ", "ngôn ngữ, tiếng nói", "English is a global language.", "Tiếng Anh là ngôn ngữ toàn cầu.", "Phương tiện giao tiếp"),
            ("Friend", "/frend/", "danh từ", "người bạn, bạn bè", "A good friend helps you in need.", "Một người bạn tốt sẽ giúp đỡ bạn khi khó khăn.", "Tình bạn"),
            ("Meet", "/miːt/", "động từ", "gặp gỡ, hẹn gặp", "Let us meet at the cafe.", "Chúng ta hãy gặp nhau ở quán cà phê nhé.", "Gặp mặt"),
            ("Address", "/əˈdres/", "danh từ", "địa chỉ nhà", "Write your address on the form.", "Hãy ghi địa chỉ của bạn vào biểu mẫu.", "Nơi ở"),
            ("Phone", "/fəʊn/", "danh từ", "điện thoại liên lạc", "Can I borrow your phone?", "Tôi có thể mượn điện thoại của bạn không?", "Thiết bị liên lạc"),
            ("Email", "/ˈiː.meɪl/", "danh từ", "thư điện tử", "Send me an email tonight.", "Hãy gửi cho tôi một email tối nay nhé.", "Thư điện tử"),
            ("Spell", "/spel/", "động từ", "đánh vần chữ cái", "How do you spell your surname?", "Bạn đánh vần họ của mình như thế nào?", "Đánh vần từng ký tự"),
            ("Person", "/ˈpɜː.sən/", "danh từ", "con người, cá nhân", "She is a kind person.", "Cô ấy là một người tốt bụng.", "Một cá nhân"),
            ("People", "/ˈpiː.pəl/", "danh từ", "mọi người, con người", "Many people visit the museum.", "Nhiều người đến tham quan bảo tàng.", "Số nhiều của person"),
            ("Man", "/mæn/", "danh từ", "người đàn ông", "The man is reading a newspaper.", "Người đàn ông đang đọc báo.", "Nam giới"),
            ("Woman", "/ˈwʊm.ən/", "danh từ", "người phụ nữ", "The woman smiled warmly.", "Người phụ nữ mỉm cười ấm áp.", "Nữ giới")
        ],
        "Unit 2: Gia đình & Người thân": [
            ("Family", "/ˈfæm.əl.i/", "danh từ", "gia đình, tổ ấm", "Family is very important to me.", "Gia đình rất quan trọng đối với tôi.", "Tổ ấm ruột thịt"),
            ("Parent", "/ˈpeə.rənt/", "danh từ", "phụ huynh, bố mẹ", "Both parents attended the meeting.", "Cả bố mẹ đều đã tham dự cuộc họp.", "Bố hoặc mẹ"),
            ("Father", "/ˈfɑː.ðər/", "danh từ", "người cha, bố", "His father is an engineer.", "Bố của anh ấy là kỹ sư.", "Người cha"),
            ("Mother", "/ˈmʌð.ər/", "danh từ", "người mẹ, má", "My mother cooks delicious food.", "Mẹ tôi nấu ăn rất ngon.", "Người mẹ"),
            ("Brother", "/ˈbrʌð.ər/", "danh từ", "anh trai, em trai", "I have an older brother.", "Tôi có một người anh trai.", "Anh em trai"),
            ("Sister", "/ˈsɪs.tər/", "danh từ", "chị gái, em gái", "Her younger sister plays violin.", "Em gái cô ấy chơi đàn vĩ cầm.", "Chị em gái"),
            ("Son", "/sʌn/", "danh từ", "con trai", "Their son is five years old.", "Con trai của họ được năm tuổi.", "Con trai ruột"),
            ("Daughter", "/ˈdɔː.tər/", "danh từ", "con gái", "She loves her daughter dearly.", "Bà ấy rất yêu thương con gái mình.", "Con gái ruột"),
            ("Baby", "/ˈbeɪ.bi/", "danh từ", "em bé, trẻ sơ sinh", "The baby is sleeping peacefully.", "Em bé đang ngủ say sưa.", "Bé sơ sinh"),
            ("Child", "/tʃaɪld/", "danh từ", "đứa trẻ, con cái", "Every child deserves education.", "Mọi đứa trẻ đều xứng đáng được học hành.", "Số nhiều là children"),
            ("Husband", "/ˈhʌz.bənd/", "danh từ", "người chồng", "Her husband works at a bank.", "Chồng cô ấy làm việc ở ngân hàng.", "Bạn đời nam"),
            ("Wife", "/waɪf/", "danh từ", "người vợ", "He bought flowers for his wife.", "Anh ấy đã mua hoa tặng vợ mình.", "Bạn đời nữ"),
            ("Uncle", "/ˈʌŋ.kəl/", "danh từ", "chú, bác, cậu", "My uncle lives in Canada.", "Chú tôi sống ở Canada.", "Họ hàng nam"),
            ("Aunt", "/ɑːnt/", "danh từ", "cô, dì, bác gái", "Aunt Mary visits us often.", "Dì Mary thường xuyên đến thăm chúng tôi.", "Họ hàng nữ"),
            ("Cousin", "/ˈkʌz.ən/", "danh từ", "anh chị em họ", "I went swimming with my cousin.", "Tôi đã đi bơi cùng anh họ của mình.", "Con của cô chú"),
            ("Grandfather", "/ˈɡræn.fɑː.ðər/", "danh từ", "ông nội, ông ngoại", "My grandfather tells great stories.", "Ông tôi kể chuyện rất hay.", "Thế hệ ông"),
            ("Grandmother", "/ˈɡræn.mʌð.ər/", "danh từ", "bà nội, bà ngoại", "Grandmother baked apple pie.", "Bà đã nướng món bánh táo.", "Thế hệ bà"),
            ("Grandparent", "/ˈɡræn.peə.rənt/", "danh từ", "ông bà", "We visit our grandparents on Sundays.", "Chúng tôi đến thăm ông bà vào các ngày chủ nhật.", "Cả ông và bà"),
            ("Relative", "/ˈrel.ə.tɪv/", "danh từ", "họ hàng, người thân", "All our relatives gathered for dinner.", "Tất cả họ hàng đã tề tựu dùng bữa tối.", "Mối quan hệ thân thuộc"),
            ("Neighbor", "/ˈneɪ.bər/", "danh từ", "người hàng xóm", "Our neighbors are very friendly.", "Những người hàng xóm của chúng tôi rất thân thiện.", "Sống cạnh nhà")
        ],
        "Unit 3: Nhà cửa, Phòng ốc & Đồ đạc": [
            ("House", "/haʊs/", "danh từ", "ngôi nhà", "They bought a new house.", "Họ đã mua một ngôi nhà mới.", "Nơi cư trú"),
            ("Home", "/həʊm/", "danh từ", "mái ấm gia đình", "Home is where the heart is.", "Mái ấm là nơi trái tim hướng về.", "Cảm giác bình yên"),
            ("Room", "/ruːm/", "danh từ", "căn phòng", "The room has a nice window.", "Căn phòng có một cửa sổ đẹp.", "Không gian phòng"),
            ("Kitchen", "/ˈkɪtʃ.ən/", "danh từ", "nhà bếp", "Smell the soup in the kitchen.", "Hãy ngửi mùi súp trong bếp kìa.", "Nơi nấu ăn"),
            ("Bedroom", "/ˈbed.ruːm/", "danh từ", "phòng ngủ", "Her bedroom is quiet.", "Phòng ngủ của cô ấy rất yên tĩnh.", "Nơi nghỉ ngơi"),
            ("Bathroom", "/ˈbɑːθ.ruːm/", "danh từ", "phòng tắm", "The bathroom is very clean.", "Phòng tắm rất sạch sẽ.", "Nơi vệ sinh cá nhân"),
            ("Living room", "/ˈlɪv.ɪŋ ˌruːm/", "danh từ", "phòng khách", "We sit together in the living room.", "Chúng tôi ngồi cùng nhau ở phòng khách.", "Nơi tiếp khách"),
            ("Door", "/dɔːr/", "danh từ", "cửa ra vào", "Please open the door.", "Làm ơn hãy mở cửa ra.", "Cửa chính"),
            ("Window", "/ˈwɪn.dəʊ/", "danh từ", "cửa sổ", "Sunlight comes through the window.", "Ánh nắng tràn qua khung cửa sổ.", "Cửa thông gió"),
            ("Table", "/ˈteɪ.bəl/", "danh từ", "cái bàn", "Books are on the table.", "Sách đang ở trên bàn.", "Mặt phẳng để đồ"),
            ("Chair", "/tʃeər/", "danh từ", "cái ghế ngồi", "Pull up a chair and sit.", "Hãy kéo ghế lại và ngồi xuống.", "Ghế ngồi"),
            ("Bed", "/bed/", "danh từ", "chiếc giường", "The bed is warm and soft.", "Chiếc giường rất ấm áp và êm ái.", "Giường ngủ"),
            ("Desk", "/desk/", "danh từ", "bàn học, bàn làm việc", "Keep your study desk tidy.", "Hãy giữ bàn học của bạn gọn gàng.", "Bàn học tập"),
            ("Lamp", "/læmp/", "danh từ", "đèn thắp sáng", "Turn on the reading lamp.", "Bật chiếc đèn đọc sách lên nhé.", "Đèn chiếu sáng"),
            ("Clock", "/klɒk/", "danh từ", "đồng hồ treo tường", "The clock shows eight AM.", "Đồng hồ chỉ tám giờ sáng.", "Đo thời gian"),
            ("Floor", "/flɔːr/", "danh từ", "sàn nhà, tầng lầu", "He sat on the wooden floor.", "Anh ấy ngồi trên sàn gỗ.", "Sàn nhà"),
            ("Wall", "/wɔːl/", "danh từ", "bức tường", "They painted the wall white.", "Họ đã sơn bức tường màu trắng.", "Vách ngăn"),
            ("Roof", "/ruːf/", "danh từ", "mái nhà", "Rain falls on the roof.", "Mưa rơi lộp độp trên mái nhà.", "Phần trên cùng"),
            ("Garden", "/ˈɡɑː.dən/", "danh từ", "khu vườn cây cảnh", "Flowers bloom in the garden.", "Hoa nở rộ trong khu vườn.", "Vườn cây hoa"),
            ("Gate", "/ɡeɪt/", "danh từ", "cổng ngõ", "Lock the front gate at night.", "Hãy khóa cổng trước vào ban đêm.", "Cửa ngõ vào nhà")
        ],
        "Unit 4: Thức ăn, Đồ uống & Bữa ăn": [
            ("Food", "/fuːd/", "danh từ", "thức ăn, thực phẩm", "Good food brings joy.", "Đồ ăn ngon mang lại niềm vui.", "Nguồn dinh dưỡng"),
            ("Water", "/ˈwɔː.tər/", "danh từ", "nước uống", "Drink pure water every day.", "Hãy uống nước tinh khiết mỗi ngày.", "Nước uống"),
            ("Bread", "/bred/", "danh từ", "bánh mì", "Warm bread tastes amazing.", "Bánh mì ấm có vị ngon tuyệt.", "Ổ bánh mì"),
            ("Rice", "/raɪs/", "danh từ", "cơm, gạo", "Rice is eaten daily in Asia.", "Cơm được ăn hằng ngày ở châu Á.", "Hạt gạo"),
            ("Noodle", "/ˈnuː.dəl/", "danh từ", "mì sợi, bún phở", "A hot bowl of noodles.", "Một tô mì sợi nóng hổi.", "Món sợi"),
            ("Meat", "/miːt/", "danh từ", "thịt", "Fresh meat from the market.", "Thịt tươi từ ngoài chợ.", "Đạm động vật"),
            ("Beef", "/biːf/", "danh từ", "thịt bò", "Beef noodle soup is famous.", "Phở bò rất nổi tiếng.", "Thịt từ bò"),
            ("Chicken", "/ˈtʃɪk.ɪn/", "danh từ", "thịt gà, con gà", "Grilled chicken smells good.", "Thịt gà nướng thơm phức.", "Thịt gia cầm"),
            ("Pork", "/pɔːk/", "danh từ", "thịt lợn, thịt heo", "Roast pork with honey.", "Thịt heo quay mật ong.", "Thịt lợn"),
            ("Fish", "/fɪʃ/", "danh từ", "cá", "Fish is rich in Omega-3.", "Cá rất giàu Omega-3.", "Hải sản"),
            ("Egg", "/eɡ/", "danh từ", "quả trứng", "Boil an egg for breakfast.", "Hãy luộc một quả trứng cho bữa sáng.", "Trứng"),
            ("Milk", "/mɪlk/", "danh từ", "sữa tươi", "Drink milk to grow tall.", "Uống sữa để phát triển chiều cao.", "Sữa tươi"),
            ("Fruit", "/fruːt/", "danh từ", "trái cây, hoa quả", "Eat fresh fruit daily.", "Ăn trái cây tươi hằng ngày.", "Trái cây"),
            ("Apple", "/ˈæp.əl/", "danh từ", "quả táo tây", "An apple a day keeps the doctor away.", "Mỗi ngày một quả táo giúp tránh xa bác sĩ.", "Quả táo"),
            ("Banana", "/bəˈnɑː.nə/", "danh từ", "quả chuối", "Bananas are rich in potassium.", "Chuối rất giàu kali.", "Quả chuối"),
            ("Orange", "/ˈɒr.ɪndʒ/", "danh từ", "quả cam, màu cam", "Fresh orange juice is sweet.", "Nước cam tươi rất ngọt ngào.", "Quả cam"),
            ("Vegetable", "/ˈvedʒ.tə.bəl/", "danh từ", "rau củ", "Green vegetables are healthy.", "Rau xanh rất tốt cho sức khỏe.", "Rau củ"),
            ("Tomato", "/təˈmɑː.təʊ/", "danh từ", "quả cà chua", "Ripe red tomatoes.", "Những quả cà chua chín đỏ mọng.", "Cà chua"),
            ("Potato", "/pəˈteɪ.təʊ/", "danh từ", "củ khoai tây", "Crispy fried potatoes.", "Những cọng khoai tây chiên giòn rụm.", "Khoai tây"),
            ("Coffee", "/ˈkɒf.i/", "danh từ", "cà phê", "Morning coffee wakes you up.", "Cà phê sáng giúp bạn tỉnh táo.", "Thức uống sáng")
        ],
        "Unit 5: Thời gian, Thời tiết & Ngày tháng": [
            ("Time", "/taɪm/", "danh từ", "thời gian, thời lượng", "Time is a precious asset.", "Thời gian là tài sản quý giá.", "Khái niệm thời gian"),
            ("Today", "/təˈdeɪ/", "danh từ", "hôm nay", "Today is a sunny day.", "Hôm nay là một ngày đầy nắng.", "Ngày hiện tại"),
            ("Tomorrow", "/təˈmɒr.əʊ/", "danh từ", "ngày mai", "See you again tomorrow.", "Hẹn gặp lại bạn vào ngày mai nhé.", "Ngày kế tiếp"),
            ("Yesterday", "/ˈjes.tə.deɪ/", "danh từ", "hôm qua", "I finished my work yesterday.", "Tôi đã hoàn thành công việc của mình hôm qua.", "Ngày đã qua"),
            ("Morning", "/ˈmɔː.nɪŋ/", "danh từ", "buổi sáng", "Good morning to you.", "Chúc bạn một buổi sáng tốt lành.", "Đầu ngày"),
            ("Noon", "/nuːn/", "danh từ", "buổi trưa", "Let us eat lunch at noon.", "Chúng ta hãy ăn trưa vào buổi trưa nhé.", "12 giờ trưa"),
            ("Afternoon", "/ˌɑːf.təˈnuːn/", "danh từ", "buổi chiều", "Class ends this afternoon.", "Lớp học kết thúc vào chiều nay.", "Sau buổi trưa"),
            ("Evening", "/ˈiːv.nɪŋ/", "danh từ", "buổi tối", "Relax in the evening.", "Hãy thư giãn vào buổi tối nhé.", "Cuối ngày"),
            ("Night", "/naɪt/", "danh từ", "ban đêm", "The night sky is starry.", "Bầu trời đêm đầy sao lấp lánh.", "Đêm tối"),
            ("Hour", "/aʊər/", "danh từ", "giờ đồng hồ", "Wait for half an hour.", "Chờ đợi trong nửa giờ đồng hồ.", "60 phút"),
            ("Minute", "/ˈmɪn.ɪt/", "danh từ", "phút", "Just five minutes left.", "Chỉ còn lại năm phút nữa thôi.", "60 giây"),
            ("Second", "/ˈsek.ənd/", "danh từ", "giây", "Every second is valuable.", "Mỗi giây đều thật quý giá.", "Đơn vị giây"),
            ("Day", "/deɪ/", "danh từ", "ngày", "Have a great day ahead.", "Chúc bạn một ngày tuyệt vời phía trước.", "24 giờ"),
            ("Week", "/wiːk/", "danh từ", "tuần lễ", "Seven days in a week.", "Bảy ngày trong một tuần lễ.", "7 ngày"),
            ("Month", "/mʌnθ/", "danh từ", "tháng", "April is my birthday month.", "Tháng Tư là tháng sinh nhật của tôi.", "Khoảng 30 ngày"),
            ("Year", "/jɪər/", "danh từ", "năm", "A prosperous new year.", "Một năm mới an khang thịnh vượng.", "365 ngày"),
            ("Weather", "/ˈweð.ər/", "danh từ", "thời tiết", "The weather is pleasant.", "Thời tiết hôm nay thật dễ chịu.", "Khí hậu trong ngày"),
            ("Sun", "/sʌn/", "danh từ", "mặt trời", "The sun rises in the east.", "Mặt trời mọc ở hướng đông.", "Vầng thái dương"),
            ("Rain", "/reɪn/", "động từ", "mưa rơi, cơn mưa", "It started to rain heavily.", "Trời bắt đầu đổ mưa lớn.", "Nước mưa rơi"),
            ("Wind", "/wɪnd/", "danh từ", "cơn gió", "A gentle wind blows.", "Một làn gió nhẹ nhàng thổi qua.", "Gió mát")
        ],
        "Unit 6: Hoạt động thường nhật cơ bản": [
            ("Wake", "/weɪk/", "động từ", "thức giấc, tỉnh dậy", "Wake up early in the morning.", "Thức dậy sớm vào buổi sáng.", "Bắt đầu ngày"),
            ("Wash", "/wɒʃ/", "động từ", "rửa ráy, giặt giũ", "Wash hands before meals.", "Rửa tay trước khi ăn cơm.", "Làm sạch nước"),
            ("Brush", "/brʌʃ/", "động từ", "đánh răng, chải tóc", "Brush teeth twice a day.", "Đánh răng hai lần mỗi ngày.", "Vệ sinh răng miệng"),
            ("Dress", "/dres/", "động từ", "mặc quần áo", "Dress neatly for school.", "Mặc quần áo gọn gàng đi học.", "Trang phục"),
            ("Eat", "/iːt/", "động từ", "ăn uống", "Eat healthy nutritious food.", "Ăn đồ ăn bổ dưỡng lành mạnh.", "Nạp năng lượng"),
            ("Drink", "/drɪŋk/", "động từ", "uống nước", "Drink clean mineral water.", "Uống nước khoáng sạch.", "Thức uống"),
            ("Go", "/ɡəʊ/", "động từ", "đi, di chuyển", "Go to school by bus.", "Đi đến trường bằng xe buýt.", "Di chuyển"),
            ("Come", "/kʌm/", "động từ", "đến, tới nơi", "Come here and join us.", "Hãy đến đây và cùng tham gia với chúng tôi.", "Tới gần"),
            ("Walk", "/wɔːk/", "động từ", "đi bộ, dạo bước", "Walk in the green park.", "Đi dạo trong công viên xanh mát.", "Bộ hành"),
            ("Run", "/rʌn/", "động từ", "chạy nhanh", "Run fast to catch the bus.", "Chạy nhanh để bắt kịp xe buýt.", "Tốc độ"),
            ("Sit", "/sɪt/", "động từ", "ngồi xuống", "Sit down on the soft sofa.", "Ngồi xuống chiếc ghế sofa êm ái.", "Tư thế ngồi"),
            ("Stand", "/stænd/", "động từ", "đứng dậy", "Stand up when called upon.", "Đứng dậy khi được gọi tên.", "Tư thế đứng"),
            ("Sleep", "/sliːp/", "động từ", "ngủ, an giấc", "Sleep eight hours a night.", "Ngủ tám tiếng mỗi đêm.", "Nghỉ ngơi ban đêm"),
            ("Listen", "/ˈlɪs.ən/", "động từ", "lắng nghe chăm chú", "Listen to English podcasts.", "Lắng nghe các podcast tiếng Anh.", "Nghe có chú ý"),
            ("Speak", "/spiːk/", "động từ", "nói năng, phát biểu", "Speak English every day.", "Nói tiếng Anh mỗi ngày.", "Phát âm tiếng"),
            ("Read", "/riːd/", "động từ", "đọc sách", "Read books to gain wisdom.", "Đọc sách để có thêm trí tuệ.", "Đọc tài liệu"),
            ("Write", "/raɪt/", "động từ", "viết lách", "Write down new vocabulary.", "Ghi chép lại các từ vựng mới.", "Ghi chữ"),
            ("Learn", "/lɜːn/", "động từ", "học hỏi kiến thức", "Learn with high dedication.", "Học hỏi với tinh thần cống hiến cao.", "Tiếp thu tri thức"),
            ("Study", "/ˈstʌd.i/", "động từ", "học tập, ôn luyện", "Study for upcoming tests.", "Học tập chuẩn bị cho các kỳ thi sắp tới.", "Nghiên cứu ôn tập"),
            ("Work", "/wɜːk/", "động từ", "làm việc, lao động", "Work hard to achieve dreams.", "Làm việc chăm chỉ để đạt được ước mơ.", "Lao động nghề nghiệp")
        ],
        "Unit 7: Trường học, Học tập & Dụng cụ": [
            ("School", "/skuːl/", "danh từ", "trường học", "Our school has a library.", "Trường của chúng tôi có một thư viện.", "Nơi học tập"),
            ("Class", "/klɑːs/", "danh từ", "lớp học, buổi học", "The class starts promptly.", "Lớp học bắt đầu rất đúng giờ.", "Tập thể lớp"),
            ("Student", "/ˈstjuː.dənt/", "danh từ", "học sinh, sinh viên", "An industrious student.", "Một người học sinh siêng năng.", "Người theo học"),
            ("Teacher", "/ˈtiː.tʃər/", "danh từ", "thầy cô giáo", "A devoted English teacher.", "Một người giáo viên tiếng Anh tận tâm.", "Người dạy dỗ"),
            ("Book", "/bʊk/", "danh từ", "cuốn sách", "Open your textbook to page ten.", "Hãy mở sách giáo khoa ra trang mười.", "Tập sách"),
            ("Notebook", "/ˈnəʊt.bʊk/", "danh từ", "vở ghi chép", "Write words in your notebook.", "Hãy viết từ vựng vào vở của bạn.", "Sổ tay ghi chép"),
            ("Pen", "/pen/", "danh từ", "cây bút mực", "Sign with a black pen.", "Hãy ký bằng bút mực đen.", "Bút viết"),
            ("Pencil", "/ˈpen.səl/", "danh từ", "bút chì", "Draw a sketch with pencil.", "Vẽ một bản phác thảo bằng bút chì.", "Bút than chì"),
            ("Ruler", "/ˈruː.lər/", "danh từ", "thước kẻ", "Use a ruler to draw straight lines.", "Hãy dùng thước kẻ để vẽ đường thẳng.", "Đo độ dài"),
            ("Eraser", "/ɪˈreɪ.zər/", "danh từ", "cục tẩy, gôm", "Erase pencil marks easily.", "Xóa các dấu bút chì dễ dàng.", "Cục tẩy vết chì"),
            ("Paper", "/ˈpeɪ.pər/", "danh từ", "tờ giấy", "Write thoughts on white paper.", "Hãy viết suy nghĩ lên trang giấy trắng.", "Chất liệu giấy"),
            ("Bag", "/bæɡ/", "danh từ", "cặp sách, túi đựng", "Put supplies in your bag.", "Hãy cho đồ dùng vào trong cặp của bạn.", "Túi đựng đồ"),
            ("Blackboard", "/ˈblæk.bɔːd/", "danh từ", "bảng đen lớp học", "The teacher wrote on blackboard.", "Giáo viên đã viết lên bảng đen.", "Bảng viết phấn"),
            ("Lesson", "/ˈles.ən/", "danh từ", "bài học", "Today's lesson is interesting.", "Bài học hôm nay rất thú vị.", "Tiết học"),
            ("Homework", "/ˈhəʊm.wɜːk/", "danh từ", "bài tập về nhà", "Complete homework on time.", "Hoàn thành bài tập về nhà đúng hạn.", "Bài làm ở nhà"),
            ("Exam", "/ɪɡˈzæm/", "danh từ", "kỳ thi cử", "Pass the entrance exam.", "Vượt qua kỳ thi tuyển sinh.", "Kiểm tra năng lực"),
            ("Question", "/ˈkwes.tʃən/", "danh từ", "câu hỏi, thắc mắc", "Raise hand to ask question.", "Giơ tay để đặt câu hỏi.", "Thắc mắc"),
            ("Answer", "/ˈɑːn.sər/", "danh từ", "câu trả lời", "The answer is correct.", "Câu trả lời hoàn toàn chính xác.", "Giải đáp"),
            ("Library", "/ˈlaɪ.brər.i/", "danh từ", "thư viện", "Quiet reading in library.", "Đọc sách yên tĩnh trong thư viện.", "Nơi chứa sách"),
            ("Grade", "/ɡreɪd/", "danh từ", "điểm số, cấp lớp", "She earned high grades.", "Cô ấy đạt được những điểm số cao.", "Thành tích học tập")
        ],
        "Unit 8: Tính từ miêu tả & Đời sống": [
            ("Good", "/ɡʊd/", "tính từ", "tốt đẹp, giỏi giang", "He is a good student.", "Cậu ấy là một học sinh giỏi.", "Chất lượng tốt"),
            ("Bad", "/bæd/", "tính từ", "xấu, tồi tệ", "Bad habits waste time.", "Thói quen xấu làm lãng phí thời gian.", "Trái nghĩa với good"),
            ("Big", "/bɪɡ/", "tính từ", "to lớn, vĩ đại", "A big decision to make.", "Một quyết định lớn cần đưa ra.", "Kích thước lớn"),
            ("Small", "/smɔːl/", "tính từ", "nhỏ nhắn, khiêm tốn", "Small steps bring victory.", "Những bước đi nhỏ mang lại thắng lợi.", "Kích thước bé"),
            ("Happy", "/ˈhæp.i/", "tính từ", "hạnh phúc, tươi vui", "A happy and fulfilled life.", "Một cuộc sống hạnh phúc và trọn vẹn.", "Niềm vui sướng"),
            ("Sad", "/sæd/", "tính từ", "buồn bã, ủ rũ", "Comfort a sad friend.", "Hãy an ủi một người bạn đang buồn.", "Nỗi u sầu"),
            ("Hot", "/hɒt/", "tính từ", "nóng bức, cay nóng", "Hot soup warms you up.", "Món súp nóng làm ấm người bạn.", "Nhiệt độ cao"),
            ("Cold", "/kəʊld/", "tính từ", "lạnh giá, buốt", "Cold wind blows outside.", "Gió lạnh thổi bên ngoài.", "Nhiệt độ thấp"),
            ("Warm", "/wɔːm/", "tính từ", "ấm áp, nồng hậu", "A warm friendly smile.", "Một nụ cười ấm áp và thân thiện.", "Cảm giác dễ chịu"),
            ("Cool", "/kuːl/", "tính từ", "mát mẻ, điềm đạm", "Cool autumn breeze.", "Làn gió thu mát mẻ.", "Mát lành"),
            ("New", "/njuː/", "tính từ", "mới mẻ, vừa tạo ra", "Start a new chapter.", "Bắt đầu một chương mới.", "Vừa xuất hiện"),
            ("Old", "/əʊld/", "tính từ", "cũ kỹ, già dặn", "Old memories are treasured.", "Những kỷ niệm xưa cũ luôn được trân trọng.", "Lâu năm"),
            ("Fast", "/fɑːst/", "tính từ", "nhanh chóng, tốc độ", "Fast trains connect cities.", "Những chuyến tàu nhanh kết nối các thành phố.", "Tốc độ cao"),
            ("Slow", "/sləʊ/", "tính từ", "chậm chạp, từ tốn", "Slow steady progress counts.", "Tiến bộ chậm mà chắc mới đáng giá.", "Tốc độ chậm"),
            ("Easy", "/ˈiː.zi/", "tính từ", "dễ dàng, giản đơn", "English becomes easy with practice.", "Tiếng Anh trở nên dễ dàng nhờ luyện tập.", "Không khó"),
            ("Hard", "/hɑːd/", "tính từ", "chăm chỉ, khó khăn", "Work hard every single day.", "Hãy làm việc chăm chỉ mỗi ngày.", "Nỗ lực lớn"),
            ("Clean", "/kliːn/", "tính từ", "sạch sẽ, trong lành", "Keep hands clean.", "Hãy giữ cho đôi bàn tay sạch sẽ.", "Không dơ bẩn"),
            ("Dirty", "/ˈdɜː.ti/", "tính từ", "bẩn thỉu, dơ dáy", "Wash dirty shirts.", "Hãy giặt những chiếc áo bẩn.", "Cần làm sạch"),
            ("Beautiful", "/ˈbjuː.tɪ.fəl/", "tính từ", "xinh đẹp, lộng lẫy", "A beautiful scenery.", "Một phong cảnh xinh đẹp tuyệt vời.", "Vẻ đẹp thẩm mỹ"),
            ("Bright", "/braɪt/", "tính từ", "sáng ngời, rực rỡ, thông minh", "A bright light illuminates.", "Ánh sáng rực rỡ soi chiếu không gian.", "Tươi sáng")
        ]
    }

    # Extract A1 words
    idx = 1
    for unit_name, items in a1_units.items():
        for item in items:
            w_id = f"en-a1-{idx:03d}"
            words.append({
                "id": w_id,
                "language": "en",
                "level": "A1",
                "unit": unit_name,
                "word": item[0],
                "phonetic": item[1],
                "partOfSpeech": item[2],
                "vietnameseMeaning": item[3],
                "definitions": [f"Oxford Essential definition for {item[0]}"],
                "example": item[4],
                "exampleMeaning": item[5],
                "collocations": [f"{item[0].lower()} everyday", f"use {item[0].lower()}"],
                "mnemonicTip": item[6]
            })
            idx += 1

    print(f"Generated English A1: {len(words)} words.")
    return words

print("Base setup ready.")
