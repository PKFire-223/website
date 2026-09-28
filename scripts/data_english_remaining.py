# -*- coding: utf-8 -*-
import json

en_remaining = []

def add(level, unit, w, ph, pos, vn, ex, ex_vn, col, tip):
    en_remaining.append({
        "id": f"en-{level.lower()}-{120 + len(en_remaining) + 1:04d}",
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

# ==========================================
# ENGLISH A2 (120 words)
# ==========================================
u = "Unit 1: Du lịch, Nơi chốn & Phương tiện"
a2_w1 = [
    ("Depart", "/dɪˈpɑːt/", "động từ", "khởi hành, xuất phát", "The express train will depart on schedule.", "Chuyến tàu nhanh sẽ khởi hành đúng giờ.", "depart on time", "Rời ga xuất phát."),
    ("Destination", "/ˌdes.tɪˈneɪ.ʃən/", "danh từ", "điểm đến, đích đến", "Phu Quoc is a famous island destination.", "Phú Quốc là một điểm đến đảo ngọc nổi tiếng.", "tourist destination", "Nơi hướng tới trong hành trình."),
    ("Journey", "/ˈdʒɜː.ni/", "danh từ", "chuyến hành trình", "Enjoy the journey as much as the destination.", "Hãy tận hưởng chuyến hành trình nhiều như đích đến.", "life journey", "Chuyến đi dài ngày ý nghĩa."),
    ("Ticket", "/ˈtɪk.ɪt/", "danh từ", "vé vào cửa, vé tàu xe", "Book your train tickets in advance.", "Hãy đặt vé tàu trước để giữ chỗ tốt.", "return ticket", "Vé chứng nhận quyền đi lại."),
    ("Luggage", "/ˈlʌɡ.ɪdʒ/", "danh từ", "hành lý", "Pack your luggage lightly and efficiently.", "Hãy đóng gói hành lý gọn nhẹ và thông minh.", "heavy luggage", "Danh từ không đếm được."),
    ("Passenger", "/ˈpæs.ən.dʒər/", "danh từ", "hành khách", "All passengers must fasten seatbelts.", "Tất cả hành khách phải thắt dây an toàn.", "railway passenger", "Người đi trên phương tiện."),
    ("Airport", "/ˈeə.pɔːt/", "danh từ", "sân bay, phi trường", "We arrived at the international airport early.", "Chúng tôi đến sân bay quốc tế sớm.", "international airport", "Cảng hàng không."),
    ("Flight", "/flaɪt/", "danh từ", "chuyến bay", "Have a smooth and safe flight!", "Chúc bạn có một chuyến bay êm đềm và an toàn!", "direct flight", "Hành trình trên bầu trời."),
    ("Hotel", "/həʊˈtel/", "danh từ", "khách sạn", "Book a cozy beachfront hotel.", "Hãy đặt một khách sạn ấm cúng nhìn ra biển.", "hotel booking", "Trọng âm rơi vào âm tiết 2: /həʊˈtel/."),
    ("Tourist", "/ˈtʊə.rɪst/", "danh từ", "khách du lịch", "Tourists admire ancient architecture.", "Du khách trầm trồ trước kiến trúc cổ kính.", "tourist attraction", "Người tham quan du lãm."),
    ("Guide", "/ɡaɪd/", "danh từ/động từ", "người hướng dẫn, chỉ đường", "Our local guide shared fascinating history.", "Người hướng dẫn viên địa phương đã chia sẻ những trang sử hấp dẫn.", "tour guide", "Người dẫn dắt chỉ lối."),
    ("Map", "/mæp/", "danh từ", "bản đồ", "Study the road map before starting your trip.", "Hãy nghiên cứu bản đồ đường đi trước chuyến đi.", "street map", "Sơ đồ địa lý."),
    ("Passport", "/ˈpɑːs.pɔːt/", "danh từ", "hộ chiếu", "Keep your passport securely tucked away.", "Hãy giữ hộ chiếu cẩn thận và an toàn.", "valid passport", "Giấy thông hành quốc tế."),
    ("Visit", "/ˈvɪz.ɪt/", "động từ/danh từ", "thăm thú, ghé thăm", "We visited historical temples in Hue.", "Chúng tôi đã thăm thú các ngôi chùa cổ ở Huế.", "visit friends", "Thăm viếng trải nghiệm."),
    ("Explore", "/ɪkˈsplɔːr/", "động từ", "thám hiểm, khám phá", "Explore the hidden alleys of the old quarter.", "Khám phá những con ngõ ẩn mình của phố cổ.", "explore nature", "Mở rộng tầm mắt."),
    ("Adventure", "/ədˈven.tʃər/", "danh từ", "cuộc phiêu lưu", "Life is an exciting adventure.", "Cuộc sống là một chuyến phiêu lưu kỳ thú.", "sense of adventure", "Trải nghiệm mới lạ."),
    ("Museum", "/mjuːˈziː.əm/", "danh từ", "bảo tàng", "Artifacts are preserved in the national museum.", "Hiện vật cổ được gìn giữ trong bảo tàng quốc gia.", "art museum", "Trọng âm 2: /mjuːˈziː.əm/."),
    ("Bridge", "/brɪdʒ/", "danh từ", "cây cầu", "The golden bridge spans between two mountains.", "Cây cầu vàng bắc ngang qua hai đỉnh núi.", "cross the bridge", "Bắc qua chướng ngại."),
    ("Park", "/pɑːk/", "danh từ", "công viên", "Stroll through the green city park.", "Đi dạo qua công viên xanh mát của thành phố.", "national park", "Mảng xanh công cộng."),
    ("Beach", "/biːtʃ/", "danh từ", "bãi biển", "Golden sandy beaches invite relaxation.", "Những bãi cát vàng óng ả mời gọi thư giãn.", "sandy beach", "Bờ biển cát trắng."),
    ("Island", "/ˈaɪ.lənd/", "danh từ", "hòn đảo", "Tropical islands offer clear waters.", "Những hòn đảo nhiệt đới sở hữu làn nước trong vắt.", "desert island", "Âm 's' câm: /ˈaɪ.lənd/."),
    ("Lake", "/leɪk/", "danh từ", "hồ nước", "Reflections shimmer on the serene lake.", "Bóng cây lung linh phản chiếu trên mặt hồ tĩnh lặng.", "freshwater lake", "Vực nước yên ả."),
    ("Forest", "/ˈfɒr.ɪst/", "danh từ", "khu rừng", "Lush rainforests produce clean oxygen.", "Những cánh rừng mưa tươi tốt sản sinh oxy sạch.", "tropical forest", "Thảm thực vật bạt ngàn."),
    ("Weather", "/ˈweð.ər/", "danh từ", "thời tiết", "Check the weather forecast before hiking.", "Hãy xem dự báo thời tiết trước khi leo núi.", "sunny weather", "Trạng thái khí quyển."),
    ("Season", "/ˈsiː.zən/", "danh từ", "mùa trong năm", "Spring is the season of renewal.", "Mùa xuân là mùa của sự hồi sinh.", "four seasons", "Bốn mùa chuyển vần."),
    ("Spring", "/sprɪŋ/", "danh từ", "mùa xuân", "Peach blossoms herald the arrival of spring.", "Hoa đào báo hiệu mùa xuân đã về.", "in the spring", "Mùa trăm hoa đua nở."),
    ("Summer", "/ˈsʌm.ər/", "danh từ", "mùa hè", "Summer is the season for sea vacations.", "Mùa hè là mùa dành cho những kỳ nghỉ biển.", "hot summer", "Mùa nắng vàng rực rỡ."),
    ("Autumn", "/ˈɔː.təm/", "danh từ", "mùa thu", "Golden leaves gently fall in cool autumn.", "Lá vàng khẽ rơi trong tiết thu se lạnh.", "in autumn", "Âm 'n' câm: /ˈɔː.təm/."),
    ("Winter", "/ˈwɪn.tər/", "danh từ", "mùa đông", "Winter nights are cozy by the hearth.", "Những đêm đông thật ấm cúng bên ánh lửa.", "cold winter", "Mùa tuyết trắng và giá lạnh."),
    ("Nature", "/ˈneɪ.tʃər/", "danh từ", "thiên nhiên, tạo hóa", "Immerse yourself in the tranquility of nature.", "Hãy đắm mình trong sự thanh tịnh của thiên nhiên.", "mother nature", "Vẻ đẹp tạo hóa ban tặng."),
]
for item in a2_w1:
    add("A2", u, *item)

u = "Unit 2: Sức khỏe, Thể chất & Cảm xúc"
a2_w2 = [
    ("Exhausted", "/ɪɡˈzɔː.stɪd/", "tính từ", "kiệt sức, vô cùng mệt", "After the trek, we were completely exhausted.", "Sau chuyến đi bộ dài, chúng tôi hoàn toàn kiệt sức.", "feel exhausted", "Mệt mỏi cùng cực."),
    ("Recover", "/rɪˈkʌv.ər/", "động từ", "hồi phục sức khỏe", "She took a few days of rest to recover.", "Cô ấy nghỉ ngơi vài ngày để hồi phục sức khỏe.", "recover quickly", "Trở lại trạng thái bình thường."),
    ("Healthy", "/ˈhel.θi/", "tính từ", "lành mạnh, khỏe mạnh", "Maintain a balanced and healthy lifestyle.", "Duy trì lối sống cân bằng và lành mạnh.", "healthy food", "Tốt cho thể chất."),
    ("Exercise", "/ˈek.sə.saɪz/", "danh từ/động từ", "tập thể dục, rèn luyện", "Regular exercise sharpens mental agility.", "Tập thể dục thường xuyên giúp đầu óc thêm sắc bén.", "daily exercise", "Vận động cơ bắp."),
    ("Hospital", "/ˈhɒs.pɪ.təl/", "danh từ", "bệnh viện", "The modern hospital has skilled doctors.", "Bệnh viện hiện đại sở hữu các bác sĩ lành nghề.", "go to hospital", "Nơi chữa trị bệnh tật."),
    ("Doctor", "/ˈdɒk.tər/", "danh từ", "bác sĩ, thầy thuốc", "Consult your family doctor for medical advice.", "Hãy tham khảo ý kiến bác sĩ gia đình để được tư vấn.", "see a doctor", "Thầy thuốc chữa bệnh."),
    ("Medicine", "/ˈmed.sən/", "danh từ", "thuốc chữa bệnh", "Take this medicine after having dinner.", "Hãy uống thuốc này sau bữa ăn tối.", "take medicine", "Dược phẩm trị liệu."),
    ("Pain", "/peɪn/", "danh từ", "cơn đau, đau nhức", "The medicine relieved his back pain.", "Thuốc đã xoa dịu cơn đau lưng của anh ấy.", "sharp pain", "Cảm giác đau đớn."),
    ("Stomach", "/ˈstʌm.ək/", "danh từ", "dạ dày, bao tử", "Herbal tea soothes an upset stomach.", "Trà thảo mộc làm êm dịu dạ dày bị khó chịu.", "empty stomach", "Phát âm đuôi 'ch' là /k/."),
    ("Fever", "/ˈfiː.vər/", "danh từ", "cơn sốt cao", "Drink lots of liquids when you have a fever.", "Hãy uống nhiều nước khi bạn bị sốt.", "high fever", "Thân nhiệt tăng cao."),
    ("Rest", "/rest/", "danh từ/động từ", "nghỉ ngơi, tĩnh dưỡng", "Proper rest restores cellular energy.", "Nghỉ ngơi hợp lý giúp phục hồi năng lượng tế bào.", "take a rest", "Tạm dừng hoạt động."),
    ("Breathe", "/briːð/", "động từ", "hít thở", "Breathe in deeply through your nose.", "Hãy hít thở sâu qua đường mũi.", "breathe deeply", "Động từ phát âm âm đuôi /ð/."),
    ("Relax", "/rɪˈlæks/", "động từ", "thư giãn, thả lỏng", "Listen to calm instrumental music to relax.", "Nghe nhạc không lời êm dịu để thư giãn.", "relax completely", "Giải tỏa căng thẳng."),
    ("Stress", "/stres/", "danh từ", "sự căng thẳng, áp lực", "Mindfulness meditation reduces daily stress.", "Thiền chánh niệm giúp giảm căng thẳng mỗi ngày.", "reduce stress", "Áp lực tâm lý."),
    ("Tired", "/taɪəd/", "tính từ", "mệt mỏi", "Rest your eyes when you feel tired.", "Hãy nhắm mắt nghỉ ngơi khi bạn cảm thấy mệt mỏi.", "feel tired", "Thiếu năng lượng."),
    ("Strong", "/strɒŋ/", "tính từ", "mạnh mẽ, kiên cường", "A strong body fosters a resilient mind.", "Một cơ thể cường tráng nuôi dưỡng một tinh thần kiên cường.", "stay strong", "Có sức mạnh thể lực/tinh thần."),
    ("Weak", "/wiːk/", "tính từ", "yếu ớt", "Rest up so you do not feel weak.", "Hãy nghỉ ngơi để không bị kiệt sức yếu ớt.", "feel weak", "Thiếu sức lực."),
    ("Dentist", "/ˈden.tɪst/", "danh từ", "nha sĩ", "Visit your dentist every six months.", "Hãy đến gặp nha sĩ sáu tháng một lần.", "see the dentist", "Bác sĩ chuyên khoa răng."),
    ("Clean", "/kliːn/", "tính từ/động từ", "sạch sẽ, thanh khiết", "Fresh water keeps skin clean and glowing.", "Nước sạch giữ cho làn da thanh khiết rạng ngời.", "clean water", "Không bị ô nhiễm."),
    ("Diet", "/ˈdaɪ.ət/", "danh từ", "chế độ ăn uống", "A balanced Mediterranean diet promotes longevity.", "Chế độ ăn Địa Trung Hải cân bằng giúp tăng tuổi thọ.", "balanced diet", "Thực đơn dinh dưỡng."),
    ("Sleep", "/sliːp/", "danh từ/động từ", "giấc ngủ", "Quality sleep is essential for mental clarity.", "Giấc ngủ chất lượng là thiết yếu cho sự minh mẫn.", "deep sleep", "Giấc ngủ phục hồi."),
    ("Energy", "/ˈen.ə.dʒi/", "danh từ", "năng lượng, sinh lực", "Fresh fruit supplies natural energy.", "Trái cây tươi cung cấp nguồn sinh lực tự nhiên.", "positive energy", "Sức sống dồi dào."),
    ("Active", "/ˈæk.tɪv/", "tính từ", "năng động, tích cực", "Stay active by walking every morning.", "Hãy duy trì sự năng động bằng cách đi bộ mỗi sáng.", "stay active", "Vận động thường xuyên."),
    ("Habit", "/ˈhæb.ɪt/", "danh từ", "thói quen", "Good habits shape character and destiny.", "Thói quen tốt định hình tính cách và số phận.", "daily habit", "Hành vi lặp đi lặp lại."),
    ("Calm", "/kɑːm/", "tính từ/động từ", "bình tĩnh, thanh thản", "Maintain a calm demeanor in storms.", "Hãy giữ phong thái bình tĩnh trước giông bão.", "stay calm", "Âm 'l' câm: /kɑːm/."),
    ("Peace", "/piːs/", "danh từ", "sự thanh bình, hòa bình", "Inner peace is the highest form of wealth.", "Bình an nội tâm là hình thức giàu có cao quý nhất.", "inner peace", "Trạng thái yên tĩnh tuyệt đối."),
    ("Care", "/keər/", "danh từ/động từ", "quan tâm, chăm sóc", "Take good care of your mental well-being.", "Hãy chăm sóc tốt cho sức khỏe tinh thần của bạn.", "take care", "Sự ân cần chu đáo."),
    ("Safe", "/seɪf/", "tính từ", "an toàn, bình an", "Ensure your home environment is safe.", "Hãy đảm bảo môi trường sống trong nhà luôn an toàn.", "stay safe", "Không có nguy hiểm."),
    ("Danger", "/ˈdeɪn.dʒər/", "danh từ", "mối nguy hiểm", "Awareness keeps you away from danger.", "Sự tỉnh thức giúp bạn tránh xa hiểm nguy.", "in danger", "Tình huống rủi ro."),
    ("Warmth", "/wɔːmθ/", "danh từ", "sự ấm áp, hơi ấm", "The fireplace provided welcoming warmth.", "Lò sưởi lan tỏa hơi ấm thân thiện chào đón.", "loving warmth", "Cảm giác ấm nồng."),
]
for item in a2_w2:
    add("A2", u, *item)

u = "Unit 3: Công việc, Mua sắm & Xã hội"
a2_w3 = [
    ("Career", "/kəˈrɪər/", "danh từ", "sự nghiệp lâu dài", "Build a career aligned with your core values.", "Hãy xây dựng sự nghiệp phù hợp với giá trị cốt lõi của bạn.", "career path", "Con đường công danh."),
    ("Colleague", "/ˈkɒl.iːɡ/", "danh từ", "đồng nghiệp", "He treats his colleagues with great respect.", "Anh ấy đối xử với đồng nghiệp bằng sự tôn trọng sâu sắc.", "work colleague", "Người cùng cộng tác."),
    ("Manager", "/ˈmæn.ɪ.dʒər/", "danh từ", "người quản lý", "A good manager inspires and guides.", "Người quản lý giỏi truyền cảm hứng và dẫn dắt.", "project manager", "Người điều hành quản lý."),
    ("Meeting", "/ˈmiː.tɪŋ/", "danh từ", "cuộc họp", "The weekly team meeting was concise.", "Cuộc họp đội ngũ hàng tuần diễn ra súc tích.", "attend a meeting", "Buổi họp bàn công việc."),
    ("Project", "/ˈprɒdʒ.ekt/", "danh từ", "dự án, đề án", "Our software development project is on track.", "Dự án phát triển phần mềm của chúng tôi đang đúng tiến độ.", "manage a project", "Kế hoạch lớn có mục tiêu."),
    ("Company", "/ˈkʌm.pə.ni/", "danh từ", "công ty, doanh nghiệp", "The tech company emphasizes innovation.", "Công ty công nghệ này rất chú trọng đổi mới sáng tạo.", "tech company", "Tổ chức kinh doanh."),
    ("Salary", "/ˈsæl.ər.i/", "danh từ", "mức lương", "She negotiated a competitive monthly salary.", "Cô ấy đã thương lượng được mức lương hàng tháng cạnh tranh.", "monthly salary", "Thu nhập cố định."),
    ("Customer", "/ˈkʌs.tə.mər/", "danh từ", "khách hàng", "Customer satisfaction is our highest priority.", "Sự hài lòng của khách hàng là ưu tiên cao nhất.", "customer service", "Người mua dịch vụ."),
    ("Service", "/ˈsɜː.vɪs/", "danh từ", "dịch vụ", "Provide sincere and thoughtful service.", "Cung cấp dịch vụ chân thành và chu đáo.", "good service", "Phục vụ khách hàng."),
    ("Product", "/ˈprɒd.ʌkt/", "danh từ", "sản phẩm", "High-quality products speak for themselves.", "Sản phẩm chất lượng cao tự khẳng định giá trị.", "new product", "Vật phẩm chế tạo."),
    ("Market", "/ˈmɑː.kɪt/", "danh từ", "thị trường", "Identify opportunities in the emerging market.", "Nhận diện những cơ hội trong thị trường mới nổi.", "financial market", "Nơi giao thương."),
    ("Price", "/praɪs/", "danh từ", "giá thành", "Compare prices before finalizing a purchase.", "Hãy so sánh giá trước khi quyết định mua hàng.", "fair price", "Giá trị bằng tiền."),
    ("Discount", "/ˈdɪs.kaʊnt/", "danh từ", "khoản giảm giá", "Members receive a ten percent discount.", "Hội viên được nhận mức giảm giá mười phần trăm.", "special discount", "Khuyến mãi giảm giá."),
    ("Receipt", "/rɪˈsiːt/", "danh từ", "hóa đơn, biên nhận", "Keep your receipt for warranty service.", "Hãy giữ hóa đơn để được hưởng dịch vụ bảo hành.", "sales receipt", "Âm 'p' câm: /rɪˈsiːt/."),
    ("Payment", "/ˈpeɪ.mənt/", "danh từ", "sự thanh toán", "Digital payments are fast and frictionless.", "Thanh toán kỹ thuật số rất nhanh chóng và thuận tiện.", "make a payment", "Hành động trả tiền."),
    ("Order", "/ˈɔː.dər/", "danh từ/động từ", "đơn hàng, gọi món", "Place an order for eco-friendly goods.", "Đặt một đơn hàng cho các sản phẩm thân thiện môi trường.", "place an order", "Yêu cầu cung ứng."),
    ("Deliver", "/dɪˈlɪv.ər/", "động từ", "giao hàng", "Couriers deliver packages promptly.", "Nhân viên giao nhận chuyển các kiện hàng nhanh chóng.", "deliver goods", "Vận chuyển đến tận tay."),
    ("Shopping", "/ˈʃɒp.ɪŋ/", "danh từ", "mua sắm", "Go grocery shopping with a planned list.", "Đi mua thực phẩm với danh sách đã lên kế hoạch sẵn.", "go shopping", "Hoạt động sắm sửa."),
    ("Mall", "/mɔːl/", "danh từ", "trung tâm thương mại", "The shopping mall features many bookshops.", "Trung tâm thương mại có nhiều hiệu sách phong phú.", "shopping mall", "Khu mua sắm phức hợp."),
    ("Brand", "/brænd/", "danh từ", "thương hiệu", "Trustworthy brands build loyal followings.", "Những thương hiệu đáng tin cậy xây dựng được lượng khách hàng trung thành.", "famous brand", "Nhãn hiệu uy tín."),
    ("Quality", "/ˈkwɒl.ə.ti/", "danh từ", "chất lượng", "Focus on quality rather than sheer volume.", "Hãy tập trung vào chất lượng hơn là số lượng đơn thuần.", "high quality", "Đặc tính giá trị."),
    ("Choice", "/tʃɔɪs/", "danh từ", "sự lựa chọn", "Make conscious choices that benefit your future.", "Hãy đưa ra những lựa chọn tỉnh táo có lợi cho tương lai.", "good choice", "Quyền chọn lựa."),
    ("Decide", "/dɪˈsaɪd/", "động từ", "quyết định", "Decide firmly and execute with courage.", "Hãy quyết định dứt khoát và thực thi với lòng dũng cảm.", "decide on", "Đưa ra phán quyết."),
    ("Plan", "/plæn/", "danh từ/động từ", "kế hoạch", "A thoughtful plan avoids wasted effort.", "Một kế hoạch chu đáo tránh được công sức lãng phí.", "make a plan", "Dự định định hướng."),
    ("Goal", "/ɡəʊl/", "danh từ", "mục tiêu", "Set ambitious yet achievable goals.", "Hãy đặt ra những mục tiêu tham vọng nhưng khả thi.", "achieve goals", "Đích ngắm vươn tới."),
    ("Future", "/ˈfjuː.tʃər/", "danh từ", "tương lai", "The future belongs to those who prepare.", "Tương lai thuộc về những ai biết chuẩn bị chu đáo.", "in the future", "Những ngày phía trước."),
    ("Success", "/səkˈses/", "danh từ", "sự thành công", "Success is the sum of small daily disciplines.", "Thành công là tổng hòa của những kỷ luật nhỏ mỗi ngày.", "achieve success", "Đạt thành tựu mong muốn."),
    ("Fail", "/feɪl/", "động từ", "thất bại, chưa đạt", "Failure is merely an opportunity to learn.", "Thất bại chỉ đơn thuần là một cơ hội để học hỏi.", "fail to do", "Không thành công."),
    ("Chance", "/tʃɑːns/", "danh từ", "cơ hội, vận may", "Seize every chance to improve your skills.", "Hãy nắm bắt mọi cơ hội để trau dồi kỹ năng của bạn.", "give a chance", "Thời cơ xuất hiện."),
    ("Skill", "/skɪl/", "danh từ", "kỹ năng", "Consistent practice hones invaluable skills.", "Luyện tập nhất quán rèn giũa những kỹ năng vô giá.", "learn skills", "Kỹ năng chuyên môn."),
]
for item in a2_w3:
    add("A2", u, *item)

u = "Unit 4: Giao tiếp, Truyền thông & Văn hóa"
a2_w4 = [
    ("Message", "/ˈmes.ɪdʒ/", "danh từ", "tin nhắn, thông điệp", "Send a warm message of appreciation.", "Hãy gửi một tin nhắn ấm áp bày tỏ sự trân trọng.", "send a message", "Bản tin truyền đạt."),
    ("Email", "/ˈiː.meɪl/", "danh từ/động từ", "thư điện tử", "Check your email for the detailed agenda.", "Hãy kiểm tra thư điện tử để xem lịch trình chi tiết.", "send an email", "Thư tín số hóa."),
    ("Internet", "/ˈɪn.tə.net/", "danh từ", "mạng toàn cầu", "The internet democratizes global knowledge.", "Mạng internet giúp bình đẳng hóa tri thức toàn cầu.", "browse the internet", "Mạng lưới kết nối."),
    ("Website", "/ˈweb.saɪt/", "danh từ", "trang web", "Bookmark educational websites for daily reading.", "Hãy đánh dấu những trang web giáo dục để đọc mỗi ngày.", "visit a website", "Trang thông tin trực tuyến."),
    ("Information", "/ˌɪn.fəˈmeɪ.ʃən/", "danh từ", "thông tin, dữ liệu", "Verify information from authoritative sources.", "Hãy kiểm chứng thông tin từ những nguồn chính thống đáng tin cậy.", "gather information", "Dữ liệu tri thức."),
    ("News", "/njuːz/", "danh từ", "tin tức", "Good news uplifts everyone\'s spirit.", "Tin tức tốt lành nâng cao tinh thần của mọi người.", "watch the news", "Luôn là danh từ số ít."),
    ("Article", "/ˈɑː.tɪ.kəl/", "danh từ", "bài báo, điều khoản", "Read insightful articles on science and tech.", "Đọc những bài báo sâu sắc về khoa học và công nghệ.", "write an article", "Bài viết chuyên đề."),
    ("Interview", "/ˈɪn.tə.vjuː/", "danh từ/động từ", "phỏng vấn", "Prepare thoroughly for the job interview.", "Hãy chuẩn bị chu đáo cho buổi phỏng vấn xin việc.", "job interview", "Cuộc đối thoại tuyển dụng."),
    ("Conversation", "/ˌkɒn.vəˈseɪ.ʃən/", "danh từ", "cuộc trò chuyện", "Engage in deep and meaningful conversations.", "Hãy tham gia vào những cuộc trò chuyện sâu sắc và ý nghĩa.", "have a conversation", "Giao tiếp đối thoại."),
    ("Language", "/ˈlæŋ.ɡwɪdʒ/", "danh từ", "ngôn ngữ", "Learning a new language opens new worlds.", "Học một ngôn ngữ mới mở ra những chân trời mới.", "foreign language", "Hệ thống tiếng nói."),
    ("Culture", "/ˈkʌl.tʃər/", "danh từ", "văn hóa", "Appreciate the richness of diverse cultures.", "Trân trọng sự phong phú của các nền văn hóa đa dạng.", "traditional culture", "Bản sắc dân tộc."),
    ("Tradition", "/trəˈdɪʃ.ən/", "danh từ", "truyền thống", "Honor timeless family traditions.", "Tôn vinh những truyền thống gia đình vượt thời gian.", "follow tradition", "Tập tục lưu truyền."),
    ("Festival", "/ˈfes.tɪ.vəl/", "danh từ", "lễ hội", "Lunar New Year is a joyous national festival.", "Tết Nguyên Đán là một lễ hội quốc gia vui tươi rộn rã.", "music festival", "Ngày hội tưng bừng."),
    ("Celebrate", "/ˈsel.ə.breɪt/", "động từ", "kỷ niệm, ăn mừng", "Celebrate milestone achievements with friends.", "Hãy ăn mừng những thành tựu dấu mốc cùng bạn bè.", "celebrate success", "Tổ chức niềm vui."),
    ("Holiday", "/ˈhɒl.ə.deɪ/", "danh từ", "ngày nghỉ, kỳ nghỉ", "Enjoy a peaceful countryside holiday.", "Tận hưởng một kỳ nghỉ miền quê thanh bình.", "public holiday", "Dịp nghỉ ngơi."),
    ("Gift", "/ɡɪft/", "danh từ", "món quà, năng khiếu", "A thoughtful gift comes straight from the heart.", "Món quà chu đáo xuất phát thẳng từ trái tim.", "give a gift", "Quà tặng ý nghĩa."),
    ("Invite", "/ɪnˈvaɪt/", "động từ", "mời mọc", "Invite cherished mentors to dinner.", "Hãy mời những người thầy đáng kính đến dùng bữa tối.", "invite friends", "Mời tham dự."),
    ("Event", "/ɪˈvent/", "danh từ", "sự kiện", "The conference is an important annual event.", "Hội nghị là một sự kiện thường niên quan trọng.", "special event", "Dịp diễn ra quan trọng."),
    ("Party", "/ˈpɑː.ti/", "danh từ", "bữa tiệc, đảng phái", "Host a friendly dinner party at home.", "Tổ chức một bữa tiệc tối thân mật tại gia.", "birthday party", "Buổi họp mặt vui vẻ."),
    ("Music", "/ˈmjuː.zɪk/", "danh từ", "âm nhạc", "Classical music stimulates creative flow.", "Âm nhạc cổ điển kích thích dòng chảy sáng tạo.", "listen to music", "Nghệ thuật âm thanh."),
    ("Concert", "/ˈkɒn.sət/", "danh từ", "buổi hòa nhạc", "Attend an acoustic live music concert.", "Tham dự một buổi hòa nhạc trực tiếp ấm cúng.", "live concert", "Buổi biểu diễn âm nhạc."),
    ("Film", "/fɪlm/", "danh từ", "bộ phim", "Documentary films broaden perspectives.", "Những bộ phim tài liệu mở rộng góc nhìn của bạn.", "watch a film", "Tác phẩm điện ảnh."),
    ("Cinema", "/ˈsɪn.ə.mɑː/", "danh từ", "rạp chiếu phim", "Watching movies at the cinema is a classic treat.", "Xem phim tại rạp chiếu bóng là trải nghiệm thú vị.", "go to cinema", "Rạp chiếu phim."),
    ("Art", "/ɑːt/", "danh từ", "nghệ thuật", "Art expresses the profound depths of soul.", "Nghệ thuật diễn đạt những chiều sâu thẳm của tâm hồn.", "modern art", "Sáng tạo thẩm mỹ."),
    ("Paint", "/peɪnt/", "động từ/danh từ", "vẽ tranh, sơn màu", "Paint landscapes with delicate water colors.", "Vẽ phong cảnh bằng những gam màu nước tinh tế.", "paint pictures", "Hội họa màu sắc."),
    ("Photo", "/ˈfəʊ.təʊ/", "danh từ", "bức ảnh", "Take photos to capture fleeting memories.", "Chụp ảnh để lưu giữ những kỷ niệm thoáng qua.", "take a photo", "Nhiếp ảnh lưu dấu."),
    ("Camera", "/ˈkæm.rə/", "danh từ", "máy ảnh, máy quay", "Modern phone cameras shoot in stunning 4K.", "Máy ảnh điện thoại hiện đại quay chụp chuẩn 4K rực rỡ.", "digital camera", "Thiết bị ghi hình."),
    ("Story", "/ˈstɔː.ri/", "danh từ", "câu chuyện", "Every elder has a wisdom-filled story.", "Mỗi người cao tuổi đều có một câu chuyện đầy ắp trí tuệ.", "tell a story", "Giai thoại đời người."),
    ("Joke", "/dʒəʊk/", "danh từ/động từ", "chuyện cười, đùa vui", "A witty joke breaks awkward ice.", "Một câu chuyện đùa hóm hỉnh xua tan bầu không khí ngượng ngùng.", "tell a joke", "Tiếng cười hóm hỉnh."),
    ("Laugh", "/lɑːf/", "động từ/danh từ", "tiếng cười, cười lớn", "Laughter is truly the best medicine.", "Tiếng cười thực sự là liều thuốc bổ tốt nhất.", "laugh out loud", "Phát âm /lɑːf/ (âm đuôi f)."),
]
for item in a2_w4:
    add("A2", u, *item)

# Save A2
with open("scripts/en_a2.json", "w", encoding="utf-8") as f:
    json.dump(en_remaining, f, ensure_ascii=False, indent=2)

print(f"Generated {len(en_remaining)} words for English A2.")
