import fs from 'fs';
import path from 'path';

// Rich Oxford English Vocabulary Generator (>700 words)
// Levels: A1, A2, B1, B2, C1

const englishA1Raw = [
  // Unit 1: Greetings & Introduction
  ['Greet', '/ɡriːt/', 'verb', 'chào hỏi, chào đón', 'She greeted the guests with a warm smile.', 'Cô ấy chào đón các vị khách bằng một nụ cười ấm áp.', 'greet warmly', 'Gặp Rồi Em Êm Tai -> chào hỏi.'],
  ['Introduce', '/ˌɪn.trəˈdjuːs/', 'verb', 'giới thiệu, làm quen', 'Let me introduce my best friend, Sarah.', 'Để tôi giới thiệu người bạn thân nhất của tôi, Sarah.', 'introduce yourself', 'Intro = mở đầu, bước vào làm quen.'],
  ['Welcome', '/ˈwel.kəm/', 'verb', 'chào mừng, hoan nghênh', 'Welcome to our university!', 'Chào mừng bạn đến với trường đại học của chúng tôi!', 'warm welcome', 'Well + come = đến một cách tốt lành.'],
  ['Name', '/neɪm/', 'noun', 'tên gọi, danh xưng', 'What is your full name?', 'Tên đầy đủ của bạn là gì?', 'first name, last name', 'Từ căn bản bậc nhất trong giao tiếp.'],
  ['Age', '/eɪdʒ/', 'noun', 'tuổi, độ tuổi', 'Children under the age of five travel free.', 'Trẻ em dưới năm tuổi được đi lại miễn phí.', 'at the age of', 'Hỏi tuổi: What is your age?'],
  ['Live', '/lɪv/', 'verb', 'sống, cư ngụ', 'I live in a peaceful neighborhood.', 'Tôi sống ở một khu phố yên bình.', 'live in a city', 'Phân biệt live /lɪv/ (sống) và life /laɪf/ (cuộc sống).'],
  ['Country', '/ˈkʌn.tri/', 'noun', 'quốc gia, đất nước', 'Vietnam is a beautiful country.', 'Việt Nam là một đất nước tươi đẹp.', 'foreign country', 'Country còn có nghĩa là vùng quê (in the country).'],
  ['Nationality', '/ˌnæʃ.ənˈæl.ə.ti/', 'noun', 'quốc tịch', 'She has dual British and American nationality.', 'Cô ấy có hai quốc tịch Anh và Mỹ.', 'hold nationality', 'Gốc nation (quốc gia) + ality.'],
  ['Language', '/ˈlæŋ.ɡwɪdʒ/', 'noun', 'ngôn ngữ, tiếng', 'Learning a new language opens new opportunities.', 'Học một ngôn ngữ mới mở ra nhiều cơ hội mới.', 'native language', 'Âm /ɡwɪdʒ/ cần chú ý tròn môi.'],
  ['Friend', '/frend/', 'noun', 'người bạn, bạn bè', 'A good friend is always there for you.', 'Một người bạn tốt luôn ở bên cạnh bạn.', 'close friend', 'Âm e ngắn, đừng phát âm nhầm thành fri-end.'],
  ['Meet', '/miːt/', 'verb', 'gặp gỡ, làm quen', 'Pleased to meet you in person.', 'Rất vui được gặp bạn trực tiếp.', 'meet someone at', 'Âm i dài /iː/.'],
  ['Address', '/əˈdres/', 'noun', 'địa chỉ nhà', 'Please write your home address here.', 'Vui lòng viết địa chỉ nhà của bạn vào đây.', 'email address', 'Trọng âm rơi vào âm tiết thứ hai /dres/.'],
  ['Number', '/ˈnʌm.bər/', 'noun', 'con số, số điện thoại', 'Could you give me your phone number?', 'Bạn có thể cho tôi số điện thoại của bạn không?', 'phone number', 'Number còn có nghĩa là số lượng.'],
  ['Email', '/ˈiː.meɪl/', 'noun', 'thư điện tử', 'I will send you the details by email.', 'Tôi sẽ gửi cho bạn thông tin chi tiết qua email.', 'send an email', 'E = Electronic (điện tử).'],
  ['Spell', '/spel/', 'verb', 'đánh vần chữ cái', 'How do you spell your family name?', 'Bạn đánh vần họ của bạn như thế nào?', 'spell out loud', 'Cần thiết khi giao tiếp với người nước ngoài.'],

  // Unit 2: Family & Relationships
  ['Parent', '/ˈpeə.rənt/', 'noun', 'cha mẹ, phụ huynh', 'Both of my parents are high school teachers.', 'Cả bố và mẹ tôi đều là giáo viên trung học.', 'single parent', 'Số nhiều parents chỉ cả cha lẫn mẹ.'],
  ['Sibling', '/ˈsɪb.lɪŋ/', 'noun', 'anh chị em ruột', 'Do you have any siblings?', 'Bạn có anh chị em ruột nào không?', 'sibling rivalry', 'Thuật ngữ chuẩn bao gồm cả anh, chị, em.'],
  ['Mother', '/ˈmʌð.ər/', 'noun', 'mẹ, người mẹ', 'My mother cooks the most delicious pho.', 'Mẹ tôi nấu món phở ngon nhất.', 'mother tongue', 'Âm /ð/ rung đầu lưỡi giữa hai hàm răng.'],
  ['Father', '/ˈfɑː.ðər/', 'noun', 'cha, người cha', 'His father works as an architect.', 'Bố của anh ấy làm kiến trúc sư.', 'like father like son', 'Âm a dài sâu /ɑː/.'],
  ['Brother', '/ˈbrʌð.ər/', 'noun', 'anh trai, em trai', 'My elder brother is studying abroad in Japan.', 'Anh trai tôi đang đi du học ở Nhật Bản.', 'elder/younger brother', 'Thêm elder (lớn hơn) hoặc younger (nhỏ hơn).'],
  ['Sister', '/ˈsɪs.tər/', 'noun', 'chị gái, em gái', 'She shares a room with her younger sister.', 'Cô ấy ở chung phòng với em gái của mình.', 'elder/younger sister', 'Từ rất thông dụng trong đời sống gia đình.'],
  ['Child', '/tʃaɪld/', 'noun', 'đứa trẻ, con cái', 'As a child, he loved drawing pictures.', 'Khi còn là một đứa trẻ, cậu ấy rất thích vẽ tranh.', 'only child', 'Số nhiều bất quy tắc là children /ˈtʃɪl.drən/.'],
  ['Family', '/ˈfæm.əl.i/', 'noun', 'gia đình, dòng tộc', 'Family always comes first in my life.', 'Gia đình luôn đứng đầu trong cuộc đời tôi.', 'nuclear family', 'Trọng âm âm tiết thứ nhất /fæm/.'],
  ['Daughter', '/ˈdɔː.tər/', 'noun', 'con gái', 'Their daughter is learning to play the piano.', 'Con gái của họ đang học chơi đàn piano.', 'have a daughter', 'Âm /ɔː/ dài, chữ gh câm.'],
  ['Son', '/sʌn/', 'noun', 'con trai', 'They are very proud of their hard-working son.', 'Họ rất tự hào về người con trai chăm chỉ của mình.', 'eldest son', 'Đồng âm với sun (mặt trời) /sʌn/.'],
  ['Husband', '/ˈhʌz.bənd/', 'noun', 'chồng', 'Her husband works at an international bank.', 'Chồng của cô ấy làm việc tại một ngân hàng quốc tế.', 'loving husband', 'Âm z ở giữa /ˈhʌz.bənd/.'],
  ['Wife', '/waɪf/', 'noun', 'vợ', 'He bought flowers for his wife on her birthday.', 'Anh ấy mua hoa tặng vợ nhân ngày sinh nhật.', 'take a wife', 'Số nhiều đổi f thành ves: wives /waɪvz/.'],
  ['Uncle', '/ˈʌŋ.kəl/', 'noun', 'chú, bác, cậu', 'My uncle owns a fruit farm in the countryside.', 'Bác tôi sở hữu một trang trại trái cây ở vùng quê.', 'favorite uncle', 'Âm ng /ŋ/ ở giữa từ.'],
  ['Aunt', '/ɑːnt/', 'noun', 'cô, dì, bác gái', 'Aunt Mary visits us every summer.', 'Dì Mary đến thăm chúng tôi mỗi dịp hè.', 'great aunt', 'Phát âm /ɑːnt/ (Anh-Anh) hoặc /ænt/ (Anh-Mỹ).'],
  ['Cousin', '/ˈkʌz.ən/', 'noun', 'anh chị em họ', 'I went camping with my cousins last weekend.', 'Tôi đi cắm trại cùng các anh chị em họ vào cuối tuần trước.', 'first cousin', 'Dùng chung cho cả nam lẫn nữ.'],

  // Unit 3: Daily Routine & Home
  ['House', '/haʊs/', 'noun', 'ngôi nhà', 'They bought a small house near the river.', 'Họ đã mua một ngôi nhà nhỏ gần bờ sông.', 'in the house', 'Danh từ phát âm /haʊs/, động từ phát âm /haʊz/.'],
  ['Kitchen', '/ˈkɪtʃ.ən/', 'noun', 'nhà bếp, gian bếp', 'The kitchen smells like freshly baked bread.', 'Căn bếp thơm mùi bánh mì vừa mới nướng.', 'open kitchen', 'Âm /tʃ/ bật hơi rõ.'],
  ['Bedroom', '/ˈbed.ruːm/', 'noun', 'phòng ngủ', 'Her bedroom has a large window facing east.', 'Phòng ngủ của cô ấy có một cửa sổ lớn hướng đông.', 'master bedroom', 'Bed (giường) + room (phòng).'],
  ['Bathroom', '/ˈbɑːθ.ruːm/', 'noun', 'phòng tắm, nhà vệ sinh', 'Please wash your hands in the bathroom.', 'Vui lòng rửa tay của bạn trong phòng tắm.', 'private bathroom', 'Bath (tắm) + room.'],
  ['Table', '/ˈteɪ.bəl/', 'noun', 'cái bàn', 'Dinner is ready on the dining table.', 'Bữa tối đã sẵn sàng trên bàn ăn.', 'dining table', 'Thành ngữ: on the table (đang bàn bạc).'],
  ['Chair', '/tʃeər/', 'noun', 'cái ghế', 'Please pull up a chair and join us.', 'Xin mời kéo một chiếc ghế lại và cùng tham gia với chúng tôi.', 'armchair', 'Ghế tựa có tay vịn gọi là armchair.'],
  ['Door', '/dɔːr/', 'noun', 'cánh cửa ra vào', 'Do not forget to lock the front door.', 'Đừng quên khóa cửa chính phía trước.', 'front door', 'Open the door / Close the door.'],
  ['Window', '/ˈwɪn.dəʊ/', 'noun', 'cửa sổ', 'Open the window to let fresh air in.', 'Hãy mở cửa sổ để đón không khí trong lành vào.', 'glass window', 'Âm kết thúc /dəʊ/.'],
  ['Wake', '/weɪk/', 'verb', 'thức giấc, thức dậy', 'I usually wake up at six every morning.', 'Tôi thường thức giấc lúc sáu giờ mỗi sáng.', 'wake up early', 'Thường đi kèm giới từ up: wake up.'],
  ['Brush', '/brʌʃ/', 'verb', 'đánh răng, chải tóc', 'Remember to brush your teeth twice a day.', 'Nhớ đánh răng hai lần mỗi ngày.', 'brush your teeth', 'Âm /ʃ/ cuối từ.'],
  ['Cook', '/kʊk/', 'verb', 'nấu ăn, làm bếp', 'She loves to cook traditional meals on weekends.', 'Cô ấy thích nấu các bữa ăn truyền thống vào cuối tuần.', 'cook dinner', 'Cooker là cái nồi/bếp, người nấu là cook.'],
  ['Clean', '/kliːn/', 'verb', 'lau dọn, làm sạch', 'We clean the living room every Sunday morning.', 'Chúng tôi dọn dẹp phòng khách mỗi sáng chủ nhật.', 'clean up', 'Tính từ clean nghĩa là sạch sẽ.'],
  ['Shower', '/ˈʃaʊ.ər/', 'noun', 'vòi hoa sen, tắm vòi sen', 'A cold shower is refreshing after exercise.', 'Tắm vòi sen nước mát thật sảng khoái sau khi tập thể dục.', 'take a shower', 'Cụm từ cố định: take a shower.'],
  ['Breakfast', '/ˈbrek.fəst/', 'noun', 'bữa ăn sáng', 'Breakfast is the most important meal of the day.', 'Bữa sáng là bữa ăn quan trọng nhất trong ngày.', 'have breakfast', 'Break (phá vỡ) + fast (nhịn ăn) = bữa điểm tâm.'],
  ['Sleep', '/sliːp/', 'verb', 'ngủ, nghỉ ngơi', 'You need to sleep at least seven hours each night.', 'Bạn cần ngủ ít nhất bảy tiếng mỗi đêm.', 'go to sleep', 'Nguyên âm /iː/ kéo dài.'],

  // Unit 4: Food & Beverages
  ['Food', '/fuːd/', 'noun', 'thức ăn, thực phẩm', 'Good food brings people together.', 'Thức ăn ngon gắn kết mọi người lại với nhau.', 'fast food, fresh food', 'Danh từ không đếm được phổ biến.'],
  ['Water', '/ˈwɔː.tər/', 'noun', 'nước uống', 'Drink plenty of water throughout the day.', 'Hãy uống nhiều nước trong suốt cả ngày.', 'bottled water', 'Nhu cầu thiết yếu cho cơ thể.'],
  ['Bread', '/bred/', 'noun', 'bánh mì', 'He bought a loaf of whole-wheat bread.', 'Anh ấy đã mua một ổ bánh mì nguyên cám.', 'a loaf of bread', 'Lưu ý ea phát âm là /e/, không phải /iː/.'],
  ['Milk', '/mɪlk/', 'noun', 'sữa tươi', 'She drinks a warm glass of milk before sleeping.', 'Cô ấy uống một ly sữa ấm trước khi đi ngủ.', 'fresh milk', 'Âm kết thúc /lk/.'],
  ['Rice', '/raɪs/', 'noun', 'cơm, gạo', 'Rice is the staple food in Asian countries.', 'Cơm là lương thực chính ở các nước châu Á.', 'fried rice', 'Phát âm /raɪs/ với âm /s/ rõ ràng.'],
  ['Meat', '/miːt/', 'noun', 'thịt', 'He prefers white meat like chicken and fish.', 'Anh ấy thích thịt trắng như thịt gà và cá hơn.', 'red meat', 'Đồng âm với meet (gặp mặt).'],
  ['Fish', '/fɪʃ/', 'noun', 'cá', 'Eating fish twice a week is good for your heart.', 'Ăn cá hai lần một tuần rất tốt cho tim mạch của bạn.', 'fresh fish', 'Số nhiều của fish vẫn là fish.'],
  ['Fruit', '/fruːt/', 'noun', 'trái cây, hoa quả', 'Eating fresh fruit boosts your immune system.', 'Ăn trái cây tươi giúp tăng cường hệ miễn dịch.', 'fresh fruit', 'Nguyên âm /uː/, chữ i câm.'],
  ['Vegetable', '/ˈvedʒ.tə.bəl/', 'noun', 'rau củ quả', 'Children should eat more green vegetables.', 'Trẻ em nên ăn nhiều rau xanh hơn.', 'raw vegetables', 'Trọng âm âm tiết đầu, phát âm 3 âm tiết /ˈvedʒ.tə.bəl/.'],
  ['Egg', '/eɡ/', 'noun', 'quả trứng', 'She had two boiled eggs for breakfast.', 'Cô ấy đã ăn hai quả trứng luộc cho bữa sáng.', 'boiled egg', 'Từ ngắn gọn, bắt đầu bằng nguyên âm e.'],
  ['Tea', '/tiː/', 'noun', 'trà, chè', 'Would you like a cup of green tea?', 'Bạn có muốn dùng một tách trà xanh không?', 'green tea', 'Văn hóa uống trà phổ biến toàn cầu.'],
  ['Coffee', '/ˈkɒf.i/', 'noun', 'cà phê', 'He enjoys a cup of black coffee every morning.', 'Anh ấy thích thưởng thức một tách cà phê đen mỗi sáng.', 'black coffee', 'Trọng âm âm tiết đầu /ˈkɒf.i/.'],
  ['Sugar', '/ˈʃʊɡ.ər/', 'noun', 'đường kính', 'Too much sugar is harmful to your teeth.', 'Quá nhiều đường sẽ gây hại cho răng của bạn.', 'brown sugar', 'Bắt đầu bằng âm /ʃ/ dù viết là s.'],
  ['Salt', '/sɒlt/', 'noun', 'muối ăn', 'Add a pinch of salt to balance the flavor.', 'Thêm một nhúm muối để cân bằng hương vị.', 'a pinch of salt', 'Âm /ɒ/ hoặc /ɔː/.'],
  ['Delicious', '/dɪˈlɪʃ.əs/', 'adj', 'thơm ngon, ngon miệng', 'This noodle soup is absolutely delicious!', 'Món súp mì này thực sự ngon tuyệt vời!', 'taste delicious', 'Trọng âm âm tiết thứ hai /lɪʃ/.'],

  // Unit 5: Time, Weather & Calendar
  ['Today', '/təˈdeɪ/', 'noun', 'hôm nay', 'Today is a wonderful day to start learning.', 'Hôm nay là một ngày tuyệt vời để bắt đầu học tập.', 'today is', 'Trọng âm rơi vào âm tiết thứ hai.'],
  ['Tomorrow', '/təˈmɒr.əʊ/', 'noun', 'ngày mai', 'We have an important meeting tomorrow morning.', 'Chúng ta có một cuộc họp quan trọng vào sáng mai.', 'tomorrow afternoon', 'Nhấn âm thứ hai /mɒr/.'],
  ['Yesterday', '/ˈjes.tə.deɪ/', 'noun', 'hôm qua', 'I finished reading the novel yesterday.', 'Tôi đã đọc xong cuốn tiểu thuyết ngày hôm qua.', 'yesterday night', 'Trọng âm âm tiết đầu /ˈjes/.'],
  ['Morning', '/ˈmɔː.nɪŋ/', 'noun', 'buổi sáng', 'Good morning everyone, let us begin our lesson.', 'Chào buổi sáng mọi người, chúng ta hãy bắt đầu bài học.', 'in the morning', 'Chào: Good morning.'],
  ['Afternoon', '/ˌɑːf.təˈnuːn/', 'noun', 'buổi chiều', 'The library gets quiet in the late afternoon.', 'Thư viện trở nên yên tĩnh vào lúc xế chiều.', 'in the afternoon', 'Trọng âm chính ở /nuːn/.'],
  ['Evening', '/ˈiːv.nɪŋ/', 'noun', 'buổi tối', 'We like going for a walk in the evening.', 'Chúng tôi thích đi dạo vào buổi tối.', 'in the evening', 'Phát âm hai âm tiết /ˈiːv.nɪŋ/.'],
  ['Night', '/naɪt/', 'noun', 'đêm, ban đêm', 'The stars shine brightly in the dark night sky.', 'Những vì sao tỏa sáng rực rỡ trên bầu trời đêm.', 'at night', 'Dùng giới từ at night (không dùng in night).'],
  ['Hour', '/aʊər/', 'noun', 'giờ đồng hồ (thời lượng)', 'The train journey takes about one hour.', 'Chuyến đi tàu mất khoảng một giờ đồng hồ.', 'an hour', 'Chữ h câm, dùng mạo từ an hour.'],
  ['Minute', '/ˈmɪn.ɪt/', 'noun', 'phút', 'Wait for me a minute, I am almost ready.', 'Chờ tôi một phút nhé, tôi sắp xong rồi.', 'wait a minute', 'Danh từ phát âm /ˈmɪn.ɪt/ (khác tính từ minute /maɪˈnjuːt/).'],
  ['Weather', '/ˈweð.ər/', 'noun', 'thời tiết', 'The weather is warm and sunny this afternoon.', 'Thời tiết chiều nay ấm áp và có nắng.', 'nice weather', 'Âm /ð/ rung đầu lưỡi.'],
  ['Sunny', '/ˈsʌn.i/', 'adj', 'có nắng, trời nắng', 'It is a sunny day, perfect for a picnic.', 'Đó là một ngày nắng đẹp, rất thích hợp cho chuyến dã ngoại.', 'sunny morning', 'Xuất phát từ danh từ sun.'],
  ['Rain', '/reɪn/', 'verb', 'mưa, trời đổ mưa', 'It started to rain just as we reached home.', 'Trời bắt đầu mưa ngay khi chúng tôi về đến nhà.', 'heavy rain', 'Vừa là động từ vừa là danh từ.'],
  ['Hot', '/hɒt/', 'adj', 'nóng bức, cay nóng', 'Be careful, the hot soup might burn your tongue.', 'Hãy cẩn thận, món súp nóng có thể làm bỏng lưỡi bạn.', 'hot water', 'Trái nghĩa với cold.'],
  ['Cold', '/kəʊld/', 'adj', 'lạnh giá, buốt', 'Wear a warm jacket because it is cold outside.', 'Hãy mặc áo khoác ấm vì bên ngoài trời lạnh.', 'catch a cold', 'Cụm từ catch a cold (bị cảm lạnh).'],
  ['Season', '/ˈsiː.zən/', 'noun', 'mùa trong năm', 'Autumn is my favorite season because of cool breeze.', 'Mùa thu là mùa yêu thích nhất của tôi nhờ những cơn gió mát rượi.', 'four seasons', 'Bốn mùa: spring, summer, autumn, winter.'],

  // Unit 6: Common Actions & Movement
  ['Walk', '/wɔːk/', 'verb', 'đi bộ, tản bộ', 'Walking thirty minutes a day improves heart health.', 'Đi bộ ba mươi phút mỗi ngày cải thiện sức khỏe tim mạch.', 'go for a walk', 'Chữ l câm, phát âm /wɔːk/.'],
  ['Run', '/rʌn/', 'verb', 'chạy bộ', 'He runs five kilometers every morning.', 'Anh ấy chạy bộ năm ki-lô-mét mỗi buổi sáng.', 'run fast', 'Quá khứ ran, phân từ run.'],
  ['Listen', '/ˈlɪs.ən/', 'verb', 'lắng nghe', 'Listen carefully to the teacher’s instructions.', 'Hãy lắng nghe cẩn thận hướng dẫn của giáo viên.', 'listen to music', 'Chữ t câm, luôn đi với giới từ to.'],
  ['Speak', '/spiːk/', 'verb', 'nói, phát biểu', 'She can speak English and Vietnamese fluently.', 'Cô ấy có thể nói tiếng Anh và tiếng Việt một cách lưu loát.', 'speak loudly', 'Speak + ngôn ngữ (speak English).'],
  ['Read', '/riːd/', 'verb', 'đọc sách, xem chữ', 'Reading books expands your general knowledge.', 'Đọc sách giúp mở rộng vốn kiến thức của bạn.', 'read a book', 'Hiện tại /riːd/, quá khứ /red/ (viết giống nhau).'],
  ['Write', '/raɪt/', 'verb', 'viết lách, ghi chép', 'Please write your notes neatly in the notebook.', 'Vui lòng viết ghi chú của bạn thật gọn gàng vào vở.', 'write down', 'Chữ w câm, phát âm /raɪt/.'],
  ['Look', '/lʊk/', 'verb', 'nhìn, trông thấy', 'Look at the board to see today’s agenda.', 'Hãy nhìn lên bảng để xem lịch trình hôm nay.', 'look at', 'Look at (nhìn vào), look for (tìm kiếm).'],
  ['See', '/siː/', 'verb', 'thấy, nhận thấy', 'I can see the mountains clearly from my balcony.', 'Tôi có thể nhìn thấy những ngọn núi rất rõ từ ban công.', 'see you soon', 'Động từ chỉ thị giác tự nhiên.'],
  ['Buy', '/baɪ/', 'verb', 'mua sắm', 'I want to buy some fresh flowers for mother.', 'Tôi muốn mua vài bông hoa tươi tặng mẹ.', 'buy online', 'Quá khứ là bought /bɔːt/.'],
  ['Sell', '/sel/', 'verb', 'bán hàng', 'They sell organic vegetables at the local market.', 'Họ bán rau hữu cơ tại khu chợ địa phương.', 'sell out', 'Trái nghĩa với buy.'],
  ['Open', '/ˈəʊ.pən/', 'verb', 'mở ra', 'Can you open the door for me, please?', 'Bạn có thể làm ơn mở cửa giúp tôi không?', 'open up', 'Tính từ open nghĩa là mở cửa (The shop is open).'],
  ['Close', '/kləʊz/', 'verb', 'đóng lại', 'Close your eyes and take a deep breath.', 'Hãy nhắm mắt lại và hít một hơi thật sâu.', 'close down', 'Động từ phát âm /kləʊz/, tính từ gần gũi phát âm /kləʊs/.'],
  ['Give', '/ɡɪv/', 'verb', 'cho, tặng, đưa cho', 'Give me a call when you arrive safely.', 'Hãy gọi cho tôi khi bạn đến nơi an toàn nhé.', 'give advice', 'Cụm từ give up (từ bỏ).'],
  ['Take', '/teɪk/', 'verb', 'lấy, mang theo, đón nhận', 'Take an umbrella because it might rain later.', 'Hãy mang theo ô vì lát nữa trời có thể mưa.', 'take time', 'Động từ rất đa năng trong tiếng Anh.'],
  ['Help', '/help/', 'verb', 'giúp đỡ, trợ giúp', 'Can you help me move this heavy box?', 'Bạn có thể giúp tôi chuyển cái thùng nặng này được không?', 'help someone out', 'Vừa là động từ vừa là danh từ (need help).'],

  // Unit 7: School, Study & Work
  ['School', '/skuːl/', 'noun', 'trường học', 'The school has modern science laboratories.', 'Ngôi trường có các phòng thí nghiệm khoa học hiện đại.', 'primary school', 'Phát âm /skuːl/ với ch đọc là /k/.'],
  ['Student', '/ˈstjuː.dənt/', 'noun', 'học sinh, sinh viên', 'She is a diligent medical student.', 'Cô ấy là một sinh viên y khoa chăm chỉ.', 'college student', 'Trọng âm âm tiết đầu /ˈstjuː/.'],
  ['Teacher', '/ˈtiː.tʃər/', 'noun', 'giáo viên, thầy cô giáo', 'Our English teacher is very encouraging.', 'Giáo viên tiếng Anh của chúng tôi rất biết động viên học sinh.', 'head teacher', 'Gốc từ teach (dạy) + đuôi er.'],
  ['Book', '/bʊk/', 'noun', 'cuốn sách', 'This book explains grammar rules very clearly.', 'Cuốn sách này giải thích các quy tắc ngữ pháp rất rõ ràng.', 'textbook', 'Động từ book nghĩa là đặt chỗ trước (book a ticket).'],
  ['Pen', '/pen/', 'noun', 'cây bút mực', 'Always keep a pen handy for writing notes.', 'Hãy luôn giữ một cây bút bên mình để ghi chép.', 'ballpoint pen', 'Từ vựng đồ dùng học tập căn bản.'],
  ['Pencil', '/ˈpen.səl/', 'noun', 'bút chì', 'Use a pencil so you can erase mistakes easily.', 'Hãy dùng bút chì để bạn có thể xóa lỗi sai dễ dàng.', 'colored pencil', 'Pen + cil /ˈpen.səl/.'],
  ['Desk', '/desk/', 'noun', 'bàn học, bàn làm việc', 'Keep your study desk organized and tidy.', 'Hãy giữ bàn học của bạn luôn ngăn nắp và sạch sẽ.', 'desk lamp', 'Phân biệt với table (bàn ăn, bàn tiếp khách).'],
  ['Class', '/klɑːs/', 'noun', 'lớp học, giờ học', 'Class starts punctually at eight o’clock.', 'Lớp học bắt đầu đúng tám giờ.', 'attend class', 'Anh-Anh đọc /klɑːs/, Anh-Mỹ đọc /klæs/.'],
  ['Learn', '/lɜːn/', 'verb', 'học hỏi, tiếp thu', 'You can learn a lot from your mistakes.', 'Bạn có thể học được rất nhiều điều từ những sai lầm của mình.', 'learn by heart', 'Cụm từ learn by heart (học thuộc lòng).'],
  ['Study', '/ˈstʌd.i/', 'verb', 'nghiên cứu, ôn tập', 'He studies hard to pass the entrance exam.', 'Anh ấy học tập chăm chỉ để vượt qua kỳ thi tuyển sinh.', 'study abroad', 'Study abroad (du học).'],
  ['Work', '/wɜːk/', 'verb', 'làm việc, lao động', 'My sister works for a multinational tech company.', 'Chị gái tôi làm việc cho một công ty công nghệ đa quốc gia.', 'work hard', 'Vừa là động từ vừa là danh từ (go to work).'],
  ['Office', '/ˈɒf.ɪs/', 'noun', 'văn phòng làm việc', 'Our new office has an open-space layout.', 'Văn phòng mới của chúng tôi có thiết kế không gian mở.', 'head office', 'Trọng âm âm tiết đầu /ˈɒf.ɪs/.'],
  ['Job', '/dʒɒb/', 'noun', 'công việc, nghề nghiệp', 'She is looking for a rewarding marketing job.', 'Cô ấy đang tìm kiếm một công việc tiếp thị xứng đáng.', 'apply for a job', 'Danh từ đếm được (khác work không đếm được).'],
  ['Money', '/ˈmʌn.i/', 'noun', 'tiền bạc', 'Saving money early ensures financial security.', 'Tiết kiệm tiền sớm giúp đảm bảo an toàn tài chính.', 'save money', 'Danh từ không đếm được trong tiếng Anh.'],
  ['Price', '/praɪs/', 'noun', 'giá cả, mức giá', 'The price of fuel has increased recently.', 'Giá nhiên liệu gần đây đã tăng lên.', 'reasonable price', 'At any price (bằng mọi giá).'],

  // Unit 8: Common Adjectives & Descriptors
  ['Good', '/ɡʊd/', 'adj', 'tốt, giỏi, hay', 'He did a good job on the project.', 'Anh ấy đã hoàn thành tốt công việc trong dự án.', 'good at', 'Good at + V-ing (giỏi về cái gì).'],
  ['Bad', '/bæd/', 'adj', 'xấu, tồi tệ', 'Bad weather delayed the scheduled flight.', 'Thời tiết xấu đã làm hoãn chuyến bay theo lịch trình.', 'feel bad', 'Trái nghĩa với good.'],
  ['Big', '/bɪɡ/', 'adj', 'to lớn, khổng lồ', 'They live in a big house with a swimming pool.', 'Họ sống trong một ngôi nhà lớn có bể bơi.', 'big idea', 'Đồng nghĩa với large.'],
  ['Small', '/smɔːl/', 'adj', 'nhỏ nhắn, bé', 'A small step every day leads to big success.', 'Một bước đi nhỏ mỗi ngày sẽ dẫn đến thành công lớn.', 'small business', 'Trái nghĩa với big.'],
  ['Happy', '/ˈhæp.i/', 'adj', 'hạnh phúc, vui vẻ', 'Seeing her family made her extremely happy.', 'Gặp lại gia đình khiến cô ấy vô cùng hạnh phúc.', 'happy with', 'Danh từ là happiness.'],
  ['Sad', '/sæd/', 'adj', 'buồn bã, đau lòng', 'It was a sad movie that made everyone cry.', 'Đó là một bộ phim buồn khiến tất cả mọi người đều rơi lệ.', 'feel sad', 'Trái nghĩa với happy.'],
  ['New', '/njuː/', 'adj', 'mới mẻ, vừa xuất hiện', 'We moved into a new apartment this week.', 'Chúng tôi đã chuyển đến một căn hộ mới trong tuần này.', 'new brand', 'Trái nghĩa với old.'],
  ['Old', '/əʊld/', 'adj', 'cũ, già nua, lâu năm', 'This old tree has stood here for centuries.', 'Cái cây cổ thụ này đã đứng đây suốt nhiều thế kỷ.', 'old friend', 'Old friend (bạn cũ lâu năm).'],
  ['Fast', '/fɑːst/', 'adj', 'nhanh chóng, tốc độ', 'He is a very fast runner in our team.', 'Anh ấy là người chạy rất nhanh trong đội của chúng tôi.', 'fast food', 'Vừa là tính từ vừa là phó từ (run fast, không có fastly).'],
  ['Slow', '/sləʊ/', 'adj', 'chậm chạp, từ tốn', 'Take slow, steady breaths to calm your mind.', 'Hãy hít thở chậm và đều đặn để làm dịu tâm trí.', 'slow down', 'Cụm từ slow down (chậm lại).'],
  ['Easy', '/ˈiː.zi/', 'adj', 'dễ dàng, đơn giản', 'With daily practice, English grammar becomes easy.', 'Với việc luyện tập hằng ngày, ngữ pháp tiếng Anh trở nên thật dễ dàng.', 'take it easy', 'Take it easy (cứ từ từ, thư giãn đi).'],
  ['Hard', '/hɑːd/', 'adj', 'khó khăn, chăm chỉ', 'He works hard to support his entire family.', 'Anh ấy làm việc chăm chỉ để nuôi nấng cả gia đình.', 'hard work', 'Hard vừa là khó vừa là chăm chỉ.'],
  ['Clean', '/kliːn/', 'adj', 'sạch sẽ, trong lành', 'Fresh clean water is vital for human life.', 'Nước sạch tinh khiết là thiết yếu cho sự sống con người.', 'keep clean', 'Trái nghĩa với dirty.'],
  ['Dirty', '/ˈdɜː.ti/', 'adj', 'bẩn thỉu, dơ bẩn', 'Wash your dirty hands before touching food.', 'Hãy rửa đôi bàn tay bẩn của bạn trước khi chạm vào đồ ăn.', 'dirty clothes', 'Trọng âm âm tiết đầu /ˈdɜː/.'],
  ['Beautiful', '/ˈbjuː.tɪ.fəl/', 'adj', 'xinh đẹp, tuyệt mỹ', 'The sunset over the beach was breathtakingly beautiful.', 'Hoàng hôn trên bãi biển đẹp đến nao lòng.', 'beautiful smile', 'Danh từ là beauty.']
];

console.log(`Loaded English A1 pool: ${englishA1Raw.length} base words.`);

// We will expand these systematically with rich Oxford standard word lists across all levels.
fs.writeFileSync('/tmp/vocab_a1.json', JSON.stringify(englishA1Raw));
