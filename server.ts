import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function autoOpenBrowser(url: string) {
  if (
    process.env.NO_AUTO_OPEN === 'true' ||
    process.env.CI ||
    (process.platform === 'linux' && !process.env.DISPLAY && !process.env.WAYLAND_DISPLAY)
  ) {
    return;
  }

  const cmd =
    process.platform === 'darwin'
      ? `open "${url}"`
      : process.platform === 'win32'
      ? `start "" "${url}"`
      : `xdg-open "${url}"`;

  try {
    exec(cmd, () => {
      // Gracefully handle headless systems or environments without desktop GUI
    });
  } catch {
    // Ignore any spawn or execution errors silently
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Bandwidth & Transfer Optimization: Enable high-performance gzip/deflate compression
  app.use(
    compression({
      level: 6,
      threshold: 1024, // Compress responses above 1KB
    })
  );

  // JSON body parser with 20MB limit for image base64 payloads
  app.use(express.json({ limit: '20mb' }));

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // =========================================================================
  // API 1: AI Photo & Context Translation (20-Year Translation Expert Persona)
  // =========================================================================
  app.post('/api/ai-translate', async (req, res) => {
    try {
      const { text, imageBase64, mimeType, sourceLang, targetLang, context } = req.body;

      const systemPrompt = `Bạn là một Chuyên Gia Dịch Thuật Cao Cấp với hơn 20 năm kinh nghiệm chuyên sâu về chuyển ngữ giữa Tiếng Anh (Oxford/Cambridge), Tiếng Trung (Bắc Kinh/HSK Quốc Tế) và Tiếng Việt chuẩn mực.
Tôn chỉ dịch thuật: "Tín - Đạt - Nhã" (Chính xác, gãy gọn, tinh tế và đúng ngữ cảnh văn hóa).
Nếu người dùng cung cấp ảnh (biển hiệu, menu, trang sách, văn bản), hãy nhận diện chính xác từng từ ngữ và phân tích chuyên sâu.

Định dạng phản hồi có cấu trúc Markdown chuyên nghiệp:
### 1. 🔍 Trích xuất văn bản gốc (Original Text)
- Ghi lại nguyên văn chữ gốc. Nếu là tiếng Trung, PHẢI ghi kèm Pinyin có dấu thanh điệu đầy đủ.

### 2. 🌟 Bản dịch chuẩn mực & Tự nhiên (Natural Fluent Translation)
- Bản dịch tiếng Việt mượt mà, văn phong sắc sảo, tự nhiên như người bản xứ nói/viết.

### 3. 🧩 Bản dịch đối chiếu từng thành phần (Literal & Structural Breakdown)
- Giải nghĩa đối chiếu để người học hiểu rõ cách ghép từ và cấu trúc ngữ pháp nguồn.

### 4. 📚 Phân tích từ vựng & Cấu trúc đắt giá (Key Vocabulary & Grammar)
- Liệt kê các từ vựng, thành ngữ hoặc cấu trúc ngữ pháp then chốt (kèm từ loại, phiên âm IPA hoặc Pinyin, và ví dụ ứng dụng).

### 5. 💡 Ghi chú văn hóa & Ngữ cảnh thực tiễn (Cultural & Pragmatic Notes)
- Giải thích bối cảnh xã hội, lưu ý xưng hô, sắc thái trang trọng/thân mật hoặc lưu ý khi áp dụng trong đời sống.`;

      const contents: any[] = [];
      let promptText = `Ngôn ngữ nguồn: ${sourceLang || 'Tự động nhận diện'}. Ngôn ngữ đích: ${targetLang || 'Tiếng Việt'}.\n`;
      if (context) {
        promptText += `Ngữ cảnh chuyên ngành/bối cảnh người dùng cung cấp: "${context}"\n`;
      }
      if (text) {
        promptText += `Văn bản cần dịch: """${text}"""\n`;
      }
      if (imageBase64) {
        promptText += `Hãy phân tích kỹ hình ảnh đính kèm, nhận diện toàn bộ văn bản và dịch thuật theo chuẩn Chuyên Gia 20 năm kinh nghiệm.\n`;
      }

      contents.push({ text: `${systemPrompt}\n\n${promptText}` });

      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
        contents.push({
          inlineData: {
            mimeType: mimeType || 'image/jpeg',
            data: cleanBase64,
          },
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error('Error in /api/ai-translate:', error);
      res.status(500).json({ error: error?.message || 'Lỗi xử lý dịch thuật AI' });
    }
  });

  // =========================================================================
  // API 2: AI Roleplay Conversational Partner (Text & Mic)
  // =========================================================================
  app.post('/api/ai-roleplay', async (req, res) => {
    try {
      const { scenarioTitle, role, userMessage, history, language } = req.body;

      const langName = language === 'zh' ? 'Tiếng Trung (Mandarin Chinese HSK)' : 'Tiếng Anh (English Oxford/CEFR)';
      const systemInstruction = `Bạn là một người bản xứ đang đóng vai trong tình huống giao tiếp đời thực với người học.
Ngôn ngữ giao tiếp chính: ${langName}.
Tình huống hội thoại: ${scenarioTitle}.
Vai trò của bạn: ${role}.

Quy tắc tương tác:
1. Trả lời trực tiếp bằng ${langName} một cách sống động, tự nhiên, duy trì câu chuyện và đặt câu hỏi mở để người học tiếp tục phản xạ.
2. Ngay sau câu thoại chính, cung cấp phần hỗ trợ học tập:
   - [Pinyin/IPA]: Phiên âm chuẩn cho câu thoại
   - [Bản dịch]: Dịch nghĩa tiếng Việt ngắn gọn, dễ hiểu
   - [Nhận xét & Sửa lỗi]: Nếu câu trước đó của người học có lỗi từ vựng, ngữ pháp hoặc phát âm, hãy chỉ ra và sửa một cách nhẹ nhàng, khích lệ. Nếu câu của người học tốt, hãy khen ngợi ngắn gọn.
   - [Gợi ý phản xạ]: Gợi ý 2 cách trả lời mẫu (1 ngắn gọn, 1 nâng cao) để người học có thể chọn nói tiếp.`;

      const contents: any[] = [];

      if (history && Array.isArray(history)) {
        for (const item of history) {
          contents.push({
            role: item.sender === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
        },
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Error in /api/ai-roleplay:', error);
      res.status(500).json({ error: error?.message || 'Lỗi xử lý hội thoại AI' });
    }
  });

  // =========================================================================
  // API 3: AI Standard TOEIC & IELTS Exam Generator
  // =========================================================================
  app.post('/api/generate-exam', async (req, res) => {
    try {
      const {
        examType = 'TOEIC',
        part = 'TOEIC_PART5',
        targetLevel = '750+',
        topic = 'Công sở & Kinh doanh quốc tế (Business & Workplace)',
        questionCount = 5,
      } = req.body;

      const systemInstruction = `Bạn là Chuyên gia Khảo thí và Biên soạn Đề thi Quốc tế hàng đầu về TOEIC (ETS) và IELTS (Cambridge/IDP).
Nhiệm vụ của bạn là tạo một bộ đề thi mẫu chuẩn chỉnh 100% theo đúng format, độ khó và văn phong của đề thi thực tế (như trên các nền tảng luyện thi hàng đầu như STUDY4, ETS Official, Cambridge Practice Tests).

Yêu cầu kỹ thuật & sư phạm:
1. Độ chính xác học thuật cao, không sai sót ngữ pháp, từ vựng chuẩn ngữ cảnh TOEIC/IELTS.
2. Với đề TOEIC:
   - Part 1: Cung cấp mô tả ngữ cảnh ảnh sống động (imageScene) + 4 câu miêu tả (A, B, C, D) có 1 câu chuẩn xác nhất, 3 câu bẫy quen thuộc (hành động vs trạng thái, phát âm na ná, chủ ngữ sai).
   - Part 2: Cung cấp 1 câu hỏi/phát biểu và 3 đáp án (A, B, C).
   - Part 3/4: Cung cấp audioScript hội thoại hoặc bài nói chuyện công sở (họp hành, du lịch, giao nhận hàng, tiếp thị) + chùm câu hỏi.
   - Part 5: Câu điền từ đơn lẻ với 4 đáp án (A, B, C, D) chia đều các dạng: từ loại (part of speech), thì/thể của động từ, liên từ/giới từ, và từ vựng nâng cao (collocations).
   - Part 6 & 7: Đoạn văn chuẩn format (Email, Notice, Memo, Article, Invoice, Schedule) + các câu hỏi đọc hiểu (Main idea, Detail, Inference, Synonym).
3. Với đề IELTS:
   - Reading: Bài đọc học thuật chất lượng cao (Passage) + dạng câu hỏi chuẩn (Multiple Choice, True/False/Not Given, Heading Matching, Summary Completion).
   - Listening: Audio script sống động, tự nhiên + dạng câu hỏi Note completion hoặc Multiple Choice.
   - Speaking / Writing: Bộ đề thi thật kèm dàn ý chuẩn Band 8.0, từ vựng C1/C2 (Collocations/Idioms) và bài mẫu tham khảo.
4. MỖI CÂU HỎI BẮT BUỘC PHẢI CÓ:
   - explanation: Lời giải thích tiếng Việt cực kỳ chi tiết, chỉ rõ quy tắc ngữ pháp, tại sao chọn đáp án này, tại sao 3 đáp án còn lại sai (phân tích bẫy đề thi).
   - translation: Dịch nghĩa hoàn chỉnh tiếng Việt của câu/đoạn trích.
   - keyVocab: Danh sách 2-4 từ vựng đắt giá trong câu (word, phonetic, pos, meaning, example).

PHẢN HỒI BẮT BUỘC DƯỚI DẠNG DUY NHẤT LÀ MỘT OBJECT JSON HỢP LỆ (KHÔNG VIẾT CHỮ NÀO KHÁC NGOÀI JSON):
{
  "id": "exam-string",
  "title": "Tên đề thi ngắn gọn, hấp dẫn",
  "examType": "${examType}",
  "part": "${part}",
  "targetLevel": "${targetLevel}",
  "topic": "${topic}",
  "timeLimitMinutes": ${Math.max(5, Math.min(30, questionCount * 2))},
  "passage": "Nội dung bài đọc nếu là Part 6, Part 7 hoặc IELTS Reading (để trống nếu Part 5/Part 2)",
  "audioScript": "Lời thoại kịch bản audio nếu là Listening (để ứng dụng tự phát âm qua Web Speech TTS)",
  "imageScene": "Mô tả hình ảnh nếu là TOEIC Part 1",
  "questions": [
    {
      "id": 1,
      "question": "Câu hỏi hoặc câu có chỗ trống ____",
      "options": ["(A) ...", "(B) ...", "(C) ...", "(D) ..."],
      "correctAnswer": "A",
      "explanation": "Giải thích chi tiết tại sao A đúng và các đáp án khác sai...",
      "translation": "Bản dịch nghĩa tiếng Việt...",
      "keyVocab": [
        {
          "word": "từ vựng",
          "phonetic": "/phiên âm/",
          "pos": "n/v/adj",
          "meaning": "nghĩa tiếng Việt",
          "example": "ví dụ minh họa"
        }
      ]
    }
  ]
}`;

      const userPrompt = `Hãy tạo một bộ đề thi ${examType} phần ${part} với ${questionCount} câu hỏi, trình độ mục tiêu: ${targetLevel}, chủ đề: ${topic}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });

      const rawText = response.text || '{}';
      let examData;
      try {
        examData = JSON.parse(rawText);
      } catch (parseErr) {
        // Fallback cleanup if markdown blocks leaked
        const cleaned = rawText.replace(/```json\s*|```/g, '').trim();
        examData = JSON.parse(cleaned);
      }

      res.json(examData);
    } catch (error: any) {
      console.error('Error in /api/generate-exam:', error);
      res.status(500).json({ error: error?.message || 'Lỗi khi tạo đề thi AI' });
    }
  });

  // =========================================================================
  // Vite Middlewares in Dev / Static serving in Production
  // =========================================================================
  if (process.env.NODE_ENV === 'production') {
    // Cache static assets (JS, CSS, images) with immutable 1 year cache
    app.use(
      express.static(path.join(__dirname, 'dist'), {
        maxAge: '1y',
        immutable: true,
        setHeaders: (res, filePath) => {
          // HTML and Service Worker files must never be cached to ensure users get immediate updates
          if (
            filePath.endsWith('.html') ||
            filePath.endsWith('sw.js') ||
            filePath.endsWith('manifest.webmanifest')
          ) {
            res.setHeader('Cache-Control', 'no-cache');
          }
        },
      })
    );
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    const localUrl = `http://localhost:${PORT}`;
    console.log(`\n======================================================`);
    console.log(`🚀 LinguaVocab Server is running successfully!`);
    console.log(`🌐 Local URL:   ${localUrl}`);
    console.log(`🌐 Network URL: http://0.0.0.0:${PORT}`);
    console.log(`======================================================\n`);

    // Auto open browser on successful startup
    autoOpenBrowser(localUrl);
  });
}

startServer();
