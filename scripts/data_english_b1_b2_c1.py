# -*- coding: utf-8 -*-
import json

en_higher = []

def add(level, unit, w, ph, pos, vn, ex, ex_vn, col, tip):
    en_higher.append({
        "id": f"en-{level.lower()}-{240 + len(en_higher) + 1:04d}",
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
# ENGLISH B1 (120 words)
# ==========================================
u = "Unit 1: Sự nghiệp, Đổi mới & Thành tựu"
b1_w1 = [
    ("Accomplish", "/əˈkʌm.plɪʃ/", "động từ", "hoàn thành xuất sắc, đạt được", "With steady effort, you will accomplish great goals.", "Với nỗ lực kiên định, bạn sẽ hoàn thành những mục tiêu lớn lao.", "accomplish a mission", "Gốc từ complete -> hoàn thành mỹ mãn."),
    ("Efficient", "/ɪˈfɪʃ.ənt/", "tính từ", "hiệu suất cao, tiết kiệm thời gian", "The automated workflow is remarkably efficient.", "Quy trình tự động hóa đạt hiệu suất làm việc rất cao.", "highly efficient", "Tối ưu hóa thời gian và năng lượng."),
    ("Challenge", "/ˈtʃæl.ɪndʒ/", "danh từ/động từ", "thách thức, thử thách", "Embrace every difficult challenge as a teacher.", "Hãy đón nhận mọi thử thách cam go như một người thầy.", "face a challenge", "Thử thách tôi luyện bản lĩnh."),
    ("Opportunity", "/ˌɒp.əˈtʃuː.nə.ti/", "danh từ", "cơ hội, vận hội", "Preparation turns luck into real opportunity.", "Sự chuẩn bị kỹ càng biến vận may thành cơ hội thực sự.", "golden opportunity", "Thời cơ quý giá."),
    ("Achieve", "/əˈtʃiːv/", "động từ", "đạt được thành tựu", "Those who persevere achieve lasting success.", "Những ai kiên trì sẽ đạt được thành công bền vững.", "achieve goals", "Chạm tới mục tiêu."),
    ("Motivate", "/ˈməʊ.tɪ.veɪt/", "động từ", "thúc đẩy, tạo động lực", "Inspiring leaders motivate their entire team.", "Người lãnh đạo truyền cảm hứng tạo động lực cho cả đội ngũ.", "highly motivated", "Kích hoạt ý chí hành động."),
    ("Improve", "/ɪmˈpruːv/", "động từ", "cải thiện, tiến bộ", "Read daily to improve vocabulary retention.", "Đọc sách hàng ngày để cải thiện vốn từ vựng.", "improve skills", "Trở nên tốt hơn."),
    ("Develop", "/dɪˈvel.əp/", "động từ", "phát triển, hoàn thiện", "Engineers develop innovative software solutions.", "Các kỹ sư phát triển những giải pháp phần mềm đổi mới.", "develop a product", "Mở rộng và nâng tầm."),
    ("Manage", "/ˈmæn.ɪdʒ/", "động từ", "quản lý, thu xếp được", "Learn to manage personal finances prudently.", "Học cách quản lý tài chính cá nhân một cách thận trọng.", "manage time", "Điều hành kiểm soát."),
    ("Organize", "/ˈɔː.ɡən.aɪz/", "động từ", "tổ chức, sắp xếp khoa học", "Organize files cleanly to speed up productivity.", "Sắp xếp tệp tin gọn gàng để nâng cao năng suất.", "well organized", "Sắp đặt trật tự."),
    ("Productive", "/prəˈdʌk.tɪv/", "tính từ", "năng suất, sinh lời", "Morning hours are often the most productive.", "Những giờ buổi sáng thường là lúc làm việc năng suất nhất.", "productive day", "Tạo ra nhiều kết quả tốt."),
    ("Strategy", "/ˈstræt.ə.dʒi/", "danh từ", "chiến lược", "A clear strategy directs effective execution.", "Một chiến lược rõ ràng sẽ định hướng thực thi hiệu quả.", "business strategy", "Kế hoạch tổng thể dài hạn."),
    ("Target", "/ˈtɑː.ɡɪt/", "danh từ/động từ", "mục tiêu ngắm tới", "Hit quarterly targets through diligent execution.", "Đạt các mục tiêu hàng quý nhờ thực thi cần cù.", "reach the target", "Đích ngắm cụ thể."),
    ("Progress", "/ˈprəʊ.ɡres/", "danh từ/động từ", "tiến độ, sự tiến bộ", "Track daily learning progress to stay accountable.", "Theo dõi tiến độ học hàng ngày để tự nhắc nhở bản thân.", "make progress", "Sự đi lên từng ngày."),
    ("Success", "/səkˈses/", "danh từ", "thành công rực rỡ", "Patience and grit breed authentic success.", "Kiên nhẫn và lòng quả cảm tạo nên thành công đích thực.", "key to success", "Thành tựu viên mãn."),
    ("Collaborate", "/kəˈlæb.ə.reɪt/", "động từ", "hợp tác, phối hợp làm việc", "Researchers collaborate across global boundaries.", "Các nhà nghiên cứu hợp tác vượt qua ranh giới toàn cầu.", "collaborate closely", "Co (cùng) + Labor (lao động)."),
    ("Communicate", "/kəˈmjuː.nɪ.keɪt/", "động từ", "giao tiếp, truyền đạt", "Communicate complex concepts in simple terms.", "Truyền đạt những khái niệm phức tạp bằng từ ngữ giản dị.", "effective communication", "Trao đổi thông điệp."),
    ("Negotiate", "/nəˈɡəʊ.ʃi.eɪt/", "động từ", "đàm phán, thương lượng", "Negotiate win-win agreements with integrity.", "Đàm phán các thỏa thuận đôi bên cùng có lợi bằng sự chính trực.", "negotiate terms", "Thương lượng đi đến thống nhất."),
    ("Promote", "/prəˈməʊt/", "động từ", "thăng tiến, quảng bá", "Dedication earns you a deserved promotion.", "Sự tận hiến giúp bạn nhận được sự thăng chức xứng đáng.", "promote health", "Nâng lên vị thế cao hơn."),
    ("Responsible", "/rɪˈspɒn.sə.bəl/", "tính từ", "có tinh thần trách nhiệm", "Be responsible for your choices and habits.", "Hãy chịu trách nhiệm cho các lựa chọn và thói quen của bạn.", "take responsibility", "Gánh vác nghĩa vụ."),
    ("Reliable", "/rɪˈlaɪ.ə.bəl/", "tính từ", "đáng tin cậy", "She is a thoroughly reliable team member.", "Cô ấy là một thành viên đội ngũ hoàn toàn đáng tin cậy.", "reliable partner", "Có thể dựa cậy vào."),
    ("Professional", "/prəˈfeʃ.ən.əl/", "tính từ/danh từ", "chuyên nghiệp, giới chuyên gia", "Uphold high professional standards in writing.", "Duy trì tiêu chuẩn chuyên nghiệp cao trong văn phong.", "professional career", "Chuẩn mực nghề nghiệp."),
    ("Experience", "/ɪkˈspɪə.ri.əns/", "danh từ/động từ", "kinh nghiệm, trải nghiệm", "Valuable experience is forged through trials.", "Kinh nghiệm quý báu được tôi luyện qua thử thách.", "hands-on experience", "Vốn sống tích lũy."),
    ("Knowledge", "/ˈnɒl.ɪdʒ/", "danh từ", "tri thức, kiến thức", "Knowledge empowers lifelong freedom.", "Tri thức trao quyền tự do cho cả đời người.", "expand knowledge", "Âm 'k' câm: /ˈnɒl.ɪdʒ/."),
    ("Ability", "/əˈbɪl.ə.ti/", "danh từ", "năng lực, khả năng", "Foster your ability to solve novel problems.", "Bồi đắp năng lực giải quyết các vấn đề mới lạ.", "natural ability", "Khả năng làm được."),
    ("Expert", "/ˈek.spɜːt/", "danh từ/tính từ", "chuyên gia, tinh thông", "Consult an expert in data architecture.", "Hãy tham khảo ý kiến chuyên gia về kiến trúc dữ liệu.", "industry expert", "Bậc thầy một lĩnh vực."),
    ("Solution", "/səˈluː.ʃən/", "danh từ", "giải pháp, lời giải", "Engineers design elegant technical solutions.", "Các kỹ sư thiết kế những giải pháp kỹ thuật tinh tế.", "find a solution", "Tháo gỡ khúc mắc."),
    ("Decision", "/dɪˈsɪʒ.ən/", "danh từ", "quyết định", "Sound decisions require calm deliberation.", "Những quyết định đúng đắn đòi hỏi sự suy xét bình tĩnh.", "make a decision", "Lựa chọn dứt khoát."),
    ("Opinion", "/əˈpɪn.jən/", "danh từ", "quan điểm, ý kiến", "Respect differing opinions with an open mind.", "Tôn trọng những ý kiến khác biệt với tâm hồn cởi mở.", "in my opinion", "Cách nhìn nhận cá nhân."),
    ("Argument", "/ˈɑːɡ.jə.mənt/", "danh từ", "lập luận, sự tranh luận", "Construct a logical and compelling argument.", "Xây dựng một lập luận logic và thuyết phục.", "strong argument", "Lý lẽ minh chứng."),
]
for item in b1_w1:
    add("B1", u, *item)

u = "Unit 2: Công nghệ, Xã hội & Môi trường"
b1_w2 = [
    ("Revolutionize", "/ˌrev.əˈluː.ʃən.aɪz/", "động từ", "cách mạng hóa hoàn toàn", "AI will revolutionize diagnostic medicine.", "Trí tuệ nhân tạo sẽ cách mạng hóa y học chẩn đoán.", "revolutionize industry", "Biến đổi căn bản."),
    ("Environment", "/ɪnˈvaɪ.rən.mənt/", "danh từ", "môi trường sinh thái", "Preserve the natural environment for future youth.", "Gìn giữ môi trường tự nhiên cho thế hệ mai sau.", "protect environment", "Hệ sinh thái bao quanh."),
    ("Pollution", "/pəˈluː.ʃən/", "danh từ", "sự ô nhiễm", "Combat plastic pollution in rivers and oceans.", "Chống lại ô nhiễm rác thải nhựa ở sông và đại dương.", "air pollution", "Làm bẩn môi trường."),
    ("Recycle", "/ˌriːˈsaɪ.kəl/", "động từ", "tái chế", "Recycle aluminum cans to conserve energy.", "Tái chế lon nhôm để tiết kiệm năng lượng.", "recycle waste", "Biến phế liệu thành tài nguyên."),
    ("Energy", "/ˈen.ə.dʒi/", "danh từ", "năng lượng", "Solar energy is inexhaustible and clean.", "Năng lượng mặt trời là vô tận và sạch sẽ.", "renewable energy", "Nguồn phát động lực."),
    ("Resource", "/rɪˈzɔːs/", "danh từ", "nguồn tài nguyên", "Manage scarce water resources wisely.", "Quản lý nguồn tài nguyên nước khan hiếm một cách khôn ngoan.", "natural resources", "Tư liệu sản xuất và sống."),
    ("Protect", "/prəˈtekt/", "động từ", "bảo vệ, che chở", "Protect endangered biodiversity reserves.", "Bảo vệ các khu bảo tồn đa dạng sinh học quý hiếm.", "protect nature", "Giữ gìn an toàn."),
    ("Climate", "/ˈklaɪ.mət/", "danh từ", "khí hậu", "Global climate patterns are shifting rapidly.", "Các hình thái khí hậu toàn cầu đang biến đổi nhanh chóng.", "climate change", "Thời tiết theo chu kỳ năm."),
    ("Nature", "/ˈneɪ.tʃər/", "danh từ", "thiên nhiên", "Spending time in nature calms the heart.", "Dành thời gian giữa thiên nhiên làm lắng dịu con tim.", "mother nature", "Mẹ thiên nhiên."),
    ("Species", "/ˈspiː.ʃiːz/", "danh từ", "loài sinh vật", "Discover new marine species in deep trenches.", "Phát hiện những loài sinh vật biển mới ở rãnh biển sâu.", "endangered species", "Hình thái phân loại sinh học."),
    ("Technology", "/tekˈnɒl.ə.dʒi/", "danh từ", "công nghệ, kỹ thuật", "Modern technology bridges vast distances.", "Công nghệ hiện đại thu hẹp những khoảng cách xa xôi.", "advanced technology", "Ứng dụng khoa học."),
    ("Digital", "/ˈdɪdʒ.ɪ.təl/", "tính từ", "kỹ thuật số", "Digital tools streamline creative design.", "Các công cụ kỹ thuật số tối ưu hóa thiết kế sáng tạo.", "digital world", "Công nghệ số hóa."),
    ("Device", "/dɪˈvaɪs/", "danh từ", "thiết bị, công cụ", "Smart devices enhance household comfort.", "Thiết bị thông minh nâng tầm tiện nghi gia đình.", "electronic device", "Đồ dùng kỹ thuật."),
    ("Network", "/ˈnet.wɜːk/", "danh từ", "mạng lưới, kết nối", "Build a supportive network of colleagues.", "Xây dựng một mạng lưới đồng nghiệp hỗ trợ nhau.", "social network", "Hệ thống liên kết."),
    ("Security", "/sɪˈkjʊə.rə.ti/", "danh từ", "sự an ninh, bảo mật", "Cyber security defends vital digital infrastructure.", "An ninh mạng bảo vệ hạ tầng số thiết yếu.", "data security", "An toàn bảo mật."),
    ("Privacy", "/ˈprɪv.ə.si/", "danh từ", "quyền riêng tư", "Protect your digital privacy vigilantly.", "Hãy cảnh giác bảo vệ quyền riêng tư kỹ thuật số của bạn.", "user privacy", "Quyền bất khả xâm phạm."),
    ("Access", "/ˈæk.ses/", "danh từ/động từ", "quyền truy cập, tiếp cận", "Ensure equal access to educational resources.", "Đảm bảo quyền tiếp cận công bằng tới nguồn tài nguyên giáo dục.", "gain access", "Khả năng bước vào."),
    ("Modern", "/ˈmɒd.ən/", "tính từ", "hiện đại, tân tiến", "Modern libraries feature collaborative spaces.", "Thư viện hiện đại sở hữu các không gian hợp tác.", "modern society", "Bắt kịp thời đại."),
    ("Ancient", "/ˈeɪn.ʃənt/", "tính từ", "cổ đại, xa xưa", "Ancient wisdom speaks across centuries.", "Trí tuệ cổ đại vẫn lên tiếng qua bao thế kỷ.", "ancient city", "Tồn tại từ ngàn xưa."),
    ("Future", "/ˈfjuː.tʃər/", "danh từ", "tương lai", "Shape the future with compassionate vision.", "Định hình tương lai bằng tầm nhìn nhân ái.", "bright future", "Những ngày phía trước."),
    ("Community", "/kəˈmjuː.nə.ti/", "danh từ", "cộng đồng", "Strong communities support vulnerable members.", "Những cộng đồng vững mạnh nâng đỡ những người yếu thế.", "local community", "Tập thể gắn kết."),
    ("Society", "/səˈsaɪ.ə.ti/", "danh từ", "xã hội", "A civil society values freedom and empathy.", "Một xã hội văn minh coi trọng tự do và sự thấu cảm.", "civil society", "Cộng đồng con người."),
    ("Culture", "/ˈkʌl.tʃər/", "danh từ", "văn hóa", "Cultural heritage connects past with present.", "Di sản văn hóa kết nối quá khứ với hiện tại.", "cultural identity", "Bản sắc văn hiến."),
    ("Education", "/ˌedʒ.uˈkeɪ.ʃən/", "danh từ", "nền giáo dục", "Education is an investment that always pays dividends.", "Giáo dục là khoản đầu tư luôn sinh hoa lợi lớn.", "higher education", "Trồng người."),
    ("Institution", "/ˌɪn.stɪˈtʃuː.ʃən/", "danh từ", "học viện, thể chế", "Academic institutions foster research excellence.", "Các viện nghiên cứu học thuật nuôi dưỡng sự xuất sắc.", "educational institution", "Tổ chức quy mô."),
    ("Government", "/ˈɡʌv.ən.mənt/", "danh từ", "chính phủ, chính quyền", "Transparent governments build civic trust.", "Chính phủ minh bạch xây dựng lòng tin người dân.", "local government", "Bộ máy quản lý đất nước."),
    ("Economy", "/iˈkɒn.ə.mi/", "danh từ", "nền kinh tế", "A resilient economy weathers global crises.", "Một nền kinh tế kiên cường vượt qua các cuộc khủng hoảng toàn cầu.", "global economy", "Hệ thống lưu thông của cải."),
    ("Industry", "/ˈɪn.də.stri/", "danh từ", "ngành công nghiệp", "Renewable energy is a surging industry.", "Năng lượng tái tạo là ngành công nghiệp bùng nổ.", "manufacturing industry", "Ngành sản xuất hàng hóa."),
    ("Global", "/ˈɡləʊ.bəl/", "tính từ", "toàn cầu, bao quát", "Global collaboration solves planetary issues.", "Sự hợp tác toàn cầu giải quyết các vấn đề cấp hành tinh.", "global scale", "Quy mô toàn thế giới."),
    ("Local", "/ˈləʊ.kəl/", "tính từ", "địa phương, sở tại", "Support local organic farmers and markets.", "Hãy ủng hộ nông dân và các khu chợ hữu cơ địa phương.", "local produce", "Trong phạm vi khu vực."),
]
for item in b1_w2:
    add("B1", u, *item)

# Save B1
print(f"Generated English B1 words so far.")

# ==========================================
# ENGLISH B2 (100 words)
# ==========================================
u = "Unit 1: Tâm lý học, Tư duy & Bản lĩnh"
b2_w1 = [
    ("Resilience", "/rɪˈzɪl.jəns/", "danh từ", "sự kiên cường, khả năng phục hồi", "Emotional resilience allows people to bounce back.", "Sự kiên cường cảm xúc cho phép con người bật dậy mạnh mẽ.", "build resilience", "Khả năng vượt qua nghịch cảnh."),
    ("Subtle", "/ˈsʌt.əl/", "tính từ", "tinh tế, vi tế, khó nhận thấy", "There was a subtle shift in the author\'s tone.", "Có một sự chuyển biến rất tinh tế trong giọng điệu của tác giả.", "subtle difference", "Âm 'b' câm: /ˈsʌt.əl/."),
    ("Sustainable", "/səˈsteɪ.nə.bəl/", "tính từ", "bền vững, lâu bền", "Embrace sustainable agriculture to protect soil.", "Ứng dụng nông nghiệp bền vững để bảo vệ đất đai.", "sustainable growth", "Duy trì dài hạn không kiệt quệ."),
    ("Vulnerable", "/ˈvʌl.nər.ə.bəl/", "tính từ", "dễ bị tổn thương", "Protect vulnerable species from extinction.", "Bảo vệ các loài sinh vật dễ bị tổn thương khỏi tuyệt chủng.", "vulnerable group", "Cần được chở che."),
    ("Ambiguity", "/ˌæm.bɪˈɡjuː.ə.ti/", "danh từ", "sự mơ hồ, nước đôi", "Great leaders navigate ambiguity with clarity.", "Những nhà lãnh đạo xuất sắc điều hướng sự mơ hồ bằng tầm nhìn sáng rõ.", "tolerate ambiguity", "Không rõ ràng tuyệt đối."),
    ("Cognitive", "/ˈkɒɡ.nə.tɪv/", "tính từ", "thuộc về nhận thức", "Cognitive exercises sharpen memory retention.", "Các bài tập nhận thức giúp tăng cường khả năng ghi nhớ.", "cognitive skills", "Thuộc về tư duy bộ não."),
    ("Empathy", "/ˈem.pə.θi/", "danh từ", "sự thấu cảm, đồng cảm sâu sắc", "Empathy allows us to walk in another person\'s shoes.", "Sự thấu cảm giúp ta đặt mình vào hoàn cảnh của người khác.", "deep empathy", "Cảm nhận nỗi đau của người khác."),
    ("Integrity", "/ɪnˈteɡ.rə.ti/", "danh từ", "sự chính trực, liêm khiết", "Integrity means doing right even when unwatched.", "Chính trực nghĩa là làm điều đúng ngay cả khi không ai nhìn.", "moral integrity", "Phẩm cách không tì vết."),
    ("Perspective", "/pəˈspek.tɪv/", "danh từ", "góc nhìn, lăng kính", "Traveling broadens your cultural perspective.", "Đi du lịch mở rộng góc nhìn văn hóa của bạn.", "broad perspective", "Nhãn quan nhận thức."),
    ("Paradox", "/ˈpær.ə.dɒks/", "danh từ", "nghịch lý", "The paradox of choice shows more is sometimes less.", "Nghịch lý lựa chọn chỉ ra rằng đôi khi nhiều hơn lại là ít hơn.", "apparent paradox", "Mâu thuẫn chứa đựng chân lý."),
    ("Comprehend", "/ˌkɒm.prɪˈhend/", "động từ", "thấu hiểu trọn vẹn", "Comprehend the underlying principles of physics.", "Thấu hiểu trọn vẹn những nguyên lý nền tảng của vật lý.", "fully comprehend", "Nắm bắt cặn kẽ bản chất."),
    ("Articulate", "/ɑːˈtɪk.jə.lət/", "tính từ/động từ", "khéo ăn nói; diễn đạt mạch lạc", "An articulate speaker captivates the audience.", "Một diễn giả hoạt ngôn sẽ cuốn hút khán thính giả.", "articulate vision", "Diễn đạt lưu loát sáng rõ."),
    ("Persuasive", "/pəˈsweɪ.sɪv/", "tính từ", "có sức thuyết phục cao", "Present a persuasive argument supported by empirical data.", "Trình bày lập luận thuyết phục dựa trên dữ liệu thực nghiệm.", "persuasive speech", "Có tài thuyết phục."),
    ("Coherent", "/kəʊˈhɪə.rənt/", "tính từ", "mạch lạc, chặt chẽ", "Write a coherent essay with seamless transitions.", "Viết một bài luận mạch lạc với các phần chuyển ý mượt mà.", "coherent logic", "Kết nối logic ăn khớp."),
    ("Nuance", "/ˈnjuː.ɑːns/", "danh từ", "sắc thái tinh tế", "Mastering nuances of language requires years of practice.", "Nắm vững những sắc thái tinh tế của ngôn ngữ đòi hỏi nhiều năm rèn luyện.", "subtle nuance", "Sự khác biệt rất nhỏ nhưng tinh túy."),
]
for item in b2_w1:
    add("B2", u, *item)

# Save intermediate progress
print(f"Higher English words count so far: {len(en_higher)}")

with open("scripts/en_higher.json", "w", encoding="utf-8") as f:
    json.dump(en_higher, f, ensure_ascii=False, indent=2)
