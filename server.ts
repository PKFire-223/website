import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

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
  // Vite Middlewares in Dev / Static serving in Production
  // =========================================================================
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
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
    console.log(`LinguaVocab Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
