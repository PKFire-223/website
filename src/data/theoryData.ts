// Comprehensive Theory & Foundations Database for English and Chinese Learning

export interface IPASound {
  symbol: string;
  type: 'vowel-short' | 'vowel-long' | 'diphthong' | 'consonant-voiced' | 'consonant-unvoiced';
  examples: string[];
  vietnameseGuide: string;
  audioSample: string;
}

export interface TenseRule {
  name: string;
  englishName: string;
  formula: {
    affirmative: string;
    negative: string;
    interrogative: string;
  };
  usage: string;
  signalWords: string[];
  examples: { en: string; vi: string }[];
}

export interface IrregularVerb {
  v1: string;
  v2: string;
  v3: string;
  meaning: string;
  phonetic: string;
}

export interface ChinesePinyinSound {
  pinyin: string;
  ipa: string;
  vietnameseApprox: string;
  exampleChar: string;
  examplePinyin: string;
  exampleMeaning: string;
}

export interface ChineseStrokeRule {
  name: string;
  chinese: string;
  pinyin: string;
  direction: string;
  exampleChar: string;
  explanation: string;
}

export interface ChineseRadical {
  radical: string;
  pinyin: string;
  sinoVietnamese: string;
  meaning: string;
  examples: { char: string; pinyin: string; meaning: string }[];
}

// -------------------------------------------------------------
// 1. ENGLISH PHONETICS (44 IPA SOUNDS)
// -------------------------------------------------------------
export const ENGLISH_IPA_SOUNDS: IPASound[] = [
  // Short Vowels
  { symbol: 'ɪ', type: 'vowel-short', examples: ['ship', 'sit', 'hit', 'busy'], vietnameseGuide: 'Âm i ngắn: Mở miệng tự nhiên như âm /i/ trong tiếng Việt nhưng dứt khoát và ngắn hơn.', audioSample: 'sit' },
  { symbol: 'e', type: 'vowel-short', examples: ['bed', 'pen', 'head', 'many'], vietnameseGuide: 'Âm e ngắn: Miệng mở rộng hơn âm /ɪ/, phát âm dứt khoát tương tự âm "e" tiếng Việt.', audioSample: 'bed' },
  { symbol: 'æ', type: 'vowel-short', examples: ['cat', 'apple', 'man', 'hand'], vietnameseGuide: 'Âm a bẹt: Miệng mở rộng, lưỡi hạ thấp, phát âm lai giữa âm "a" và "e".', audioSample: 'cat' },
  { symbol: 'ɒ', type: 'vowel-short', examples: ['not', 'box', 'watch', 'cough'], vietnameseGuide: 'Âm o ngắn: Miệng hơi tròn, lưỡi hạ thấp, phát âm ngắn và dứt khoát.', audioSample: 'not' },
  { symbol: 'ʊ', type: 'vowel-short', examples: ['put', 'book', 'good', 'foot'], vietnameseGuide: 'Âm u ngắn: Môi hơi tròn, phát âm âm "u" ngắn và thả lỏng.', audioSample: 'book' },
  { symbol: 'ʌ', type: 'vowel-short', examples: ['cup', 'sun', 'love', 'money'], vietnameseGuide: 'Âm á/ớ: Miệng mở tự nhiên, phát âm tương tự âm "ă" hoặc "ơ" nhẹ trong tiếng Việt.', audioSample: 'cup' },
  { symbol: 'ə', type: 'vowel-short', examples: ['about', 'banana', 'camera', 'doctor'], vietnameseGuide: 'Âm Schwa (ơ ngắn): Âm phổ biến nhất trong tiếng Anh. Phát âm âm "ơ" thật ngắn, nhẹ, không nhấn trọng âm.', audioSample: 'about' },

  // Long Vowels
  { symbol: 'iː', type: 'vowel-long', examples: ['sheep', 'eat', 'see', 'key'], vietnameseGuide: 'Âm i dài: Khóe miệng kéo dài sang hai bên như đang mỉm cười, kéo dài âm.', audioSample: 'sheep' },
  { symbol: 'ɑː', type: 'vowel-long', examples: ['father', 'car', 'star', 'heart'], vietnameseGuide: 'Âm a dài: Miệng mở rộng sâu về phía họng, hạ lưỡi, ngân dài âm "a".', audioSample: 'car' },
  { symbol: 'ɔː', type: 'vowel-long', examples: ['door', 'saw', 'walk', 'water'], vietnameseGuide: 'Âm o dài: Tròn môi hơn âm /ɒ/, ngân dài âm "o" sâu từ cổ họng.', audioSample: 'door' },
  { symbol: 'uː', type: 'vowel-long', examples: ['moon', 'blue', 'food', 'shoe'], vietnameseGuide: 'Âm u dài: Chu môi tròn về phía trước, ngân dài âm "u".', audioSample: 'moon' },
  { symbol: 'ɜː', type: 'vowel-long', examples: ['bird', 'girl', 'nurse', 'learn'], vietnameseGuide: 'Âm ơ dài: Môi mở hơi rộng, lưỡi cong nhẹ chạm vòm họng trên, ngân dài âm "ơ".', audioSample: 'bird' },

  // Diphthongs (Nguyên âm đôi)
  { symbol: 'eɪ', type: 'diphthong', examples: ['day', 'make', 'rain', 'face'], vietnameseGuide: 'Phát âm lướt từ âm /e/ sang âm /ɪ/ ("ê-i").', audioSample: 'day' },
  { symbol: 'aɪ', type: 'diphthong', examples: ['my', 'time', 'pie', 'light'], vietnameseGuide: 'Phát âm lướt từ âm /a/ sang âm /ɪ/ ("a-i").', audioSample: 'time' },
  { symbol: 'ɔɪ', type: 'diphthong', examples: ['boy', 'coin', 'voice', 'toy'], vietnameseGuide: 'Phát âm lướt từ âm /ɔː/ sang âm /ɪ/ ("o-i").', audioSample: 'boy' },
  { symbol: 'aʊ', type: 'diphthong', examples: ['now', 'house', 'cow', 'sound'], vietnameseGuide: 'Phát âm lướt từ âm /a/ sang âm /ʊ/ ("a-o").', audioSample: 'now' },
  { symbol: 'əʊ', type: 'diphthong', examples: ['go', 'home', 'boat', 'know'], vietnameseGuide: 'Phát âm lướt từ âm /ə/ sang âm /ʊ/ ("ơ-u").', audioSample: 'go' },
  { symbol: 'ɪə', type: 'diphthong', examples: ['here', 'ear', 'near', 'beer'], vietnameseGuide: 'Phát âm lướt từ âm /ɪ/ sang âm /ə/ ("i-ơ").', audioSample: 'near' },
  { symbol: 'eə', type: 'diphthong', examples: ['air', 'care', 'hair', 'bear'], vietnameseGuide: 'Phát âm lướt từ âm /e/ sang âm /ə/ ("e-ơ").', audioSample: 'hair' },
  { symbol: 'ʊə', type: 'diphthong', examples: ['tour', 'poor', 'cure', 'sure'], vietnameseGuide: 'Phát âm lướt từ âm /ʊ/ sang âm /ə/ ("u-ơ").', audioSample: 'tour' },

  // Consonants - Unvoiced (Phụ âm vô thanh - không rung dây thanh)
  { symbol: 'p', type: 'consonant-unvoiced', examples: ['pen', 'stop', 'happy', 'cup'], vietnameseGuide: 'Hai môi mím chặt rồi bật hơi mạnh ra, không rung thanh quản.', audioSample: 'pen' },
  { symbol: 't', type: 'consonant-unvoiced', examples: ['tea', 'table', 'get', 'cat'], vietnameseGuide: 'Đầu lưỡi chạm nướu răng trên rồi bật hơi mạnh, không rung thanh quản.', audioSample: 'tea' },
  { symbol: 'k', type: 'consonant-unvoiced', examples: ['cat', 'key', 'clock', 'school'], vietnameseGuide: 'Cuống lưỡi nâng lên chạm ngạc mềm rồi bật mạnh luồng khí.', audioSample: 'key' },
  { symbol: 'f', type: 'consonant-unvoiced', examples: ['fish', 'coffee', 'leaf', 'photo'], vietnameseGuide: 'Răng cửa trên chạm nhẹ môi dưới, đẩy luồng khí qua kẽ răng.', audioSample: 'fish' },
  { symbol: 'θ', type: 'consonant-unvoiced', examples: ['think', 'three', 'both', 'math'], vietnameseGuide: 'Đặt đầu lưỡi ở giữa hai hàm răng, thổi luồng hơi nhẹ ra mà không rung cổ họng.', audioSample: 'think' },
  { symbol: 's', type: 'consonant-unvoiced', examples: ['sun', 'see', 'bus', 'city'], vietnameseGuide: 'Hai hàm răng khép hờ, đầu lưỡi gần nướu trên, thổi hơi xì nhẹ.', audioSample: 'sun' },
  { symbol: 'ʃ', type: 'consonant-unvoiced', examples: ['she', 'shoe', 'fish', 'nation'], vietnameseGuide: 'Môi hơi chu tròn, nâng thân lưỡi, phát âm "s nặng" bật hơi êm dịu.', audioSample: 'she' },
  { symbol: 'tʃ', type: 'consonant-unvoiced', examples: ['chair', 'match', 'nature', 'teach'], vietnameseGuide: 'Kết hợp giữa /t/ và /ʃ/, chu môi và bật luồng hơi mạnh ra như tiếng "ch".', audioSample: 'chair' },

  // Consonants - Voiced (Phụ âm hữu thanh - rung dây thanh)
  { symbol: 'b', type: 'consonant-voiced', examples: ['bag', 'baby', 'big', 'table'], vietnameseGuide: 'Hai môi mím chặt rồi bật mở, cổ họng rung rõ.', audioSample: 'bag' },
  { symbol: 'd', type: 'consonant-voiced', examples: ['dog', 'door', 'bed', 'lady'], vietnameseGuide: 'Đầu lưỡi chạm nướu trên rồi hạ xuống, thanh quản rung.', audioSample: 'dog' },
  { symbol: 'g', type: 'consonant-voiced', examples: ['go', 'give', 'bag', 'egg'], vietnameseGuide: 'Cuống lưỡi chạm ngạc mềm, hạ xuống tạo âm rung trong cổ họng.', audioSample: 'go' },
  { symbol: 'v', type: 'consonant-voiced', examples: ['van', 'voice', 'love', 'live'], vietnameseGuide: 'Răng cửa trên chạm môi dưới, đẩy hơi đồng thời rung thanh quản.', audioSample: 'voice' },
  { symbol: 'ð', type: 'consonant-voiced', examples: ['this', 'that', 'mother', 'brother'], vietnameseGuide: 'Đặt đầu lưỡi giữa hai hàm răng giống âm /θ/, nhưng thanh quản rung rõ.', audioSample: 'this' },
  { symbol: 'z', type: 'consonant-voiced', examples: ['zoo', 'lazy', 'rose', 'easy'], vietnameseGuide: 'Vị trí răng và lưỡi giống âm /s/, nhưng thanh quản rung (tiếng ong kêu).', audioSample: 'zoo' },
  { symbol: 'ʒ', type: 'consonant-voiced', examples: ['television', 'vision', 'measure', 'garage'], vietnameseGuide: 'Chu môi giống âm /ʃ/, nhưng thanh quản rung rõ.', audioSample: 'vision' },
  { symbol: 'dʒ', type: 'consonant-voiced', examples: ['job', 'jump', 'page', 'bridge'], vietnameseGuide: 'Chu môi, bật hơi kết hợp rung thanh quản mạnh.', audioSample: 'job' },
  { symbol: 'm', type: 'consonant-voiced', examples: ['man', 'mother', 'room', 'summer'], vietnameseGuide: 'Âm mũi: Hai môi khép chặt, luồng hơi thoát ra qua đường mũi.', audioSample: 'man' },
  { symbol: 'n', type: 'consonant-voiced', examples: ['no', 'name', 'sun', 'dinner'], vietnameseGuide: 'Âm mũi: Đầu lưỡi chạm nướu răng trên, hơi thoát qua mũi.', audioSample: 'name' },
  { symbol: 'ŋ', type: 'consonant-voiced', examples: ['sing', 'song', 'ring', 'king'], vietnameseGuide: 'Âm mũi "ng": Cuống lưỡi chạm ngạc mềm, hơi đi qua mũi.', audioSample: 'sing' },
  { symbol: 'h', type: 'consonant-unvoiced', examples: ['hot', 'hat', 'home', 'who'], vietnameseGuide: 'Há miệng tự nhiên, thở nhẹ luồng khí từ cuống họng ra ngoài.', audioSample: 'hot' },
  { symbol: 'l', type: 'consonant-voiced', examples: ['light', 'love', 'ball', 'apple'], vietnameseGuide: 'Đầu lưỡi chạm nướu răng trên, luồng khí thoát ra hai bên cạnh lưỡi.', audioSample: 'light' },
  { symbol: 'r', type: 'consonant-voiced', examples: ['red', 'run', 'car', 'tree'], vietnameseGuide: 'Đầu lưỡi uốn cong vào trong nhưng không chạm vòm họng, môi hơi chu.', audioSample: 'red' },
  { symbol: 'w', type: 'consonant-voiced', examples: ['we', 'water', 'window', 'one'], vietnameseGuide: 'Môi chu tròn nhỏ về phía trước rồi mở rộng nhanh sang hai bên.', audioSample: 'water' },
  { symbol: 'j', type: 'consonant-voiced', examples: ['yes', 'yellow', 'you', 'university'], vietnameseGuide: 'Thân lưỡi nâng cao về phía vòm họng cứng, phát âm lướt tương tự âm "d/gi".', audioSample: 'yes' },
];

// -------------------------------------------------------------
// 2. ENGLISH 12 VERB TENSES (BẢNG 12 THÌ TIẾNG ANH)
// -------------------------------------------------------------
export const ENGLISH_TENSES: TenseRule[] = [
  {
    name: 'Hiện tại đơn',
    englishName: 'Present Simple',
    formula: {
      affirmative: 'S + V(s/es) + O',
      negative: 'S + do/does + not + V_inf',
      interrogative: 'Do/Does + S + V_inf?'
    },
    usage: 'Diễn tả thói quen hằng ngày, chân lý khoa học, sự thật hiển nhiên hoặc lịch trình cố định.',
    signalWords: ['always', 'usually', 'often', 'sometimes', 'rarely', 'every day', 'never'],
    examples: [
      { en: 'She works as a software architect.', vi: 'Cô ấy làm việc với vai trò kiến trúc sư phần mềm.' },
      { en: 'The earth orbits around the sun.', vi: 'Trái đất quay xung quanh mặt trời.' }
    ]
  },
  {
    name: 'Hiện tại tiếp diễn',
    englishName: 'Present Continuous',
    formula: {
      affirmative: 'S + am/is/are + V-ing',
      negative: 'S + am/is/are + not + V-ing',
      interrogative: 'Am/Is/Are + S + V-ing?'
    },
    usage: 'Hành động đang diễn ra tại thời điểm nói hoặc xu hướng tạm thời xung quanh thời điểm nói.',
    signalWords: ['now', 'right now', 'at the moment', 'at present', 'Look!', 'Listen!'],
    examples: [
      { en: 'The engineers are designing an innovative prototype right now.', vi: 'Các kỹ sư đang thiết kế một nguyên mẫu cải tiến ngay lúc này.' }
    ]
  },
  {
    name: 'Hiện tại hoàn thành',
    englishName: 'Present Perfect',
    formula: {
      affirmative: 'S + have/has + V3/ed',
      negative: 'S + have/has + not + V3/ed',
      interrogative: 'Have/Has + S + V3/ed?'
    },
    usage: 'Hành động đã xảy ra trong quá khứ kéo dài đến hiện tại hoặc kết quả còn ảnh hưởng ở hiện tại.',
    signalWords: ['already', 'yet', 'just', 'ever', 'never', 'since', 'for', 'so far', 'up to now'],
    examples: [
      { en: 'We have lived in this city for over a decade.', vi: 'Chúng tôi đã sống ở thành phố này hơn một thập kỷ.' },
      { en: 'She has already submitted her doctoral thesis.', vi: 'Cô ấy đã nộp luận án tiến sĩ của mình rồi.' }
    ]
  },
  {
    name: 'Hiện tại hoàn thành tiếp diễn',
    englishName: 'Present Perfect Continuous',
    formula: {
      affirmative: 'S + have/has + been + V-ing',
      negative: 'S + have/has + not + been + V-ing',
      interrogative: 'Have/Has + S + been + V-ing?'
    },
    usage: 'Nhấn mạnh tính liên tục của hành động bắt đầu trong quá khứ và vẫn đang tiếp diễn đến hiện tại.',
    signalWords: ['all day', 'all morning', 'for 3 hours', 'since 8 AM'],
    examples: [
      { en: 'He has been studying English for four hours continuously.', vi: 'Anh ấy đã học tiếng Anh liên tục suốt bốn tiếng đồng hồ.' }
    ]
  },
  {
    name: 'Quá khứ đơn',
    englishName: 'Past Simple',
    formula: {
      affirmative: 'S + V2/ed',
      negative: 'S + did + not + V_inf',
      interrogative: 'Did + S + V_inf?'
    },
    usage: 'Hành động đã xảy ra và kết thúc hoàn toàn tại thời điểm xác định trong quá khứ.',
    signalWords: ['yesterday', 'last night', 'last week', 'in 2010', 'ago', 'when I was young'],
    examples: [
      { en: 'The museum opened its new exhibition yesterday.', vi: 'Bảo tàng đã mở cửa triển lãm mới vào ngày hôm qua.' }
    ]
  },
  {
    name: 'Quá khứ tiếp diễn',
    englishName: 'Past Continuous',
    formula: {
      affirmative: 'S + was/were + V-ing',
      negative: 'S + was/were + not + V-ing',
      interrogative: 'Was/Were + S + V-ing?'
    },
    usage: 'Hành động đang diễn ra tại một thời điểm cụ thể trong quá khứ hoặc một hành động đang diễn ra thì có hành động khác xen vào.',
    signalWords: ['at 8 PM yesterday', 'while', 'when', 'at this time last year'],
    examples: [
      { en: 'While she was preparing dinner, the electricity went out.', vi: 'Trong khi cô ấy đang chuẩn bị bữa tối thì điện bị cúp.' }
    ]
  },
  {
    name: 'Quá khứ hoàn thành',
    englishName: 'Past Perfect',
    formula: {
      affirmative: 'S + had + V3/ed',
      negative: 'S + had + not + V3/ed',
      interrogative: 'Had + S + V3/ed?'
    },
    usage: 'Hành động xảy ra và kết thúc trước một hành động khác hoặc một mốc thời gian trong quá khứ.',
    signalWords: ['by the time', 'before', 'after', 'prior to', 'as soon as'],
    examples: [
      { en: 'By the time the rescue team arrived, the fire had been extinguished.', vi: 'Vào thời điểm đội cứu hộ tới nơi, ngọn lửa đã được dập tắt.' }
    ]
  },
  {
    name: 'Quá khứ hoàn thành tiếp diễn',
    englishName: 'Past Perfect Continuous',
    formula: {
      affirmative: 'S + had + been + V-ing',
      negative: 'S + had + not + been + V-ing',
      interrogative: 'Had + S + been + V-ing?'
    },
    usage: 'Nhấn mạnh quá trình của một hành động xảy ra liên tục trước một hành động khác trong quá khứ.',
    signalWords: ['had been V-ing for... before...'],
    examples: [
      { en: 'They had been negotiating for six months before reaching an accord.', vi: 'Họ đã đàm phán suốt sáu tháng trước khi đạt được một thỏa thuận.' }
    ]
  },
  {
    name: 'Tương lai đơn',
    englishName: 'Future Simple',
    formula: {
      affirmative: 'S + will + V_inf',
      negative: 'S + will + not (won\'t) + V_inf',
      interrogative: 'Will + S + V_inf?'
    },
    usage: 'Quyết định đưa ra ngay tại thời điểm nói hoặc dự đoán không có căn cứ chắc chắn.',
    signalWords: ['tomorrow', 'next week', 'someday', 'soon', 'I think', 'probably'],
    examples: [
      { en: 'I think our team will win the international championship.', vi: 'Tôi nghĩ rằng đội chúng tôi sẽ giành chức vô địch quốc tế.' }
    ]
  },
  {
    name: 'Tương lai gần (Be going to)',
    englishName: 'Near Future',
    formula: {
      affirmative: 'S + am/is/are + going to + V_inf',
      negative: 'S + am/is/are + not + going to + V_inf',
      interrogative: 'Am/Is/Are + S + going to + V_inf?'
    },
    usage: 'Kế hoạch hoặc dự định đã định trước, hoặc dự đoán có căn cứ chứng cứ rõ ràng ở hiện tại.',
    signalWords: ['look at the black clouds', 'plan to', 'intend to'],
    examples: [
      { en: 'Look at those dark clouds! It is going to rain.', vi: 'Nhìn những đám mây đen kìa! Trời sắp sửa mưa rồi.' }
    ]
  },
  {
    name: 'Tương lai tiếp diễn',
    englishName: 'Future Continuous',
    formula: {
      affirmative: 'S + will + be + V-ing',
      negative: 'S + will + not + be + V-ing',
      interrogative: 'Will + S + be + V-ing?'
    },
    usage: 'Hành động sẽ đang diễn ra tại một thời điểm xác định trong tương lai.',
    signalWords: ['at this time tomorrow', 'at 9 AM next Monday'],
    examples: [
      { en: 'At this time tomorrow, I will be flying over the Pacific Ocean.', vi: 'Vào giờ này ngày mai, tôi sẽ đang bay qua Thái Bình Dương.' }
    ]
  },
  {
    name: 'Tương lai hoàn thành',
    englishName: 'Future Perfect',
    formula: {
      affirmative: 'S + will + have + V3/ed',
      negative: 'S + will + not + have + V3/ed',
      interrogative: 'Will + S + have + V3/ed?'
    },
    usage: 'Hành động sẽ hoàn tất trước một thời điểm hoặc trước một hành động khác trong tương lai.',
    signalWords: ['by the end of this month', 'by 2030', 'by next Friday'],
    examples: [
      { en: 'By the end of next month, we will have completed the entire construction.', vi: 'Trước cuối tháng tới, chúng tôi sẽ hoàn thành toàn bộ công trình.' }
    ]
  }
];

// -------------------------------------------------------------
// 3. COMMON IRREGULAR VERBS (BẢNG ĐỘNG TỪ BẤT QUY TẮC)
// -------------------------------------------------------------
export const COMMON_IRREGULAR_VERBS: IrregularVerb[] = [
  { v1: 'be (am/is/are)', v2: 'was/were', v3: 'been', meaning: 'thì, là, ở', phonetic: '/biː/' },
  { v1: 'become', v2: 'became', v3: 'become', meaning: 'trở thành, trở nên', phonetic: '/bɪˈkʌm/' },
  { v1: 'begin', v2: 'began', v3: 'begun', meaning: 'bắt đầu, khởi đầu', phonetic: '/bɪˈɡɪn/' },
  { v1: 'break', v2: 'broke', v3: 'broken', meaning: 'làm vỡ, bẻ gãy', phonetic: '/breɪk/' },
  { v1: 'bring', v2: 'brought', v3: 'brought', meaning: 'mang lại, đem theo', phonetic: '/brɪŋ/' },
  { v1: 'build', v2: 'built', v3: 'built', meaning: 'xây dựng, kiến tạo', phonetic: '/bɪld/' },
  { v1: 'buy', v2: 'bought', v3: 'bought', meaning: 'mua sắm', phonetic: '/baɪ/' },
  { v1: 'catch', v2: 'caught', v3: 'caught', meaning: 'bắt lấy, đón xe', phonetic: '/kætʃ/' },
  { v1: 'choose', v2: 'chose', v3: 'chosen', meaning: 'lựa chọn', phonetic: '/tʃuːz/' },
  { v1: 'come', v2: 'came', v3: 'come', meaning: 'đến, đi tới', phonetic: '/kʌm/' },
  { v1: 'do', v2: 'did', v3: 'done', meaning: 'làm, thực hiện', phonetic: '/duː/' },
  { v1: 'draw', v2: 'drew', v3: 'drawn', meaning: 'vẽ, thu hút', phonetic: '/drɔː/' },
  { v1: 'drink', v2: 'drank', v3: 'drunk', meaning: 'uống nước', phonetic: '/drɪŋk/' },
  { v1: 'drive', v2: 'drove', v3: 'driven', meaning: 'lái xe, thúc đẩy', phonetic: '/draɪv/' },
  { v1: 'eat', v2: 'ate', v3: 'eaten', meaning: 'ăn uống', phonetic: '/iːt/' },
  { v1: 'fall', v2: 'fell', v3: 'fallen', meaning: 'ngã, rơi rụng', phonetic: '/fɔːl/' },
  { v1: 'feel', v2: 'felt', v3: 'felt', meaning: 'cảm thấy, cảm giác', phonetic: '/fiːl/' },
  { v1: 'find', v2: 'found', v3: 'found', meaning: 'tìm thấy, nhận ra', phonetic: '/faɪnd/' },
  { v1: 'fly', v2: 'flew', v3: 'flown', meaning: 'bay lượn', phonetic: '/flaɪ/' },
  { v1: 'forget', v2: 'forgot', v3: 'forgotten', meaning: 'quên lãng', phonetic: '/fəˈɡet/' },
  { v1: 'get', v2: 'got', v3: 'got / gotten', meaning: 'nhận được, trở nên', phonetic: '/ɡet/' },
  { v1: 'give', v2: 'gave', v3: 'given', meaning: 'cho, tặng, trao', phonetic: '/ɡɪv/' },
  { v1: 'go', v2: 'went', v3: 'gone', meaning: 'đi, di chuyển', phonetic: '/ɡəʊ/' },
  { v1: 'grow', v2: 'grew', v3: 'grown', meaning: 'phát triển, trồng trọt', phonetic: '/ɡrəʊ/' },
  { v1: 'have', v2: 'had', v3: 'had', meaning: 'có, sở hữu', phonetic: '/hæv/' },
  { v1: 'hear', v2: 'heard', v3: 'heard', meaning: 'nghe thấy', phonetic: '/hɪə(r)/' },
  { v1: 'hold', v2: 'held', v3: 'held', meaning: 'cầm nắm, tổ chức', phonetic: '/həʊld/' },
  { v1: 'keep', v2: 'kept', v3: 'kept', meaning: 'giữ gìn, duy trì', phonetic: '/kiːp/' },
  { v1: 'know', v2: 'knew', v3: 'known', meaning: 'biết, am hiểu', phonetic: '/nəʊ/' },
  { v1: 'lead', v2: 'led', v3: 'led', meaning: 'dẫn dắt, chỉ đạo', phonetic: '/liːd/' },
  { v1: 'leave', v2: 'left', v3: 'left', meaning: 'rời khỏi, để lại', phonetic: '/liːv/' },
  { v1: 'lose', v2: 'lost', v3: 'lost', meaning: 'đánh mất, thua cuộc', phonetic: '/luːz/' },
  { v1: 'make', v2: 'made', v3: 'made', meaning: 'chế tạo, tạo ra', phonetic: '/meɪk/' },
  { v1: 'meet', v2: 'met', v3: 'met', meaning: 'gặp gỡ, đáp ứng', phonetic: '/miːt/' },
  { v1: 'pay', v2: 'paid', v3: 'paid', meaning: 'thanh toán, chi trả', phonetic: '/peɪ/' },
  { v1: 'read', v2: 'read', v3: 'read', meaning: 'đọc sách (V2/V3 đọc là /red/)', phonetic: '/riːd/' },
  { v1: 'run', v2: 'ran', v3: 'run', meaning: 'chạy, vận hành', phonetic: '/rʌn/' },
  { v1: 'say', v2: 'said', v3: 'said', meaning: 'nói, phát biểu', phonetic: '/seɪ/' },
  { v1: 'see', v2: 'saw', v3: 'seen', meaning: 'nhìn thấy, hiểu ra', phonetic: '/siː/' },
  { v1: 'sell', v2: 'sold', v3: 'sold', meaning: 'bán hàng', phonetic: '/sel/' },
  { v1: 'send', v2: 'sent', v3: 'sent', meaning: 'gửi đi', phonetic: '/send/' },
  { v1: 'sing', v2: 'sang', v3: 'sung', meaning: 'hát ca', phonetic: '/sɪŋ/' },
  { v1: 'speak', v2: 'spoke', v3: 'spoken', meaning: 'nói chuyện', phonetic: '/spiːk/' },
  { v1: 'spend', v2: 'spent', v3: 'spent', meaning: 'tiêu xài, dành thời gian', phonetic: '/spend/' },
  { v1: 'stand', v2: 'stood', v3: 'stood', meaning: 'đứng vững, chịu đựng', phonetic: '/stænd/' },
  { v1: 'take', v2: 'took', v3: 'taken', meaning: 'cầm lấy, tham dự', phonetic: '/teɪk/' },
  { v1: 'teach', v2: 'taught', v3: 'taught', meaning: 'dạy dỗ, giảng dạy', phonetic: '/tiːtʃ/' },
  { v1: 'tell', v2: 'told', v3: 'told', meaning: 'kể lại, bảo rằng', phonetic: '/tel/' },
  { v1: 'think', v2: 'thought', v3: 'thought', meaning: 'suy nghĩ, cân nhắc', phonetic: '/θɪŋk/' },
  { v1: 'understand', v2: 'understood', v3: 'understood', meaning: 'thấu hiểu', phonetic: '/ˌʌndəˈstænd/' },
  { v1: 'wear', v2: 'wore', v3: 'worn', meaning: 'mặc đồ, đeo kính', phonetic: '/weə(r)/' },
  { v1: 'win', v2: 'won', v3: 'won', meaning: 'chiến thắng, đoạt giải', phonetic: '/wɪn/' },
  { v1: 'write', v2: 'wrote', v3: 'written', meaning: 'viết lách, soạn thảo', phonetic: '/raɪt/' }
];

// -------------------------------------------------------------
// 4. CHINESE PINYIN FOUNDATIONS (21 THANH MẪU & 36 VẬN MẪU)
// -------------------------------------------------------------
export const CHINESE_INITIALS: ChinesePinyinSound[] = [
  { pinyin: 'b', ipa: '[p]', vietnameseApprox: 'Như "p" trong tiếng Việt (bật nhẹ không khạc hơi)', exampleChar: '爸', examplePinyin: 'bà', exampleMeaning: 'bố, ba' },
  { pinyin: 'p', ipa: '[pʰ]', vietnameseApprox: 'Như "p" nhưng bật luồng hơi cực mạnh (khạc hơi)', exampleChar: '跑', examplePinyin: 'pǎo', exampleMeaning: 'chạy bộ' },
  { pinyin: 'm', ipa: '[m]', vietnameseApprox: 'Giống chữ "m" trong tiếng Việt', exampleChar: '妈', examplePinyin: 'mā', exampleMeaning: 'mẹ' },
  { pinyin: 'f', ipa: '[f]', vietnameseApprox: 'Giống chữ "ph" trong tiếng Việt', exampleChar: '发', examplePinyin: 'fā', exampleMeaning: 'phát triển' },
  { pinyin: 'd', ipa: '[t]', vietnameseApprox: 'Đọc như chữ "t" trong tiếng Việt', exampleChar: '大', examplePinyin: 'dà', exampleMeaning: 'to, lớn' },
  { pinyin: 't', ipa: '[tʰ]', vietnameseApprox: 'Đọc như chữ "th" trong tiếng Việt, bật luồng hơi mạnh', exampleChar: '天', examplePinyin: 'tiān', exampleMeaning: 'trời, ngày' },
  { pinyin: 'n', ipa: '[n]', vietnameseApprox: 'Giống chữ "n" trong tiếng Việt', exampleChar: '你', examplePinyin: 'nǐ', exampleMeaning: 'bạn, anh' },
  { pinyin: 'l', ipa: '[l]', vietnameseApprox: 'Giống chữ "l" trong tiếng Việt', exampleChar: '来', examplePinyin: 'lái', exampleMeaning: 'đến, lại' },
  { pinyin: 'g', ipa: '[k]', vietnameseApprox: 'Đọc như chữ "c/k" trong tiếng Việt (không bật hơi)', exampleChar: '哥', examplePinyin: 'gē', exampleMeaning: 'anh trai' },
  { pinyin: 'k', ipa: '[kʰ]', vietnameseApprox: 'Đọc như chữ "kh" nhưng bật hơi từ cuống họng', exampleChar: '开', examplePinyin: 'kāi', exampleMeaning: 'mở, khởi' },
  { pinyin: 'h', ipa: '[x]', vietnameseApprox: 'Đọc lai giữa chữ "h" và "kh" nhẹ', exampleChar: '好', examplePinyin: 'hǎo', exampleMeaning: 'tốt, đẹp' },
  { pinyin: 'j', ipa: '[tɕ]', vietnameseApprox: 'Mặt lưỡi áp ngạc cứng, đọc như "ch" không bật hơi', exampleChar: '家', examplePinyin: 'jiā', exampleMeaning: 'nhà, gia đình' },
  { pinyin: 'q', ipa: '[tɕʰ]', vietnameseApprox: 'Giống "ch" nhưng bật hơi thật mạnh qua kẽ răng', exampleChar: '钱', examplePinyin: 'qián', exampleMeaning: 'tiền bạc' },
  { pinyin: 'x', ipa: '[ɕ]', vietnameseApprox: 'Đọc như "x" nhẹ trong tiếng Việt, kéo khóe miệng', exampleChar: '小', examplePinyin: 'xiǎo', exampleMeaning: 'nhỏ, bé' },
  { pinyin: 'zh', ipa: '[ʈʂ]', vietnameseApprox: 'Uốn lưỡi chạm ngạc cứng, đọc như "tr" không bật hơi', exampleChar: '中', examplePinyin: 'zhōng', exampleMeaning: 'trung tâm, giữa' },
  { pinyin: 'ch', ipa: '[ʈʂʰ]', vietnameseApprox: 'Uốn cong lưỡi như "zh" nhưng bật hơi thật mạnh', exampleChar: '吃', examplePinyin: 'chī', exampleMeaning: 'ăn uống' },
  { pinyin: 'sh', ipa: '[ʂ]', vietnameseApprox: 'Uốn lưỡi đọc như "s nặng / sài gòn" tiếng Việt', exampleChar: '水', examplePinyin: 'shuǐ', exampleMeaning: 'nước' },
  { pinyin: 'r', ipa: '[ʐ]', vietnameseApprox: 'Uốn cong lưỡi, rung nhẹ như âm "r" tiếng Việt', exampleChar: '日', examplePinyin: 'rì', exampleMeaning: 'ngày, mặt trời' },
  { pinyin: 'z', ipa: '[ts]', vietnameseApprox: 'Đầu lưỡi thẳng chạm răng, đọc như "ch" nhẹ', exampleChar: '早', examplePinyin: 'zǎo', exampleMeaning: 'sớm' },
  { pinyin: 'c', ipa: '[tsʰ]', vietnameseApprox: 'Đầu lưỡi thẳng chạm răng và bật hơi xì mạnh', exampleChar: '菜', examplePinyin: 'cài', exampleMeaning: 'món ăn, rau' },
  { pinyin: 's', ipa: '[s]', vietnameseApprox: 'Đầu lưỡi thẳng áp răng, đọc như "x" nhẹ tiếng Việt', exampleChar: '三', examplePinyin: 'sān', exampleMeaning: 'số ba' }
];

export const CHINESE_FINALS: ChinesePinyinSound[] = [
  { pinyin: 'a', ipa: '[a]', vietnameseApprox: 'Đọc như "a" tiếng Việt', exampleChar: '爸', examplePinyin: 'bà', exampleMeaning: 'bố' },
  { pinyin: 'o', ipa: '[o]', vietnameseApprox: 'Đọc như "ua" hoặc "ô" hơi tròn môi', exampleChar: '波', examplePinyin: 'bō', exampleMeaning: 'sóng' },
  { pinyin: 'e', ipa: '[ɤ]', vietnameseApprox: 'Đọc như "ơ" hoặc "ưa" trong tiếng Việt', exampleChar: '饿', examplePinyin: 'è', exampleMeaning: 'đói' },
  { pinyin: 'i', ipa: '[i]', vietnameseApprox: 'Đọc như "i" (sau zh, ch, sh, r, z, c, s đọc là "ư")', exampleChar: '一', examplePinyin: 'yī', exampleMeaning: 'số một' },
  { pinyin: 'u', ipa: '[u]', vietnameseApprox: 'Đọc như "u" trong tiếng Việt', exampleChar: '五', examplePinyin: 'wǔ', exampleMeaning: 'số năm' },
  { pinyin: 'ü', ipa: '[y]', vietnameseApprox: 'Tròn môi phát âm chữ "uy" giữ nguyên khuôn miệng', exampleChar: '鱼', examplePinyin: 'yú', exampleMeaning: 'con cá' },
  { pinyin: 'ai', ipa: '[aɪ]', vietnameseApprox: 'Đọc như "ai" tiếng Việt', exampleChar: '爱', examplePinyin: 'ài', exampleMeaning: 'yêu thương' },
  { pinyin: 'ei', ipa: '[eɪ]', vietnameseApprox: 'Đọc như "ây" tiếng Việt', exampleChar: '杯', examplePinyin: 'bēi', exampleMeaning: 'ly, cốc' },
  { pinyin: 'ao', ipa: '[aʊ]', vietnameseApprox: 'Đọc như "ao" tiếng Việt', exampleChar: '高', examplePinyin: 'gāo', exampleMeaning: 'cao ráo' },
  { pinyin: 'ou', ipa: '[oʊ]', vietnameseApprox: 'Đọc như "âu" tiếng Việt', exampleChar: '口', examplePinyin: 'kǒu', exampleMeaning: 'miệng' },
  { pinyin: 'an', ipa: '[an]', vietnameseApprox: 'Đọc như "an" tiếng Việt', exampleChar: '安', examplePinyin: 'ān', exampleMeaning: 'bình an' },
  { pinyin: 'en', ipa: '[ən]', vietnameseApprox: 'Đọc như "ân" tiếng Việt', exampleChar: '很', examplePinyin: 'hěn', exampleMeaning: 'rất' },
  { pinyin: 'ang', ipa: '[ɑŋ]', vietnameseApprox: 'Đọc như "ang" tiếng Việt', exampleChar: '忙', examplePinyin: 'máng', exampleMeaning: 'bận rộn' },
  { pinyin: 'eng', ipa: '[ɤŋ]', vietnameseApprox: 'Đọc như "âng" tiếng Việt', exampleChar: '能', examplePinyin: 'néng', exampleMeaning: 'có thể' },
  { pinyin: 'ong', ipa: '[ʊŋ]', vietnameseApprox: 'Đọc như "ung" tiếng Việt', exampleChar: '红', examplePinyin: 'hóng', exampleMeaning: 'màu đỏ' }
];

// -------------------------------------------------------------
// 5. CHINESE 8 BASIC STROKES & 7 STROKE ORDER RULES
// -------------------------------------------------------------
export const CHINESE_STROKES: ChineseStrokeRule[] = [
  { name: 'Nét Ngang (Héng)', chinese: '一', pinyin: 'héng', direction: 'Từ trái sang phải (ngang bằng hoặc hơi chếch lên nhẹ)', exampleChar: '三', explanation: 'Nét cơ bản nhất, tạo độ cân bằng cho chữ.' },
  { name: 'Nét Sổ (Shù)', chinese: '丨', pinyin: 'shù', direction: 'Từ trên kéo thẳng đứng xuống dưới', exampleChar: '十', explanation: 'Cột trụ thẳng đứng tạo trục cho chữ Hán.' },
  { name: 'Nét Phẩy (Piě)', chinese: '丿', pinyin: 'piě', direction: 'Từ trên vuốt nghiêng cong về bên trái', exampleChar: '八', explanation: 'Tạo nét thanh thoát cho chữ.' },
  { name: 'Nét Mác (Nà)', chinese: '乀', pinyin: 'nà', direction: 'Từ trên kéo nghiêng xuống bên phải rồi ấn đậm nhấc bút', exampleChar: '人', explanation: 'Thường đối xứng với nét phẩy.' },
  { name: 'Nét Chấm (Diǎn)', chinese: '丶', pinyin: 'diǎn', direction: 'Nhẹ nhàng ấn bút từ trên xuống hơi chếch', exampleChar: '六', explanation: 'Điểm nhấn quan trọng trong rất nhiều bộ thủ.' },
  { name: 'Nét Hất (Tí)', chinese: '提', pinyin: 'tí', direction: 'Từ góc dưới bên trái hất vát nhanh lên góc trên bên phải', exampleChar: '地', explanation: 'Thường nằm ở bên trái trong các bộ như bộ Thổ, bộ Thủ.' },
  { name: 'Nét Móc (Gōu)', chinese: '亅', pinyin: 'gōu', direction: 'Kết hợp sau nét sổ hoặc ngang, móc nhọn về một hướng', exampleChar: '小', explanation: 'Gồm móc đứng, móc ngang, móc vòng.' },
  { name: 'Nét Gập (Zhé)', chinese: '𠃍', pinyin: 'zhé', direction: 'Đi ngang hoặc sổ rồi bẻ góc gập theo hướng khác mà không nhấc bút', exampleChar: '口', explanation: 'Tạo khung hộp cho các chữ vuông vắn.' }
];

export const CHINESE_STROKE_ORDER_RULES = [
  { rule: '1. Ngang trước, sổ sau', example: '十 (Ngang 一 trước, sau đó Sổ 丨)', desc: 'Khi nét ngang và nét sổ giao nhau, viết nét ngang trước.' },
  { rule: '2. Phẩy trước, mác sau', example: '人 (Phẩy 丿 bên trái trước, Mác ㇏ bên phải sau)', desc: 'Hai nét chéo nhau hoặc xòe ra hai bên, viết phẩy trước mác sau.' },
  { rule: '3. Trên trước, dưới sau', example: '三 (Viết nét ngang trên cùng, ngang giữa, ngang dưới)', desc: 'Chữ có kết cấu tầng lớp trên dưới, viết từ trên xuống dưới.' },
  { rule: '4. Trái trước, phải sau', example: '你 (Viết bộ Nhân đứng 亻 bên trái trước, phần bên phải sau)', desc: 'Chữ có kết cấu trái phải, luôn viết phần bên trái trước.' },
  { rule: '5. Ngoài trước, trong sau', example: '同 (Viết khung viền chữ U lộn ngược trước, viết ruột sau)', desc: 'Chữ có bao quanh 3 mặt hoặc 2 mặt, viết khung ngoài trước.' },
  { rule: '6. Vào trước, đóng sau', example: '国 (Vẽ khung 3 cạnh, viết chữ 玉 ở giữa, rồi gạch đáy đóng hộp)', desc: 'Chữ có bao quanh kín 4 mặt: rước khách vào nhà rồi mới đóng cửa lại.' },
  { rule: '7. Giữa trước, hai bên sau', example: '小 (Viết nét sổ móc ở giữa trước, rồi hai nét chấm hai bên)', desc: 'Chữ có trục giữa và hai bên đối xứng cân xứng.' }
];

// -------------------------------------------------------------
// 6. COMMON CHINESE RADICALS (BỘ THỦ THƯỜNG GẶP NHẤT)
// -------------------------------------------------------------
export const COMMON_CHINESE_RADICALS: ChineseRadical[] = [
  {
    radical: '亻 (人)',
    pinyin: 'rén',
    sinoVietnamese: 'Nhân (người)',
    meaning: 'Liên quan đến con người, hành vi của con người',
    examples: [
      { char: '你', pinyin: 'nǐ', meaning: 'bạn, anh' },
      { char: '他', pinyin: 'tā', meaning: 'anh ấy' },
      { char: '休', pinyin: 'xiū', meaning: 'nghỉ ngơi (người dựa vào gốc cây)' }
    ]
  },
  {
    radical: '氵 (水)',
    pinyin: 'shuǐ',
    sinoVietnamese: 'Thủy (nước)',
    meaning: 'Liên quan đến nước, chất lỏng, sông ngòi, biển cả',
    examples: [
      { char: '海', pinyin: 'hǎi', meaning: 'biển cả' },
      { char: '河', pinyin: 'hé', meaning: 'dòng sông' },
      { char: '洗', pinyin: 'xǐ', meaning: 'rửa, giặt giũ' }
    ]
  },
  {
    radical: '口',
    pinyin: 'kǒu',
    sinoVietnamese: 'Khẩu (miệng)',
    meaning: 'Liên quan đến cái miệng, ăn uống, lời nói, phát âm',
    examples: [
      { char: '吃', pinyin: 'chī', meaning: 'ăn uống' },
      { char: '喝', pinyin: 'hē', meaning: 'uống nước' },
      { char: '叫', pinyin: 'jiào', meaning: 'kêu, gọi' }
    ]
  },
  {
    radical: '扌 (手)',
    pinyin: 'shǒu',
    sinoVietnamese: 'Thủ (tay)',
    meaning: 'Liên quan đến bàn tay và các động tác cử động của tay',
    examples: [
      { char: '打', pinyin: 'dǎ', meaning: 'đánh, chơi bóng' },
      { char: '提', pinyin: 'tí', meaning: 'xách, nhấc lên' },
      { char: '找', pinyin: 'zhǎo', meaning: 'tìm kiếm' }
    ]
  },
  {
    radical: '忄 / 心',
    pinyin: 'xīn',
    sinoVietnamese: 'Tâm (trái tim/tâm trí)',
    meaning: 'Liên quan đến cảm xúc, suy nghĩ, tâm trạng, tình cảm',
    examples: [
      { char: '想', pinyin: 'xiǎng', meaning: 'nhớ, suy nghĩ' },
      { char: '怕', pinyin: 'pà', meaning: 'lo sợ' },
      { char: '情', pinyin: 'qíng', meaning: 'tình cảm' }
    ]
  },
  {
    radical: '木',
    pinyin: 'mù',
    sinoVietnamese: 'Mộc (cây cối/gỗ)',
    meaning: 'Liên quan đến thực vật, cây rừng, gỗ, đồ đạc bằng gỗ',
    examples: [
      { char: '林', pinyin: 'lín', meaning: 'khu rừng' },
      { char: '桌', pinyin: 'zhuō', meaning: 'cái bàn' },
      { char: '桥', pinyin: 'qiáo', meaning: 'cây cầu' }
    ]
  },
  {
    radical: '火 / 灬',
    pinyin: 'huǒ',
    sinoVietnamese: 'Hỏa (lửa)',
    meaning: 'Liên quan đến lửa, nhiệt độ, nấu nướng, thiêu đốt',
    examples: [
      { char: '热', pinyin: 'rè', meaning: 'nóng bức' },
      { char: '烧', pinyin: 'shāo', meaning: 'đốt, nướng' },
      { char: '灯', pinyin: 'dēng', meaning: 'đèn' }
    ]
  },
  {
    radical: '讠 (言)',
    pinyin: 'yán',
    sinoVietnamese: 'Ngôn (lời nói)',
    meaning: 'Liên quan đến ngôn ngữ, lời nói, đối thoại, diễn thuyết',
    examples: [
      { char: '话', pinyin: 'huà', meaning: 'lời nói' },
      { char: '语', pinyin: 'yǔ', meaning: 'ngôn ngữ' },
      { char: '请', pinyin: 'qǐng', meaning: 'mời, xin vui lòng' }
    ]
  },
  {
    radical: '女',
    pinyin: 'nǚ',
    sinoVietnamese: 'Nữ (phụ nữ)',
    meaning: 'Liên quan đến phái nữ, gia đình, hôn nhân',
    examples: [
      { char: '妈', pinyin: 'mā', meaning: 'mẹ' },
      { char: '妹', pinyin: 'mèi', meaning: 'em gái' },
      { char: '好', pinyin: 'hǎo', meaning: 'tốt đẹp (mẹ và con)' }
    ]
  },
  {
    radical: '日',
    pinyin: 'rì',
    sinoVietnamese: 'Nhật (mặt trời/ngày)',
    meaning: 'Liên quan đến thời gian, ánh sáng mặt trời, ban ngày',
    examples: [
      { char: '明', pinyin: 'míng', meaning: 'sáng sủa, ngày mai' },
      { char: '早', pinyin: 'zǎo', meaning: 'buổi sáng sớm' },
      { char: '时', pinyin: 'shí', meaning: 'thời gian' }
    ]
  },
  {
    radical: '目',
    pinyin: 'mù',
    sinoVietnamese: 'Mục (mắt)',
    meaning: 'Liên quan đến đôi mắt, cái nhìn, thị giác',
    examples: [
      { char: '看', pinyin: 'kàn', meaning: 'nhìn, xem sách' },
      { char: '睛', pinyin: 'jīng', meaning: 'tròng mắt' },
      { char: '睡', pinyin: 'shuì', meaning: 'ngủ (mắt nhắm lại)' }
    ]
  },
  {
    radical: '辶 (辵)',
    pinyin: 'chuò',
    sinoVietnamese: 'Quai xước (bước đi)',
    meaning: 'Liên quan đến đi lại, khoảng cách, di chuyển trên đường',
    examples: [
      { char: '近', pinyin: 'jìn', meaning: 'gần gũi' },
      { char: '远', pinyin: 'yuǎn', meaning: 'xa xôi' },
      { char: '进', pinyin: 'jìn', meaning: 'tiến vào' }
    ]
  }
];
