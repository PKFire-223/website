# -*- coding: utf-8 -*-
import json

zh_words = []

def add(level, unit, w, ph, pos, hv, vn, ex, ex_ph, ex_vn, col, tip):
    zh_words.append({
        "id": f"zh-{level.lower()}-{len(zh_words) + 1:04d}",
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

# ==========================================
# CHINESE HSK 1 (120 words)
# ==========================================
u1 = "Bài 1: Chào hỏi, Đại từ & Gặp gỡ"
hsk1_p1 = [
    ("你", "nǐ", "đại từ", "NHĨ", "bạn, anh, chị (ngôi thứ 2 số ít)", "你好！很高兴认识你。", "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.", "Chào bạn! Rất vui được quen biết bạn.", "你好 (chào bạn)", "Bộ Nhân đứng (亻) chỉ con người."),
    ("我", "wǒ", "đại từ", "NGÃ", "tôi, mình, bản thân (ngôi thứ nhất)", "我是越南人。", "Wǒ shì Yuènán rén.", "Tôi là người Việt Nam.", "我们 (chúng tôi)", "Ngã trong 'bản ngã', cái tôi."),
    ("他", "tā", "đại từ", "THA", "anh ấy, ông ấy, cậu ấy", "他是我的好朋友。", "Tā shì wǒ de hǎo péngyou.", "Anh ấy là bạn tốt của tôi.", "他们 (họ)", "Bộ Nhân đứng (亻) chỉ nam giới."),
    ("她", "tā", "đại từ", "THA", "cô ấy, bà ấy, chị ấy", "她是一名优秀的老师。", "Tā shì yì míng yōuxiù de lǎoshī.", "Cô ấy là một giáo viên ưu tú.", "她们 (các cô ấy)", "Bộ Nữ (女) chỉ phái nữ."),
    ("我们", "wǒ men", "đại từ", "NGÃ MÔN", "chúng tôi, chúng ta", "我们一起去图书馆吧。", "Wǒmen yìqǐ qù túshūguǎn ba.", "Chúng ta cùng đi thư viện nhé.", "我们大家 (tất cả chúng ta)", "Hậu tố 'môn' (们) biểu thị số nhiều."),
    ("好", "hǎo", "tính từ", "HẢO", "tốt, đẹp, hay, khỏe", "今天天气非常好。", "Jīntiān tiānqì fēicháng hǎo.", "Thời tiết hôm nay vô cùng tốt.", "很好 (rất tốt)", "Gồm bộ Nữ (女) và Tử (子) tượng trưng cho sự tốt lành viên mãn."),
    ("认识", "rèn shi", "động từ", "NHẬN THỨC", "quen biết, nhận ra", "很高兴认识你！", "Hěn gāoxìng rènshi nǐ!", "Rất vui được quen biết bạn!", "认识一下 (làm quen)", "Bộ Ngôn (讠) đứng đầu chỉ sự trao đổi lời nói."),
    ("谢谢", "xiè xie", "động từ", "TẠ TẠ", "cảm ơn", "谢谢你的热情帮助。", "Xièxie nǐ de rèqíng bāngzhù.", "Cảm ơn sự giúp đỡ nhiệt tình của bạn.", "多谢 (cảm ơn nhiều)", "Bộ Ngôn (讠) + Thân (身) + Thốn (寸)."),
    ("不客气", "bú kè qi", "cụm từ", "BẤT KHÁCH KHÍ", "đừng khách sáo, không có gì", "不用谢，不客气！", "Bú yòng xiè, bú kèqi!", "Không cần cảm ơn, đừng khách sáo nhé!", "太客气 (quá khách sáo)", "Cách đáp lại khi người khác cảm ơn."),
    ("再见", "zài jiàn", "động từ", "TÁI KIẾN", "tạm biệt, hẹn gặp lại", "明天学校见，再见！", "Míngtiān xuéxiào jiàn, zàijiàn!", "Mai gặp ở trường, tạm biệt nhé!", "再见 (tạm biệt)", "Tái (lại) + Kiến (gặp lại) = hẹn tái ngộ."),
    ("请", "qǐng", "động từ", "THỈNH", "xin mời, làm ơn", "请进，请坐，请喝茶。", "Qǐng jìn, qǐng zuò, qǐng hē chá.", "Xin mời vào, mời ngồi, mời dùng trà.", "请问 (xin hỏi)", "Bộ Ngôn (讠) đi kèm chữ Thanh (青)."),
    ("对不起", "duì bu qǐ", "cụm từ", "ĐỐI BẤT KHỞI", "xin lỗi", "对不起，我来晚了。", "Duìbuqǐ, wǒ lái wǎn le.", "Xin lỗi, tôi đến muộn mất rồi.", "对不起 (xin lỗi)", "Lời xin lỗi chân thành lịch thiệp."),
    ("没关系", "méi guān xi", "cụm từ", "MỘT QUAN HỆ", "không sao, không hề gì", "没关系，请不要介意。", "Méi guānxi, qǐng bú yào jièyì.", "Không sao đâu, xin đừng bận lòng nhé.", "没关系 (không sao)", "Đáp lại lời xin lỗi."),
    ("是", "shì", "động từ", "THỊ", "là, đúng, phải", "这是一本汉语书。", "Zhè shì yì běn Hànyǔ shū.", "Đây là một cuốn sách tiếng Hán.", "是不是 (phải không)", "Chữ Thị trong 'thị phi', 'chính thị'."),
    ("不", "bù", "phó từ", "BẤT", "không, chẳng (phủ định)", "我不喝咖啡，我喝茶。", "Wǒ bù hē kāfēi, wǒ hē chá.", "Tôi không uống cà phê, tôi uống trà.", "不用 (không cần)", "Từ phủ định căn bản nhất trong tiếng Hán."),
    ("很", "hěn", "phó từ", "HẨN", "rất, lắm", "汉语发音很有意思。", "Hànyǔ fāyīn hěn yǒu yìsi.", "Phát âm tiếng Hán rất thú vị.", "很大 (rất to lớn)", "Phó từ chỉ mức độ thường đứng trước tính từ."),
    ("什么", "shén me", "đại từ", "THẬP MA", "cái gì, gì", "你在看什么书呢？", "Nǐ zài kàn shénme shū ne?", "Bạn đang xem cuốn sách gì thế?", "为什么 (tại sao)", "Đại từ nghi vấn để hỏi vật."),
    ("谁", "shéi", "đại từ", "THÙY", "ai, người nào", "那位老人是谁？", "Nà wèi lǎorén shì shéi?", "Vị cụ già đó là ai thế?", "谁的 (của ai)", "Hán-Việt là 'Thùy' (ai)."),
    ("哪", "nǎ", "đại từ", "NÁ", "nào, đâu", "你是哪国人？", "Nǐ shì nǎ guó rén?", "Bạn là người nước nào?", "哪里 (ở đâu)", "Có bộ Khẩu (口) bên trái để hỏi."),
    ("哪儿", "nǎr", "đại từ", "NÁ NHI", "ở đâu, chỗ nào", "请问洗手间在哪儿？", "Qǐngwèn xǐshǒujiān zài nǎr?", "Xin hỏi nhà vệ sinh ở chỗ nào thế?", "去哪儿 (đi đâu)", "Phiên âm uốn lưỡi phương bắc."),
    ("这", "zhè", "đại từ", "GIÁ", "đây, này", "这是我的中文词典。", "Zhè shì wǒ de Zhōngwén cídiǎn.", "Đây là cuốn từ điển tiếng Trung của tôi.", "这个 (cái này)", "Chỉ vật ở cự ly gần người nói."),
    ("那", "nà", "đại từ", "NA", "đó, kia", "那座山非常高大。", "Nà zuò shān fēicháng gāodà.", "Ngọn núi kia vô cùng cao lớn.", "那个 (cái kia)", "Chỉ vật ở cự ly xa người nói."),
    ("人", "rén", "danh từ", "NHÂN", "con người, người", "做一个善良正直的人。", "Zuò yí ge shànliáng zhèngzhí de rén.", "Hãy làm một con người lương thiện và chính trực.", "中国人 (người Trung Quốc)", "Hình ảnh hai chân người bước đi."),
    ("朋友", "péng you", "danh từ", "BẰNG HỮU", "bạn bè", "朋友之间要坦诚相待。", "Péngyou zhījiān yào tǎnchéng xiāngdài.", "Bạn bè giữa nhau phải đối đãi chân thành.", "好朋友 (bạn tốt)", "Chữ Bằng (朋) gồm hai vầng trăng sát cánh."),
    ("老师", "lǎo shī", "danh từ", "LÃO SƯ", "thầy cô giáo", "李老师教学很有耐心。", "Lǐ lǎoshī jiàoxué hěn yǒu nàixīn.", "Thầy Lý giảng dạy rất kiên nhẫn.", "中文老师 (thầy giáo tiếng Trung)", "Lão trong 'kính lão đắc thọ'."),
    ("学生", "xué sheng", "danh từ", "HỌC SINH", "học sinh, sinh viên", "他是北京大学的学生。", "Tā shì Běijīng Dàxué de xuésheng.", "Cậu ấy là sinh viên của Đại học Bắc Kinh.", "大学生 (sinh viên đại học)", "Người đang theo học."),
    ("同学", "tóng xué", "danh từ", "ĐỒNG HỌC", "bạn cùng lớp, bạn học", "我们是大学同班同学。", "Wǒmen shì dàxué tóngbān tóngxué.", "Chúng tôi là bạn cùng lớp đại học.", "老同学 (bạn học cũ)", "Đồng (cùng) + Học (học tập)."),
    ("家", "jiā", "danh từ", "GIA", "nhà, gia đình", "我家住在河内市中心。", "Wǒ jiā zhù zài Hénèi shì zhōngxīn.", "Nhà tôi sống ở trung tâm thành phố Hà Nội.", "回家 (về nhà)", "Bên trên là bộ Miên (宀 - mái nhà), dưới là Thỉ (豕 - con lợn)."),
    ("爸爸", "bà ba", "danh từ", "BÁ BÁ", "bố, cha", "我爸爸是一名医生。", "Wǒ bàba shì yì míng yīshēng.", "Bố tôi là một bác sĩ y khoa.", "爸爸妈妈 (bố mẹ)", "Bên trên có bộ Phụ (父 - cha)."),
    ("妈妈", "mā ma", "danh từ", "MA MA", "mẹ, má", "妈妈做菜非常好吃。", "Māma zuò cài fēicháng hǎochī.", "Mẹ nấu món ăn vô cùng ngon miệng.", "我的妈妈 (mẹ của tôi)", "Bên trái có bộ Nữ (女 - phụ nữ)."),
]
for item in hsk1_p1:
    add("HSK1", u1, *item)

u2 = "Bài 2: Số đếm, Thời gian & Sinh hoạt"
hsk1_p2 = [
    ("一", "yī", "số từ", "NHẤT", "số một, 1", "一分耕耘，一分收获。", "Yì fēn gēngyún, yì fēn shōuhuò.", "Một phần công sức cày cuốc, một phần thu hoạch mùa màng.", "第一 (thứ nhất)", "Một nét ngang đơn giản."),
    ("二", "èr", "số từ", "NHỊ", "số hai, 2", "我们两个人一起去。", "Wǒmen liǎng ge rén yìqǐ qù.", "Hai người chúng tôi cùng đi.", "第二 (thứ hai)", "Hai nét ngang song song."),
    ("三", "sān", "số từ", "TAM", "số ba, 3", "三人行，必有我师。", "Sān rén xíng, bì yǒu wǒ shī.", "Ba người cùng đi, ắt có người làm thầy ta.", "第三 (thứ ba)", "Ba nét ngang."),
    ("四", "sì", "số từ", "TỨ", "số bốn, 4", "一年有四季：春夏秋冬。", "Yì nián yǒu sì jì: chūn xià qiū dōng.", "Một năm có bốn mùa: xuân hạ thu đông.", "第四 (thứ tư)", "Chữ Tứ hình vuông bao bọc."),
    ("五", "wǔ", "số từ", "NGŨ", "số năm, 5", "五星红旗迎风飘扬。", "Wǔxīng hóngqí yíngfēng piāoyáng.", "Lá cờ đỏ năm sao tung bay trước gió.", "第五 (thứ năm)", "Ngũ trong ngũ hành."),
    ("六", "liù", "số từ", "LỤC", "số sáu, 6", "星期六我们去爬山。", "Xīngqīliù wǒmen qù páshān.", "Thứ bảy chúng tôi đi leo núi.", "第六 (thứ sáu)", "Lục trong lục giác."),
    ("七", "qī", "số từ", "THẤT", "số bảy, 7", "一周有七天。", "Yì zhōu yǒu qī tiān.", "Một tuần có bảy ngày.", "第七 (thứ bảy)", "Thất trong thất tịch."),
    ("八", "bā", "số từ", "BÁT", "số tám, 8", "八月十五是中秋节。", "Bā yuè shíwǔ shì Zhōngqiū Jié.", "Rằm tháng tám là Tết Trung Thu.", "第八 (thứ tám)", "Bát phát âm gần với 'Phát' tài."),
    ("九", "jiǔ", "số từ", "CỬU", "số chín, 9", "九月是秋天的开始。", "Jiǔ yuè shì qiūtiān de kāishǐ.", "Tháng chín là khởi đầu của mùa thu.", "第九 (thứ chín)", "Cửu tượng trưng cho sự trường cửu."),
    ("十", "shí", "số từ", "THẬP", "số mười, 10", "十全十美是美好的愿望。", "Shí quán shí měi shì měihǎo de yuànwàng.", "Thập toàn thập mỹ là ước vọng tốt đẹp.", "第十 (thứ mười)", "Hình chữ thập cân đối."),
    ("零", "líng", "số từ", "LINH", "số không, 0", "现在室外气温是零度。", "Xiànzài shìwài qìwēn shì líng dù.", "Nhiệt độ ngoài trời bây giờ là không độ.", "零分 (không điểm)", "Bên trên có bộ Vũ (雨 - mưa)."),
    ("百", "bǎi", "số từ", "BÁCH", "trăm, 100", "这家书店有一百年的历史。", "Zhè jiā shūdiàn yǒu yì bǎi nián de lìshǐ.", "Hiệu sách này có lịch sử một trăm năm.", "一百 (một trăm)", "Bách chiến bách thắng."),
    ("年", "nián", "danh từ", "NIÊN", "năm", "祝你新年快乐，万事如意！", "Zhù nǐ xīnnián kuàilè, wànshì rúyì!", "Chúc bạn năm mới vui vẻ, vạn sự như ý!", "今年 (năm nay)", "Niên trong 'niên khóa', 'kỷ niệm'."),
    ("月", "yuè", "danh từ", "NGUYỆT", "tháng, mặt trăng", "明月照亮了宁静的夜空。", "Míngyuè zhàoliàng le níngjìng de yèkōng.", "Vầng trăng sáng soi tỏ bầu trời đêm thanh tĩnh.", "八月 (tháng tám)", "Hình tượng vầng trăng khuyết."),
    ("日", "rì", "danh từ", "NHẬT", "ngày, mặt trời", "今日事，今日毕。", "Jīnrì shì, jīnrì bì.", "Việc hôm nay, hôm nay làm cho xong.", "节日 (ngày lễ)", "Hình tượng vầng thái dương tròn trĩnh."),
    ("号", "hào", "danh từ", "HIỆU", "ngày (trong văn nói), số", "明天是十月二十号。", "Míngtiān shì shí yuè èrshí hào.", "Ngày mai là ngày hai mươi tháng mười.", "手机号 (số điện thoại)", "Dùng chỉ ngày trong ngày tháng khẩu ngữ."),
    ("星期", "xīng qī", "danh từ", "TINH KỲ", "tuần lễ, thứ trong tuần", "这个星期六你有空吗？", "Zhège xīngqīliù nǐ yǒu kòng ma?", "Thứ bảy tuần này bạn có rảnh không?", "星期天 (chủ nhật)", "Tinh (ngôi sao) + Kỳ (kỳ hạn)."),
    ("点", "diǎn", "danh từ/lượng từ", "ĐIỂM", "giờ (đồng hồ), dấu chấm", "我们早上八点准时集合。", "Wǒmen zǎoshang bā diǎn zhǔnshí jíhé.", "Chúng ta tập trung đúng tám giờ sáng nhé.", "几点 (mấy giờ)", "Chỉ mốc thời gian trên mặt đồng hồ."),
    ("分钟", "fēn zhōng", "danh từ", "PHÂN CHUNG", "phút (thời lượng)", "请等我五分钟，马上就好。", "Qǐng děng wǒ wǔ fēnzhōng, mǎshàng jiù hǎo.", "Xin hãy đợi tôi năm phút, xong ngay đây.", "十分钟 (mười phút)", "Chỉ khoảng thời gian phút."),
    ("现在", "xiàn zài", "danh từ", "HIỆN TẠI", "bây giờ, hiện nay", "现在几点了？", "Xiànzài jǐ diǎn le?", "Bây giờ là mấy giờ rồi?", "现在开始 (bắt đầu ngay bây giờ)", "Hiện (xuất hiện) + Tại (đang ở)."),
    ("今天", "jīn tiān", "danh từ", "KIM THIÊN", "hôm nay", "今天工作非常充实。", "Jīntiān gōngzuò fēicháng chōngshí.", "Hôm nay công việc vô cùng trọn vẹn bổ ích.", "今天晚上 (tối hôm nay)", "Kim (hiện tại) + Thiên (ngày)."),
    ("明天", "míng tiān", "danh từ", "MINH THIÊN", "ngày mai", "明天会更加美好。", "Míngtiān huì gèngjiā měihǎo.", "Ngày mai sẽ càng thêm tươi đẹp.", "明天见 (ngày mai gặp lại)", "Minh (sáng sủa) + Thiên (ngày)."),
    ("昨天", "zuó tiān", "danh từ", "TÁC THIÊN", "hôm qua", "昨天下午下了一场大雨。", "Zuótiān xiàwǔ xià le yì cháng dàyǔ.", "Chiều hôm qua đã trút một cơn mưa lớn.", "昨天下雨 (hôm qua mưa)", "Tác (đã qua) + Thiên (ngày)."),
    ("早上", "zǎo shang", "danh từ", "TẢO THƯỢNG", "buổi sáng sớm", "早上空气非常新鲜。", "Zǎoshang kōngqì fēicháng xīnxiān.", "Không khí buổi sáng rất trong lành.", "早上好 (chào buổi sáng)", "Tảo trong 'tảo tần', 'sớm mai'."),
    ("中午", "zhōng wǔ", "danh từ", "TRUNG NGỌ", "buổi trưa", "中午我们在公司食堂吃饭。", "Zhōngwǔ wǒmen zài gōngsī shítáng chīfàn.", "Buổi trưa chúng tôi ăn cơm ở nhà ăn công ty.", "中午休息 (nghỉ trưa)", "Khoảng 12 giờ trưa."),
    ("下午", "xià wǔ", "danh từ", "HẠ NGỌ", "buổi chiều", "下午三点有一个重要会议。", "Xiàwǔ sān diǎn yǒu yí ge zhòngyào huìyì.", "Chiều nay ba giờ có một cuộc họp quan trọng.", "今天下午 (chiều nay)", "Khoảng thời gian sau 12 giờ trưa."),
    ("晚上", "wǎn shang", "danh từ", "VÃN THƯỢNG", "buổi tối", "晚上我们去散步吧。", "Wǎnshang wǒmen qù sànbù ba.", "Tối nay chúng ta cùng đi dạo nhé.", "晚上好 (chào buổi tối)", "Vãn trong 'muộn màng', 'chiều tối'."),
    ("吃", "chī", "động từ", "CẬT", "ăn", "中国人喜欢吃饺子。", "Zhōngguó rén xǐhuan chī jiǎozi.", "Người Trung Quốc thích ăn bánh sủi cảo.", "吃饭 (ăn cơm)", "Có bộ Khẩu (口) ở trước biểu thị việc ăn uống."),
    ("喝", "hē", "động từ", "HÁT", "uống", "多喝温开水对身体好。", "Duō hē wēn kāishuǐ duì shēntǐ hǎo.", "Uống nhiều nước ấm rất tốt cho cơ thể.", "喝茶 (uống trà)", "Có bộ Khẩu (口) bên trái."),
    ("茶", "chá", "danh từ", "TRÀ", "trà, chè", "品茶能让人心平气和。", "Pǐn chá néng ràng rén xīn píng qì hé.", "Thưởng thức trà giúp lòng người bình yên thanh thản.", "绿茶 (trà xanh)", "Phía trên có bộ Thảo đầu (艹 - cỏ cây)."),
]
for item in hsk1_p2:
    add("HSK1", u2, *item)

print(f"Generated HSK1 items so far: {len(zh_words)}")

# Save HSK1
with open("scripts/zh_hsk1.json", "w", encoding="utf-8") as f:
    json.dump(zh_words, f, ensure_ascii=False, indent=2)
