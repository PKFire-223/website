// Situational Dialogues & Real-World Phrasebook Database for English & Chinese

export interface DialogueLine {
  speaker: string;
  avatar: string;
  text: string;
  pinyin?: string;
  translation: string;
}

export interface KeyPhrase {
  phrase: string;
  pinyin?: string;
  meaning: string;
  usageTip: string;
}

export interface SituationalTopic {
  id: string;
  title: string;
  vietnameseTitle: string;
  icon: string;
  description: string;
  language: 'en' | 'zh';
  dialogue: DialogueLine[];
  keyPhrases: KeyPhrase[];
}

export const SITUATIONAL_DIALOGUES: SituationalTopic[] = [
  // =========================================================================
  // ENGLISH SITUATIONS
  // =========================================================================
  {
    id: 'en-airport',
    title: 'At the Airport & Flight Check-in',
    vietnameseTitle: 'Tại Sân Bay & Làm Thủ Tục Bay',
    icon: '✈️',
    description: 'Học cách làm thủ tục check-in, gửi hành lý, xin đổi chỗ ngồi cạnh cửa sổ và qua cửa an ninh sân bay quốc tế.',
    language: 'en',
    dialogue: [
      {
        speaker: 'Agent',
        avatar: '👩‍💼',
        text: 'Good morning! Where are you flying to today?',
        translation: 'Chào buổi sáng! Hôm nay quý khách bay đến đâu ạ?'
      },
      {
        speaker: 'Passenger',
        avatar: '🧳',
        text: 'Good morning. I am flying to London on flight BA 178.',
        translation: 'Chào cô. Tôi bay đến London trên chuyến bay BA 178.'
      },
      {
        speaker: 'Agent',
        avatar: '👩‍💼',
        text: 'May I see your passport and booking reference, please?',
        translation: 'Tôi có thể xem hộ chiếu và mã đặt chỗ của quý khách được không ạ?'
      },
      {
        speaker: 'Passenger',
        avatar: '🧳',
        text: 'Certainly, here you go. Could I please have a window seat if possible?',
        translation: 'Chắc chắn rồi, của cô đây. Nếu được thì cho tôi xin một chỗ ngồi cạnh cửa sổ nhé?'
      },
      {
        speaker: 'Agent',
        avatar: '👩‍💼',
        text: 'Let me check... Yes, 14A is available! Do you have any check-in baggage or only hand luggage?',
        translation: 'Để tôi kiểm tra... Vâng, ghế 14A còn trống! Quý khách có hành lý ký gửi hay chỉ có hành lý xách tay?'
      },
      {
        speaker: 'Passenger',
        avatar: '🧳',
        text: 'Just this one suitcase to check in, and I have a backpack with me.',
        translation: 'Chỉ có chiếc vali này để ký gửi thôi, và tôi có một chiếc ba lô mang theo người.'
      },
      {
        speaker: 'Agent',
        avatar: '👩‍💼',
        text: 'Please place your suitcase on the scales. Great, it is 18 kilos. Here is your boarding pass. Gate 24, boarding at 10:15.',
        translation: 'Xin mời đặt vali lên cân. Tuyệt, đúng 18 kg. Đây là thẻ lên máy bay của quý khách. Cửa số 24, bắt đầu lên máy bay lúc 10:15.'
      },
      {
        speaker: 'Passenger',
        avatar: '🧳',
        text: 'Thank you very much for your kind help. Have a great day!',
        translation: 'Cảm ơn cô rất nhiều vì sự giúp đỡ chu đáo. Chúc cô một ngày tốt lành!'
      }
    ],
    keyPhrases: [
      { phrase: 'window seat / aisle seat', meaning: 'chỗ ngồi cạnh cửa sổ / cạnh lối đi', usageTip: 'Hỏi nhân viên quầy vé: "Could I have a window/aisle seat, please?"' },
      { phrase: 'check-in baggage vs carry-on luggage', meaning: 'hành lý ký gửi vs hành lý xách tay', usageTip: 'Vali to mang gửi là check-in, túi xách nhỏ mang lên khoang là carry-on.' },
      { phrase: 'boarding pass & gate', meaning: 'thẻ lên máy bay & cửa ra máy bay', usageTip: 'Nhớ để ý số Gate và giờ Boarding ghi trên thẻ để không bị lỡ chuyến.' }
    ]
  },
  {
    id: 'en-restaurant',
    title: 'Ordering Food at a Fine Restaurant',
    vietnameseTitle: 'Gọi Món & Ăn Uống Tại Nhà Hàng',
    icon: '🍽️',
    description: 'Cách gọi món khai vị, món chính, hỏi món đặc biệt của quán và thanh toán hóa đơn lịch sự.',
    language: 'en',
    dialogue: [
      {
        speaker: 'Waiter',
        avatar: '🤵',
        text: 'Good evening! A table for two tonight?',
        translation: 'Kính chào quý khách! Bàn dành cho hai người tối nay đúng không ạ?'
      },
      {
        speaker: 'Guest',
        avatar: '🍷',
        text: 'Yes, please. Could we sit by the garden terrace?',
        translation: 'Vâng đúng rồi. Chúng tôi có thể ngồi gần ban công vườn được không?'
      },
      {
        speaker: 'Waiter',
        avatar: '🤵',
        text: 'Right this way. Here are your menus. Would you like to start with some sparkling water or an aperitif?',
        translation: 'Mời quý khách đi lối này. Đây là thực đơn. Quý khách có muốn bắt đầu với một chút nước khoáng có ga hay đồ uống khai vị không ạ?'
      },
      {
        speaker: 'Guest',
        avatar: '🍷',
        text: 'Just sparkling water with lemon, please. What is the chef\'s special today?',
        translation: 'Cho chúng tôi nước khoáng có ga kèm chanh thôi. Hôm nay món đặc biệt của đầu bếp là món gì vậy?'
      },
      {
        speaker: 'Waiter',
        avatar: '🤵',
        text: 'Today we have pan-seared Atlantic salmon served with roasted asparagus and herb butter.',
        translation: 'Hôm nay chúng tôi có cá hồi Đại Tây Dương áp chảo dùng kèm măng tây nướng và bơ thảo mộc.'
      },
      {
        speaker: 'Guest',
        avatar: '🍷',
        text: 'That sounds delightful! We will have two portions of salmon and a Caesar salad to share.',
        translation: 'Nghe hấp dẫn quá! Cho chúng tôi hai phần cá hồi và một phần salad Caesar để dùng chung nhé.'
      },
      {
        speaker: 'Guest',
        avatar: '🍷',
        text: 'Excuse me, could we also have the bill, please?',
        translation: 'Xin lỗi, cho chúng tôi xin hóa đơn thanh toán với ạ?'
      },
      {
        speaker: 'Waiter',
        avatar: '🤵',
        text: 'Certainly! Would you prefer paying with credit card or cash?',
        translation: 'Dạ có ngay! Quý khách muốn thanh toán bằng thẻ tín dụng hay tiền mặt ạ?'
      }
    ],
    keyPhrases: [
      { phrase: 'What do you recommend? / What is the chef\'s special?', meaning: 'Bạn gợi ý món nào? / Món đặc biệt hôm nay là gì?', usageTip: 'Cách hỏi tự nhiên nhất để được giới thiệu món ngon nhất của nhà hàng.' },
      { phrase: 'Could we have the bill / check, please?', meaning: 'Làm ơn cho tôi xin hóa đơn thanh toán?', usageTip: 'Người Anh dùng "the bill", người Mỹ thường dùng "the check".' },
      { phrase: 'Keep the change', meaning: 'Khỏi cần trả lại tiền thừa (tiền tip)', usageTip: 'Nói câu này khi muốn gửi lại tiền lẻ thừa làm tiền bồi dưỡng cho nhân viên.' }
    ]
  },
  {
    id: 'en-workplace',
    title: 'Professional Job Interview & Workplace',
    vietnameseTitle: 'Phỏng Vấn Xin Việc & Nơi Công Sở',
    icon: '💼',
    description: 'Cách trả lời phỏng vấn chuyên nghiệp, giới thiệu thế mạnh bản thân và trao đổi về dự án công nghệ.',
    language: 'en',
    dialogue: [
      {
        speaker: 'Interviewer',
        avatar: '👔',
        text: 'Welcome! Thank you for coming today. Could you tell us briefly about your professional background?',
        translation: 'Chào mừng bạn! Cảm ơn bạn đã đến hôm nay. Bạn có thể giới thiệu sơ lược về kinh nghiệm chuyên môn của mình không?'
      },
      {
        speaker: 'Candidate',
        avatar: '👩‍💻',
        text: 'Thank you for having me. I have over four years of experience in full-stack software development, specializing in scalable web applications.',
        translation: 'Cảm ơn quý công ty đã mời tôi. Tôi có hơn bốn năm kinh nghiệm trong phát triển phần mềm full-stack, chuyên về các ứng dụng web có khả năng mở rộng cao.'
      },
      {
        speaker: 'Interviewer',
        avatar: '👔',
        text: 'Impressive! How do you handle tight project deadlines and conflicting priorities under pressure?',
        translation: 'Thật ấn tượng! Bạn xử lý thế nào khi gặp các hạn chót dự án gấp gáp và các ưu tiên xung đột dưới áp lực cao?'
      },
      {
        speaker: 'Candidate',
        avatar: '👩‍💻',
        text: 'I rely on clear communication and agile prioritization. I break complex tasks into milestones and align closely with stakeholders.',
        translation: 'Tôi dựa vào việc giao tiếp rõ ràng và phân bổ thứ tự ưu tiên linh hoạt. Tôi chia nhỏ các nhiệm vụ phức tạp thành các cột mốc và phối hợp chặt chẽ với các bên liên quan.'
      },
      {
        speaker: 'Interviewer',
        avatar: '👔',
        text: 'Do you have any questions for us regarding the engineering culture here?',
        translation: 'Bạn có câu hỏi nào cho chúng tôi về văn hóa kỹ thuật tại công ty không?'
      },
      {
        speaker: 'Candidate',
        avatar: '👩‍💻',
        text: 'Yes! What does a typical sprint look like, and how does your team foster continuous learning?',
        translation: 'Dạ có! Một chu kỳ sprint điển hình diễn ra như thế nào, và đội ngũ của công ty thúc đẩy việc học hỏi liên tục ra sao?'
      }
    ],
    keyPhrases: [
      { phrase: 'full-stack / scalable applications', meaning: 'toàn diện / ứng dụng có khả năng mở rộng cao', usageTip: 'Thuật ngữ cốt lõi trong ngành công nghệ phần mềm hiện đại.' },
      { phrase: 'tight deadlines & conflicting priorities', meaning: 'hạn chót gấp gáp & các ưu tiên xung đột nhau', usageTip: 'Cụm từ đắt giá khi mô tả môi trường làm việc tốc độ cao.' },
      { phrase: 'align with stakeholders', meaning: 'thống nhất, đồng thuận với các bên liên quan', usageTip: 'Cách diễn đạt chuyên nghiệp trong quản lý dự án.' }
    ]
  },

  // =========================================================================
  // CHINESE SITUATIONS
  // =========================================================================
  {
    id: 'zh-hotel',
    title: 'Hotel Check-in & Inquiries',
    vietnameseTitle: 'Nhận Phòng Khách Sạn & Hỏi Đáp (入住酒店)',
    icon: '🏨',
    description: 'Cách làm thủ tục nhận phòng (入住), hỏi mật khẩu Wi-Fi, yêu cầu phòng không hút thuốc và giờ ăn sáng.',
    language: 'zh',
    dialogue: [
      {
        speaker: 'Receptionist',
        avatar: '👩‍💼',
        text: '您好！欢迎光临四季酒店，请问有什么可以帮您？',
        pinyin: 'Nín hǎo! Huānyíng guānglín sìjì jiǔdiàn, qǐngwèn yǒu shénme kěyǐ bāng nín?',
        translation: 'Xin chào quý khách! Chào mừng đến với khách sạn Four Seasons, xin hỏi tôi có thể giúp gì cho quý khách?'
      },
      {
        speaker: 'Guest',
        avatar: '🧳',
        text: '您好，我预订了一间大床房，我叫王明。',
        pinyin: 'Nín hǎo, wǒ yùdìng le yì jiān dàchuáng fáng, wǒ jiào Wáng Míng.',
        translation: 'Xin chào, tôi đã đặt trước một phòng giường lớn, tôi tên là Vương Minh.'
      },
      {
        speaker: 'Receptionist',
        avatar: '👩‍💼',
        text: '好的王先生，请出示一下您的护照，我帮您办理入住手续。',
        pinyin: 'Hǎo de Wáng xiānsheng, qǐng chūshì yíxià nín de hùzhào, wǒ bāng nín bànlǐ rùzhù shǒuxù.',
        translation: 'Vâng thưa ông Vương, xin ông xuất trình hộ chiếu một chút, tôi sẽ làm thủ tục nhận phòng cho ông.'
      },
      {
        speaker: 'Guest',
        avatar: '🧳',
        text: '这是我的护照。请问房间里有免费无线上网吗？',
        pinyin: 'Zhè shì wǒ de hùzhào. Qǐngwèn fángjiān lǐ yǒu miǎnfèi wúxiàn shàngwǎng ma?',
        translation: 'Đây là hộ chiếu của tôi. Xin hỏi trong phòng có mạng không dây (Wi-Fi) miễn phí không?'
      },
      {
        speaker: 'Receptionist',
        avatar: '👩‍💼',
        text: '有的，WiFi密码在房卡套上。另外，明天早餐时间是早上七点到十点，在二楼餐厅。',
        pinyin: 'Yǒu de, WiFi mìmǎ zài fángkǎ tào shàng. Lìngwài, míngtiān zǎocān shíjiān shì zǎoshang qī diǎn dào shí diǎn, zài èr lóu cāntīng.',
        translation: 'Dạ có ạ, mật khẩu Wi-Fi ghi trên vỏ thẻ phòng. Ngoài ra, giờ ăn sáng ngày mai là từ 7h đến 10h sáng tại nhà hàng tầng 2.'
      },
      {
        speaker: 'Guest',
        avatar: '🧳',
        text: '太好了，非常感谢！我的房间在几楼？',
        pinyin: 'Tài hǎo le, fēicháng gǎnxiè! Wǒ de fángjiān zài jǐ lóu?',
        translation: 'Tuyệt quá, cảm ơn cô rất nhiều! Phòng của tôi ở tầng mấy vậy?'
      },
      {
        speaker: 'Receptionist',
        avatar: '👩‍💼',
        text: '您的房间是808号房，在八楼。电梯在右拐角。祝您入住愉快！',
        pinyin: 'Nín de fángjiān shì bā líng bā hào fáng, zài bā lóu. Diàntī zài yòu guǎijiǎo. Zhù nín rùzhù yúkuài!',
        translation: 'Phòng của ông là số 808, ở tầng tám. Thang máy ở góc rẽ bên phải. Chúc ông có kỳ nghỉ vui vẻ!'
      }
    ],
    keyPhrases: [
      { phrase: '办理入住 / 办理退房', pinyin: 'bànlǐ rùzhù / bànlǐ tuìfáng', meaning: 'làm thủ tục nhận phòng / trả phòng', usageTip: 'Từ vựng cốt lõi khi đến hoặc rời khách sạn.' },
      { phrase: '大床房 / 双床房', pinyin: 'dàchuáng fáng / shuāngchuáng fáng', meaning: 'phòng một giường lớn / phòng hai giường đơn', usageTip: 'Chọn loại phòng phù hợp với số người đi cùng.' },
      { phrase: '免费无线上网 (WiFi)', pinyin: 'miǎnfèi wúxiàn shàngwǎng', meaning: 'mạng Wi-Fi miễn phí', usageTip: 'Hỏi nhân viên mật khẩu: "请问WiFi密码是多少？"' }
    ]
  },
  {
    id: 'zh-shopping',
    title: 'Shopping & Bargaining in China',
    vietnameseTitle: 'Mua Sắm & Mặc Cả Giá Cả (购物与砍价)',
    icon: '🛍️',
    description: 'Học cách hỏi giá tiền, thử đồ, mặc cả khéo léo và thanh toán bằng WeChat Pay / Alipay.',
    language: 'zh',
    dialogue: [
      {
        speaker: 'Customer',
        avatar: '👗',
        text: '老板，请问这件蓝色的旗袍怎么卖？',
        pinyin: 'Lǎobǎn, qǐngwèn zhè jiàn lánsè de qípáo zěnme mài?',
        translation: 'Chủ quán ơi, xin hỏi chiếc sườn xám màu xanh lam này bán thế nào?'
      },
      {
        speaker: 'Seller',
        avatar: '👨‍🦰',
        text: '这件是纯丝绸做的，质量非常好。标价三百八十块。',
        pinyin: 'Zhè jiàn shì chún sīchóu zuò de, zhìliàng fēicháng hǎo. Biāojià sān bǎi bā shí kuài.',
        translation: 'Chiếc này làm bằng lụa tơ tằm nguyên chất đấy, chất lượng cực tốt. Giá niêm yết là 380 tệ.'
      },
      {
        speaker: 'Customer',
        avatar: '👗',
        text: '有点儿太贵了吧！能便宜一点儿吗？',
        pinyin: 'Yǒudiǎnr tài guì le ba! Néng piányi yìdiǎnr ma?',
        translation: 'Có hơi đắt quá không ạ! Có thể bớt một chút được không?'
      },
      {
        speaker: 'Seller',
        avatar: '👨‍🦰',
        text: '看你真心喜欢，给你打个九折，三百四十块怎么样？',
        pinyin: 'Kàn nǐ zhēnxīn xǐhuan, gěi nǐ dǎ ge jiǔ zhé, sān bǎi sì shí kuài zěnmeyàng?',
        translation: 'Thấy bạn thật lòng thích, tôi giảm giá 10% (chiết khấu 9) cho bạn, 340 tệ thế nào?'
      },
      {
        speaker: 'Customer',
        avatar: '👗',
        text: '二百八十块，如果行的话我就拿一件M号。',
        pinyin: 'Èr bǎi bā shí kuài, rúguǒ xíng de huà wǒ jiù ná yí jiàn M hào.',
        translation: '280 tệ nhé, nếu được thì tôi lấy một chiếc cỡ M.'
      },
      {
        speaker: 'Seller',
        avatar: '👨‍🦰',
        text: '哎呀，亏本卖给你啦！可以微信或者支付宝扫码付款。',
        pinyin: 'Āiyā, kuī běn mài gěi nǐ la! Kěyǐ Wēixìn huòzhě Zhīfùbǎo sǎomǎ fùkuǎn.',
        translation: 'Úi chà, bán lỗ vốn cho bạn luôn đấy! Bạn có thể quét mã thanh toán qua WeChat hoặc Alipay nhé.'
      }
    ],
    keyPhrases: [
      { phrase: '怎么卖？ / 多少钱？', pinyin: 'zěnme mài? / duōshao qián?', meaning: 'bán thế nào? / bao nhiêu tiền?', usageTip: 'Cách hỏi giá tiền thông dụng nhất tại các chợ và cửa hàng.' },
      { phrase: '能便宜一点儿吗？', pinyin: 'néng piányi yìdiǎnr ma?', meaning: 'có thể giảm giá chút được không?', usageTip: 'Câu mặc cả cửa miệng không thể thiếu khi mua sắm ở Trung Quốc.' },
      { phrase: '扫码付款', pinyin: 'sǎomǎ fùkuǎn', meaning: 'quét mã thanh toán (WeChat / Alipay)', usageTip: 'Trung Quốc hầu như thanh toán không tiền mặt, dùng mã QR.' }
    ]
  },
  {
    id: 'zh-directions',
    title: 'Asking for Directions & Transport',
    vietnameseTitle: 'Hỏi Đường & Phương Tiện Đi Lại (问路与交通)',
    icon: '🧭',
    description: 'Cách hỏi đường tới ga tàu điện ngầm, hỏi khoảng cách và đi taxi tiện lợi.',
    language: 'zh',
    dialogue: [
      {
        speaker: 'Tourist',
        avatar: '🚶‍♂️',
        text: '打扰一下，请问去最近的地铁站怎么走？',
        pinyin: 'Dǎrǎo yíxià, qǐngwèn qù zuì jìn de dìtiě zhàn zěnme zǒu?',
        translation: 'Làm phiền một chút, xin hỏi đi đến ga tàu điện ngầm gần nhất đi như thế nào ạ?'
      },
      {
        speaker: 'Local',
        avatar: '🚴‍♂️',
        text: '沿着这条街一直往前走，到了十字路口往右拐。',
        pinyin: 'Yánzhe zhè tiáo jiē yìzhí wǎng qián zǒu, dào le shízì lùkǒu wǎng yòu guǎi.',
        translation: 'Cứ men theo con phố này đi thẳng về phía trước, đến ngã tư đường thì rẽ phải.'
      },
      {
        speaker: 'Tourist',
        avatar: '🚶‍♂️',
        text: '离这里大概有多远？走路需要多长时间？',
        pinyin: 'Lí zhèlǐ dàgài yǒu duō yuǎn? Zǒulù xūyào duō cháng shíjiān?',
        translation: 'Cách chỗ này khoảng bao xa ạ? Đi bộ mất bao nhiêu thời gian?'
      },
      {
        speaker: 'Local',
        avatar: '🚴‍♂️',
        text: '不太远，大概五百米，走路五分钟就到了。地铁站就在商场旁边。',
        pinyin: 'Bú tài yuǎn, dàgài wǔ bǎi mǐ, zǒulù wǔ fēnzhōng jiù dào le. Dìtiě zhàn jiù zài shāngchǎng pángbiān.',
        translation: 'Không xa lắm đâu, khoảng 500 mét, đi bộ tầm 5 phút là tới rồi. Ga tàu điện ngầm ở ngay cạnh trung tâm thương mại.'
      },
      {
        speaker: 'Tourist',
        avatar: '🚶‍♂️',
        text: '太清楚了，太感谢您了！',
        pinyin: 'Tài qīngchu le, tài gǎnxiè nín le!',
        translation: 'Chỉ đường rõ ràng quá, cảm ơn bác rất nhiều ạ!'
      }
    ],
    keyPhrases: [
      { phrase: '一直往前走', pinyin: 'yìzhí wǎng qián zǒu', meaning: 'cứ đi thẳng mãi về phía trước', usageTip: 'Chỉ dẫn hướng đi thẳng.' },
      { phrase: '十字路口 / 往右拐 / 往左拐', pinyin: 'shízì lùkǒu / wǎng yòu guǎi / wǎng zuǒ guǎi', meaning: 'ngã tư / rẽ phải / rẽ trái', usageTip: 'Từ vựng định hướng khi hỏi đường.' },
      { phrase: '离这里多远？', pinyin: 'lí zhèlǐ duō yuǎn?', meaning: 'cách đây bao xa?', usageTip: 'Hỏi khoảng cách từ điểm hiện tại đến đích.' }
    ]
  }
];
