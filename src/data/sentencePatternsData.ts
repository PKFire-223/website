// Comprehensive International Sentence Patterns & High-Frequency Communicative Expressions Database
// Tiêu chuẩn Quốc tế: Oxford/CEFR (A1-C1) & HSK (HSK1-HSK6)

export interface PatternExample {
  text: string;
  pinyin?: string; // Cho tiếng Trung
  translation: string;
  situation: string; // Ngữ cảnh thực tế
}

export interface SentencePattern {
  id: string;
  language: 'en' | 'zh';
  level: string; // A1-C1 hoặc HSK1-HSK6
  title: string;
  formula: string; // Công thức ngữ pháp
  category: string; // Chủ điểm ngữ cảnh
  explanation: string; // Hướng dẫn & lưu ý sử dụng
  tag: string;
  examples: PatternExample[];
}

export const SENTENCE_PATTERNS_DATABASE: SentencePattern[] = [
  {
    "id": "en-pat-001",
    "language": "en",
    "level": "A1",
    "title": "Hỏi & Bày tỏ sở thích, mong muốn lịch sự",
    "formula": "Would like + to V / noun",
    "category": "Giao tiếp hằng ngày",
    "explanation": "Cách diễn đạt trang nhã, lịch sự hơn nhiều so với \"want\". Dùng khi gọi món trong nhà hàng hoặc đưa ra lời mời nhã nhặn.",
    "tag": "Lịch sự cơ bản",
    "examples": [
      {
        "text": "I would like a cup of hot green tea, please.",
        "translation": "Làm ơn cho tôi một tách trà xanh nóng.",
        "situation": "Gọi đồ uống tại quán cà phê/nhà hàng"
      },
      {
        "text": "Would you like to join us for dinner tonight?",
        "translation": "Bạn có muốn cùng đi ăn tối với chúng tôi tối nay không?",
        "situation": "Đưa ra lời mời thân mật"
      },
      {
        "text": "We would like to book a double room for two nights.",
        "translation": "Chúng tôi muốn đặt một phòng đôi cho hai đêm.",
        "situation": "Đặt phòng tại khách sạn"
      }
    ]
  },
  {
    "id": "en-pat-002",
    "language": "en",
    "level": "A1",
    "title": "Hỏi & Nói về thời gian thực hiện hành động",
    "formula": "It takes [someone] + [time] + to V",
    "category": "Thời gian & Đi lại",
    "explanation": "Mẫu câu cực kỳ phổ biến để nói mất bao nhiêu thời gian của ai đó để hoàn thành một việc gì đó.",
    "tag": "Chỉ thời lượng",
    "examples": [
      {
        "text": "It takes me about twenty minutes to walk to school.",
        "translation": "Tôi mất khoảng 20 phút để đi bộ đến trường.",
        "situation": "Nói về thời gian đi lại mỗi ngày"
      },
      {
        "text": "How long does it take you to get to the airport by taxi?",
        "translation": "Bạn mất bao lâu để đến sân bay bằng xe taxi?",
        "situation": "Hỏi lộ trình di chuyển"
      },
      {
        "text": "It only took us two days to finish this project.",
        "translation": "Chúng tôi chỉ mất đúng hai ngày để hoàn thành dự án này.",
        "situation": "Báo cáo tiến độ công việc"
      }
    ]
  },
  {
    "id": "en-pat-003",
    "language": "en",
    "level": "A1",
    "title": "Đưa ra yêu cầu giúp đỡ & Đề nghị lịch thiệp",
    "formula": "Can / Could you please + V (bare) ...?",
    "category": "Giao tiếp hằng ngày",
    "explanation": "\"Could\" mang sắc thái trang trọng, lịch sự hơn \"Can\". Dùng phổ biến trong giao tiếp công sở, du lịch và nhà hàng.",
    "tag": "Yêu cầu trợ giúp",
    "examples": [
      {
        "text": "Could you please speak a little more slowly?",
        "translation": "Bạn có thể vui lòng nói chậm hơn một chút được không?",
        "situation": "Nhờ người bản xứ nói chậm khi giao tiếp"
      },
      {
        "text": "Can you show me the way to the nearest subway station?",
        "translation": "Bạn có thể chỉ giúp tôi đường đến ga tàu điện ngầm gần nhất không?",
        "situation": "Hỏi đường khi đi du lịch"
      },
      {
        "text": "Could you give me a hand with this heavy luggage?",
        "translation": "Bạn có thể giúp tôi một tay với hành lý nặng này được không?",
        "situation": "Nhờ vả tại sân bay"
      }
    ]
  },
  {
    "id": "en-pat-004",
    "language": "en",
    "level": "A1",
    "title": "Miêu tả sự tồn tại & Hiện diện của sự vật",
    "formula": "There is + Danh từ số ít / không đếm được || There are + Danh từ số nhiều",
    "category": "Miêu tả & Đời sống",
    "explanation": "Dùng để giới thiệu hoặc miêu tả sự vật, hiện tượng tồn tại ở một không gian, thời gian cụ thể.",
    "tag": "Tồn tại sự vật",
    "examples": [
      {
        "text": "There is a modern library just across the street.",
        "translation": "Có một thư viện hiện đại ngay bên kia đường.",
        "situation": "Chỉ dẫn địa điểm"
      },
      {
        "text": "There are over ten international students in our class.",
        "translation": "Có hơn mười du học sinh quốc tế trong lớp chúng tôi.",
        "situation": "Giới thiệu về lớp học"
      },
      {
        "text": "Is there any fresh water left in the refrigerator?",
        "translation": "Còn chút nước ngọt nào trong tủ lạnh không?",
        "situation": "Hỏi đồ ăn uống tại nhà"
      }
    ]
  },
  {
    "id": "en-pat-005",
    "language": "en",
    "level": "A1",
    "title": "Diễn tả kế hoạch dự định trong tương lai gần",
    "formula": "S + be going to + V (bare)",
    "category": "Kế hoạch & Tương lai",
    "explanation": "Dùng khi kế hoạch đã được lên lịch từ trước, hoặc có dấu hiệu rõ ràng ở hiện tại chứng minh điều đó sắp xảy ra.",
    "tag": "Dự định tương lai",
    "examples": [
      {
        "text": "I am going to visit my grandparents in London this weekend.",
        "translation": "Tôi dự định sẽ đi thăm ông bà ở Luân Đôn vào cuối tuần này.",
        "situation": "Chia sẻ kế hoạch cuối tuần"
      },
      {
        "text": "Look at those dark clouds! It is going to rain soon.",
        "translation": "Nhìn những đám mây đen kìa! Trời sắp mưa rồi.",
        "situation": "Dự đoán có căn cứ"
      },
      {
        "text": "What are you going to do after graduating from college?",
        "translation": "Bạn dự định sẽ làm gì sau khi tốt nghiệp đại học?",
        "situation": "Hỏi định hướng tương lai"
      }
    ]
  },
  {
    "id": "en-pat-006",
    "language": "en",
    "level": "A1",
    "title": "Muốn ai đó làm gì",
    "formula": "Want someone to + V (bare)",
    "category": "Giao tiếp hằng ngày",
    "explanation": "Cấu trúc thông dụng diễn đạt mong muốn người khác thực hiện một hành động cụ thể.",
    "tag": "Yêu cầu hành động",
    "examples": [
      {
        "text": "My parents want me to practice English speaking every single day.",
        "translation": "Bố mẹ muốn tôi luyện nói tiếng Anh mỗi ngày.",
        "situation": "Nói về kỳ vọng gia đình"
      },
      {
        "text": "Do you want me to call a taxi for you right now?",
        "translation": "Bạn có muốn tôi gọi giúp một chiếc taxi cho bạn ngay bây giờ không?",
        "situation": "Đề nghị giúp đỡ"
      }
    ]
  },
  {
    "id": "en-pat-007",
    "language": "en",
    "level": "A1",
    "title": "Hỏi giá cả & Chi phí mua sắm",
    "formula": "How much is / are + Danh từ? || How much does it cost to V?",
    "category": "Mua sắm & Giá cả",
    "explanation": "Mẫu câu cốt lõi không thể thiếu khi mua hàng, hỏi giá dịch vụ hoặc chi phí sinh hoạt.",
    "tag": "Hỏi giá tiền",
    "examples": [
      {
        "text": "How much is this leather jacket on the rack?",
        "translation": "Chiếc áo khoác da trên giá này có giá bao nhiêu vậy?",
        "situation": "Mua sắm tại cửa hàng thời trang"
      },
      {
        "text": "How much does it cost to rent an apartment in this city center?",
        "translation": "Mất bao nhiêu tiền để thuê một căn hộ ở trung tâm thành phố này?",
        "situation": "Tìm kiếm chỗ ở"
      }
    ]
  },
  {
    "id": "en-pat-008",
    "language": "en",
    "level": "A1",
    "title": "Chào hỏi làm quen & Hỏi thăm sức khỏe",
    "formula": "How have you been? / Nice to meet you!",
    "category": "Chào hỏi & Xã giao",
    "explanation": "Mẫu câu tự nhiên dùng khi gặp lại bạn bè sau một thời gian hoặc khi lần đầu làm quen đối tác.",
    "tag": "Xã giao căn bản",
    "examples": [
      {
        "text": "It has been ages! How have you been lately?",
        "translation": "Lâu lắm rồi mới gặp! Dạo này bạn thế nào rồi?",
        "situation": "Gặp lại bạn cũ"
      },
      {
        "text": "It is a real pleasure to finally meet you in person.",
        "translation": "Thật vinh hạnh khi cuối cùng cũng được gặp trực tiếp bạn.",
        "situation": "Gặp đối tác lần đầu"
      }
    ]
  },
  {
    "id": "en-pat-009",
    "language": "en",
    "level": "A2",
    "title": "Đưa ra lời khuyên & Đề xuất hành động",
    "formula": "Why don't we / you + V (bare) ...?",
    "category": "Đề xuất & Thảo luận",
    "explanation": "Mẫu câu tự nhiên, gần gũi dùng khi muốn rủ rê, gợi ý ý tưởng hoặc khuyên ai đó làm điều gì một cách nhẹ nhàng.",
    "tag": "Gợi ý nhẹ nhàng",
    "examples": [
      {
        "text": "Why don't we take a short break and grab some fresh coffee?",
        "translation": "Sao chúng ta không nghỉ giải lao một chút rồi đi lấy chút cà phê tươi nhỉ?",
        "situation": "Đề xuất nghỉ giữa giờ làm việc"
      },
      {
        "text": "Why don't you ask the teacher for advice on this grammar point?",
        "translation": "Sao bạn không hỏi xin lời khuyên của giáo viên về điểm ngữ pháp này?",
        "situation": "Khuyên bạn bè học tập"
      },
      {
        "text": "Why don't we invite Sarah to join our study group?",
        "translation": "Sao chúng ta không rủ Sarah tham gia nhóm học tập của mình nhỉ?",
        "situation": "Rủ bạn cùng học"
      }
    ]
  },
  {
    "id": "en-pat-010",
    "language": "en",
    "level": "A2",
    "title": "Nhờ vả & Yêu cầu hết sức lịch sự",
    "formula": "Would you mind + V-ing ...? / Would you mind if I + V (past) ...?",
    "category": "Yêu cầu & Lịch thiệp",
    "explanation": "Mẫu câu thể hiện phép lịch sự cao trong tiếng Anh. Lưu ý trả lời \"No, not at all\" (Không phiền gì đâu) khi bạn đồng ý giúp.",
    "tag": "Phép tắc lịch sự",
    "examples": [
      {
        "text": "Would you mind opening the window for some fresh air?",
        "translation": "Bạn có phiền mở giúp tôi cánh cửa sổ để đón chút không khí trong lành không?",
        "situation": "Nhờ vả trong phòng kín/văn phòng"
      },
      {
        "text": "Would you mind if I borrowed your dictionary for a minute?",
        "translation": "Bạn có phiền nếu tôi mượn cuốn từ điển của bạn một phút không?",
        "situation": "Hỏi mượn đồ dùng của đồng nghiệp"
      },
      {
        "text": "Would you mind checking my pronunciation in this sentence?",
        "translation": "Bạn có phiền kiểm tra giúp tôi cách phát âm câu này không?",
        "situation": "Nhờ giáo viên chỉnh âm"
      }
    ]
  },
  {
    "id": "en-pat-011",
    "language": "en",
    "level": "A2",
    "title": "Hỏi về trải nghiệm trong đời",
    "formula": "Have you ever + V (past participle) ...?",
    "category": "Trải nghiệm & Quá khứ",
    "explanation": "Dùng thì Hiện tại hoàn thành để hỏi ai đó đã từng trải qua một việc gì trong đời hay chưa.",
    "tag": "Kinh nghiệm sống",
    "examples": [
      {
        "text": "Have you ever traveled to an English-speaking country?",
        "translation": "Bạn đã từng đi du lịch tới một quốc gia nói tiếng Anh bao giờ chưa?",
        "situation": "Trò chuyện về du lịch"
      },
      {
        "text": "Have you ever tried traditional Chinese Dim Sum in Shanghai?",
        "translation": "Bạn đã từng thưởng thức món Điểm tâm truyền thống Trung Hoa ở Thượng Hải chưa?",
        "situation": "Chia sẻ về ẩm thực"
      }
    ]
  },
  {
    "id": "en-pat-012",
    "language": "en",
    "level": "A2",
    "title": "Cấu trúc so sánh bằng nhau",
    "formula": "As + Tính từ / Trạng từ + as",
    "category": "So sánh & Đánh giá",
    "explanation": "Dùng khi muốn so sánh hai đối tượng có cùng phẩm chất, đặc tính hoặc mức độ tương đương nhau.",
    "tag": "So sánh ngang bằng",
    "examples": [
      {
        "text": "This smartphone is not as expensive as the one in the catalog.",
        "translation": "Chiếc điện thoại thông minh này không đắt bằng chiếc trong danh mục.",
        "situation": "So sánh giá sản phẩm"
      },
      {
        "text": "He speaks English as fluently as a native speaker.",
        "translation": "Anh ấy nói tiếng Anh lưu loát như một người bản xứ thực thụ.",
        "situation": "Khen ngợi trình độ ngoại ngữ"
      }
    ]
  },
  {
    "id": "en-pat-013",
    "language": "en",
    "level": "A2",
    "title": "Quá đến nỗi không thể làm gì",
    "formula": "Too + Tính từ + (for someone) + to V",
    "category": "Khả năng & Giới hạn",
    "explanation": "Cấu trúc mang ý nghĩa phủ định tự nhiên: Một đặc tính quá lớn dẫn tới việc không thể thực hiện hành động.",
    "tag": "Quá mức cho phép",
    "examples": [
      {
        "text": "This soup is too hot for the little boy to eat right away.",
        "translation": "Món súp này quá nóng để cậu bé có thể ăn ngay được.",
        "situation": "Nhắc nhở bữa ăn"
      },
      {
        "text": "The grammar explanation was too complex for beginners to understand.",
        "translation": "Phần giải thích ngữ pháp quá phức tạp để người mới học có thể hiểu được.",
        "situation": "Đánh giá tài liệu học"
      }
    ]
  },
  {
    "id": "en-pat-014",
    "language": "en",
    "level": "A2",
    "title": "Đủ điều kiện để thực hiện hành động",
    "formula": "Tính từ + enough + (for someone) + to V",
    "category": "Khả năng & Giới hạn",
    "explanation": "Lưu ý tính từ luôn đứng TRƯỚC \"enough\", ngược lại danh từ đứng SAU \"enough\" (enough money, enough time).",
    "tag": "Đủ điều kiện",
    "examples": [
      {
        "text": "She is confident enough to deliver a presentation in English.",
        "translation": "Cô ấy đủ tự tin để thuyết trình hoàn toàn bằng tiếng Anh.",
        "situation": "Đánh giá năng lực thuyết trình"
      },
      {
        "text": "Do we have enough time to review all these vocabulary flashcards?",
        "translation": "Chúng ta có đủ thời gian để ôn lại hết số thẻ flashcard từ vựng này không?",
        "situation": "Kế hoạch học tập"
      }
    ]
  },
  {
    "id": "en-pat-015",
    "language": "en",
    "level": "A2",
    "title": "Hỏi ý kiến & Thăm dò ý tưởng",
    "formula": "How about / What about + V-ing / Noun ...?",
    "category": "Đề xuất & Thảo luận",
    "explanation": "Cách diễn đạt cực kỳ linh hoạt trong đàm thoại để gợi mở một phương án mới hoặc hỏi thăm tình hình.",
    "tag": "Thăm dò ý kiến",
    "examples": [
      {
        "text": "How about having Italian pizza for dinner tonight?",
        "translation": "Tối nay chúng ta ăn bánh pizza Ý thì sao nhỉ?",
        "situation": "Gợi ý món ăn tối"
      },
      {
        "text": "What about organizing an online vocabulary competition next Friday?",
        "translation": "Thế còn việc tổ chức một cuộc thi từ vựng trực tuyến vào thứ Sáu tới thì sao?",
        "situation": "Lên kế hoạch hoạt động nhóm"
      }
    ]
  },
  {
    "id": "en-pat-016",
    "language": "en",
    "level": "A2",
    "title": "Bày tỏ sự đồng tình",
    "formula": "So + Trợ động từ + S (Đồng tình khẳng định) || Neither + Trợ động từ + S (Đồng tình phủ định)",
    "category": "Giao tiếp hằng ngày",
    "explanation": "Dùng để biểu thị \"tôi cũng vậy\" một cách tự nhiên và chuẩn văn phạm quốc tế.",
    "tag": "Đồng tình ngắn gọn",
    "examples": [
      {
        "text": "I love learning foreign languages with flashcards. - So do I!",
        "translation": "Tôi rất thích học ngoại ngữ bằng thẻ flashcard. - Tôi cũng vậy!",
        "situation": "Đồng điệu sở thích học tập"
      },
      {
        "text": "I have never failed an international vocabulary exam. - Neither have I!",
        "translation": "Tôi chưa từng trượt kỳ thi từ vựng quốc tế nào. - Tôi cũng vậy!",
        "situation": "Chia sẻ thành tích"
      }
    ]
  },
  {
    "id": "en-pat-017",
    "language": "en",
    "level": "B1",
    "title": "Biểu thị thói quen trong quá khứ",
    "formula": "Used to + V vs. Be / Get used to + V-ing",
    "category": "Thói quen & Lối sống",
    "explanation": "\"Used to + V\" nghĩa là từng có thói quen trong quá khứ nhưng nay đã bỏ. Còn \"Be used to + V-ing\" nghĩa là đã quen với việc gì ở hiện tại.",
    "tag": "Ngữ pháp phân biệt",
    "examples": [
      {
        "text": "I used to wake up late on weekends, but now I exercise at 6 AM.",
        "translation": "Tôi từng có thói quen dậy muộn vào cuối tuần, nhưng giờ tôi tập thể dục lúc 6 giờ sáng.",
        "situation": "So sánh thói quen xưa và nay"
      },
      {
        "text": "She is completely used to working under high pressure in international teams.",
        "translation": "Cô ấy đã hoàn toàn quen với việc làm việc dưới áp lực cao trong các đội ngũ quốc tế.",
        "situation": "Nói về khả năng thích nghi công việc"
      },
      {
        "text": "You will quickly get used to pronouncing these complex IPA vowels.",
        "translation": "Bạn sẽ nhanh chóng quen với việc phát âm những nguyên âm IPA phức tạp này thôi.",
        "situation": "Động viên người học phát âm"
      }
    ]
  },
  {
    "id": "en-pat-018",
    "language": "en",
    "level": "B1",
    "title": "Diễn đạt mục đích hành động",
    "formula": "In order to / So as to + V || So that / In order that + Mệnh đề",
    "category": "Mục đích & Nguyên nhân",
    "explanation": "Dùng để nêu rõ mục đích của một hành động. \"In order that / So that\" theo sau là mệnh đề đầy đủ có chủ ngữ và trợ động từ (can, could, may, will).",
    "tag": "Nêu mục đích",
    "examples": [
      {
        "text": "We set off early in order to avoid the morning traffic jam.",
        "translation": "Chúng tôi khởi hành từ sớm để tránh cảnh kẹt xe vào buổi sáng.",
        "situation": "Giải thích lý do đi sớm"
      },
      {
        "text": "He studies English vocabulary every day so that he can pass the IELTS exam with flying colors.",
        "translation": "Anh ấy học từ vựng tiếng Anh mỗi ngày để có thể đỗ kỳ thi IELTS với điểm số rực rỡ.",
        "situation": "Mục tiêu học thuật"
      },
      {
        "text": "I took detailed notes so as not to forget the teacher's instructions.",
        "translation": "Tôi đã ghi chép cẩn thận để không quên lời căn dặn của giáo viên.",
        "situation": "Ghi chú học tập"
      }
    ]
  },
  {
    "id": "en-pat-019",
    "language": "en",
    "level": "B1",
    "title": "Câu điều kiện loại 2 (Giả định trái thực tế hiện tại)",
    "formula": "If + S + V (past simple / were), S + would / could + V (bare)",
    "category": "Giả định & Ước muốn",
    "explanation": "Dùng để diễn tả một điều kiện tưởng tượng không có thật ở hiện tại. Động từ \"to be\" thường dùng \"were\" cho tất cả các ngôi trong văn phong chuẩn.",
    "tag": "Điều kiện loại 2",
    "examples": [
      {
        "text": "If I had more free time, I would master both English and Chinese.",
        "translation": "Nếu tôi có nhiều thời gian rảnh hơn, tôi sẽ thành thạo cả tiếng Anh lẫn tiếng Trung.",
        "situation": "Ước muốn học tập"
      },
      {
        "text": "If I were in your shoes, I would accept that international job offer immediately.",
        "translation": "Nếu tôi ở vào vị trí của bạn, tôi sẽ nhận lời mời làm việc quốc tế đó ngay lập tức.",
        "situation": "Đưa ra lời khuyên chân thành"
      }
    ]
  },
  {
    "id": "en-pat-020",
    "language": "en",
    "level": "B1",
    "title": "Thích cái này hơn cái kia",
    "formula": "Prefer + Noun / V-ing + TO + Noun / V-ing || Would rather + V (bare) + THAN + V (bare)",
    "category": "Sở thích & Lựa chọn",
    "explanation": "Lưu ý với \"prefer\" ta dùng giới từ \"to\", còn với \"would rather\" ta dùng liên từ \"than\".",
    "tag": "So sánh sở thích",
    "examples": [
      {
        "text": "I prefer learning vocabulary in context to memorizing dry word lists.",
        "translation": "Tôi thích học từ vựng trong ngữ cảnh hơn là học vẹt danh sách từ khô khan.",
        "situation": "Phương pháp học tập"
      },
      {
        "text": "I would rather stay home and read a book than go out to a noisy party.",
        "translation": "Tôi thà ở nhà đọc sách còn hơn là đi đến một bữa tiệc ồn ào.",
        "situation": "Bày tỏ lối sống"
      }
    ]
  },
  {
    "id": "en-pat-021",
    "language": "en",
    "level": "B1",
    "title": "Háo hức mong đợi điều gì",
    "formula": "Look forward to + V-ing / Noun",
    "category": "Cảm xúc & Thư tín",
    "explanation": "Giới từ \"to\" ở đây là giới từ, do đó động từ theo sau BẮT BUỘC phải ở dạng V-ing. Rất phổ biến ở cuối email hoặc thư từ.",
    "tag": "Mong đợi tha thiết",
    "examples": [
      {
        "text": "I am really looking forward to hearing from you soon.",
        "translation": "Tôi rất mong sớm nhận được hồi âm từ bạn.",
        "situation": "Kết thúc email trang trọng"
      },
      {
        "text": "Our entire team is looking forward to collaborating on this new project.",
        "translation": "Toàn bộ đội ngũ chúng tôi rất mong chờ được hợp tác trong dự án mới này.",
        "situation": "Hợp tác công việc"
      }
    ]
  },
  {
    "id": "en-pat-022",
    "language": "en",
    "level": "B1",
    "title": "Đã đến lúc cần phải làm gì",
    "formula": "It is high time / about time + S + V (past simple)",
    "category": "Nhắc nhở & Thúc giục",
    "explanation": "Cấu trúc giả định thúc giục: Đã đến lúc ai đó nên bắt đầu hành động một cách khẩn trương (động từ lùi về thì quá khứ).",
    "tag": "Thúc giục hành động",
    "examples": [
      {
        "text": "It is high time we began preparing seriously for the upcoming international certification.",
        "translation": "Đã đến lúc chúng ta phải bắt đầu ôn tập nghiêm túc cho kỳ thi chứng chỉ quốc tế sắp tới rồi.",
        "situation": "Kêu gọi tinh thần học tập"
      },
      {
        "text": "It is about time you modernized your foreign language learning methods.",
        "translation": "Đã đến lúc bạn nên hiện đại hóa phương pháp học ngoại ngữ của mình rồi.",
        "situation": "Gợi ý đổi mới"
      }
    ]
  },
  {
    "id": "en-pat-023",
    "language": "en",
    "level": "B1",
    "title": "Càng... thì càng... (So sánh kép)",
    "formula": "The + so sánh hơn..., the + so sánh hơn...",
    "category": "Tăng tiến mức độ",
    "explanation": "Mô tả hai vế biến đổi phụ thuộc lẫn nhau: Sự gia tăng ở vế 1 kéo theo sự gia tăng tương ứng ở vế 2.",
    "tag": "So sánh kép chuẩn",
    "examples": [
      {
        "text": "The more vocabulary you acquire, the more effortlessly you express yourself.",
        "translation": "Bạn càng tích lũy nhiều từ vựng, bạn càng diễn đạt bản thân một cách dễ dàng bấy nhiêu.",
        "situation": "Quy luật học ngoại ngữ"
      },
      {
        "text": "The earlier you start, the better results you will achieve.",
        "translation": "Bạn bắt đầu càng sớm, kết quả bạn đạt được sẽ càng tốt hơn.",
        "situation": "Động viên hành động"
      }
    ]
  },
  {
    "id": "en-pat-024",
    "language": "en",
    "level": "B1",
    "title": "Đề xuất ai đó nên làm gì",
    "formula": "Suggest + V-ing || Suggest that + S + (should) + V (bare)",
    "category": "Đề xuất & Thảo luận",
    "explanation": "Mẫu câu bàng thái cách (Subjunctive): Mệnh đề sau \"suggest that\" động từ luôn ở dạng nguyên mẫu không \"to\".",
    "tag": "Đề xuất ý kiến",
    "examples": [
      {
        "text": "I suggest practicing pronunciation with native audio recordings every morning.",
        "translation": "Tôi đề xuất luyện phát âm theo các bản thu âm bản xứ vào mỗi buổi sáng.",
        "situation": "Gợi ý phương pháp"
      },
      {
        "text": "The instructor suggested that he review all irregular verbs before the test.",
        "translation": "Giảng viên đề nghị anh ấy ôn lại toàn bộ động từ bất quy tắc trước giờ thi.",
        "situation": "Lời khuyên của giáo viên"
      }
    ]
  },
  {
    "id": "en-pat-025",
    "language": "en",
    "level": "B2",
    "title": "Nhấn mạnh hai vế song song (Đảo ngữ)",
    "formula": "Not only + [Đảo ngữ trợ động từ + S + V] ... but also ...",
    "category": "Lập luận & Hùng biện",
    "explanation": "Cấu trúc đảo ngữ nhấn mạnh trình độ cao (B2/C1). Vế trước đảo ngữ trợ động từ lên trước chủ ngữ khi \"Not only\" đứng đầu câu.",
    "tag": "Cấu trúc đảo ngữ",
    "examples": [
      {
        "text": "Not only did she win first prize in the competition, but she also inspired everyone in the audience.",
        "translation": "Cô ấy không những đoạt giải nhất cuộc thi mà còn truyền cảm hứng mạnh mẽ tới mọi khán giả.",
        "situation": "Khen ngợi diễn giả/thí sinh"
      },
      {
        "text": "Not only does regular reading enrich your vocabulary, but it also sharpens your critical thinking skills.",
        "translation": "Đọc sách thường xuyên không những làm phong phú vốn từ vựng mà còn tôi luyện tư duy phản biện sắc bén.",
        "situation": "Luận điểm lợi ích của việc đọc"
      },
      {
        "text": "Not only is he proficient in English, but he is also fluent in Mandarin Chinese.",
        "translation": "Anh ấy không chỉ thành thạo tiếng Anh mà còn lưu loát cả tiếng Hán.",
        "situation": "Đánh giá hồ sơ ứng viên"
      }
    ]
  },
  {
    "id": "en-pat-026",
    "language": "en",
    "level": "B2",
    "title": "Vừa mới... thì đã... (Đảo ngữ thời gian tức thì)",
    "formula": "No sooner had + S + V (past participle) ... than + S + V (past simple)",
    "category": "Hành động nối tiếp tức thì",
    "explanation": "Diễn tả một hành động vừa mới kết thúc trong quá khứ thì một hành động khác ngay lập tức xảy ra. Đảo ngữ \"had + S + V3\" đứng đầu.",
    "tag": "Đảo ngữ No sooner",
    "examples": [
      {
        "text": "No sooner had the plane landed than the passengers turned on their mobile devices.",
        "translation": "Chiếc máy bay vừa mới hạ cánh thì các hành khách đã lập tức bật thiết bị di động.",
        "situation": "Miêu tả sự việc sân bay"
      },
      {
        "text": "No sooner had he completed his speech than the entire auditorium erupted into applause.",
        "translation": "Anh ấy vừa kết thúc bài phát biểu thì cả hội trường đã vang dội tiếng vỗ tay tán thưởng.",
        "situation": "Không khí hội trường"
      }
    ]
  },
  {
    "id": "en-pat-027",
    "language": "en",
    "level": "B2",
    "title": "Nếu không nhờ có... (Đảo ngữ điều kiện loại 3)",
    "formula": "Had it not been for + Noun / V-ing, S + would have + V3",
    "category": "Giả định & Tri ân",
    "explanation": "Cấu trúc học thuật cao cấp tương đương với \"If it had not been for\" hoặc \"Without\". Dùng khi tri ân sự trợ giúp hoặc phân tích nguyên nhân sự cố.",
    "tag": "Tri ân & Giả định cao cấp",
    "examples": [
      {
        "text": "Had it not been for your constant encouragement, I would never have persevered through this rigorous training.",
        "translation": "Nếu không nhờ có sự khích lệ liên tục của bạn, tôi đã không bao giờ có thể kiên trì vượt qua khóa đào tạo khắc nghiệt này.",
        "situation": "Lời cảm ơn chân thành"
      },
      {
        "text": "Had it not been for the timely financial intervention, the startup would have gone bankrupt.",
        "translation": "Nếu không nhờ có sự can thiệp tài chính kịp thời, công ty khởi nghiệp đã bị phá sản.",
        "situation": "Phân tích tình huống kinh doanh"
      }
    ]
  },
  {
    "id": "en-pat-028",
    "language": "en",
    "level": "B2",
    "title": "Đảo ngữ với cấu trúc So... that / Such... that",
    "formula": "So + Adj + be + S + that ... || Such + be + Noun + that ...",
    "category": "Nhấn mạnh mức độ",
    "explanation": "Đưa \"So + tính từ\" lên đầu câu để tạo hiệu ứng kịch tính và thu hút sự chú ý trong văn phong học thuật hoặc thuyết trình.",
    "tag": "Đảo ngữ kịch tính",
    "examples": [
      {
        "text": "So captivating was her lecture that nobody noticed two hours had slipped away.",
        "translation": "Bài giảng của cô ấy lôi cuốn đến mức không ai nhận ra rằng hai tiếng đồng hồ đã trôi qua.",
        "situation": "Ấn tượng về buổi học"
      },
      {
        "text": "Such was the intensity of the storm that all international flights had to be canceled.",
        "translation": "Cơn bão dữ dội đến mức toàn bộ các chuyến bay quốc tế đều phải bị hủy bỏ.",
        "situation": "Báo cáo thời tiết khẩn cấp"
      }
    ]
  },
  {
    "id": "en-pat-029",
    "language": "en",
    "level": "B2",
    "title": "Thể sai khiến / Nhờ ai làm việc gì",
    "formula": "Have someone do something || Get someone to do something || Have something done",
    "category": "Công việc & Dịch vụ",
    "explanation": "Dùng khi bạn không tự làm một hành động mà nhờ vả, thuê hoặc yêu cầu người khác làm.",
    "tag": "Thể sai khiến",
    "examples": [
      {
        "text": "I need to have my international visa documents translated into English this afternoon.",
        "translation": "Chiều nay tôi cần nhờ dịch các giấy tờ thị thực quốc tế của mình sang tiếng Anh.",
        "situation": "Thủ tục visa du học"
      },
      {
        "text": "The manager had the technical team overhaul the entire database over the weekend.",
        "translation": "Người quản lý đã yêu cầu đội ngũ kỹ thuật đại tu lại toàn bộ cơ sở dữ liệu vào cuối tuần.",
        "situation": "Chỉ đạo công việc"
      }
    ]
  },
  {
    "id": "en-pat-030",
    "language": "en",
    "level": "B2",
    "title": "Dù cho... (Tương phản nhượng bộ nâng cao)",
    "formula": "Despite / In spite of + Noun / V-ing || Although / Even though + Mệnh đề",
    "category": "Lập luận tương phản",
    "explanation": "Lưu ý \"Despite / In spite of\" tuyệt đối không đi với mệnh đề (trừ khi dùng \"the fact that\").",
    "tag": "Nhượng bộ tương phản",
    "examples": [
      {
        "text": "Despite encountering immense obstacles, the research team successfully completed the clinical trial.",
        "translation": "Bất chấp việc gặp phải những trở ngại to lớn, đội ngũ nghiên cứu đã hoàn thành xuất sắc thử nghiệm lâm sàng.",
        "situation": "Báo cáo thành quả nghiên cứu"
      },
      {
        "text": "In spite of having studied for only six months, he achieved an outstanding score on the HSK exam.",
        "translation": "Mặc dù mới chỉ học trong sáu tháng, cậu ấy đã đạt điểm số xuất sắc trong kỳ thi HSK.",
        "situation": "Thành tích học tập"
      }
    ]
  },
  {
    "id": "en-pat-031",
    "language": "en",
    "level": "C1",
    "title": "Đảo ngữ điều kiện hạn định độc tôn",
    "formula": "Only by + V-ing + Trợ động từ + S + V ...",
    "category": "Triết lý & Giải pháp",
    "explanation": "Cấu trúc lập luận mẫu mực của band 7.5+ IELTS và văn phong chính luận: Nhấn mạnh đây là phương thức duy nhất để đạt được kết quả.",
    "tag": "Đảo ngữ Only by",
    "examples": [
      {
        "text": "Only by immersing yourself in genuine communication can you develop authentic conversational instincts.",
        "translation": "Chỉ bằng cách đắm mình trong giao tiếp thực tế bạn mới có thể phát triển phản xạ giao tiếp tự nhiên.",
        "situation": "Lời khuyên phương pháp luận"
      },
      {
        "text": "Only by practicing pronunciation daily can you attain native-like fluency.",
        "translation": "Chỉ bằng cách luyện phát âm mỗi ngày bạn mới có thể đạt được độ lưu loát như người bản xứ.",
        "situation": "Lời khuyên học ngoại ngữ chuyên sâu"
      },
      {
        "text": "Only by embracing sustainable technologies can humanity curb irreversible climate change.",
        "translation": "Chỉ bằng cách ứng dụng các công nghệ bền vững nhân loại mới có thể kiềm chế biến đổi khí hậu không thể đảo ngược.",
        "situation": "Luận đề hội thảo quốc tế"
      }
    ]
  },
  {
    "id": "en-pat-032",
    "language": "en",
    "level": "C1",
    "title": "Tuyệt đối trong bất kỳ hoàn cảnh nào cũng không",
    "formula": "Under no circumstances + [Trợ động từ + S + V] ...",
    "category": "Quy tắc & Cam kết",
    "explanation": "Cấu trúc đảo ngữ mang sắc thái nghiêm lệnh cao nhất trong tiếng Anh pháp lý và văn thư ngoại giao.",
    "tag": "Nghiêm lệnh tối cao",
    "examples": [
      {
        "text": "Under no circumstances should sensitive student data be disclosed to unauthorized third parties.",
        "translation": "Trong bất kỳ hoàn cảnh nào cũng tuyệt đối không được tiết lộ dữ liệu nhạy cảm của học viên cho bên thứ ba không có thẩm quyền.",
        "situation": "Chính sách bảo mật dữ liệu"
      },
      {
        "text": "Under no circumstances will the committee compromise on the rigorous quality standards.",
        "translation": "Trong bất kỳ hoàn cảnh nào ủy ban cũng tuyệt đối không thỏa hiệp về các tiêu chuẩn chất lượng khắt khe.",
        "situation": "Cam kết chất lượng"
      }
    ]
  },
  {
    "id": "en-pat-033",
    "language": "en",
    "level": "C1",
    "title": "Đảo ngữ điều kiện trang trọng thay cho If",
    "formula": "Should you require / Were it not for / Had you informed us ...",
    "category": "Thư tín thương mại C1",
    "explanation": "Loại bỏ từ \"If\" và đảo trợ động từ (Should / Were / Had) lên đầu câu để tạo phong thái vô cùng lịch thiệp và chuyên nghiệp.",
    "tag": "Thư tín chuyên nghiệp C1",
    "examples": [
      {
        "text": "Should you require any further clarification regarding this syllabus, please do not hesitate to contact our office.",
        "translation": "Nếu quý vị cần thêm bất kỳ sự giải thích nào về giáo trình này, xin đừng ngần ngại liên hệ với văn phòng chúng tôi.",
        "situation": "Thư tín trao đổi học vụ"
      },
      {
        "text": "Were it not for your invaluable mentorship, our academic publication would not have succeeded.",
        "translation": "Nếu không nhờ có sự hướng dẫn vô giá của thầy, bài báo khoa học của chúng em đã không thể thành công.",
        "situation": "Tri ân giáo sư hướng dẫn"
      }
    ]
  },
  {
    "id": "en-pat-034",
    "language": "en",
    "level": "C1",
    "title": "Căn cứ vào / Xét thấy thực tế rằng...",
    "formula": "Given that + Mệnh đề || In light of + Cụm danh từ",
    "category": "Phân tích & Lập luận C1",
    "explanation": "Thay thế các từ đơn giản như \"Because\" hay \"Since\" bằng cách diễn đạt học thuật chuẩn Cambridge / Oxford.",
    "tag": "Lập luận học thuật",
    "examples": [
      {
        "text": "Given that foreign language acquisition requires continuous repetition, our spaced-rehearsal system is indispensable.",
        "translation": "Xét thấy việc tiếp thu ngoại ngữ đòi hỏi sự lặp lại liên tục, hệ thống ôn tập ngắt quãng của chúng tôi là vô cùng thiết yếu.",
        "situation": "Luận cứ phương pháp giáo dục"
      },
      {
        "text": "In light of recent archaeological findings, scholars have had to reassess the origins of ancient civilizations.",
        "translation": "Căn cứ vào những phát hiện khảo cổ học gần đây, các học giả đã phải đánh giá lại nguồn gốc của các nền văn minh cổ đại.",
        "situation": "Thảo luận học thuật lịch sử"
      }
    ]
  },
  {
    "id": "en-pat-035",
    "language": "en",
    "level": "C1",
    "title": "Dù cho có muốn đến mấy chăng nữa...",
    "formula": "Much as + S + would like to / V ..., S + still ...",
    "category": "Biểu cảm & Nhượng bộ tinh tế",
    "explanation": "Cấu trúc thể hiện sự nuối tiếc hoặc nhượng bộ sâu sắc trong văn chương và đàm phán cấp cao.",
    "tag": "Nhượng bộ tinh tế C1",
    "examples": [
      {
        "text": "Much as I would like to accept your prestigious invitation, prior commitments preclude my attendance.",
        "translation": "Dù tôi rất muốn nhận lời mời danh giá của quý vị, các cam kết từ trước buộc tôi không thể tham dự được.",
        "situation": "Thư từ chối lời mời lịch thiệp"
      },
      {
        "text": "Much as they debated the intricate economic proposal, no viable consensus was reached.",
        "translation": "Dù họ đã tranh luận rất nhiều về đề xuất kinh tế phức tạp đó, vẫn không đạt được sự đồng thuận khả thi nào.",
        "situation": "Tường thuật đàm phán"
      }
    ]
  },
  {
    "id": "zh-pat-001",
    "language": "zh",
    "level": "HSK1",
    "title": "Cấu trúc biểu thị sự tồn tại & vị trí",
    "formula": "Chủ ngữ + 在 (zài) + Địa điểm + Động từ",
    "category": "Vị trí & Nơi chốn",
    "explanation": "Khác với tiếng Việt (Tôi ăn cơm ở nhà), tiếng Hán luôn đặt cụm giới từ chỉ địa điểm \"在 + nơi chốn\" TRƯỚC động từ chính.",
    "tag": "Cấu trúc nền tảng",
    "examples": [
      {
        "text": "我在北京大学学习现代汉语。",
        "translation": "Tôi học tiếng Hán hiện đại ở Đại học Bắc Kinh.",
        "situation": "Giới thiệu bản thân và trường học",
        "pinyin": "wǒ zài běi jīng dà xué xué xí xiàn dài hàn yǔ 。"
      },
      {
        "text": "他们正在图书馆安静地看书。",
        "translation": "Họ đang yên tĩnh đọc sách ở trong thư viện.",
        "situation": "Miêu tả hành động đang diễn ra",
        "pinyin": "tā men zhèng zài tú shū guǎn ān jìng dì kàn shū 。"
      },
      {
        "text": "请问，您现在在家还是在办公室？",
        "translation": "Xin hỏi, hiện tại anh đang ở nhà hay ở văn phòng?",
        "situation": "Gọi điện thoại hỏi thăm",
        "pinyin": "qǐng wèn ， nín xiàn zài zài jiā hái shì zài bàn gōng shì ？"
      }
    ]
  },
  {
    "id": "zh-pat-002",
    "language": "zh",
    "level": "HSK1",
    "title": "Cấu trúc câu chữ 是 (Thị tự cú)",
    "formula": "A + 是 (shì) + B",
    "category": "Giới thiệu & Định danh",
    "explanation": "Dùng để khẳng định thân phận, quốc tịch, nghề nghiệp hoặc bản chất của người/sự vật.",
    "tag": "Câu chữ 是 cơ bản",
    "examples": [
      {
        "text": "我是越南人，我非常喜欢中国茶文化。",
        "translation": "Tôi là người Việt Nam, tôi rất yêu thích văn hóa trà Trung Quốc.",
        "situation": "Giới thiệu quốc tịch và sở thích",
        "pinyin": "wǒ shì yuè nán rén ， wǒ fēi cháng xǐ huan zhōng guó chá wén huà 。"
      },
      {
        "text": "王老师是我们学校最有经验的汉语老师。",
        "translation": "Thầy Vương là giáo viên tiếng Hán giàu kinh nghiệm nhất trường chúng tôi.",
        "situation": "Giới thiệu thầy cô giáo",
        "pinyin": "wáng lǎo shī shì wǒ men xué xiào zuì yǒu jīng yàn de hàn yǔ lǎo shī 。"
      },
      {
        "text": "这本书是我昨天刚买的英汉词典。",
        "translation": "Cuốn sách này là cuốn từ điển Anh-Hán tôi vừa mới mua hôm qua.",
        "situation": "Giới thiệu đồ vật",
        "pinyin": "zhè běn shū shì wǒ zuó tiān gāng mǎi de yīng hàn cí diǎn 。"
      }
    ]
  },
  {
    "id": "zh-pat-003",
    "language": "zh",
    "level": "HSK1",
    "title": "Cấu trúc câu chữ 有 (Hữu tự cú)",
    "formula": "Nơi chốn / Chủ ngữ + 有 (yǒu) + Đối tượng",
    "category": "Sở hữu & Tồn tại",
    "explanation": "Biểu thị sự sở hữu của chủ ngữ hoặc biểu thị sự tồn tại của sự vật ở một địa điểm cụ thể.",
    "tag": "Câu chữ 有",
    "examples": [
      {
        "text": "我们大学里有一个非常漂亮的花园。",
        "translation": "Trong trường đại học của chúng tôi có một khu vườn vô cùng xinh đẹp.",
        "situation": "Miêu tả khuôn viên trường học",
        "pinyin": "wǒ men dà xué lǐ yǒu yí gè fēi cháng piào liang de huā yuán 。"
      },
      {
        "text": "你有时间跟我一起练习普通话口语吗？",
        "translation": "Bạn có thời gian cùng tôi luyện khẩu ngữ tiếng Phổ thông không?",
        "situation": "Rủ bạn cùng học",
        "pinyin": "nǐ yǒu shí jiān gēn wǒ yì qǐ liàn xí pǔ tōng huà kǒu yǔ ma ？"
      },
      {
        "text": "桌子上有一台新电脑和三本生词书。",
        "translation": "Trên bàn có một chiếc máy vi tính mới và ba cuốn sách từ vựng.",
        "situation": "Miêu tả bàn học",
        "pinyin": "zhuō zi shàng yǒu yì tái xīn diàn nǎo hé sān běn shēng cí shū 。"
      }
    ]
  },
  {
    "id": "zh-pat-004",
    "language": "zh",
    "level": "HSK1",
    "title": "Cấu trúc hỏi phương thức & Cách thức",
    "formula": "怎么 (zěnme) + Động từ ...?",
    "category": "Hỏi han & Học tập",
    "explanation": "Dùng khi muốn hỏi cách thức thực hiện một hành động (làm thế nào, đi bằng cách nào, đọc ra sao).",
    "tag": "Hỏi cách làm",
    "examples": [
      {
        "text": "请问，这个汉字怎么读？",
        "translation": "Xin hỏi, chữ Hán này phát âm đọc như thế nào vậy?",
        "situation": "Hỏi thầy cô cách phát âm",
        "pinyin": "qǐng wèn ， zhè ge hàn zì zěn me dú ？"
      },
      {
        "text": "从这里去首都国际机场怎么走？",
        "translation": "Từ đây đi đến Sân bay Quốc tế Thủ đô đi như thế nào?",
        "situation": "Hỏi đường đi",
        "pinyin": "cóng zhè lǐ qù shǒu dū guó jì jī chǎng zěn me zǒu ？"
      },
      {
        "text": "这道数学题怎么做才能最快算出答案？",
        "translation": "Bài toán này làm thế nào mới có thể tính ra đáp án nhanh nhất?",
        "situation": "Trao đổi bài tập",
        "pinyin": "zhè dào shù xué tí zěn me zuò cái néng zuì kuài suàn chū dá àn ？"
      }
    ]
  },
  {
    "id": "zh-pat-005",
    "language": "zh",
    "level": "HSK1",
    "title": "Cấu trúc cảm thán khen ngợi hoặc phàn nàn",
    "formula": "太 (tài) + Tính từ + 了 (le) !",
    "category": "Cảm thán & Cảm xúc",
    "explanation": "Cấu trúc cảm thán siêu kinh điển trong khẩu ngữ hàng ngày để bày tỏ mức độ cực kỳ cao.",
    "tag": "Cảm thán 太...了",
    "examples": [
      {
        "text": "今天大家一起包的水饺太好吃了！",
        "translation": "Bánh sủi cảo hôm nay mọi người cùng gói ngon quá đi mất!",
        "situation": "Khen ngợi món ăn",
        "pinyin": "jīn tiān dà jiā yì qǐ bāo de shuǐ jiǎo tài hǎo chī le ！"
      },
      {
        "text": "这本书上的生词太丰富了，非常适合备考HSK。",
        "translation": "Từ vựng trong cuốn sách này phong phú quá, rất thích hợp để chuẩn bị thi HSK.",
        "situation": "Đánh giá tài liệu",
        "pinyin": "zhè běn shū shàng de shēng cí tài fēng fù le ， fēi cháng shì hé bèi kǎo H S K 。"
      },
      {
        "text": "今天外面的风太大了，多穿一点衣服吧。",
        "translation": "Hôm nay gió bên ngoài to quá rồi, mặc thêm chút áo ấm đi nhé.",
        "situation": "Nhắc nhở người thân",
        "pinyin": "jīn tiān wài miàn de fēng tài dà le ， duō chuān yì diǎn yī fu ba 。"
      }
    ]
  },
  {
    "id": "zh-pat-006",
    "language": "zh",
    "level": "HSK1",
    "title": "Cấu trúc cùng nhau làm việc gì",
    "formula": "和 / 跟 + Đối tượng + 一起 (yìqǐ) + Động từ",
    "category": "Hành động phối hợp",
    "explanation": "Dùng để diễn đạt hành động có sự đồng hành, phối hợp giữa hai hoặc nhiều người.",
    "tag": "Cùng nhau hành động",
    "examples": [
      {
        "text": "周末我想和朋友一起去故宫博物院参观。",
        "translation": "Cuối tuần tôi muốn cùng bạn bè đi tham quan Bảo tàng Cố Cung.",
        "situation": "Lên kế hoạch dạo chơi",
        "pinyin": "zhōu mò wǒ xiǎng hé péng yǒu yì qǐ qù gù gōng bó wù yuàn cān guān 。"
      },
      {
        "text": "留学生们每天都跟中国语伴一起练习听力。",
        "translation": "Các bạn lưu học sinh ngày nào cũng cùng bạn ghép đôi ngôn ngữ luyện nghe.",
        "situation": "Phương pháp học ngoại ngữ",
        "pinyin": "liú xué shēng men měi tiān dōu gēn zhōng guó yǔ bàn yì qǐ liàn xí tīng lì 。"
      }
    ]
  },
  {
    "id": "zh-pat-007",
    "language": "zh",
    "level": "HSK2",
    "title": "Cấu trúc so sánh hơn căn bản",
    "formula": "A + 比 (bǐ) + B + Tính từ / Cụm vị ngữ",
    "category": "So sánh mức độ",
    "explanation": "Cấu trúc so sánh hơn chuẩn trong tiếng Hán. Tuyệt đối không dùng phó từ \"很\" (rất) sau tính từ so sánh (Ví dụ: không nói \"A 比 B 很好\").",
    "tag": "So sánh chuẩn HSK",
    "examples": [
      {
        "text": "今天的天气比昨天暖和多了。",
        "translation": "Thời tiết hôm nay ấm áp hơn hôm qua nhiều.",
        "situation": "Nói về sự thay đổi thời tiết",
        "pinyin": "jīn tiān de tiān qì bǐ zuó tiān nuǎn huo duō le 。"
      },
      {
        "text": "坐高铁比坐公共汽车快得多。",
        "translation": "Đi đường sắt cao tốc nhanh hơn nhiều so với đi xe buýt.",
        "situation": "So sánh phương tiện di chuyển",
        "pinyin": "zuò gāo tiě bǐ zuò gōng gòng qì chē kuài dé duō 。"
      },
      {
        "text": "他写汉字写得比我工整漂亮。",
        "translation": "Anh ấy viết chữ Hán nắn nót và đẹp hơn tôi.",
        "situation": "Khen nét chữ bạn bè",
        "pinyin": "tā xiě hàn zì xiě dé bǐ wǒ gōng zhěng piào liang 。"
      }
    ]
  },
  {
    "id": "zh-pat-008",
    "language": "zh",
    "level": "HSK2",
    "title": "Biểu thị sự tăng tiến cấp số",
    "formula": "越……越…… (yuè ... yuè ...)",
    "category": "Tăng tiến mức độ",
    "explanation": "Biểu thị mức độ biến đổi theo sự tăng dần của điều kiện: \"Càng... thì càng...\". Rất hay dùng trong khẩu ngữ và đời sống.",
    "tag": "Càng... càng...",
    "examples": [
      {
        "text": "汉语发音越练越流利。",
        "translation": "Phát âm tiếng Hán càng luyện thì lại càng lưu loát.",
        "situation": "Kinh nghiệm học ngoại ngữ",
        "pinyin": "hàn yǔ fā yīn yuè liàn yuè liú lì 。"
      },
      {
        "text": "外面的雨越下越大了。",
        "translation": "Mưa bên ngoài càng lúc càng to rồi.",
        "situation": "Nhận xét thời tiết tức thời",
        "pinyin": "wài miàn de yǔ yuè xià yuè dà le 。"
      },
      {
        "text": "这道传统名菜越吃越香。",
        "translation": "Món ăn truyền thống nổi tiếng này càng ăn lại càng thấy thơm ngon.",
        "situation": "Thưởng thức ẩm thực",
        "pinyin": "zhè dào chuán tǒng míng cài yuè chī yuè xiāng 。"
      }
    ]
  },
  {
    "id": "zh-pat-009",
    "language": "zh",
    "level": "HSK2",
    "title": "Cấu trúc nhượng bộ tương phản",
    "formula": "虽然……但是…… (suīrán ... dànshì ...)",
    "category": "Quan hệ logic tương phản",
    "explanation": "Cặp liên từ nối hai vế câu: \"Tuy rằng... nhưng mà...\", thừa nhận vế trước và chuyển ngoặt ở vế sau.",
    "tag": "Tuy... nhưng...",
    "examples": [
      {
        "text": "虽然学汉语很难，但是我觉得非常有趣。",
        "translation": "Tuy rằng học tiếng Hán rất khó, nhưng tôi cảm thấy vô cùng thú vị.",
        "situation": "Chia sẻ cảm nhận học tập",
        "pinyin": "suī rán xué hàn yǔ hěn nán ， dàn shì wǒ jué de fēi cháng yǒu qù 。"
      },
      {
        "text": "虽然外面下着大雪，但是教室里非常暖和。",
        "translation": "Tuy bên ngoài tuyết rơi lớn, nhưng trong phòng học lại rất ấm áp.",
        "situation": "Miêu tả không gian lớp học",
        "pinyin": "suī rán wài miàn xià zhe dà xuě ， dàn shì jiào shì lǐ fēi cháng nuǎn huo 。"
      }
    ]
  },
  {
    "id": "zh-pat-010",
    "language": "zh",
    "level": "HSK2",
    "title": "Cấu trúc nguyên nhân & Kết quả",
    "formula": "因为……所以…… (yīnwèi ... suǒyǐ ...)",
    "category": "Quan hệ nhân quả",
    "explanation": "Cặp liên từ diễn giải logic: \"Bởi vì... cho nên...\", vế trước nêu lý do, vế sau nêu hệ quả.",
    "tag": "Bởi vì... cho nên...",
    "examples": [
      {
        "text": "因为平时复习很认真，所以他轻松通过了考试。",
        "translation": "Bởi vì ngày thường ôn tập rất chăm chỉ, cho nên anh ấy đã nhẹ nhàng vượt qua kỳ thi.",
        "situation": "Lý giải kết quả học tập",
        "pinyin": "yīn wèi píng shí fù xí hěn rèn zhēn ， suǒ yǐ tā qīng sōng tōng guò le kǎo shì 。"
      },
      {
        "text": "因为路上发生交通拥堵，所以我迟到了十分钟。",
        "translation": "Bởi vì trên đường xảy ra ùn tắc giao thông, cho nên tôi đã đến muộn mười phút.",
        "situation": "Giải thích lý do muộn",
        "pinyin": "yīn wèi lù shang fā shēng jiāo tōng yōng dǔ ， suǒ yǐ wǒ chí dào le shí fēn zhōng 。"
      }
    ]
  },
  {
    "id": "zh-pat-011",
    "language": "zh",
    "level": "HSK2",
    "title": "Biểu thị sự việc sắp sửa xảy ra",
    "formula": "快要 / 就要……了 (kuàiyào / jiùyào ... le)",
    "category": "Thời gian & Tiến trình",
    "explanation": "Biểu thị một hành động hoặc trạng thái sắp sửa xảy ra trong chốc lát.",
    "tag": "Sắp sửa diễn ra",
    "examples": [
      {
        "text": "火车快要进站了，请大家带好随身行李。",
        "translation": "Tàu hỏa sắp vào ga rồi, xin mọi người hãy mang theo đầy đủ hành lý tùy thân.",
        "situation": "Thông báo trên tàu hỏa",
        "pinyin": "huǒ chē kuài yào jìn zhàn le ， qǐng dà jiā dài hǎo suí shēn xíng li 。"
      },
      {
        "text": "新年马上就要到了，祝你身体健康，万事如意！",
        "translation": "Năm mới sắp sửa đến rồi, chúc bạn dồi dào sức khỏe, vạn sự như ý!",
        "situation": "Lời chúc mừng năm mới",
        "pinyin": "xīn nián mǎ shàng jiù yào dào le ， zhù nǐ shēn tǐ jiàn kāng ， wàn shì rú yì ！"
      }
    ]
  },
  {
    "id": "zh-pat-012",
    "language": "zh",
    "level": "HSK2",
    "title": "Hứng thú hoặc có lợi ích đối với điều gì",
    "formula": "对……感兴趣 / 有帮助 (duì ... gǎnxìngqù / yǒu bāngzhù)",
    "category": "Sở thích & Tác động",
    "explanation": "Giới từ \"对\" dùng để chỉ đối tượng hướng tới: có hứng thú với việc gì, hoặc việc gì có ích cho ai.",
    "tag": "Hứng thú & Lợi ích",
    "examples": [
      {
        "text": "很多外国朋友都对中国京剧艺术很感兴趣。",
        "translation": "Rất nhiều người bạn nước ngoài đều rất có hứng thú với nghệ thuật Kinh kịch Trung Quốc.",
        "situation": "Văn hóa nghệ thuật",
        "pinyin": "hěn duō wài guó péng yǒu dōu duì zhōng guó jīng jù yì shù hěn gǎn xìng qù 。"
      },
      {
        "text": "每天坚持背诵二十个单词对提高成绩很有帮助。",
        "translation": "Mỗi ngày kiên trì học thuộc 20 từ vựng rất có ích cho việc nâng cao thành tích.",
        "situation": "Kinh nghiệm học tập",
        "pinyin": "měi tiān jiān chí bèi sòng èr shí gè dān cí duì tí gāo chéng jì hěn yǒu bāng zhù 。"
      }
    ]
  },
  {
    "id": "zh-pat-013",
    "language": "zh",
    "level": "HSK3",
    "title": "Cấu trúc song hành hai tính chất",
    "formula": "既……又…… (jì ... yòu ...)",
    "category": "Liên kết tính chất",
    "explanation": "Dùng để liên kết hai đặc điểm, tính chất hoặc trạng thái song song tồn tại: \"Vừa... lại vừa...\". Thường mang ý nghĩa khen ngợi hoặc bổ trợ.",
    "tag": "Vừa... vừa...",
    "examples": [
      {
        "text": "这家饭馆的菜肴既新鲜又实惠。",
        "translation": "Món ăn của quán này vừa tươi ngon lại vừa vừa túi tiền.",
        "situation": "Đánh giá nhà hàng ẩm thực",
        "pinyin": "zhè jiā fàn guǎn de cài yáo jì xīn xiān yòu shí huì 。"
      },
      {
        "text": "她做事情既认真又细心，大家都信任她。",
        "translation": "Cô ấy làm việc vừa nghiêm túc lại vừa chu đáo, ai cũng tin cậy cô ấy.",
        "situation": "Nhận xét về đồng nghiệp",
        "pinyin": "tā zuò shì qíng jì rèn zhēn yòu xì xīn ， dà jiā dōu xìn rèn tā 。"
      },
      {
        "text": "学好外语既能开阔眼界，又能增加就业优势。",
        "translation": "Học tốt ngoại ngữ vừa có thể mở rộng tầm mắt, vừa có thể gia tăng lợi thế việc làm.",
        "situation": "Lợi ích của việc học",
        "pinyin": "xué hǎo wài yǔ jì néng kāi kuò yǎn jiè ， yòu néng zēng jiā jiù yè yōu shì 。"
      }
    ]
  },
  {
    "id": "zh-pat-014",
    "language": "zh",
    "level": "HSK3",
    "title": "Cấu trúc câu chữ 把 (Bả tự cú cơ bản)",
    "formula": "Chủ ngữ + 把 (bǎ) + Tân ngữ + Động từ + Thành phần khác",
    "category": "Ngữ pháp HSK trọng tâm",
    "explanation": "Cấu trúc câu quan trọng bậc nhất trong tiếng Trung. Dùng khi muốn nhấn mạnh sự xử lý, tác động hoặc kết quả làm thay đổi vị trí, trạng thái của vật.",
    "tag": "Câu chữ 把 then chốt",
    "examples": [
      {
        "text": "请你把桌子上的生词本递给我。",
        "translation": "Xin bạn chuyển giúp tôi cuốn sổ từ mới trên bàn sang đây.",
        "situation": "Nhờ vả lấy đồ vật",
        "pinyin": "qǐng nǐ bǎ zhuō zi shàng de shēng cí běn dì gěi wǒ 。"
      },
      {
        "text": "我们已经把所有的复习资料整理好了。",
        "translation": "Chúng tôi đã sắp xếp gọn gàng toàn bộ tài liệu ôn tập rồi.",
        "situation": "Báo cáo hoàn thành công việc",
        "pinyin": "wǒ men yǐ jīng bǎ suǒ yǒu de fù xí zī liào zhěng lǐ hǎo le 。"
      },
      {
        "text": "出门前请记得把空调和灯关掉。",
        "translation": "Trước khi ra khỏi cửa xin hãy nhớ tắt điều hòa và đèn điện.",
        "situation": "Căn dặn sinh hoạt",
        "pinyin": "chū mén qián qǐng jì de bǎ kōng tiáo hé dēng guān diào 。"
      }
    ]
  },
  {
    "id": "zh-pat-015",
    "language": "zh",
    "level": "HSK3",
    "title": "Cấu trúc phản xạ tức thì & Kế tiếp",
    "formula": "一……就…… (yī ... jiù ...)",
    "category": "Hành động nối tiếp",
    "explanation": "Diễn tả hai hành động diễn ra kế tiếp nhau trong chớp mắt: \"Vừa mới... là đã...\", hoặc hễ có điều kiện A là lập tức xảy ra kết quả B.",
    "tag": "Vừa... liền...",
    "examples": [
      {
        "text": "他一听到下课铃声就跑出了教室。",
        "translation": "Cậu ấy vừa nghe thấy tiếng chuông tan học là đã chạy tót ra khỏi lớp.",
        "situation": "Kể lại sự việc nhanh chóng",
        "pinyin": "tā yì tīng dào xià kè líng shēng jiù pǎo chū le jiào shì 。"
      },
      {
        "text": "只要一遇到生词难题，老师就耐心指点我们。",
        "translation": "Hễ gặp bài từ mới khó khăn là thầy giáo liền kiên nhẫn chỉ bảo chúng tôi.",
        "situation": "Nói về sự nhiệt tình của thầy cô",
        "pinyin": "zhǐ yào yí yù dào shēng cí nán tí ， lǎo shī jiù nài xīn zhǐ diǎn wǒ men 。"
      },
      {
        "text": "我一回到家就打开电脑开始做听力练习。",
        "translation": "Tôi vừa về đến nhà là mở máy tính ra bắt đầu làm bài luyện nghe.",
        "situation": "Kể thói quen tự học",
        "pinyin": "wǒ yì huí dào jiā jiù dǎ kāi diàn nǎo kāi shǐ zuò tīng lì liàn xí 。"
      }
    ]
  },
  {
    "id": "zh-pat-016",
    "language": "zh",
    "level": "HSK3",
    "title": "Cấu trúc ngoại trừ & Loại trừ",
    "formula": "除了……（以外），都 / 还…… (chúle ... yǐwài, dōu / hái ...)",
    "category": "Phạm vi & Ngoại lệ",
    "explanation": "Nếu đi với \"都\" mang nghĩa loại trừ (\"Ngoài A ra, tất cả đều...\"). Nếu đi với \"还/也\" mang nghĩa bổ sung (\"Ngoài A ra, còn có cả B...\").",
    "tag": "Ngoài... ra",
    "examples": [
      {
        "text": "除了星期天以外，图书馆每天都准时开放。",
        "translation": "Ngoài ngày Chủ nhật ra, thư viện ngày nào cũng mở cửa đúng giờ.",
        "situation": "Thông báo giờ mở cửa",
        "pinyin": "chú le xīng qī tiān yǐ wài ， tú shū guǎn měi tiān dōu zhǔn shí kāi fàng 。"
      },
      {
        "text": "他除了会说普通话以外，还会讲一口流利的粤语。",
        "translation": "Anh ấy ngoài biết nói tiếng Phổ thông ra, còn nói được một giọng tiếng Quảng Đông lưu loát.",
        "situation": "Giới thiệu khả năng ngoại ngữ",
        "pinyin": "tā chú le huì shuō pǔ tōng huà yǐ wài ， hái huì jiǎng yì kǒu liú lì de yuè yǔ 。"
      }
    ]
  },
  {
    "id": "zh-pat-017",
    "language": "zh",
    "level": "HSK3",
    "title": "Cấu trúc điều kiện duy nhất cần thiết",
    "formula": "只要……就…… (zhǐyào ... jiù ...)",
    "category": "Điều kiện & Đảm bảo",
    "explanation": "Chỉ cần có điều kiện này là đủ để dẫn tới kết quả: \"Chỉ cần... thì...\". Rất phổ biến khi khích lệ hoặc đưa ra cam kết.",
    "tag": "Chỉ cần... thì...",
    "examples": [
      {
        "text": "只要坚持每天积累词汇，你的汉语水平就一定会提高。",
        "translation": "Chỉ cần kiên trì tích lũy từ vựng mỗi ngày, trình độ tiếng Hán của bạn chắc chắn sẽ nâng cao.",
        "situation": "Lời khuyên học tập",
        "pinyin": "zhǐ yào jiān chí měi tiān jī lěi cí huì ， nǐ de hàn yǔ shuǐ píng jiù yí dìng huì tí gāo 。"
      },
      {
        "text": "只要明天不下暴雨，运动会就照常举行。",
        "translation": "Chỉ cần ngày mai không mưa bão lớn, đại hội thể thao sẽ diễn ra bình thường.",
        "situation": "Thông báo hoạt động",
        "pinyin": "zhǐ yào míng tiān bú xià bào yǔ ， yùn dòng huì jiù zhào cháng jǔ xíng 。"
      }
    ]
  },
  {
    "id": "zh-pat-018",
    "language": "zh",
    "level": "HSK4",
    "title": "Cấu trúc câu bị động chữ 被",
    "formula": "Đối tượng bị tác động + 被 (bèi) + Tác nhân + Động từ + Thành phần khác",
    "category": "Câu bị động",
    "explanation": "Diễn tả hành động bị tác động, thường (nhưng không bắt buộc) mang sắc thái không mong muốn hoặc bị ảnh hưởng từ bên ngoài.",
    "tag": "Bị động chuẩn",
    "examples": [
      {
        "text": "他的优秀建议被公司领导采纳了。",
        "translation": "Đề xuất xuất sắc của anh ấy đã được ban lãnh đạo công ty tiếp thu.",
        "situation": "Thành tựu trong công việc",
        "pinyin": "tā de yōu xiù jiàn yì bèi gōng sī lǐng dǎo cǎi nà le 。"
      },
      {
        "text": "那篇精彩的学术论文被国际权威杂志发表了。",
        "translation": "Bài báo học thuật xuất sắc đó đã được tạp chí uy tín quốc tế đăng tải.",
        "situation": "Vinh danh học thuật",
        "pinyin": "nà piān jīng cǎi de xué shù lùn wén bèi guó jì quán wēi zá zhì fā biǎo le 。"
      },
      {
        "text": "自行车被弟弟骑去学校了。",
        "translation": "Chiếc xe đạp đã bị em trai đạp đi học rồi.",
        "situation": "Kể lại việc trong nhà",
        "pinyin": "zì xíng chē bèi dì di qí qù xué xiào le 。"
      }
    ]
  },
  {
    "id": "zh-pat-019",
    "language": "zh",
    "level": "HSK4",
    "title": "Cấu trúc tăng tiến quan hệ",
    "formula": "不仅 / 不但……而且 / 还…… (bùjǐn / búdàn ... érqiě / hái ...)",
    "category": "Tăng tiến chiều sâu",
    "explanation": "Biểu thị sự tăng tiến: \"Không những... mà còn...\". Nếu hai vế cùng chủ ngữ, chủ ngữ đứng trước liên từ; nếu khác chủ ngữ, liên từ đứng đầu câu.",
    "tag": "Không những... mà còn...",
    "examples": [
      {
        "text": "他不仅掌握了五千多个词汇，而且还能自如地进行商务洽谈。",
        "translation": "Anh ấy không những nắm vững hơn 5000 từ vựng mà còn có thể tự tin đàm phán thương mại.",
        "situation": "Đánh giá năng lực nhân sự",
        "pinyin": "tā bù jǐn zhǎng wò le wǔ qiān duō gè cí huì ， ér qiě hái néng zì rú dì jìn xíng shāng wù qià tán 。"
      },
      {
        "text": "中国传统书法不仅能修身养性，而且具有极高的艺术价值。",
        "translation": "Thư pháp truyền thống Trung Hoa không những giúp tu thân dưỡng tính mà còn có giá trị nghệ thuật cực cao.",
        "situation": "Bình luận văn hóa",
        "pinyin": "zhōng guó chuán tǒng shū fǎ bù jǐn néng xiū shēn yǎng xìng ， ér qiě jù yǒu jí gāo de yì shù jià zhí 。"
      }
    ]
  },
  {
    "id": "zh-pat-020",
    "language": "zh",
    "level": "HSK4",
    "title": "Cấu trúc điều kiện duy nhất bắt buộc",
    "formula": "只有……才…… (zhǐyǒu ... cái ...)",
    "category": "Điều kiện tất yếu",
    "explanation": "Khác với \"只要\" (điều kiện đủ), \"只有\" chỉ điều kiện ắt có và duy nhất: \"Chỉ có... mới...\". Không có điều kiện này thì tuyệt đối không có kết quả.",
    "tag": "Chỉ có... mới...",
    "examples": [
      {
        "text": "只有付出艰苦的努力，才能在激烈的竞争中脱颖而出。",
        "translation": "Chỉ có bỏ ra những nỗ lực gian khổ, mới có thể nổi bật trong cuộc cạnh tranh khốc liệt.",
        "situation": "Triết lý thành công",
        "pinyin": "zhǐ yǒu fù chū jiān kǔ de nǔ lì ， cái néng zài jī liè de jìng zhēng zhōng tuō yǐng ér chū 。"
      },
      {
        "text": "只有深入了解中国文化，才能真正读懂这些经典文学作品。",
        "translation": "Chỉ có thấu hiểu sâu sắc văn hóa Trung Hoa, mới có thể thực sự hiểu được các tác phẩm văn học kinh điển này.",
        "situation": "Nghiên cứu văn học",
        "pinyin": "zhī yǒu shēn rù liǎo jiě zhōng guó wén huà ， cái néng zhēn zhèng dú dǒng zhè xiē jīng diǎn wén xué zuò pǐn 。"
      }
    ]
  },
  {
    "id": "zh-pat-021",
    "language": "zh",
    "level": "HSK4",
    "title": "Cấu trúc bất kể trong mọi tình huống",
    "formula": "无论 / 不管……都 / 也…… (wúlùn / bùguǎn ... dōu / yě ...)",
    "category": "Vô điều kiện",
    "explanation": "Biểu thị kết quả hoặc thái độ không bao giờ thay đổi bất chấp mọi điều kiện, giả định diễn ra.",
    "tag": "Bất kể... đều...",
    "examples": [
      {
        "text": "无论遇到多么巨大的挑战，我们都要保持积极乐观的心态。",
        "translation": "Bất kể gặp phải thử thách to lớn đến thế nào, chúng ta đều phải giữ vững tâm thái tích cực lạc quan.",
        "situation": "Động viên tinh thần đồng đội",
        "pinyin": "wú lùn yù dào duō me jù dà de tiǎo zhàn ， wǒ men dōu yào bǎo chí jī jí lè guān de xīn tài 。"
      },
      {
        "text": "不管天气多么恶劣，邮递员每天都准时派送邮件。",
        "translation": "Bất kể thời tiết khắc nghiệt ra sao, người đưa thư ngày nào cũng phát bưu kiện đúng giờ.",
        "situation": "Ca ngợi sự tận tụy",
        "pinyin": "bù guǎn tiān qì duō me è liè ， yóu dì yuán měi tiān dōu zhǔn shí pài sòng yóu jiàn 。"
      }
    ]
  },
  {
    "id": "zh-pat-022",
    "language": "zh",
    "level": "HSK4",
    "title": "Cấu trúc câu hỏi tu từ phản vấn",
    "formula": "难道……吗？ (nándào ... ma?)",
    "category": "Phản vấn & Nhấn mạnh",
    "explanation": "Dùng hình thức câu hỏi nhưng thực chất là để khẳng định hoặc phủ định mạnh mẽ, gợi cho đối phương suy ngẫm sâu sắc.",
    "tag": "Chẳng lẽ... hay sao?",
    "examples": [
      {
        "text": "难道你真的忘记了我们当初立下的共同目标吗？",
        "translation": "Chẳng lẽ bạn thực sự đã quên đi mục tiêu chung mà chúng ta từng đặt ra hay sao?",
        "situation": "Nhắc nhở quyết tâm",
        "pinyin": "nán dào nǐ zhēn de wàng jì le wǒ men dāng chū lì xià de gòng tóng mù biāo ma ？"
      },
      {
        "text": "面对如此明显的错误，难道我们不应该立刻纠正吗？",
        "translation": "Đối mặt với sai sót rõ ràng như thế này, chẳng lẽ chúng ta không nên lập tức sửa đổi hay sao?",
        "situation": "Chất vấn trong công việc",
        "pinyin": "miàn duì rú cǐ míng xiǎn de cuò wù ， nán dào wǒ men bú yīng gāi lì kè jiū zhèng ma ？"
      }
    ]
  },
  {
    "id": "zh-pat-023",
    "language": "zh",
    "level": "HSK5",
    "title": "Cấu trúc lựa chọn dứt khoát",
    "formula": "与其……不如…… (yǔqí ... bùrú ...)",
    "category": "Lựa chọn chiến lược",
    "explanation": "Mang ý nghĩa so sánh hai phương án: \"Thay vì... thì thà rằng/chi bằng...\", thể hiện sự quyết đoán chọn phương án sau tốt hơn phương án trước.",
    "tag": "Chi bằng... tốt hơn",
    "examples": [
      {
        "text": "与其在这里盲目等待，不如主动去寻找新的机遇。",
        "translation": "Thay vì mù quáng chờ đợi ở đây, chi bằng hãy chủ động đi tìm kiếm cơ hội mới.",
        "situation": "Đưa ra định hướng quyết đoán",
        "pinyin": "yǔ qí zài zhè lǐ máng mù děng dài ， bù rú zhǔ dòng qù xún zhǎo xīn de jī yù 。"
      },
      {
        "text": "与其临渴掘井，不如平时未雨绸缪做好充分准备。",
        "translation": "Thay vì để nước đến chân mới nhảy, chi bằng ngày thường lo liệu chu toàn chuẩn bị đầy đủ.",
        "situation": "Khuyên răn cẩn trọng",
        "pinyin": "yǔ qí lín kě jué jǐng ， bù rú píng shí wèi yǔ chóu móu zuò hǎo chōng fèn zhǔn bèi 。"
      },
      {
        "text": "与其花大价钱购买昂贵的补品，不如养成健康的作息习惯。",
        "translation": "Thay vì tốn bộn tiền mua các loại thuốc bổ đắt đỏ, chi bằng hãy rèn luyện thói quen sinh hoạt lành mạnh.",
        "situation": "Chăm sóc sức khỏe",
        "pinyin": "yǔ qí huā dà jià qián gòu mǎi áng guì de bǔ pǐn ， bù rú yǎng chéng jiàn kāng de zuò xī xí guàn 。"
      }
    ]
  },
  {
    "id": "zh-pat-024",
    "language": "zh",
    "level": "HSK5",
    "title": "Cấu trúc nhấn mạnh trường hợp cực hạn",
    "formula": "连……也 / 都…… (lián ... yě / dōu ...)",
    "category": "Nhấn mạnh cực độ",
    "explanation": "Đưa ra một ví dụ cực đoan, khó tin nhất để ngụ ý rằng những thứ khác lại càng như vậy: \"Đến cả... cũng/đều...\".",
    "tag": "Đến cả... cũng...",
    "examples": [
      {
        "text": "这个问题太简单了，连小学生都能回答得出来。",
        "translation": "Câu hỏi này quá đơn giản, đến cả học sinh tiểu học cũng có thể trả lời được.",
        "situation": "Nhấn mạnh sự đơn giản",
        "pinyin": "zhè ge wèn tí tài jiǎn dān le ， lián xiǎo xué shēng dōu néng huí dá dé chū lái 。"
      },
      {
        "text": "他工作起来废寝忘食，连吃饭的时间都常常忘记。",
        "translation": "Anh ấy làm việc quên ăn quên ngủ, đến cả giờ ăn cơm cũng thường xuyên quên bẵng.",
        "situation": "Miêu tả sự say mê cống hiến",
        "pinyin": "tā gōng zuò qǐ lái fèi qǐn wàng shí ， lián chī fàn de shí jiān dōu cháng cháng wàng jì 。"
      }
    ]
  },
  {
    "id": "zh-pat-025",
    "language": "zh",
    "level": "HSK5",
    "title": "Cấu trúc giả bộ nhượng bộ cực hạn",
    "formula": "哪怕……也…… (nǎpà ... yě ...)",
    "category": "Ý chí & Kiên định",
    "explanation": "Đưa ra giả định tồi tệ nhất để biểu thị quyết tâm sắt đá không bao giờ lung lay: \"Cho dù là... thì cũng...\".",
    "tag": "Cho dù là... cũng...",
    "examples": [
      {
        "text": "哪怕前方的道路布满荆棘，我们也绝不轻言放弃。",
        "translation": "Cho dù con đường phía trước đầy rẫy chông gai, chúng ta cũng quyết không nói lời từ bỏ.",
        "situation": "Tuyên thệ quyết tâm",
        "pinyin": "nǎ pà qián fāng de dào lù bù mǎn jīng jí ， wǒ men yě jué bù qīng yán fàng qì 。"
      },
      {
        "text": "哪怕只有百分之一的希望，医生们也会付出百分之百的努力去抢救。",
        "translation": "Cho dù chỉ còn một phần trăm hy vọng, các bác sĩ cũng sẽ bỏ ra một trăm phần trăm nỗ lực để cứu chữa.",
        "situation": "Y đức cao quý",
        "pinyin": "nǎ pà zhǐ yǒu bǎi fēn zhī yī de xī wàng ， yī shēng men yě huì fù chū bǎi fēn zhī bǎi de nǔ lì qù qiǎng jiù 。"
      }
    ]
  },
  {
    "id": "zh-pat-026",
    "language": "zh",
    "level": "HSK5",
    "title": "Cấu trúc khó tránh khỏi / Không khỏi",
    "formula": "难免…… (nánmiǎn ...) || 不免…… (bùmiǎn ...)",
    "category": "Hiện thực khách quan",
    "explanation": "Chỉ một hệ quả là tất yếu do quy luật tự nhiên hoặc tâm lý bình thường của con người: \"Khó tránh khỏi...\", \"Không khỏi...\".",
    "tag": "Khó tránh khỏi",
    "examples": [
      {
        "text": "刚到一个陌生的国度生活，初期难免会产生思乡之情。",
        "translation": "Mới đến một đất nước xa lạ sinh sống, thời gian đầu khó tránh khỏi nảy sinh nỗi nhớ quê hương.",
        "situation": "Tâm sự du học sinh",
        "pinyin": "gāng dào yí gè mò shēng de guó dù shēng huó ， chū qī nán miǎn huì chǎn shēng sī xiāng zhī qíng 。"
      },
      {
        "text": "年轻人初入职场经验不足，犯一些小失误在所难免。",
        "translation": "Người trẻ mới bước chân vào chốn công sở kinh nghiệm chưa đủ, phạm phải một vài sai sót nhỏ là điều khó tránh.",
        "situation": "Bao dung thế hệ trẻ",
        "pinyin": "nián qīng rén chū rù zhí chǎng jīng yàn bù zú ， fàn yì xiē xiǎo shī wù zài suǒ nán miǎn 。"
      }
    ]
  },
  {
    "id": "zh-pat-027",
    "language": "zh",
    "level": "HSK6",
    "title": "Cấu trúc căn cứ trên tình hình thực tế",
    "formula": "鉴于…… (jiànyú ...) || 毫无…… (háowú ...)",
    "category": "Văn phong học thuật & Công vụ",
    "explanation": "Dùng trong văn kiện chính thức, luận văn hoặc đàm phán thương mại. \"鉴于\" có nghĩa \"Xét thấy...\", \"Căn cứ vào...\".",
    "tag": "Văn phong cao cấp HSK6",
    "examples": [
      {
        "text": "鉴于当前全球经济形势的变化，我们必须及时调整市场战略。",
        "translation": "Xét thấy những biến động của tình hình kinh tế toàn cầu hiện nay, chúng ta nhất định phải kịp thời điều chỉnh chiến lược thị trường.",
        "situation": "Hội nghị chiến lược doanh nghiệp",
        "pinyin": "jiàn yú dāng qián quán qiú jīng jì xíng shì de biàn huà ， wǒ men bì xū jí shí diào zhěng shì chǎng zhàn lüè 。"
      },
      {
        "text": "他对这项科研事业毫无保留地奉献了毕生心血。",
        "translation": "Ông ấy đã cống hiến trọn vẹn tâm huyết cả đời không chút giữ lại cho sự nghiệp nghiên cứu khoa học này.",
        "situation": "Ca ngợi nhà khoa học vĩ đại",
        "pinyin": "tā duì zhè xiàng kē yán shì yè háo wú bǎo liú dì fèng xiàn le bì shēng xīn xuè 。"
      },
      {
        "text": "鉴于该项目的显著创新价值，专家评审委员会一致同意予以特等资助。",
        "translation": "Xét thấy giá trị đổi mới nổi bật của dự án này, hội đồng giám khảo chuyên gia đã nhất trí đồng ý cấp tài trợ đặc biệt.",
        "situation": "Thông báo xét duyệt giải thưởng",
        "pinyin": "jiàn yú gāi xiàng mù dì xiǎn zhù chuàng xīn jià zhí ， zhuān jiā píng shěn wěi yuán huì yí zhì tóng yì yǔ yǐ tè děng zī zhù 。"
      }
    ]
  },
  {
    "id": "zh-pat-028",
    "language": "zh",
    "level": "HSK6",
    "title": "Cấu trúc khẳng định tuyệt đối không thể nghi ngờ",
    "formula": "毋庸置疑 / 不容置疑 (wúyōng zhìyí / bùróng zhìyí)",
    "category": "Luận đề khoa học C2/HSK6",
    "explanation": "Thành ngữ học thuật bốn chữ thể hiện tính chân lý hiển nhiên của luận điểm: \"Không còn nghi ngờ gì nữa...\", \"Hiển nhiên là...\".",
    "tag": "Chân lý không thể chối cãi",
    "examples": [
      {
        "text": "毋庸置疑，人工智能正在深刻地重塑着人类社会的生产方式。",
        "translation": "Không còn nghi ngờ gì nữa, trí tuệ nhân tạo đang tái định hình một cách sâu sắc phương thức sản xuất của xã hội loài người.",
        "situation": "Báo cáo xu hướng công nghệ",
        "pinyin": "wú yōng zhì yí ， rén gōng zhì néng zhèng zài shēn kè dì zhòng sù zhe rén lèi shè huì de shēng chǎn fāng shì 。"
      },
      {
        "text": "教育在推动社会文明进步中的核心地位是毋庸置疑的。",
        "translation": "Vị thế cốt lõi của giáo dục trong việc thúc đẩy tiến bộ văn minh xã hội là điều không thể bàn cãi.",
        "situation": "Luận văn giáo dục học",
        "pinyin": "jiào yù zài tuī dòng shè huì wén míng jìn bù zhōng de hé xīn dì wèi shì wú yōng zhì yí de 。"
      }
    ]
  },
  {
    "id": "zh-pat-029",
    "language": "zh",
    "level": "HSK6",
    "title": "Cấu trúc nhượng bộ giả định trang trọng",
    "formula": "纵使……亦…… (zòngshǐ ... yì ...)",
    "category": "Văn ngôn & Bút đàm HSK6",
    "explanation": "Văn phong tao nhã cổ kính trong tản văn và diễn văn chính thức, tương đương với \"Ngay cả khi... cũng...\".",
    "tag": "Văn ngôn cao nhã",
    "examples": [
      {
        "text": "纵使岁月流逝，沧海桑田，这份真挚的跨国友谊亦将历久弥新。",
        "translation": "Ngay cả khi năm tháng trôi qua, thế sự đổi thay, tình bạn xuyên quốc gia chân thành này cũng sẽ càng qua thử thách lại càng thêm bền chặt.",
        "situation": "Diễn văn kỷ niệm hữu nghị",
        "pinyin": "zòng shǐ suì yuè liú shì ， cāng hǎi sāng tián ， zhè fèn zhēn zhì de kuà guó yǒu yì yì jiāng lì jiǔ mí xīn 。"
      },
      {
        "text": "纵使面临千难万险，探险家们探索未知世界的崇高信念亦从未动摇。",
        "translation": "Dẫu cho phải đối mặt với ngàn trùng gian nan nguy hiểm, niềm tin cao cả khám phá thế giới vô định của các nhà thám hiểm cũng chưa từng lay chuyển.",
        "situation": "Ký sự thám hiểm",
        "pinyin": "zòng shǐ miàn lín qiān nán wàn xiǎn ， tàn xiǎn jiā men tàn suǒ wèi zhī shì jiè de chóng gāo xìn niàn yì cóng wèi dòng yáo 。"
      }
    ]
  },
  {
    "id": "zh-pat-030",
    "language": "zh",
    "level": "HSK6",
    "title": "Cấu trúc điều kiện duy nhất đạt đến cảnh giới",
    "formula": "唯有……方能…… (wéiyǒu ... fāngnéng ...)",
    "category": "Triết lý & Văn bia",
    "explanation": "Văn phong trang trọng đỉnh cao tương đương với \"只有...才能...\": \"Chỉ duy có... mới có thể...\", thường đúc kết bài học nhân sinh hoặc quy luật vũ trụ.",
    "tag": "Triết lý đỉnh cao",
    "examples": [
      {
        "text": "唯有博览群书、潜心躬行，方能领悟学术之真谛。",
        "translation": "Chỉ duy có đọc rộng trăm cuốn sách, chuyên tâm thực hành, mới có thể thấu cảm được chân lý của học thuật.",
        "situation": "Lời răn dạy học giả trẻ",
        "pinyin": "wéi yǒu bó lǎn qún shū 、 qián xīn gōng xíng ， fāng néng lǐng wù xué shù zhī zhēn dì 。"
      },
      {
        "text": "唯有兼收并蓄、开放包容，方能造就一个充满活力的多元文化时代。",
        "translation": "Chỉ duy có mở rộng tiếp thu, cởi mở bao dung, mới có thể gây dựng nên một thời đại văn hóa đa nguyên tràn đầy sức sống.",
        "situation": "Thông điệp văn hóa toàn cầu",
        "pinyin": "wéi yǒu jiān shōu bìng xù 、 kāi fàng bāo róng ， fāng néng zào jiù yí gè chōng mǎn huó lì de duō yuán wén huà shí dài 。"
      }
    ]
  }
];
