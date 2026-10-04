export type ExamType = 'TOEIC' | 'IELTS';

export type ExamPart =
  | 'TOEIC_PART1'
  | 'TOEIC_PART2'
  | 'TOEIC_PART5'
  | 'TOEIC_PART6'
  | 'TOEIC_PART7'
  | 'TOEIC_MINI_TEST'
  | 'IELTS_READING'
  | 'IELTS_LISTENING'
  | 'IELTS_WRITING'
  | 'IELTS_SPEAKING'
  | 'IELTS_MINI_TEST';

export interface ExamVocabItem {
  word: string;
  phonetic: string;
  pos: string;
  meaning: string;
  example?: string;
}

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D' or 'TRUE' | 'FALSE' | 'NOT GIVEN'
  explanation: string;
  translation: string;
  keyVocab?: ExamVocabItem[];
}

export interface ExamTest {
  id: string;
  title: string;
  subtitle: string;
  examType: ExamType;
  part: ExamPart;
  targetLevel: string;
  timeLimitMinutes: number;
  passageTitle?: string;
  passage?: string;
  audioScript?: string;
  imageScene?: string;
  questions: ExamQuestion[];
  tags: string[];
}

export const CURATED_EXAMS: ExamTest[] = [
  // =========================================================================
  // TOEIC 1: ETS Standard Part 5 - Incomplete Sentences (Mastery Test)
  // =========================================================================
  {
    id: 'toeic-part5-ets-01',
    title: 'ETS TOEIC Part 5: Trọng điểm Ngữ pháp & Từ vựng Công sở',
    subtitle: 'Mô phỏng đề thi ETS chuẩn - Phân bổ từ loại, liên từ và collocations thường gặp',
    examType: 'TOEIC',
    part: 'TOEIC_PART5',
    targetLevel: '650 - 800+',
    timeLimitMinutes: 10,
    tags: ['Part 5', 'Grammar', 'Vocabulary', 'ETS Format'],
    questions: [
      {
        id: 1,
        question: 'Mr. Henderson requested that all expense reports be submitted _______ Friday afternoon at the latest.',
        options: [
          '(A) by',
          '(B) until',
          '(C) during',
          '(D) along'
        ],
        correctAnswer: 'A',
        explanation: 'Quy tắc ngữ pháp về giới từ chỉ thời gian: "by + mốc thời gian" dùng để chỉ hạn chót ("trước hoặc muộn nhất là vào lúc nào"), rất thường đi với "at the latest". "Until" chỉ hành động kéo dài liên tục tới một thời điểm (vd: wait until Friday). Do đó (A) by là đáp án chuẩn.',
        translation: 'Ông Henderson đã yêu cầu tất cả các báo cáo chi phí phải được nộp muộn nhất là vào chiều thứ Sáu.',
        keyVocab: [
          { word: 'expense report', phonetic: '/ɪkˈspens rɪˈpɔːrt/', pos: 'n', meaning: 'báo cáo chi tiêu/chi phí', example: 'submit an expense report' },
          { word: 'at the latest', phonetic: '/æt ðə ˈleɪtɪst/', pos: 'idiom', meaning: 'muộn nhất là', example: 'by 5 PM at the latest' }
        ]
      },
      {
        id: 2,
        question: 'The newly appointed marketing director has proposed an _______ aggressive promotional strategy to increase market share.',
        options: [
          '(A) exceptionally',
          '(B) exceptional',
          '(C) exception',
          '(D) except'
        ],
        correctAnswer: 'A',
        explanation: 'Vị trí giữa mạo từ "an" và tính từ "aggressive" bổ nghĩa cho danh từ "promotional strategy" cần một TRẠNG TỪ (Adverb) để bổ nghĩa cho tính từ "aggressive". Do đó chọn (A) exceptionally (đặc biệt, phi thường).',
        translation: 'Giám đốc tiếp thị mới được bổ nhiệm đã đề xuất một chiến lược quảng bá đặc biệt quyết liệt nhằm gia tăng thị phần.',
        keyVocab: [
          { word: 'exceptionally', phonetic: '/ɪkˈsepʃənəli/', pos: 'adv', meaning: 'đặc biệt, xuất sắc, phi thường', example: 'exceptionally talented' },
          { word: 'market share', phonetic: '/ˈmɑːrkɪt ʃer/', pos: 'n', meaning: 'thị phần', example: 'expand market share' }
        ]
      },
      {
        id: 3,
        question: 'Although the initial prototype had minor flaws, the engineering team managed to resolve them _______ schedule.',
        options: [
          '(A) ahead of',
          '(B) prior',
          '(C) forward',
          '(D) before to'
        ],
        correctAnswer: 'A',
        explanation: 'Cụm thành ngữ cố định (idiomatic collocation) cực kỳ phổ biến trong đề thi TOEIC: "ahead of schedule" có nghĩa là "trước thời hạn / trước tiến độ". "Prior" cần đi với "to" (prior to), "forward" không đi với schedule.',
        translation: 'Mặc dù nguyên mẫu ban đầu có một số lỗi nhỏ, đội ngũ kỹ thuật đã giải quyết được chúng trước tiến độ đã đề ra.',
        keyVocab: [
          { word: 'prototype', phonetic: '/ˈproʊtətaɪp/', pos: 'n', meaning: 'nguyên mẫu đầu tiên', example: 'test the working prototype' },
          { word: 'ahead of schedule', phonetic: '/əˈhed əv ˈskedʒuːl/', pos: 'phrase', meaning: 'trước thời hạn/tiến độ', example: 'finished ahead of schedule' }
        ]
      },
      {
        id: 4,
        question: 'The human resources department announced that employees who complete the leadership seminar will be _______ for promotion.',
        options: [
          '(A) eligible',
          '(B) capable',
          '(C) reliable',
          '(D) convenient'
        ],
        correctAnswer: 'A',
        explanation: 'Cấu trúc cố định trọng điểm trong TOEIC: "be eligible for something / to do something" (đủ điều kiện, đủ tư cách hưởng quyền lợi). "Capable" đi với "of" (capable of doing sth). "Reliable" (đáng tin cậy) và "Convenient" (tiện lợi) không hợp nghĩa.',
        translation: 'Phòng nhân sự thông báo rằng các nhân viên hoàn thành khóa hội thảo kỹ năng lãnh đạo sẽ đủ điều kiện để được xét thăng chức.',
        keyVocab: [
          { word: 'eligible', phonetic: '/ˈelɪdʒəbl/', pos: 'adj', meaning: 'đủ điều kiện, đủ tiêu chuẩn', example: 'eligible for a bonus' },
          { word: 'promotion', phonetic: '/prəˈmoʊʃn/', pos: 'n', meaning: 'sự thăng chức, đề bạt', example: 'earn a well-deserved promotion' }
        ]
      },
      {
        id: 5,
        question: 'Neither the CEO _______ the board members were convinced that expanding overseas was the right decision at this time.',
        options: [
          '(A) nor',
          '(B) or',
          '(C) and',
          '(D) but'
        ],
        correctAnswer: 'A',
        explanation: 'Cặp liên từ tương quan bắt buộc: "Neither ... nor ..." (không ... cũng không ...). Lưu ý: "Either ... or ...", "Both ... and ...", "Not only ... but also ...". Do có "Neither" đứng đầu nên vị trí cần điền bắt buộc là "nor".',
        translation: 'Cả Tổng giám đốc lẫn các thành viên hội đồng quản trị đều không tin rằng việc mở rộng ra thị trường nước ngoài là quyết định đúng đắn vào thời điểm này.',
        keyVocab: [
          { word: 'convince', phonetic: '/kənˈvɪns/', pos: 'v', meaning: 'thuyết phục', example: 'convinced of the benefits' },
          { word: 'expand overseas', phonetic: '/ɪkˈspænd ˌoʊvərˈsiːz/', pos: 'collocation', meaning: 'mở rộng ra thị trường nước ngoài', example: 'plans to expand overseas' }
        ]
      },
      {
        id: 6,
        question: 'Customers are advised to inspect the delivered merchandise _______ and notify customer support immediately in case of damage.',
        options: [
          '(A) thoroughly',
          '(B) thoroughness',
          '(C) thorough',
          '(D) more thorough'
        ],
        correctAnswer: 'A',
        explanation: 'Động từ "inspect" (kiểm tra) là ngoại động từ có tân ngữ "the delivered merchandise". Để bổ nghĩa cho động từ "inspect", ta cần một TRẠNG TỪ chỉ cách thức: "thoroughly" (một cách kỹ lưỡng, cẩn thận).',
        translation: 'Khách hàng được khuyến nghị nên kiểm tra hàng hóa được giao một cách kỹ lưỡng và thông báo ngay cho bộ phận hỗ trợ khách hàng nếu có hư hại.',
        keyVocab: [
          { word: 'thoroughly', phonetic: '/ˈθɜːrəli/', pos: 'adv', meaning: 'kỹ lưỡng, thấu đáo', example: 'check everything thoroughly' },
          { word: 'merchandise', phonetic: '/ˈmɜːrtʃəndaɪs/', pos: 'n', meaning: 'hàng hóa', example: 'damaged merchandise' }
        ]
      }
    ]
  },

  // =========================================================================
  // TOEIC 2: ETS Standard Part 7 - Reading Comprehension (Business Memo & Email)
  // =========================================================================
  {
    id: 'toeic-part7-ets-02',
    title: 'ETS TOEIC Part 7: Đọc hiểu Đoạn đơn - Thông báo Nội bộ (Internal Memo)',
    subtitle: 'Đề thi đọc hiểu chuẩn cấu trúc ETS với kỹ năng Skimming, Scanning & Suy luận (Inference)',
    examType: 'TOEIC',
    part: 'TOEIC_PART7',
    targetLevel: '700 - 900+',
    timeLimitMinutes: 12,
    tags: ['Part 7', 'Reading', 'Internal Memo', 'Inference'],
    passageTitle: 'MEMORANDUM - NEXUS LOGISTICS INTERNATIONAL',
    passage: `To: All Headquarters Staff
From: Clara Dupont, Facilities Operations Manager
Date: October 14, 2026
Subject: Upcoming IT Server Infrastructure Upgrade & Facility Access

Please be advised that our IT Systems department will be conducting a comprehensive upgrade of the company's central cloud and server infrastructure starting this Friday, October 18, at 7:00 PM and continuing through Sunday, October 20, at 6:00 PM.

During this 48-hour window, all internal servers, corporate VPN connections, and the shared intranet portal will be temporarily unavailable. Furthermore, because electricians will be rewiring the primary power distribution panels on the 4th floor server room, electricity on the 3rd and 4th floors will be completely shut off from 8:00 AM Saturday until noon Sunday.

Consequently, building access will be restricted to authorized IT technicians and security personnel only. Any employees planning to work overtime during the weekend are strongly urged to complete their tasks remotely on Friday or postpone them until Monday morning. 

Employees who require urgent access to specific digital files during the outage are advised to download and save local copies onto their encrypted corporate laptops prior to 5:00 PM on Friday. Regular business operations and all IT services will resume promptly at 7:30 AM on Monday, October 21.

Thank you in advance for your cooperation and understanding as we enhance our digital security.`,
    questions: [
      {
        id: 1,
        question: 'What is the primary purpose of the memorandum?',
        options: [
          '(A) To announce a temporary suspension of IT systems and building access',
          '(B) To hire new facilities operations managers',
          '(C) To introduce a new corporate VPN system for remote employees',
          '(D) To schedule a mandatory weekend training session'
        ],
        correctAnswer: 'A',
        explanation: 'Đoạn văn mở đầu nêu rõ: "conducting a comprehensive upgrade... all internal servers, corporate VPN... will be temporarily unavailable... building access will be restricted". Mục đích chính là thông báo về việc tạm dừng hệ thống công nghệ và hạn chế ra vào tòa nhà trong đợt nâng cấp.',
        translation: 'Mục đích chính của bản ghi nhớ này là gì? -> (A) Thông báo việc tạm dừng hệ thống CNTT và hạn chế ra vào tòa nhà.',
        keyVocab: [
          { word: 'memorandum', phonetic: '/ˌmeməˈrændəm/', pos: 'n', meaning: 'bản ghi nhớ nội bộ công ty', example: 'circulate an internal memorandum' },
          { word: 'infrastructure', phonetic: '/ˈɪnfrəstrʌktʃər/', pos: 'n', meaning: 'cơ sở hạ tầng', example: 'IT server infrastructure' }
        ]
      },
      {
        id: 2,
        question: 'Why will power be turned off on the 3rd and 4th floors on the weekend?',
        options: [
          '(A) To save energy during non-business hours',
          '(B) Because electricians will be rewiring the main power panels',
          '(C) Due to unexpected damage caused by a storm',
          '(D) To test backup generators for emergency preparedness'
        ],
        correctAnswer: 'B',
        explanation: 'Chi tiết trong đoạn 2: "because electricians will be rewiring the primary power distribution panels on the 4th floor server room, electricity on the 3rd and 4th floors will be completely shut off". Như vậy lý do là thợ điện đi lại dây các bảng phân phối điện chính.',
        translation: 'Tại sao điện ở tầng 3 và tầng 4 lại bị ngắt vào cuối tuần? -> (B) Vì các thợ điện sẽ đi lại dây cho các bảng điện chính.',
        keyVocab: [
          { word: 'distribution panel', phonetic: '/ˌdɪstrɪˈbjuːʃn ˈpænl/', pos: 'n', meaning: 'bảng/tủ phân phối điện', example: 'primary power distribution panel' },
          { word: 'rewire', phonetic: '/ˌriːˈwaɪər/', pos: 'v', meaning: 'đi lại đường dây điện', example: 'rewire the server room' }
        ]
      },
      {
        id: 3,
        question: 'What are employees instructed to do if they need files during the maintenance period?',
        options: [
          '(A) Request remote access assistance on Saturday morning',
          '(B) Download necessary files to encrypted laptops before 5:00 PM Friday',
          '(C) Contact Clara Dupont at home during the weekend',
          '(D) Visit the building in person with a security pass'
        ],
        correctAnswer: 'B',
        explanation: 'Đoạn 4 nêu rõ: "Employees who require urgent access to specific digital files during the outage are advised to download and save local copies onto their encrypted corporate laptops prior to 5:00 PM on Friday."',
        translation: 'Nhân viên được hướng dẫn làm gì nếu cần tài liệu trong thời gian bảo trì? -> (B) Tải các tệp cần thiết vào máy tính xách tay mã hóa của công ty trước 17h thứ Sáu.',
        keyVocab: [
          { word: 'encrypted', phonetic: '/ɪnˈkrɪptɪd/', pos: 'adj', meaning: 'được mã hóa bảo mật', example: 'encrypted storage drive' },
          { word: 'outage', phonetic: '/ˈaʊtɪdʒ/', pos: 'n', meaning: 'thời gian ngừng hoạt động / mất điện', example: 'during the server outage' }
        ]
      }
    ]
  },

  // =========================================================================
  // TOEIC 3: ETS Standard Part 3 - Listening Conversation
  // =========================================================================
  {
    id: 'toeic-part3-ets-03',
    title: 'ETS TOEIC Part 3: Hội thoại Nghe hiểu Công sở (Office Conversation)',
    subtitle: 'Luyện nghe phát âm giọng Mỹ bản xứ (US Accent) kèm Audio Script & Từ vựng then chốt',
    examType: 'TOEIC',
    part: 'TOEIC_PART2', // Part 2/3 Listening
    targetLevel: '600 - 850+',
    timeLimitMinutes: 8,
    tags: ['Part 3', 'Listening', 'Audio Script', 'Workplace'],
    audioScript: `(Man): Hi, Sarah. Have you had a chance to look at the budget proposal for next quarter's digital advertising campaign?
(Woman): Yes, Mark, I reviewed it this morning. Overall, it looks very promising, but I'm slightly concerned about the amount allocated for social media video production. It seems almost double what we spent last quarter.
(Man): That's true, but our analytics demonstrated that video ads generated over sixty percent of our new client inquiries last month. The marketing director specifically asked us to prioritize video content.
(Woman): In that case, it makes sense. Let me make a few minor adjustments to the graphic design line item to balance the total, and I'll forward the revised spreadsheet to the finance committee before lunch.`,
    questions: [
      {
        id: 1,
        question: 'What are the speakers mainly discussing?',
        options: [
          '(A) A budget proposal for an advertising campaign',
          '(B) A schedule for an upcoming photo shoot',
          '(C) Client feedback on a new mobile application',
          '(D) Resumes for open graphic designer positions'
        ],
        correctAnswer: 'A',
        explanation: 'Người nam mở đầu: "Have you had a chance to look at the budget proposal for next quarter\'s digital advertising campaign?" và người nữ trả lời: "Yes... I reviewed it this morning." Chủ đề chính là bản đề xuất ngân sách chiến dịch quảng cáo.',
        translation: 'Hai người chủ yếu đang thảo luận về điều gì? -> (A) Bản đề xuất ngân sách cho một chiến dịch quảng cáo.',
        keyVocab: [
          { word: 'budget proposal', phonetic: '/ˈbʌdʒɪt prəˈpoʊzl/', pos: 'n', meaning: 'bản đề xuất ngân sách', example: 'approve the budget proposal' },
          { word: 'allocate', phonetic: '/ˈæləkeɪt/', pos: 'v', meaning: 'phân bổ ngân sách', example: 'allocated for marketing' }
        ]
      },
      {
        id: 2,
        question: 'Why does the man justify the high cost for video production?',
        options: [
          '(A) The company hired a famous celebrity',
          '(B) Video ads produced the majority of new client inquiries',
          '(C) Production equipment prices have increased recently',
          '(D) The video will be broadcast on national television'
        ],
        correctAnswer: 'B',
        explanation: 'Người nam giải thích lý do chi phí cao: "our analytics demonstrated that video ads generated over sixty percent of our new client inquiries last month." (số liệu chứng minh quảng cáo video tạo ra hơn 60% lượng khách hàng mới hỏi thông tin).',
        translation: 'Tại sao người đàn ông biện minh cho chi phí sản xuất video cao? -> (B) Quảng cáo video đem lại phần lớn lượt hỏi của khách hàng mới.',
        keyVocab: [
          { word: 'analytics', phonetic: '/ˌænəˈlɪtɪks/', pos: 'n', meaning: 'số liệu phân tích thống kê', example: 'web analytics report' },
          { word: 'inquiry', phonetic: '/ˈɪnkwəri/', pos: 'n', meaning: 'yêu cầu hỏi thông tin / thắc mắc', example: 'client inquiries' }
        ]
      },
      {
        id: 3,
        question: 'What will the woman do before lunch?',
        options: [
          '(A) Interview a new graphic designer',
          '(B) Call the marketing director',
          '(C) Send a revised spreadsheet to the finance committee',
          '(D) Record a new promotional video'
        ],
        correctAnswer: 'C',
        explanation: 'Người nữ kết luận: "Let me make a few minor adjustments... and I\'ll forward the revised spreadsheet to the finance committee before lunch." (Tôi sẽ chuyển bảng tính đã chỉnh sửa tới ủy ban tài chính trước bữa trưa).',
        translation: 'Người phụ nữ sẽ làm gì trước bữa trưa? -> (C) Gửi bảng tính đã chỉnh sửa cho ủy ban tài chính.',
        keyVocab: [
          { word: 'forward', phonetic: '/ˈfɔːrwərd/', pos: 'v', meaning: 'chuyển tiếp (email, tài liệu)', example: 'forward the email to finance' },
          { word: 'spreadsheet', phonetic: '/ˈspredʃiːt/', pos: 'n', meaning: 'bảng tính dữ liệu (Excel/Sheets)', example: 'revised financial spreadsheet' }
        ]
      }
    ]
  },

  // =========================================================================
  // IELTS 1: Cambridge Academic Reading Test (Passage & True/False/Not Given)
  // =========================================================================
  {
    id: 'ielts-reading-cambridge-01',
    title: 'Cambridge IELTS Academic Reading: Renewable Urban Architecture',
    subtitle: 'Đề thi đọc hiểu học thuật chuẩn Cambridge - Rèn luyện dạng bài True / False / Not Given & Multiple Choice',
    examType: 'IELTS',
    part: 'IELTS_READING',
    targetLevel: 'Band 6.5 - 8.5',
    timeLimitMinutes: 15,
    tags: ['IELTS Academic', 'Reading', 'True/False/Not Given', 'Cambridge Format'],
    passageTitle: 'The Vertical Forests of Contemporary Metropolises',
    passage: `In recent decades, urban planners worldwide have confronted an unprecedented dual challenge: accelerating urbanization coupled with the acute impacts of global climate instability. Traditional metropolises, characterized by asphalt expanses and concrete high-rises, frequently experience what meteorologists designate as the "urban heat island" effect—a microclimatic condition where built environments absorb and retain solar radiation far more intensely than surrounding rural areas.

In response, an innovative architectural paradigm known as "vertical forestry" has gained international prominence. Pioneered by Italian architect Stefano Boeri with the inauguration of the Bosco Verticale in Milan in 2014, this approach integrates thousands of living trees, shrubs, and perennial flora directly onto the cantilevered balconies and façades of residential towers.

Contrary to conventional urban landscaping that merely treats vegetation as ornamental decoration, vertical forests function as dynamic, bio-climatic ecosystems. The extensive foliage actively filters atmospheric pollutants, absorbing estimated metric tons of carbon dioxide and hazardous particulate matter (PM2.5) annually. Moreover, the multi-layered canopy provides natural acoustic insulation, dampening urban noise reverberations by up to thirty decibels.

However, critics and structural engineers have raised pragmatic concerns regarding the long-term sustainability of such arboreal skyscrapers. The structural load imposed by moist soil containers and mature root systems demands specialized reinforced concrete frameworks, inevitably inflating initial construction expenditures by fifteen to twenty-five percent. Furthermore, botanical maintenance requires specialized abseiling arborists who must routinely inspect irrigation networks and prune upper-canopy branches to withstand severe gale-force wind shear. Despite these financial and logistical impediments, municipal governments from Singapore to Lausanne continue to incentivize vertical foliage integration through tax concessions and expedited zoning approvals.`,
    questions: [
      {
        id: 1,
        question: 'The Bosco Verticale in Milan was the very first architectural project to implement the vertical forestry concept.',
        options: [
          '(A) TRUE',
          '(B) FALSE',
          '(C) NOT GIVEN'
        ],
        correctAnswer: 'A',
        explanation: 'Đoạn 2 nêu rõ: "Pioneered by Italian architect Stefano Boeri with the inauguration of the Bosco Verticale in Milan in 2014, this approach integrates...". Từ "Pioneered" (tiên phong, khởi xướng lần đầu) khẳng định Bosco Verticale chính là dự án tiên phong triển khai khái niệm này. Do đó đáp án là TRUE.',
        translation: 'Tòa nhà Bosco Verticale ở Milan là dự án kiến trúc đầu tiên thực hiện khái niệm rừng thẳng đứng. -> TRUE',
        keyVocab: [
          { word: 'pioneer', phonetic: '/ˌpaɪəˈnɪr/', pos: 'v', meaning: 'tiên phong, đi đầu khởi xướng', example: 'pioneered the new technology' },
          { word: 'cantilevered', phonetic: '/ˈkæntɪliːvərd/', pos: 'adj', meaning: 'công-xôn, nhô ra có điểm tựa một đầu', example: 'cantilevered balcony' }
        ]
      },
      {
        id: 2,
        question: 'Vegetation on vertical forests is capable of reducing ambient city noise by half.',
        options: [
          '(A) TRUE',
          '(B) FALSE',
          '(C) NOT GIVEN'
        ],
        correctAnswer: 'C',
        explanation: 'Đoạn 3 chỉ ra: "dampening urban noise reverberations by up to thirty decibels" (giảm tiếng ồn dội lại lên tới 30 decibel). Bài đọc không đưa ra thông tin quy đổi con số này có tương đương với "giảm một nửa" (by half) hay không. Theo quy tắc IELTS, thông tin không được khẳng định rõ ràng là NOT GIVEN.',
        translation: 'Cây cối trên các khu rừng thẳng đứng có khả năng giảm một nửa tiếng ồn thành phố xung quanh. -> NOT GIVEN',
        keyVocab: [
          { word: 'acoustic insulation', phonetic: '/əˈkuːstɪk ˌɪnsjʊˈleɪʃn/', pos: 'n', meaning: 'khả năng cách âm', example: 'natural acoustic insulation' },
          { word: 'dampen', phonetic: '/ˈdæmpən/', pos: 'v', meaning: 'làm giảm bớt, hãm lại (tiếng ồn)', example: 'dampen noise levels' }
        ]
      },
      {
        id: 3,
        question: 'Building vertical forests costs approximately the same as constructing conventional residential high-rises.',
        options: [
          '(A) TRUE',
          '(B) FALSE',
          '(C) NOT GIVEN'
        ],
        correctAnswer: 'B',
        explanation: 'Đoạn 4 nêu rõ: "inevitably inflating initial construction expenditures by fifteen to twenty-five percent" (chắc chắn làm đội chi phí xây dựng ban đầu lên từ 15 đến 25%). Như vậy chi phí đắt hơn chứ không hề ngang bằng (the same). Do đó câu này là FALSE.',
        translation: 'Việc xây dựng rừng thẳng đứng tốn chi phí xấp xỉ tương đương với các tòa nhà cao tầng truyền thống. -> FALSE',
        keyVocab: [
          { word: 'expenditure', phonetic: '/ɪkˈspendɪtʃər/', pos: 'n', meaning: 'chi phí, kinh phí bỏ ra', example: 'initial capital expenditure' },
          { word: 'arborist', phonetic: '/ˈɑːrbərɪst/', pos: 'n', meaning: 'chuyên gia chăm sóc cây', example: 'abseiling arborists' }
        ]
      },
      {
        id: 4,
        question: 'What is mentioned as a key factor motivating cities like Singapore to adopt vertical foliage?',
        options: [
          '(A) Municipal incentives such as tax relief and faster zoning permits',
          '(B) Strict international penalties imposed by the United Nations',
          '(C) Significant reductions in maintenance workforce wages',
          '(D) The discovery of self-watering artificial soil polymers'
        ],
        correctAnswer: 'A',
        explanation: 'Đoạn cuối câu chốt: "municipal governments from Singapore to Lausanne continue to incentivize vertical foliage integration through tax concessions and expedited zoning approvals." (các chính quyền đô thị khuyến khích thông qua ưu đãi thuế và duyệt quy hoạch nhanh). Trùng khớp hoàn toàn với đáp án (A).',
        translation: 'Yếu tố nào được nhắc đến như động lực thúc đẩy các thành phố như Singapore áp dụng phủ xanh thẳng đứng? -> (A) Các ưu đãi của chính quyền như giảm thuế và cấp phép nhanh.',
        keyVocab: [
          { word: 'incentivize', phonetic: '/ɪnˈsentɪvaɪz/', pos: 'v', meaning: 'khuyến khích, tạo động lực bằng chính sách', example: 'incentivize green building' },
          { word: 'tax concession', phonetic: '/tæks kənˈseʃn/', pos: 'n', meaning: 'sự giảm thuế, ưu đãi thuế', example: 'generous tax concessions' }
        ]
      }
    ]
  },

  // =========================================================================
  // IELTS 2: Cambridge Listening Practice Test
  // =========================================================================
  {
    id: 'ielts-listening-cambridge-02',
    title: 'Cambridge IELTS Listening Section 1: Đặt phòng Hội nghị Khách sạn',
    subtitle: 'Luyện kỹ năng nghe Form Completion & Thông tin chi tiết chuẩn giọng Anh (British RP)',
    examType: 'IELTS',
    part: 'IELTS_LISTENING',
    targetLevel: 'Band 6.0 - 8.0',
    timeLimitMinutes: 10,
    tags: ['IELTS Listening', 'Section 1', 'British Accent', 'Form Completion'],
    audioScript: `(Receptionist): Good morning, Grand Royale Conference Centre. My name is Arthur. How may I assist you today?
(Client): Good morning. I'm calling from Apex BioTech. We're looking to book a venue for our annual international symposium next spring.
(Receptionist): Wonderful. I can certainly help you check our availability. What dates were you considering?
(Client): We are targeting the weekend of March 14th to 16th. We anticipate approximately one hundred and fifty registered delegates.
(Receptionist): Excellent. Our Kensington Suite comfortably accommodates up to two hundred attendees and features full audio-visual facilities.
(Client): Perfect. Does the rental fee include high-speed Wi-Fi and catering packages, or are those billed separately?
(Receptionist): High-speed Wi-Fi throughout the hall is complimentary. However, tea and coffee breaks along with the buffet lunch are calculated per head at thirty-five pounds per person.`,
    questions: [
      {
        id: 1,
        question: 'What is the caller booking the venue for?',
        options: [
          '(A) An annual international symposium',
          '(B) A product launch press conference',
          '(C) A company board meeting',
          '(D) A graduation ceremony'
        ],
        correctAnswer: 'A',
        explanation: 'Người gọi trả lời rõ ràng: "We\'re looking to book a venue for our annual international symposium next spring." (Chúng tôi đang tìm đặt địa điểm cho hội nghị chuyên đề quốc tế thường niên vào mùa xuân tới).',
        translation: 'Người gọi đặt địa điểm cho sự kiện gì? -> (A) Hội nghị chuyên đề quốc tế thường niên.',
        keyVocab: [
          { word: 'symposium', phonetic: '/sɪmˈpoʊziəm/', pos: 'n', meaning: 'hội nghị chuyên đề học thuật/khoa học', example: 'international symposium' },
          { word: 'delegate', phonetic: '/ˈdelɪɡət/', pos: 'n', meaning: 'đại biểu tham dự hội nghị', example: 'registered delegates' }
        ]
      },
      {
        id: 2,
        question: 'Which room does the receptionist recommend for 150 delegates?',
        options: [
          '(A) The Kensington Suite',
          '(B) The Westminster Hall',
          '(C) The Balmoral Room',
          '(D) The Queen Elizabeth Gallery'
        ],
        correctAnswer: 'A',
        explanation: 'Lễ tân nói: "Our Kensington Suite comfortably accommodates up to two hundred attendees and features full audio-visual facilities."',
        translation: 'Lễ tân giới thiệu phòng nào cho 150 đại biểu? -> (A) The Kensington Suite.',
        keyVocab: [
          { word: 'accommodate', phonetic: '/əˈkɑːmədeɪt/', pos: 'v', meaning: 'chứa được, đáp ứng chỗ cho', example: 'accommodates up to 200 people' },
          { word: 'audio-visual', phonetic: '/ˌɔːdioʊˈvɪʒuəl/', pos: 'adj', meaning: 'nghe nhìn (âm thanh và máy chiếu)', example: 'audio-visual equipment' }
        ]
      },
      {
        id: 3,
        question: 'What service is provided free of charge (complimentary)?',
        options: [
          '(A) High-speed Wi-Fi throughout the hall',
          '(B) Morning coffee and afternoon tea breaks',
          '(C) Overnight parking for all attendees',
          '(D) Buffet lunch on the final day'
        ],
        correctAnswer: 'A',
        explanation: 'Lễ tân nêu rõ: "High-speed Wi-Fi throughout the hall is complimentary." Từ "complimentary" là từ đồng nghĩa then chốt trong IELTS của "free of charge".',
        translation: 'Dịch vụ nào được cung cấp miễn phí (complimentary)? -> (A) Wi-Fi tốc độ cao trong toàn bộ hội trường.',
        keyVocab: [
          { word: 'complimentary', phonetic: '/ˌkɑːmplɪˈmentri/', pos: 'adj', meaning: 'miễn phí kèm theo dịch vụ', example: 'complimentary breakfast' },
          { word: 'per head', phonetic: '/pər hed/', pos: 'phrase', meaning: 'trên mỗi đầu người', example: 'thirty-five pounds per head' }
        ]
      }
    ]
  }
];
