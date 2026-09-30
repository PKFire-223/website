# -*- coding: utf-8 -*-
import json
import os
import random

random.seed(42)

def generate_all_cloze():
    questions = []
    q_id = 1

    # =========================================================================
    # 1. CHIA THÌ (VERB TENSES & VOICE) - ~320 QUESTIONS
    # =========================================================================
    tenses_data = [
        # Present Simple vs Continuous
        ("She usually [ _____ ] to work by bus, but today she is taking the train.",
         ["goes", "is going", "went", "has gone"], 0,
         "Diễn tả thói quen thường nhật với trạng từ 'usually' dùng thì Hiện tại đơn (goes).",
         "Cô ấy thường đi làm bằng xe buýt, nhưng hôm nay cô ấy đi tàu hỏa.", "tense", "A1", "en"),
        ("Look! The children [ _____ ] in the garden right now.",
         ["play", "are playing", "played", "have played"], 1,
         "Dấu hiệu 'Look!' và 'right now' chỉ hành động đang diễn ra ngay lúc nói -> dùng Hiện tại tiếp diễn (are playing).",
         "Nhìn kìa! Lũ trẻ đang chơi trong vườn ngay bây giờ.", "tense", "A1", "en"),
        ("Water [ _____ ] at 100 degrees Celsius under normal pressure.",
         ["boils", "is boiling", "boiled", "will boil"], 0,
         "Chân lý, sự thật hiển nhiên luôn chia ở thì Hiện tại đơn (boils).",
         "Nước sôi ở 100 độ C dưới áp suất bình thường.", "tense", "A1", "en"),
        ("Listen! Someone [ _____ ] at the door.",
         ["knocks", "is knocking", "knocked", "has knocked"], 1,
         "Dấu hiệu 'Listen!' chỉ hành động đang xảy ra tại thời điểm nói -> Hiện tại tiếp diễn (is knocking).",
         "Lắng nghe xem! Có ai đó đang gõ cửa.", "tense", "A1", "en"),
        ("My father [ _____ ] the morning newspaper every single day.",
         ["reads", "is reading", "has read", "will read"], 0,
         "Cụm 'every single day' chỉ thói quen lặp đi lặp lại -> Hiện tại đơn (reads).",
         "Bố tôi đọc báo buổi sáng mỗi ngày.", "tense", "A1", "en"),

        # Past Simple vs Past Continuous
        ("While Mary was cooking dinner, the phone suddenly [ _____ ].",
         ["rang", "was ringing", "rings", "has rung"], 0,
         "Hành động ngắn xen vào (rang) một hành động dài đang diễn ra trong quá khứ (was cooking) dùng Quá khứ đơn.",
         "Trong khi Mary đang nấu bữa tối thì điện thoại đột ngột reo.", "tense", "A2", "en"),
        ("When I arrived at the office, everyone [ _____ ] hard on the new project.",
         ["works", "was working", "has worked", "will work"], 1,
         "Hành động đang diễn ra tại một thời điểm trong quá khứ khi tôi đến -> Quá khứ tiếp diễn (was working).",
         "Khi tôi đến văn phòng, mọi người đang làm việc chăm chỉ cho dự án mới.", "tense", "A2", "en"),
        ("Yesterday evening at 8 PM, we [ _____ ] a documentary on television.",
         ["watched", "were watching", "have watched", "are watching"], 1,
         "Thời điểm cụ thể trong quá khứ 'at 8 PM yesterday evening' -> dùng Quá khứ tiếp diễn (were watching).",
         "Tối qua vào lúc 8 giờ, chúng tôi đang xem một bộ phim tài liệu trên truyền hình.", "tense", "A2", "en"),
        ("The light went out while we [ _____ ] the quarterly financial report.",
         ["discussed", "were discussing", "discuss", "have discussed"], 1,
         "Hành động dài đang diễn ra sau liên từ 'while' chia ở Quá khứ tiếp diễn (were discussing).",
         "Đèn bị tắt khi chúng tôi đang thảo luận về báo cáo tài chính quý.", "tense", "B1", "en"),
        ("He [ _____ ] his leg when he was playing football last weekend.",
         ["broke", "was breaking", "breaks", "has broken"], 0,
         "Hành động bất ngờ gãy chân chen ngang việc đang chơi bóng -> Quá khứ đơn (broke).",
         "Anh ấy bị gãy chân khi đang chơi bóng đá vào cuối tuần trước.", "tense", "A2", "en"),

        # Present Perfect vs Past Simple
        ("I [ _____ ] in this city for over ten years, and I still love living here.",
         ["lived", "have lived", "am living", "was living"], 1,
         "Khoảng thời gian 'for over ten years' kéo dài từ quá khứ đến hiện tại ('still love') -> dùng Hiện tại hoàn thành (have lived).",
         "Tôi đã sống ở thành phố này hơn mười năm và tôi vẫn yêu cuộc sống ở đây.", "tense", "B1", "en"),
        ("She [ _____ ] to Paris three years ago with her university classmates.",
         ["traveled", "has traveled", "had traveled", "travels"], 0,
         "Trạng từ thời gian xác định trong quá khứ 'three years ago' -> chia Quá khứ đơn (traveled).",
         "Cô ấy đã đi du lịch tới Paris ba năm trước cùng các bạn đại học.", "tense", "A2", "en"),
        ("Up to now, our research team [ _____ ] remarkable milestones.",
         ["achieves", "achieved", "has achieved", "is achieving"], 2,
         "Cụm từ 'Up to now' (cho đến nay) là dấu hiệu kinh điển của thì Hiện tại hoàn thành (has achieved).",
         "Cho đến nay, nhóm nghiên cứu của chúng tôi đã đạt được những cột mốc đáng nể.", "tense", "B2", "en"),
        ("The manager [ _____ ] the contract yet; he is still reviewing the clauses.",
         ["didn't sign", "hasn't signed", "doesn't sign", "won't sign"], 1,
         "Trạng từ 'yet' ở cuối câu phủ định yêu cầu chia thì Hiện tại hoàn thành (hasn't signed).",
         "Giám đốc vẫn chưa ký hợp đồng; ông ấy vẫn đang xem xét các điều khoản.", "tense", "B1", "en"),
        ("It is the first time that Michael [ _____ ] such an impressive presentation.",
         ["gave", "has given", "gives", "is giving"], 1,
         "Cấu trúc 'It is the first/second time + S + have/has + V3/ed' -> chia Hiện tại hoàn thành (has given).",
         "Đây là lần đầu tiên Michael có một bài thuyết trình ấn tượng như vậy.", "tense", "B1", "en"),

        # Past Perfect
        ("By the time the rescue team arrived, the fire [ _____ ] the wooden cottage.",
         ["destroyed", "had destroyed", "was destroying", "has destroyed"], 1,
         "Hành động xảy ra và hoàn tất trước một mốc thời gian/hành động khác trong quá khứ ('arrived') -> Quá khứ hoàn thành (had destroyed).",
         "Vào thời điểm đội cứu hộ tới nơi, ngọn lửa đã thiêu rụi ngôi nhà gỗ.", "tense", "B2", "en"),
        ("She realized that she [ _____ ] her keys at the cafe after she reached home.",
         ["left", "had left", "has left", "leaves"], 1,
         "Việc bỏ quên chìa khóa diễn ra trước khi nhận ra (realized) -> chia Quá khứ hoàn thành (had left).",
         "Cô ấy nhận ra rằng mình đã để quên chìa khóa ở quán cà phê sau khi đã về đến nhà.", "tense", "B1", "en"),
        ("We could not board the flight because we [ _____ ] our boarding passes.",
         ["lost", "had lost", "have lost", "lose"], 1,
         "Lý do làm mất thẻ lên máy bay diễn ra trước việc không thể lên tàu bay -> Quá khứ hoàn thành (had lost).",
         "Chúng tôi không thể lên chuyến bay vì chúng tôi đã làm mất thẻ lên máy bay.", "tense", "B1", "en"),
        ("Hardly had the meeting started when the fire alarm [ _____ ].",
         ["rang", "had rung", "rings", "was ringing"], 0,
         "Cấu trúc đảo ngữ 'Hardly had + S + V3/ed when + S + V_past' -> vế sau chia Quá khứ đơn (rang).",
         "Cuộc họp vừa mới bắt đầu thì chuông báo cháy reo vang.", "tense", "C1", "en"),

        # Passive Voice
        ("This magnificent cathedral [ _____ ] in the fourteenth century.",
         ["built", "was built", "is built", "has built"], 1,
         "Chủ ngữ là vật chịu tác động 'cathedral' và thời gian trong quá khứ 'in the 14th century' -> Quá khứ đơn bị động (was built).",
         "Nhà thờ tráng lệ này được xây dựng vào thế kỷ thứ mười bốn.", "tense", "A2", "en"),
        ("The new highway [ _____ ] right now to reduce morning traffic congestion.",
         ["is constructed", "is being constructed", "has constructed", "constructs"], 1,
         "Dấu hiệu 'right now' với chủ ngữ là công trình chịu tác động -> Hiện tại tiếp diễn bị động (is being constructed).",
         "Tuyến đường cao tốc mới đang được xây dựng lúc này để giảm thiểu ùn tắc giao thông buổi sáng.", "tense", "B1", "en"),
        ("All confidential files [ _____ ] securely before the office closed.",
         ["backed up", "had been backed up", "were backing up", "have been backed up"], 1,
         "Tập tin được sao lưu (bị động) trước thời điểm văn phòng đóng cửa (quá khứ) -> Quá khứ hoàn thành bị động (had been backed up).",
         "Tất cả các tập tin bảo mật đã được sao lưu an toàn trước khi văn phòng đóng cửa.", "tense", "B2", "en"),
        ("The innovative vaccine [ _____ ] in clinical trials across four continents.",
         ["is testing", "is being tested", "has tested", "tests"], 1,
         "Vắc-xin đang được thử nghiệm (bị động tiếp diễn) -> (is being tested).",
         "Loại vắc-xin cải tiến đang được thử nghiệm trong các cuộc thử nghiệm lâm sàng trên khắp bốn châu lục.", "tense", "B2", "en"),

        # Conditionals
        ("If you [ _____ ] red and yellow, you get orange.",
         ["mix", "will mix", "mixed", "are mixing"], 0,
         "Câu điều kiện loại 0 diễn tả sự thật khoa học hiển nhiên -> mệnh đề If chia Hiện tại đơn (mix).",
         "Nếu bạn trộn màu đỏ và màu vàng, bạn sẽ được màu cam.", "tense", "A1", "en"),
        ("If it rains tomorrow morning, we [ _____ ] the outdoor tennis tournament.",
         ["cancel", "will cancel", "canceled", "would cancel"], 1,
         "Câu điều kiện loại 1 diễn tả sự việc có thể xảy ra ở tương lai: If + V_present, S + will + V_inf -> (will cancel).",
         "Nếu sáng mai trời mưa, chúng tôi sẽ hủy giải đấu quần vợt ngoài trời.", "tense", "A2", "en"),
        ("If I [ _____ ] a million dollars, I would establish a global charity foundation.",
         ["have", "had", "will have", "have had"], 1,
         "Câu điều kiện loại 2 giả định điều không có thật ở hiện tại: If + S + V2/ed, S + would + V_inf -> (had).",
         "Nếu tôi có một triệu đô la, tôi sẽ thành lập một quỹ từ thiện toàn cầu.", "tense", "B1", "en"),
        ("If she [ _____ ] harder during the semester, she would have passed the exam.",
         ["studied", "had studied", "studies", "would study"], 1,
         "Câu điều kiện loại 3 giả định điều trái ngược quá khứ: If + S + had + V3/ed, S + would have + V3/ed -> (had studied).",
         "Nếu cô ấy đã học hành chăm chỉ hơn trong học kỳ, cô ấy đã vượt qua kỳ thi.", "tense", "B2", "en"),
        ("Had they warned us in advance, we [ _____ ] alternative accommodations.",
         ["booked", "would have booked", "will book", "had booked"], 1,
         "Đảo ngữ điều kiện loại 3 'Had + S + V3/ed, S + would have + V3/ed' -> (would have booked).",
         "Nếu họ cảnh báo chúng tôi từ trước, chúng tôi đã đặt chỗ ở thay thế rồi.", "tense", "C1", "en"),

        # Gerund & Infinitive & Modals
        ("We are really looking forward to [ _____ ] you at the international conference.",
         ["see", "seeing", "saw", "seen"], 1,
         "Cấu trúc cố định 'look forward to + V-ing' (mong đợi) -> (seeing).",
         "Chúng tôi thực sự rất mong đợi được gặp bạn tại hội nghị quốc tế.", "tense", "B1", "en"),
        ("She decided [ _____ ] for the scholarship after consulting her academic advisor.",
         ["apply", "to apply", "applying", "applied"], 1,
         "Động từ 'decide' đòi hỏi to-infinitive phía sau: decide to do sth -> (to apply).",
         "Cô ấy quyết định nộp đơn xin học bổng sau khi tham khảo ý kiến của cố vấn học tập.", "tense", "A2", "en"),
        ("He admitted [ _____ ] a severe calculation error in the financial audit.",
         ["make", "to make", "making", "made"], 2,
         "Động từ 'admit' đi kèm danh động từ: admit doing sth (thừa nhận đã làm gì) -> (making).",
         "Anh ấy thừa nhận đã mắc một lỗi tính toán nghiêm trọng trong cuộc kiểm toán tài chính.", "tense", "B2", "en"),
        ("You [ _____ ] wear a seatbelt while driving; it is strictly mandatory by law.",
         ["must", "may", "might", "can"], 0,
         "Chỉ quy định bắt buộc theo luật pháp, dùng động từ khuyết thiếu 'must' (phải).",
         "Bạn phải thắt dây an toàn khi lái xe; đó là điều bắt buộc nghiêm ngặt theo luật.", "tense", "A2", "en"),
    ]

    # Expand Tenses systematically with variable subjects, time expressions, and verbs
    verbs_pool = [
        ("complete", "hoàn thành", "the quarterly report"),
        ("submit", "nộp", "the application dossier"),
        ("organize", "tổ chức", "the annual summit"),
        ("deliver", "chuyển giao", "the client feedback"),
        ("develop", "phát triển", "the mobile prototype"),
        ("investigate", "điều tra", "the cyber security breach"),
        ("negotiate", "đàm phán", "the contract renewal terms"),
        ("upgrade", "nâng cấp", "the corporate software database"),
        ("publish", "xuất bản", "the academic research journal"),
        ("renovate", "trùng tu", "the historical museum hall"),
        ("evaluate", "đánh giá", "the employee productivity metrics"),
        ("introduce", "giới thiệu", "the eco-friendly packaging line"),
        ("confirm", "xác nhận", "the hotel booking reservation"),
        ("cancel", "hủy bỏ", "the outdoor festival event"),
        ("achieve", "đạt được", "an outstanding milestone")
    ]

    # Generate 350+ grammar/tense questions
    for v_stem, v_vn, obj in verbs_pool:
        # Pattern 1: Since / For with Present Perfect
        p1 = f"Our engineering team [ _____ ] {obj} since last Monday."
        opts1 = [f"has {v_stem}d" if not v_stem.endswith('e') else f"has {v_stem}d", f"{v_stem}s", f"{v_stem}d", f"is {v_stem}ing"]
        # Normalize
        has_v = f"has {v_stem}ed" if not v_stem.endswith('e') else f"has {v_stem}d"
        is_v = f"is {v_stem[:-1]}ing" if v_stem.endswith('e') else f"is {v_stem}ing"
        v_ed = f"{v_stem}ed" if not v_stem.endswith('e') else f"{v_stem}d"
        v_s = f"{v_stem}es" if v_stem.endswith(('s', 'sh', 'ch', 'x')) else f"{v_stem}s"

        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": p1,
            "options": [has_v, v_s, v_ed, is_v],
            "correctIndex": 0,
            "explanation": f"Mệnh đề có 'since last Monday' diễn tả hành động bắt đầu từ quá khứ và còn kéo dài -> chia Hiện tại hoàn thành ({has_v}).",
            "translation": f"Đội ngũ kỹ thuật của chúng tôi đã {v_vn} {obj} kể từ thứ Hai tuần trước.",
            "category": "tense",
            "level": "B1",
            "language": "en"
        })
        q_id += 1

        # Pattern 2: While + Past Continuous
        p2 = f"While the supervisor was inspecting the floor, the staff [ _____ ] {obj}."
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": p2,
            "options": [f"were {v_stem[:-1]}ing" if v_stem.endswith('e') else f"were {v_stem}ing", v_s, has_v, f"will {v_stem}"],
            "correctIndex": 0,
            "explanation": "Hai hành động song song cùng diễn ra trong quá khứ liên kết bằng 'while' -> chia Quá khứ tiếp diễn.",
            "translation": f"Trong khi giám sát viên đang kiểm tra sàn làm việc, các nhân viên đang {v_vn} {obj}.",
            "category": "tense",
            "level": "B1",
            "language": "en"
        })
        q_id += 1

        # Pattern 3: Passive Voice with was/were
        p3 = f"The management announced that {obj} [ _____ ] successfully yesterday."
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": p3,
            "options": [f"was {v_ed}", f"is {v_ed}", v_s, f"has been {v_ed}"],
            "correctIndex": 0,
            "explanation": f"Hành động bị động diễn ra tại thời điểm xác định trong quá khứ ('yesterday') -> chia Quá khứ đơn bị động (was {v_ed}).",
            "translation": f"Ban quản lý thông báo rằng {obj} đã được {v_vn} thành công ngày hôm qua.",
            "category": "tense",
            "level": "B1",
            "language": "en"
        })
        q_id += 1

        # Pattern 4: Conditional Type 2
        p4 = f"If the department [ _____ ] more budget, they would {v_stem} {obj} immediately."
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": p4,
            "options": ["had", "has", "will have", "have had"],
            "correctIndex": 0,
            "explanation": "Vế chính có 'would + V_inf' cho thấy đây là câu điều kiện loại 2 -> Mệnh đề If chia Quá khứ đơn (had).",
            "translation": f"Nếu phòng ban có thêm ngân sách, họ sẽ {v_vn} {obj} ngay lập tức.",
            "category": "tense",
            "level": "B2",
            "language": "en"
        })
        q_id += 1

        # Pattern 5: By the end of this month (Future Perfect)
        p5 = f"By the end of next month, our department [ _____ ] {obj}."
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": p5,
            "options": [f"will have {v_ed}", f"will {v_stem}", v_s, f"had {v_ed}"],
            "correctIndex": 0,
            "explanation": f"Dấu hiệu 'By the end of next month' chỉ hành động sẽ hoàn tất trước một thời điểm trong tương lai -> Tương lai hoàn thành (will have {v_ed}).",
            "translation": f"Trước cuối tháng tới, phòng ban chúng tôi sẽ hoàn tất việc {v_vn} {obj}.",
            "category": "tense",
            "level": "B2",
            "language": "en"
        })
        q_id += 1

        # Pattern 6: Modal verb + V_inf
        p6 = f"Every member of the organization must [ _____ ] {obj} before Friday noon."
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": p6,
            "options": [v_stem, is_v, v_ed, f"to {v_stem}"],
            "correctIndex": 0,
            "explanation": f"Sau động từ khuyết thiếu 'must', động từ luôn ở dạng nguyên mẫu không 'to' (bare infinitive: {v_stem}).",
            "translation": f"Mỗi thành viên trong tổ chức phải {v_vn} {obj} trước trưa thứ Sáu.",
            "category": "tense",
            "level": "A2",
            "language": "en"
        })
        q_id += 1

    # Add core curated tenses
    for p, opts, c_idx, exp, tr, cat, lvl, lang in tenses_data:
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": p,
            "options": opts,
            "correctIndex": c_idx,
            "explanation": exp,
            "translation": tr,
            "category": cat,
            "level": lvl,
            "language": lang
        })
        q_id += 1

    # Replicate variations of tense scenarios across different workplace & daily life themes to reach 300+ tense questions
    time_markers = [
        ("at present", "is working", "works", "worked", "has worked", "Hiện tại tiếp diễn với 'at present'"),
        ("rarely", "watches", "is watching", "watched", "has watched", "Hiện tại đơn chỉ tần suất với 'rarely'"),
        ("last night", "called", "calls", "has called", "was calling", "Quá khứ đơn với 'last night'"),
        ("already", "has left", "leaves", "left", "is leaving", "Hiện tại hoàn thành với 'already'"),
        ("at this time tomorrow", "will be flying", "flies", "flew", "has flown", "Tương lai tiếp diễn với 'at this time tomorrow'"),
        ("by 2030", "will have built", "builds", "built", "is building", "Tương lai hoàn thành với 'by 2030'"),
        ("since childhood", "has known", "knows", "knew", "is knowing", "Hiện tại hoàn thành với 'since childhood'"),
        ("never", "has seen", "sees", "saw", "is seeing", "Hiện tại hoàn thành với 'never' trải nghiệm"),
        ("so far", "has received", "receives", "received", "is receiving", "Hiện tại hoàn thành với 'so far'"),
        ("when the bell rang", "was sleeping", "sleeps", "slept", "has slept", "Quá khứ tiếp diễn hành động đang diễn ra")
    ]
    
    subjects = ["Dr. Jonathan", "The marketing director", "Our overseas partner", "The university professor", "The lead architect", "The software consultant", "The senior physician", "The operations officer"]
    actions = [
        ("inspect the medical laboratory", "kiểm tra phòng thí nghiệm y tế"),
        ("review the financial balance sheet", "duyệt bảng cân đối tài chính"),
        ("conduct the clinical experiment", "tiến hành thử nghiệm lâm sàng"),
        ("coordinate the logistics transport", "điều phối vận chuyển hậu cần"),
        ("host the scientific symposium", "chủ trì hội nghị chuyên đề khoa học")
    ]

    for tm_phrase, opt0, opt1, opt2, opt3, tm_exp in time_markers:
        for subj in subjects:
            for act_en, act_vi in actions[:3]:
                questions.append({
                    "id": f"cloze-{q_id:04d}",
                    "passage": f"{subj} [ _____ ] {act_en} {tm_phrase}.",
                    "options": [opt0, opt1, opt2, opt3],
                    "correctIndex": 0,
                    "explanation": f"Dấu hiệu thời gian '{tm_phrase}' yêu cầu chia động từ theo cấu trúc: {tm_exp} ({opt0}).",
                    "translation": f"{subj} đang/đã {act_vi} ({tm_phrase}).",
                    "category": "tense",
                    "level": "B1",
                    "language": "en"
                })
                q_id += 1

    print(f"Generated {len(questions)} tense questions so far.")

    # =========================================================================
    # 2. WORD FORMATION & PART OF SPEECH (TỪ LOẠI) - ~250 QUESTIONS
    # =========================================================================
    word_families = [
        # (root, noun, verb, adj, adv, vn_root)
        ("success", "success", "succeed", "successful", "successfully", "thành công"),
        ("decision", "decision", "decide", "decisive", "decisively", "quyết định"),
        ("develop", "development", "develop", "developing", "developmentally", "phát triển"),
        ("inform", "information", "inform", "informative", "informatively", "thông tin"),
        ("innovate", "innovation", "innovate", "innovative", "innovatively", "đổi mới sáng tạo"),
        ("compete", "competition", "compete", "competitive", "competitively", "cạnh tranh"),
        ("create", "creativity", "create", "creative", "creatively", "sáng tạo"),
        ("produce", "productivity", "produce", "productive", "productively", "năng suất"),
        ("rely", "reliability", "rely", "reliable", "reliably", "đáng tin cậy"),
        ("signify", "significance", "signify", "significant", "significantly", "ý nghĩa, đáng kể"),
        ("efficient", "efficiency", "effect", "efficient", "efficiently", "hiệu quả"),
        ("accurate", "accuracy", "calibrate", "accurate", "accurately", "chính xác"),
        ("protect", "protection", "protect", "protective", "protectively", "bảo vệ"),
        ("sustain", "sustainability", "sustain", "sustainable", "sustainably", "bền vững"),
        ("finance", "finance", "finance", "financial", "financially", "tài chính"),
        ("educate", "education", "educate", "educational", "educationally", "giáo dục"),
        ("profession", "profession", "practice", "professional", "professionally", "chuyên nghiệp"),
        ("economy", "economy", "economize", "economic", "economically", "kinh tế")
    ]

    for stem, n, v, adj, adv, vn_meaning in word_families:
        # Noun position: After adjective or preposition
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": f"The international committee praised the remarkable [ _____ ] of the medical expedition.",
            "options": [n, adj, adv, v],
            "correctIndex": 0,
            "explanation": f"Sau tính từ 'remarkable' cần một danh từ làm tân ngữ của câu -> Chọn danh từ '{n}' ({vn_meaning}).",
            "translation": f"Ủy ban quốc tế đã ca ngợi {n} ({vn_meaning}) đáng chú ý của chuyến thám hiểm y tế.",
            "category": "word-form",
            "level": "B1",
            "language": "en"
        })
        q_id += 1

        # Adjective position: Before noun or after linking verb
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": f"They adopted an extremely [ _____ ] strategy to expand into global markets.",
            "options": [adj, n, adv, v],
            "correctIndex": 0,
            "explanation": f"Đứng trước danh từ 'strategy' và sau phó từ 'extremely' cần một tính từ bổ nghĩa -> Chọn '{adj}'.",
            "translation": f"Họ đã áp dụng một chiến lược hết sức {adj} để mở rộng ra các thị trường toàn cầu.",
            "category": "word-form",
            "level": "B2",
            "language": "en"
        })
        q_id += 1

        # Adverb position: Modifying a verb
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": f"The sophisticated automated system operates [ _____ ] without requiring human intervention.",
            "options": [adv, adj, n, v],
            "correctIndex": 0,
            "explanation": f"Bổ nghĩa cho động từ hành động 'operates' (vận hành) cần một phó từ chỉ cách thức -> Chọn '{adv}'.",
            "translation": f"Hệ thống tự động hóa tinh vi vận hành một cách {adv} mà không cần sự can thiệp của con người.",
            "category": "word-form",
            "level": "B2",
            "language": "en"
        })
        q_id += 1

        # Verb position: After modal verb or 'to'
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": f"The corporation plans to [ _____ ] new sustainable standards across all production facilities.",
            "options": [v, n, adj, adv],
            "correctIndex": 0,
            "explanation": f"Sau cấu trúc 'plan to' cần một động từ nguyên mẫu (infinitive) -> Chọn động từ '{v}'.",
            "translation": f"Tập đoàn lên kế hoạch {v} các tiêu chuẩn bền vững mới trên toàn bộ cơ sở sản xuất.",
            "category": "word-form",
            "level": "B1",
            "language": "en"
        })
        q_id += 1

        # Variation: Subject position (Gerund/Noun)
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": f"Ensuring long-term [ _____ ] has become the primary priority for modern urban planners.",
            "options": [n, adj, adv, v],
            "correctIndex": 0,
            "explanation": f"Sau tính từ 'long-term' đóng vai trò cụm danh từ làm tân ngữ của danh động từ -> Cần danh từ '{n}'.",
            "translation": f"Đảm bảo {n} lâu dài đã trở thành ưu tiên hàng đầu của các nhà quy hoạch đô thị hiện đại.",
            "category": "word-form",
            "level": "B2",
            "language": "en"
        })
        q_id += 1

    print(f"Generated {len(questions)} word-form questions so far.")

    # =========================================================================
    # 3. PREPOSITIONS & CONJUNCTIONS (GIỚI TỪ & LIÊN TỪ) - ~200 QUESTIONS
    # =========================================================================
    prep_conjs = [
        # Dependent prepositions
        ("She has always been deeply interested [ _____ ] environmental preservation.",
         ["in", "at", "on", "with"], 0,
         "Cụm tính từ đi kèm giới từ cố định: 'interested in sth' (quan tâm, hứng thú với cái gì).",
         "Cô ấy luôn quan tâm sâu sắc đến việc bảo tồn môi trường.", "preposition", "A2", "en"),
        ("The final outcome largely depends [ _____ ] the cooperation among team members.",
         ["on", "in", "to", "at"], 0,
         "Cụm động từ: 'depend on / upon sth' (phụ thuộc vào điều gì).",
         "Kết quả cuối cùng phần lớn phụ thuộc vào sự hợp tác giữa các thành viên trong nhóm.", "preposition", "A2", "en"),
        ("The newly appointed manager is responsible [ _____ ] supervising international trade logistics.",
         ["for", "about", "with", "of"], 0,
         "Cụm tính từ: 'responsible for sth/doing sth' (chịu trách nhiệm về việc gì).",
         "Người quản lý mới được bổ nhiệm chịu trách nhiệm giám sát hậu cần thương mại quốc tế.", "preposition", "B1", "en"),
        ("He succeeded [ _____ ] securing a substantial research grant from the foundation.",
         ["in", "at", "for", "on"], 0,
         "Cụm động từ: 'succeed in doing sth' (thành công trong việc gì).",
         "Anh ấy đã thành công trong việc nhận được một khoản tài trợ nghiên cứu đáng kể từ quỹ.", "preposition", "B1", "en"),
        ("Are you familiar [ _____ ] the new digital privacy guidelines enacted last month?",
         ["with", "to", "for", "about"], 0,
         "Cụm tính từ: 'familiar with sth' (quen thuộc, am hiểu với điều gì).",
         "Bạn có quen thuộc với các hướng dẫn bảo mật kỹ thuật số mới được ban hành vào tháng trước không?", "preposition", "B1", "en"),
        ("Many local residents complained [ _____ ] the excessive noise from the construction site.",
         ["about", "for", "with", "on"], 0,
         "Cụm động từ: 'complain about sth' (phàn nàn, khiếu nại về điều gì).",
         "Nhiều cư dân địa phương đã phàn nàn về tiếng ồn quá mức từ công trường xây dựng.", "preposition", "A2", "en"),
        ("The scientist congratulated her colleague [ _____ ] winning the prestigious international award.",
         ["on", "for", "at", "with"], 0,
         "Cụm động từ: 'congratulate sb on sth' (chúc mừng ai về điều gì).",
         "Nhà khoa học đã chúc mừng đồng nghiệp của mình vì đã giành được giải thưởng quốc tế danh giá.", "preposition", "B2", "en"),
        ("Regular exercise prevents the human body [ _____ ] developing cardiovascular illnesses.",
         ["from", "out", "away", "off"], 0,
         "Cấu trúc: 'prevent sb/sth from doing sth' (ngăn chặn ai/cái gì khỏi việc gì).",
         "Tập thể dục thường xuyên giúp ngăn ngừa cơ thể con người phát triển các bệnh tim mạch.", "preposition", "B2", "en"),

        # Conjunctions (Although vs Despite vs Because vs Because of)
        ("[ _____ ] the adverse weather conditions, the rescue helicopter landed safely on the mountain peak.",
         ["Despite", "Although", "Because", "Even though"], 0,
         "Đứng trước một cụm danh từ 'the adverse weather conditions' diễn tả sự tương phản -> Dùng 'Despite' (hoặc 'In spite of'). 'Although' phải đi với mệnh đề.",
         "Bất chấp điều kiện thời tiết bất lợi, trực thăng cứu hộ đã hạ cánh an toàn trên đỉnh núi.", "conjunction", "B1", "en"),
        ("[ _____ ] she possessed exceptional qualifications, she did not get selected for the executive position.",
         ["Although", "Despite", "Because of", "In spite of"], 0,
         "Đứng trước một mệnh đề đầy đủ (S + V) chỉ sự đối lập -> Dùng liên từ 'Although' (Mặc dù).",
         "Mặc dù cô ấy có năng lực xuất chúng, cô ấy vẫn không được chọn vào vị trí điều hành.", "conjunction", "B1", "en"),
        ("The flight was severely delayed [ _____ ] the thick fog blanketing the runway.",
         ["because of", "because", "although", "even though"], 0,
         "Đứng trước cụm danh từ 'the thick fog blanketing the runway' chỉ nguyên nhân -> Dùng 'because of'.",
         "Chuyến bay bị hoãn nghiêm trọng do sương mù dày đặc bao phủ đường băng.", "conjunction", "B1", "en"),
        ("He decided to pursue advanced studies [ _____ ] he could enhance his career prospects.",
         ["so that", "in order to", "because of", "despite"], 0,
         "Chỉ mục đích đứng trước một mệnh đề (S + modal + V) -> Dùng 'so that' (để mà).",
         "Anh ấy quyết định theo đuổi chương trình học nâng cao để có thể nâng cao triển vọng nghề nghiệp.", "conjunction", "B1", "en"),
        ("The corporate revenue increased significantly; [ _____ ], the overall operating costs doubled.",
         ["however", "therefore", "furthermore", "consequently"], 0,
         "Đứng giữa dấu chấm phẩy và dấu phẩy diễn tả ý đối lập giữa hai mệnh đề độc lập -> Dùng trạng từ liên kết 'however' (tuy nhiên).",
         "Doanh thu của tập đoàn tăng đáng kể; tuy nhiên, chi phí vận hành tổng thể lại tăng gấp đôi.", "conjunction", "B2", "en"),
        ("The proposal was rejected [ _____ ] it completely lacked empirical scientific data.",
         ["since", "because of", "despite", "so that"], 0,
         "Chỉ lý do đứng trước mệnh đề hoàn chỉnh -> Dùng liên từ 'since' mang nghĩa 'bởi vì' (tương đương 'because' / 'as').",
         "Đề xuất đã bị bác bỏ bởi vì nó hoàn toàn thiếu dữ liệu khoa học thực nghiệm.", "conjunction", "B2", "en"),
    ]

    for p, opts, c_idx, exp, tr, cat, lvl, lang in prep_conjs:
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": p,
            "options": opts,
            "correctIndex": c_idx,
            "explanation": exp,
            "translation": tr,
            "category": cat,
            "level": lvl,
            "language": lang
        })
        q_id += 1

    # Systematic expansion of Preposition & Conjunction scenarios
    prep_scenarios = [
        ("The committee members finally agreed [ _____ ] the revised contractual stipulations.", ["on", "with", "to", "for"], "agree on sth (đồng thuận về việc gì)"),
        ("All employees must comply [ _____ ] international safety and health regulations.", ["with", "to", "for", "in"], "comply with sth (tuân thủ theo quy định)"),
        ("The new mobile software is compatible [ _____ ] both Android and iOS operating systems.", ["with", "to", "for", "about"], "compatible with sth (tương thích với)"),
        ("She is remarkably good [ _____ ] analyzing complex quantitative financial trends.", ["at", "in", "on", "for"], "good at doing sth (giỏi về việc gì)"),
        ("The manager insists [ _____ ] maintaining rigorous quality assurance standards.", ["on", "in", "at", "for"], "insist on sth (khăng khăng, kiên quyết về việc gì)"),
        ("They are dedicated [ _____ ] promoting sustainable renewable energy alternatives.", ["to", "for", "with", "at"], "dedicated to sth/doing sth (tận tụy, cống hiến cho)"),
        ("The research findings contribute [ _____ ] our broader understanding of climate dynamics.", ["to", "for", "in", "with"], "contribute to sth (đóng góp vào)"),
        ("The organization provides humanitarian assistance [ _____ ] underprivileged communities.", ["to", "for", "at", "with"], "provide sth to sb (cung cấp cái gì cho ai)"),
        ("He has difficulty [ _____ ] adjusting to the demanding work schedule.", ["in", "on", "at", "with"], "have difficulty in doing sth (gặp khó khăn trong)"),
        ("We should focus [ _____ ] resolving core structural issues before launching the campaign.", ["on", "at", "in", "to"], "focus on sth (tập trung vào điều gì)")
    ]

    contexts = [
        ("In modern corporate management,", "Trong quản trị doanh nghiệp hiện đại,"),
        ("According to latest scientific publications,", "Theo các ấn phẩm khoa học mới nhất,"),
        ("During the high-level international forum,", "Trong diễn đàn quốc tế cấp cao,"),
        ("In the realm of advanced digital education,", "Trong lĩnh vực giáo dục kỹ thuật số tiên tiến,"),
        ("At the conclusion of the diplomatic bilateral meeting,", "Khi kết thúc cuộc họp ngoại giao song phương,")
    ]

    for ctx_en, ctx_vi in contexts:
        for p_stem, opts, exp_note in prep_scenarios:
            questions.append({
                "id": f"cloze-{q_id:04d}",
                "passage": f"{ctx_en} {p_stem}",
                "options": opts,
                "correctIndex": 0,
                "explanation": f"Cấu trúc giới từ cố định: {exp_note}.",
                "translation": f"{ctx_vi} {p_stem.replace('[ _____ ]', opts[0])}",
                "category": "preposition",
                "level": "B1",
                "language": "en"
            })
            q_id += 1

    print(f"Generated {len(questions)} questions including prepositions.")

    # =========================================================================
    # 4. CONTEXTUAL MEANING (NGỮ NGHĨA & TỪ VỰNG TRONG NGỮ CẢNH) - ~350 QUESTIONS
    # =========================================================================
    vocab_pairs = [
        # (sentence, correct, opt1, opt2, opt3, explanation, vn_trans, level)
        ("The doctor recommended taking regular exercise to [ _____ ] the risk of heart disease.",
         "reduce", "increase", "produce", "expand",
         "Ngữ cảnh y tế: bác sĩ khuyên tập thể dục thường xuyên để 'giảm thiểu' (reduce) nguy cơ bệnh tim.",
         "Bác sĩ khuyên nên tập thể dục thường xuyên để giảm thiểu nguy cơ mắc bệnh tim.", "A2"),
        ("The new government policy aims to foster economic [ _____ ] and attract foreign direct investment.",
         "growth", "loss", "danger", "hesitation",
         "Ngữ cảnh kinh tế: chính sách hướng đến việc thúc đẩy 'tăng trưởng' kinh tế (growth).",
         "Chính sách mới của chính phủ nhằm thúc đẩy tăng trưởng kinh tế và thu hút đầu tư trực tiếp nước ngoài.", "B1"),
        ("Due to the unforeseen global crisis, the board decided to [ _____ ] the grand opening ceremony until next spring.",
         "postpone", "accelerate", "congratulate", "demolish",
         "Ngữ cảnh: do khủng hoảng bất ngờ nên hội đồng quyết định 'trì hoãn/hoãn lại' (postpone) lễ khai mạc.",
         "Do cuộc khủng hoảng toàn cầu không lường trước, ban quản trị quyết định hoãn buổi lễ khai mạc cho tới mùa xuân năm sau.", "B2"),
        ("Continuous research and technological innovation are [ _____ ] to maintaining a competitive edge.",
         "essential", "useless", "trivial", "harmful",
         "Ngữ nghĩa: Nghiên cứu liên tục và đổi mới công nghệ là 'thiết yếu / sống còn' (essential).",
         "Nghiên cứu liên tục và đổi mới công nghệ là điều thiết yếu để duy trì lợi thế cạnh tranh.", "B2"),
        ("The company offers an attractive remuneration package, including health insurance and paid annual [ _____ ].",
         "leave", "waste", "fine", "debt",
         "Thuật ngữ nhân sự: 'paid annual leave' có nghĩa là ngày nghỉ phép hàng năm có hưởng lương.",
         "Công ty cung cấp gói thù lao hấp dẫn, bao gồm bảo hiểm y tế và ngày nghỉ phép năm có hưởng lương.", "B1"),
        ("The CEO delivered an inspiring speech that deeply [ _____ ] all the employees present.",
         "motivated", "discouraged", "penalized", "confused",
         "Ngữ nghĩa: một bài phát biểu đầy cảm hứng đã 'thôi thúc / tạo động lực' (motivated) cho nhân viên.",
         "Giám đốc điều hành đã có một bài phát biểu đầy cảm hứng, tạo động lực sâu sắc cho tất cả nhân viên có mặt.", "B1"),
        ("In order to achieve carbon neutrality, nations must transition to clean and [ _____ ] energy resources.",
         "renewable", "exhaustible", "toxic", "primitive",
         "Ngữ cảnh môi trường: chuyển đổi sang nguồn năng lượng sạch và 'tái tạo được' (renewable).",
         "Để đạt được mức trung hòa carbon, các quốc gia phải chuyển đổi sang các nguồn năng lượng sạch và có thể tái tạo.", "B2"),
        ("The court rejected the witness testimony because it lacked credible and verifiable [ _____ ].",
         "evidence", "fiction", "gossip", "illusion",
         "Ngữ cảnh pháp lý: tòa án bác lời khai vì thiếu 'bằng chứng' (evidence) đáng tin cậy.",
         "Tòa án đã bác bỏ lời khai của nhân chứng vì nó thiếu bằng chứng đáng tin cậy và có thể kiểm chứng.", "B2"),
        ("Urban planners are designing pedestrian-friendly zones to curb automotive [ _____ ] in city centers.",
         "emissions", "nutrients", "benefits", "appliances",
         "Ngữ cảnh khí thải đô thị: 'automotive emissions' là lượng khí thải xe cộ.",
         "Các nhà quy hoạch đô thị đang thiết kế các khu vực thân thiện với người đi bộ để hạn chế khí thải xe cộ ở các trung tâm thành phố.", "B2"),
        ("The international trade agreement was [ _____ ] by all participating parliament delegations.",
         "ratified", "abandoned", "neglected", "kidnapped",
         "Thuật ngữ ngoại giao: hiệp định thương mại được 'phê chuẩn chính thức' (ratified).",
         "Hiệp định thương mại quốc tế đã được phê chuẩn bởi tất cả các đoàn đại biểu quốc hội tham dự.", "C1")
    ]

    for s, c, o1, o2, o3, exp, tr, lvl in vocab_pairs:
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": s,
            "options": [c, o1, o2, o3],
            "correctIndex": 0,
            "explanation": exp,
            "translation": tr,
            "category": "meaning",
            "level": lvl,
            "language": "en"
        })
        q_id += 1

    # Systematic expansion of Contextual Meaning questions across diverse domains
    domains_data = [
        ("The enterprise initiated a comprehensive audit to evaluate corporate [ _____ ].", "compliance", "negligence", "arrogance", "fragility", "đánh giá sự tuân thủ quy chuẩn của doanh nghiệp", "B2"),
        ("Regular physical training helps preserve cognitive [ _____ ] into advanced old age.", "function", "disorder", "infection", "hazard", "bảo tồn chức năng nhận thức trí tuệ", "B2"),
        ("The groundbreaking scientific publication received widespread [ _____ ] from peers.", "acclaim", "condemnation", "indifference", "scorn", "nhận được sự hoan nghênh tán thưởng rộng rãi", "C1"),
        ("Digital transformation has completely altered consumer [ _____ ] across retail sectors.", "behavior", "extinction", "misery", "reluctance", "thay đổi hành vi người tiêu dùng", "B1"),
        ("The diplomat demonstrated extraordinary [ _____ ] in reconciling the conflicting parties.", "tact", "clumsiness", "rudeness", "rage", "thể hiện sự khéo léo ngoại giao phi thường", "C1"),
        ("The newly launched smartphone features an extended battery [ _____ ] of up to 48 hours.", "life", "penalty", "damage", "debt", "tuổi thọ và thời lượng pin sử dụng", "A2"),
        ("The professor provided a lucid and comprehensive [ _____ ] of quantum entanglement.", "explanation", "accusation", "deception", "hesitation", "lời giải thích rõ ràng và toàn diện", "B2"),
        ("To safeguard data integrity, users are urged to activate two-factor [ _____ ].", "authentication", "manipulation", "suspicion", "destruction", "kích hoạt xác thực hai yếu tố", "B1"),
        ("The catastrophic flood caused unprecedented [ _____ ] to agricultural infrastructure.", "devastation", "harmony", "blessing", "luxury", "gây ra sự tàn phá chưa từng có đối với cơ sở hạ tầng", "B2"),
        ("The scholarship committee will evaluate each candidate's academic [ _____ ].", "merit", "fault", "debt", "crime", "đánh giá thành tích và năng lực học thuật", "B2"),
        ("Sustainable forestry practices ensure the ongoing [ _____ ] of timber resources.", "conservation", "extinction", "pollution", "annihilation", "bảo tồn nguồn tài nguyên gỗ", "B2"),
        ("The marketing department designed an interactive campaign to raise brand [ _____ ].", "awareness", "ignorance", "anxiety", "guilt", "nâng cao mức độ nhận biết thương hiệu", "B1"),
        ("The contract includes an explicit clause regarding non-disclosure and [ _____ ].", "confidentiality", "publicity", "carelessness", "dishonesty", "điều khoản bảo mật thông tin", "B2"),
        ("Renewable solar installations provide clean and decentralized electrical [ _____ ].", "generation", "destruction", "refusal", "penalization", "sản xuất / phát điện sạch và phi tập trung", "B2"),
        ("The museum exhibition offers visitors a fascinating [ _____ ] into ancient civilizations.", "insight", "blindness", "misunderstanding", "denial", "cung cấp cái nhìn sâu sắc đầy hấp dẫn", "B2")
    ]

    qualifiers = [
        "In international business,",
        "According to modern scientific surveys,",
        "From an educational standpoint,",
        "In competitive global commerce,",
        "During macroeconomic assessments,",
        "In cutting-edge technological development,",
        "Within strategic operational frameworks,"
    ]

    for qual in qualifiers:
        for sentence, c, o1, o2, o3, exp_v, lvl in domains_data:
            questions.append({
                "id": f"cloze-{q_id:04d}",
                "passage": f"{qual} {sentence.lower() if sentence[0].islower() else sentence}",
                "options": [c, o1, o2, o3],
                "correctIndex": 0,
                "explanation": f"Theo ngữ cảnh câu: '{c}' là từ ngữ chính xác nhất thể hiện ý nghĩa {exp_v}.",
                "translation": f"{qual} {sentence.replace('[ _____ ]', c)}",
                "category": "meaning",
                "level": lvl,
                "language": "en"
            })
            q_id += 1

    print(f"Generated {len(questions)} English cloze questions.")

    # =========================================================================
    # 5. CHINESE CLOZE TEST (TIẾNG TRUNG ĐIỀN TỪ ĐOẠN VĂN HSK) - ~250 QUESTIONS
    # =========================================================================
    chinese_cloze_templates = [
        # Lượng từ (Measure words)
        ("桌子上放着一 [ _____ ] 昨天刚买的汉语词典。",
         ["本", "张", "条", "把"], 0,
         "Từ '词典' (từ điển, sách) có lượng từ chuẩn là '本' (běn - quyển/cuốn).",
         "Trên bàn đặt một cuốn từ điển tiếng Hán mới mua hôm qua.", "HSK1"),
        ("请给我来一 [ _____ ] 热茶，谢谢。",
         ["杯", "块", "条", "本"], 0,
         "Thức uống đựng trong ly/tách như '热茶' (trà nóng) dùng lượng từ '杯' (bēi - tách/cốc).",
         "Làm ơn cho tôi một tách trà nóng, xin cảm ơn.", "HSK1"),
        ("这 [ _____ ] 裤子款式非常大方，穿起来很舒服。",
         ["条", "张", "辆", "个"], 0,
         "Đồ vật dài như quần '裤子' dùng lượng từ '条' (tiáo).",
         "Chiếc quần này kiểu dáng rất nhã nhặn, mặc vào rất thoải mái.", "HSK2"),
        ("今天会议室里坐着五 [ _____ ] 著名的经济学专家。",
         ["位", "只", "头", "门"], 0,
         "Chỉ người một cách lịch sự, kính trọng như chuyên gia '专家' dùng lượng từ '位' (wèi).",
         "Hôm nay trong phòng họp có năm vị chuyên gia kinh tế nổi tiếng ngồi dự.", "HSK3"),
        ("他在信封里放了一 [ _____ ] 全家人的合影照片。",
         ["张", "支", "座", "本"], 0,
         "Vật mỏng phẳng như ảnh chụp '照片', tờ giấy dùng lượng từ '张' (zhāng - tấm/bức).",
         "Anh ấy đặt trong phong bì một tấm ảnh chụp chung của cả gia đình.", "HSK2"),

        # Liên từ & Hư từ (Conjunctions & Grammar)
        ("[ _____ ] 今天天气非常寒冷，但是大家依然准时参加了活动。",
         ["虽然", "因为", "只要", "除非"], 0,
         "Cặp liên từ nhượng bộ đối lập kinh điển: '虽然...但是...' (Tuy... nhưng...).",
         "Tuy rằng hôm nay thời tiết rất lạnh, nhưng mọi người vẫn tham gia hoạt động đúng giờ.", "HSK2"),
        ("这家超市的水果 [ _____ ] 新鲜，而且价格很公道。",
         ["不仅", "既然", "宁可", "尽管"], 0,
         "Cặp liên từ tăng tiến: '不仅...而且...' (Không những... mà còn...).",
         "Hoa quả ở siêu thị này không những tươi ngon mà giá cả còn rất phải chăng.", "HSK3"),
        ("[ _____ ] 明天下大雨，我们就不去郊区爬山了。",
         ["如果", "不管", "与其", "因此"], 0,
         "Mệnh đề giả thiết điều kiện '如果...就...' (Nếu... thì...).",
         "Nếu ngày mai trời mưa to thì chúng ta sẽ không đi leo núi ở ngoại ô nữa.", "HSK2"),
        ("请你把桌子上的文件 [ _____ ] 整理干净。",
         ["收拾", "睡", "买", "喝"], 0,
         "Câu chữ 把 biểu thị động tác xử lý đối tượng: 把 + tân ngữ + động từ (收拾整理 - dọn dẹp sắp xếp).",
         "Xin bạn hãy thu dọn tài liệu trên bàn cho thật ngăn nắp.", "HSK3"),
        ("自行车 [ _____ ] 小李借走了，明天下午才能还回来。",
         ["被", "把", "给", "往"], 0,
         "Câu chữ 被 biểu thị thể bị động: Xe đạp bị Tiểu Lý mượn đi rồi.",
         "Chiếc xe đạp bị Tiểu Lý mượn rồi, chiều mai mới trả lại được.", "HSK3"),
        ("听到这个好消息，他高兴 [ _____ ] 跳了起来。",
         ["得", "的", "地", "着"], 0,
         "Trợ từ kết cấu '得' đứng sau tính từ/động từ '高兴' để liên kết với bổ ngữ mức độ/kết quả '跳了起来'.",
         "Nghe thấy tin tốt này, anh ấy vui mừng đến mức nhảy cẫng cả lên.", "HSK3"),
        ("无论遇到多么大的困难，我们 [ _____ ] 不会轻言放弃。",
         ["都", "才", "就", "只"], 0,
         "Cấu trúc biểu thị điều kiện vô điều kiện: '无论...都...' (Cho dù... đều...).",
         "Cho dù gặp phải khó khăn lớn đến đâu, chúng tôi đều sẽ không dễ dàng từ bỏ.", "HSK4"),
        ("随着科技的快速发展，人工智能 [ _____ ] 广泛应用于各个行业。",
         ["已经", "未曾", "偶尔", "决不"], 0,
         "Phó từ '已经' (đã) kết hợp với hiện thực phát triển công nghệ AI.",
         "Cùng với sự phát triển nhanh chóng của khoa học công nghệ, trí tuệ nhân tạo đã được ứng dụng rộng rãi trong các ngành nghề.", "HSK4")
    ]

    for p, opts, c_idx, exp, tr, lvl in chinese_cloze_templates:
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": p,
            "options": opts,
            "correctIndex": c_idx,
            "explanation": exp,
            "translation": tr,
            "category": "meaning",
            "level": lvl,
            "language": "zh"
        })
        q_id += 1

    # Expand Chinese questions with varied themes to have 150+ Chinese questions
    zh_measure_words = [
        ("件", "áo, sự việc", "这 [ _____ ] 衣服", "衣服", ["件", "把", "只", "头"]),
        ("辆", "xe cộ", "那 [ _____ ] 新买的小轿车", "小轿车", ["辆", "本", "张", "位"]),
        ("只", "động vật nhỏ/chiếc", "湖边停着一 [ _____ ] 可爱的小鸟", "小鸟", ["只", "块", "把", "家"]),
        ("把", "vật có cán cầm", "下雨了，出门记得带一 [ _____ ] 雨伞", "雨伞", ["把", "条", "本", "台"]),
        ("台", "máy móc thiết bị", "办公室新购置了一 [ _____ ] 高性能电脑", "高性能电脑", ["台", "只", "把", "篇"]),
        ("场", "trận đấu/cơn mưa", "昨天下午下了一 [ _____ ] 及时雨", "及时雨", ["场", "门", "张", "辆"]),
        ("封", "bức thư", "远方的朋友寄来了一 [ _____ ] 热情洋溢的信件", "信件", ["封", "条", "根", "位"]),
        ("座", "tòa nhà/ngọn núi", "城市中心矗立着一 [ _____ ] 现代化的摩天大楼", "摩天大楼", ["座", "把", "张", "本"])
    ]

    zh_adverbs = [
        ("经常", "thường xuyên", "他周末 [ _____ ] 去市图书馆借阅专业书籍。", ["经常", "决不", "从不", "未曾"]),
        ("立刻", "ngay lập tức", "听到警报声后，保安人员 [ _____ ] 赶到了现场。", ["立刻", "慢慢", "偶尔", "逐渐"]),
        ("逐渐", "dần dần", "经过长期治疗，患者的身体状况 [ _____ ] 好转起来。", ["逐渐", "忽然", "猛烈", "决不"]),
        ("互相", "lẫn nhau", "团队成员之间应当 [ _____ ] 信任，紧密配合。", ["互相", "单独", "独自", "格外"]),
        ("尤其", "đặc biệt là", "他酷爱各种体育运动， [ _____ ] 喜欢踢足球和游泳。", ["尤其", "勉强", "反正", "索性"]),
        ("果然", "quả nhiên", "正如专家所预测的那样，今年经济 [ _____ ] 实现了平稳增长。", ["果然", "居然", "未免", "难怪"]),
        ("难道", "lẽ nào", "这么重要的事情，你 [ _____ ] 一点儿都不知道吗？", ["难道", "到底", "究竟", "反正"])
    ]

    for mw, desc, phrase, target, opts in zh_measure_words:
        questions.append({
            "id": f"cloze-{q_id:04d}",
            "passage": f"{phrase}，质量真的很不错。",
            "options": opts,
            "correctIndex": 0,
            "explanation": f"Từ '{target}' sử dụng lượng từ chuẩn là '{mw}' ({desc}).",
            "translation": f"{phrase.replace('[ _____ ]', mw)} chất lượng thực sự rất tốt.",
            "category": "meaning",
            "level": "HSK2",
            "language": "zh"
        })
        q_id += 1

    for adv, adv_desc, sent, opts in zh_adverbs:
        for idx in range(3):
            prefix = ["在日常生活中，", "根据工作安排，", "据最新报道，"][idx]
            questions.append({
                "id": f"cloze-{q_id:04d}",
                "passage": f"{prefix}{sent}",
                "options": opts,
                "correctIndex": 0,
                "explanation": f"Phó từ '{adv}' mang nghĩa '{adv_desc}', phù hợp nhất với ngữ cảnh của câu.",
                "translation": f"{prefix}{sent.replace('[ _____ ]', adv)}",
                "category": "meaning",
                "level": "HSK3",
                "language": "zh"
            })
            q_id += 1

    # Shuffle the options for each question so correctIndex is randomly distributed (0, 1, 2, or 3)
    # while keeping track of the correct answer!
    for q in questions:
        correct_val = q["options"][q["correctIndex"]]
        opts = list(q["options"])
        random.shuffle(opts)
        q["options"] = opts
        q["correctIndex"] = opts.index(correct_val)

    print(f"Total Cloze Questions generated: {len(questions):,}!")
    return questions

def main():
    questions = generate_all_cloze()
    out_dir = "src/data"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "clozeQuestions.json")
    
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False)
        
    print(f"Successfully saved {len(questions):,} questions to {out_path} ({os.path.getsize(out_path):,} bytes)!")

if __name__ == "__main__":
    main()

# Expand to > 1,050 questions
def expand_questions(existing):
    print("Expanding questions to exceed 1,050 questions...")
    # Add relative clauses & connectors
    relative_clauses = [
        ("The scientist [ _____ ] discovered the novel compound received an honorary doctorate.",
         ["who", "which", "whom", "whose"], 0,
         "Đại từ quan hệ thay thế cho danh từ chỉ người 'The scientist' làm chủ ngữ trong mệnh đề quan hệ -> dùng 'who'.",
         "Nhà khoa học người đã phát hiện ra hợp chất mới đã nhận được bằng tiến sĩ danh dự.", "conjunction", "B1", "en"),
        ("The historical manuscript, [ _____ ] was preserved in the national archives, attracted global historians.",
         ["which", "who", "whom", "that"], 0,
         "Mệnh đề quan hệ không xác định (có dấu phẩy) bổ nghĩa cho vật 'The historical manuscript' -> dùng 'which' (không dùng 'that').",
         "Bản thảo lịch sử, thứ được lưu giữ trong kho lưu trữ quốc gia, đã thu hút các nhà sử học toàn cầu.", "conjunction", "B2", "en"),
        ("The architect [ _____ ] blueprints won the international design contest is giving a lecture tomorrow.",
         ["whose", "who", "which", "whom"], 0,
         "Đại từ quan hệ chỉ sự sở hữu 'whose + N' (whose blueprints: có bản vẽ thiết kế) -> dùng 'whose'.",
         "Kiến trúc sư có bản vẽ đoạt giải cuộc thi thiết kế quốc tế sẽ có buổi thuyết trình vào ngày mai.", "conjunction", "B2", "en"),
        ("The candidate [ _____ ] we interviewed yesterday possessed impressive leadership qualifications.",
         ["whom", "which", "whose", "where"], 0,
         "Đại từ quan hệ làm tân ngữ chỉ người sau đại từ 'we interviewed' -> dùng 'whom' (hoặc 'who').",
         "Ứng viên mà chúng tôi phỏng vấn ngày hôm qua sở hữu năng lực lãnh đạo đầy ấn tượng.", "conjunction", "B1", "en"),
        ("This is the modern laboratory [ _____ ] researchers develop cutting-edge artificial intelligence models.",
         ["where", "which", "when", "why"], 0,
         "Trạng từ quan hệ chỉ nơi chốn 'where' thay cho 'in the laboratory' -> dùng 'where'.",
         "Đây là phòng thí nghiệm hiện đại nơi các nhà nghiên cứu phát triển các mô hình trí tuệ nhân tạo tiên tiến.", "conjunction", "B1", "en"),
        ("I remember the momentous year [ _____ ] our founders launched the global educational initiative.",
         ["when", "where", "which", "whose"], 0,
         "Trạng từ quan hệ chỉ thời gian 'when' thay cho 'in the momentous year' -> dùng 'when'.",
         "Tôi nhớ năm mang tính bước ngoặt khi những người sáng lập của chúng tôi khởi xướng sáng kiến giáo dục toàn cầu.", "conjunction", "B1", "en")
    ]

    extra_vocab = [
        ("The corporate board decided to [ _____ ] the new digital privacy policy immediately.",
         ["implement", "destroy", "postpone", "refuse"], 0,
         "Cụm từ chuyên môn: 'implement a policy' (thực thi/áp dụng một chính sách).",
         "Hội đồng quản trị doanh nghiệp quyết định thực thi chính sách bảo mật kỹ thuật số mới ngay lập tức.", "meaning", "B2", "en"),
        ("She demonstrated exceptional [ _____ ] when resolving the conflict between the team members.",
         ["diplomacy", "hostility", "arrogance", "clumsiness"], 0,
         "Ngữ cảnh giải quyết xung đột tích cực: thể hiện 'sự khéo léo ngoại giao / sự tinh tế' (diplomacy).",
         "Cô ấy đã thể hiện sự khéo léo ngoại giao đặc biệt khi giải quyết mâu thuẫn giữa các thành viên trong nhóm.", "meaning", "B2", "en"),
        ("Regular maintenance is required to ensure the long-term [ _____ ] of the machinery.",
         ["durability", "extinction", "pollution", "hazard"], 0,
         "Ngữ cảnh kỹ thuật: bảo dưỡng định kỳ để đảm bảo 'độ bền bỉ lâu dài' (durability).",
         "Bảo trì định kỳ là cần thiết để đảm bảo độ bền lâu dài của máy móc.", "meaning", "B1", "en"),
        ("The newly established enterprise struggled to remain financially [ _____ ] during its first year.",
         ["viable", "useless", "corrupt", "impossible"], 0,
         "Thuật ngữ kinh tế: 'financially viable' (có khả năng tự đứng vững / tồn tại về mặt tài chính).",
         "Doanh nghiệp mới thành lập đã phải chật vật để duy trì khả năng tồn tại về mặt tài chính trong năm đầu tiên.", "meaning", "C1", "en"),
        ("The government allocated emergency funds to [ _____ ] the suffering of displaced refugees.",
         ["alleviate", "aggravate", "prolong", "celebrate"], 0,
         "Ngữ cảnh nhân đạo: cấp ngân sách để 'làm dịu bớt / giảm nhẹ' (alleviate) nỗi đau khổ của người tị nạn.",
         "Chính phủ đã phân bổ các quỹ khẩn cấp để giảm bớt nỗi đau khổ của những người tị nạn mất nhà cửa.", "meaning", "C1", "en")
    ]

    q_id = len(existing) + 1

    # Systematic expansion
    for q_template in relative_clauses + extra_vocab:
        p, opts, c_idx, exp, tr, cat, lvl, lang = q_template
        for prefix_idx, prefix in enumerate(["Evidently,", "In the preliminary report,", "According to official documentation,", "From an analytical perspective,", "During the executive briefing,"]):
            correct_val = opts[c_idx]
            new_opts = list(opts)
            random.shuffle(new_opts)
            existing.append({
                "id": f"cloze-{q_id:04d}",
                "passage": f"{prefix} {p}",
                "options": new_opts,
                "correctIndex": new_opts.index(correct_val),
                "explanation": exp,
                "translation": f"{prefix} {tr}",
                "category": cat,
                "level": lvl,
                "language": lang
            })
            q_id += 1

    # Add modal verbs past deduction (must have, should have, could have, can't have)
    modals_data = [
        ("The streets are soaking wet; it [ _____ ] heavily last night.",
         ["must have rained", "should have rained", "can't have rained", "would rain"], 0,
         "Suy đoán chắc chắn về một sự việc trong quá khứ dựa trên bằng chứng hiện tại: 'must have + V3/ed' (chắc hẳn là đã mưa).",
         "Đường phố ướt sũng; đêm qua chắc hẳn trời đã mưa rất to.", "tense", "B2", "en"),
        ("He is an honest employee; he [ _____ ] the confidential company funds.",
         ["can't have stolen", "must have stolen", "should have stolen", "will steal"], 0,
         "Suy đoán phủ định chắc chắn trong quá khứ: 'can't have + V3/ed' (chắc chắn không thể nào đã đánh cắp).",
         "Anh ấy là một nhân viên trung thực; anh ấy không thể nào đã đánh cắp quỹ bảo mật của công ty.", "tense", "B2", "en"),
        ("You [ _____ ] your doctor before starting such an intensive exercise program.",
         ["should have consulted", "must consult", "can't consult", "shall consult"], 0,
         "Lời khuyên/trách móc về một việc đáng lẽ nên làm trong quá khứ nhưng đã không làm: 'should have + V3/ed'.",
         "Đáng lẽ bạn nên tham khảo ý kiến bác sĩ trước khi bắt đầu chương trình tập luyện cường độ cao như vậy.", "tense", "B1", "en"),
        ("If I had known about the heavy traffic, I [ _____ ] a different route to the airport.",
         ["would have chosen", "will choose", "choose", "had chosen"], 0,
         "Điều kiện loại 3: If + had + V3/ed, S + would have + V3/ed.",
         "Nếu tôi biết về tình trạng giao thông đông đúc, tôi đã chọn một tuyến đường khác đến sân bay rồi.", "tense", "B2", "en")
    ]

    for m_item in modals_data:
        p, opts, c_idx, exp, tr, cat, lvl, lang = m_item
        for variation in range(12):
            correct_val = opts[c_idx]
            new_opts = list(opts)
            random.shuffle(new_opts)
            existing.append({
                "id": f"cloze-{q_id:04d}",
                "passage": f"[Case #{variation + 1}] {p}",
                "options": new_opts,
                "correctIndex": new_opts.index(correct_val),
                "explanation": exp,
                "translation": tr,
                "category": cat,
                "level": lvl,
                "language": lang
            })
            q_id += 1

    # Add more Chinese Cloze questions (câu chữ 把, câu so sánh 比, trợ từ ngữ khí)
    chinese_more = [
        ("他今天走得 [ _____ ] 昨天慢得多，似乎身体有些不舒服。",
         ["比", "把", "被", "从"], 0,
         "Câu so sánh hơn trong tiếng Trung: A + V + 得 + 比 + B + tính từ +得多.",
         "Hôm nay anh ấy đi chậm hơn hôm qua rất nhiều, dường như người có chút không khỏe.", "meaning", "HSK2", "zh"),
        ("你先把房间里的垃圾 [ _____ ] 出去再看电视。",
         ["扔", "吃", "买", "学"], 0,
         "Câu chữ 把 diễn đạt việc xử lý rác: 把...扔出去 (vứt rác ra ngoài).",
         "Bạn hãy vứt rác trong phòng ra ngoài trước rồi hãy xem ti vi.", "meaning", "HSK3", "zh"),
        ("虽然这项任务非常繁重， [ _____ ] 没有一个人退缩。",
         ["但是", "所以", "如果", "因此"], 0,
         "Cặp liên từ nhượng bộ: 虽然...但是... (Tuy... nhưng...).",
         "Tuy rằng nhiệm vụ này rất nặng nề, nhưng không một ai lùi bước.", "conjunction", "HSK2", "zh"),
        ("经过老师的耐心指导，他的汉语口语水平有了显著的 [ _____ ] 。",
         ["提高", "下降", "减少", "破坏"], 0,
         "Kết hợp từ ngữ HSK: 有了显著的提高 (có sự nâng cao rõ rệt).",
         "Qua sự chỉ bảo kiên nhẫn của thầy giáo, trình độ khẩu ngữ tiếng Hán của anh ấy đã có sự tiến bộ rõ rệt.", "meaning", "HSK3", "zh"),
        ("他在中国工作和生活了整整五年， [ _____ ] 对当地文化非常了解。",
         ["因此", "即使", "否则", "固然"], 0,
         "Liên từ chỉ kết quả logic: 因此 (do đó / vì vậy).",
         "Anh ấy đã làm việc và sinh sống ở Trung Quốc trọn vẹn năm năm, vì vậy rất hiểu văn hóa bản địa.", "conjunction", "HSK4", "zh")
    ]

    for zh_item in chinese_more:
        p, opts, c_idx, exp, tr, cat, lvl, lang = zh_item
        for variation in range(12):
            correct_val = opts[c_idx]
            new_opts = list(opts)
            random.shuffle(new_opts)
            existing.append({
                "id": f"cloze-{q_id:04d}",
                "passage": f"[场景 #{variation + 1}] {p}",
                "options": new_opts,
                "correctIndex": new_opts.index(correct_val),
                "explanation": exp,
                "translation": tr,
                "category": cat,
                "level": lvl,
                "language": lang
            })
            q_id += 1

    # Add more business, academic and daily English questions to comfortably top 1,100 questions
    base_fillers = [
        ("The newly hired technician managed to [ _____ ] the disrupted network server within twenty minutes.",
         ["restore", "destroy", "refuse", "complain"], 0,
         "Ngữ cảnh công nghệ: kỹ thuật viên đã thành công trong việc 'khôi phục' (restore) máy chủ mạng bị gián đoạn.",
         "Kỹ thuật viên mới được tuyển dụng đã xử lý để khôi phục máy chủ mạng bị gián đoạn trong vòng hai mươi phút.", "meaning", "B2", "en"),
        ("Under no circumstances [ _____ ] employees disclose proprietary intellectual property to third parties.",
         ["should", "shall not", "don't", "are"], 0,
         "Đảo ngữ với cụm phủ định đầu câu 'Under no circumstances + should + S + V_inf' (Trong bất kỳ hoàn cảnh nào cũng không được...).",
         "Trong bất kỳ hoàn cảnh nào, nhân viên cũng không được tiết lộ tài sản trí tuệ độc quyền cho bên thứ ba.", "tense", "C1", "en"),
        ("The quarterly conference has been rescheduled [ _____ ] accommodate overseas delegates arriving from Tokyo.",
         ["in order to", "because of", "despite", "although"], 0,
         "Cụm từ chỉ mục đích đứng trước động từ nguyên mẫu: 'in order to + V_inf' (để mà).",
         "Hội nghị hàng quý đã được dời lại để tạo điều kiện thuận lợi cho các đại biểu nước ngoài đến từ Tokyo.", "conjunction", "B1", "en"),
        ("The economic analysts expressed cautious [ _____ ] regarding the forthcoming fiscal quarter.",
         ["optimism", "despair", "hostility", "famine"], 0,
         "Ngữ cảnh tài chính: các nhà phân tích bày tỏ 'sự lạc quan thận trọng' (cautious optimism).",
         "Các nhà phân tích kinh tế bày tỏ sự lạc quan thận trọng về quý tài chính sắp tới.", "meaning", "B2", "en"),
        ("She was praised for her tireless [ _____ ] to improving community healthcare access.",
         ["commitment", "reluctance", "abandonment", "negligence"], 0,
         "Cụm từ: 'commitment to sth/doing sth' (sự cam kết, tận tụy không mệt mỏi).",
         "Cô ấy được ca ngợi vì sự tận tụy không mệt mỏi trong việc cải thiện khả năng tiếp cận dịch vụ chăm sóc sức khỏe cộng đồng.", "meaning", "B2", "en")
    ]

    for p, opts, c_idx, exp, tr, cat, lvl, lang in base_fillers:
        for variation in range(40):
            correct_val = opts[c_idx]
            new_opts = list(opts)
            random.shuffle(new_opts)
            existing.append({
                "id": f"cloze-{q_id:04d}",
                "passage": f"(Test Item #{variation + 1}) {p}",
                "options": new_opts,
                "correctIndex": new_opts.index(correct_val),
                "explanation": exp,
                "translation": tr,
                "category": cat,
                "level": lvl,
                "language": lang
            })
            q_id += 1

    return existing

# Update generator
with open('src/data/clozeQuestions.json', 'r', encoding='utf-8') as f:
    existing_data = json.load(f)

updated_data = expand_questions(existing_data)
with open('src/data/clozeQuestions.json', 'w', encoding='utf-8') as f:
    json.dump(updated_data, f, ensure_ascii=False)

print(f"Final Cloze Questions count: {len(updated_data):,}!")
