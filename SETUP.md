# 🛠️ Hướng Dẫn Cài Đặt & Phát Triển

## Cấu Trúc Thư Mục

```
web/
├── index.html                  # Trang chính (mở file này)
├── README.md                   # Hướng dẫn sử dụng
├── SETUP.md                    # File này
└── assets/
    ├── css/
    │   └── style.css          # Tất cả CSS cho giao diện
    └── js/
        ├── data.js            # Dữ liệu từ vựng & bài tập
        └── app.js             # Logic ứng dụng chính
```

---

## 🚀 Chạy Website (Cách Đơn Giản)

### Cách 1: Mở trực tiếp (Nên dùng)
1. Tìm tệp `index.html` trong thư mục `web/`
2. Nhấp đúp vào file hoặc kéo vào trình duyệt
3. Website sẽ mở và sử dụng bình thường

### Cách 2: Sử dụng Local Server (Khuyến nghị cho phát triển)
Nếu bạn muốn chỉnh sửa code:

**Trên macOS/Linux:**
```bash
cd /Users/nguyenduckhanh/Desktop/Zone\ Mr.\ Tâm/AI\ AGENT/luyentienganh/web
python3 -m http.server 8000
```

Sau đó mở `http://localhost:8000` trong trình duyệt.

**Trên Windows (PowerShell):**
```powershell
cd "Desktop/Zone Mr. Tâm/AI AGENT/luyentienganh/web"
python -m http.server 8000
```

---

## 📝 Tùy Chỉnh Nội Dung

### Thêm Từ Vựng Mới

Mở file `assets/js/data.js` và tìm:
```javascript
const vocabularyData = {
    animals: [
        { english: "Cat", vietnamese: "Mèo", emoji: "🐱" },
        { english: "Dog", vietnamese: "Chó", emoji: "🐶" },
        // ... thêm ở đây
        { english: "Tiger", vietnamese: "Hổ", emoji: "🐯" },
    ],
```

Thêm một dòng mới với định dạng:
```javascript
{ english: "TIẾNG ANH", vietnamese: "TIẾNG VIỆT", emoji: "🔤" }
```

### Thêm Chủ Đề Từ Vựng Mới

Trong `vocabularyData`, thêm một chủ đề mới:
```javascript
const vocabularyData = {
    animals: [ /* ... */ ],
    colors: [ /* ... */ ],
    // Thêm chủ đề này
    sports: [
        { english: "Football", vietnamese: "Bóng đá", emoji: "⚽" },
        { english: "Tennis", vietnamese: "Quần vợt", emoji: "🎾" },
    ],
};
```

Sau đó, thêm nút trong `index.html`:
```html
<button class="topic-btn" data-topic="sports">Thể Thao 🏀</button>
```

### Tùy Chỉnh Màu Sắc

Mở `assets/css/style.css` và tìm:
```css
.header {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    /* Thay đổi mã hex màu ở đây */
}
```

Các màu sắc chính:
- Primary: `#667eea` (Tím xanh)
- Secondary: `#764ba2` (Tím)
- Accent: `#f093fb` (Hồng)
- Success: `#4caf50` (Xanh lá)
- Error: `#f44336` (Đỏ)

### Tùy Chỉnh Font & Cỡ Chữ

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* Thay đổi font ở đây */
}

.section h2 {
    font-size: 2em;  /* Thay đổi cỡ chữ */
}
```

---

## 🎮 Thêm Bài Tập Mới

### Thêm Bài Nghe Mới

Trong `assets/js/data.js`:
```javascript
const listeningExercises = [
    // ... bài cũ ...
    {
        question: "Bạn vừa nghe gì?",
        options: [
            { text: "🦒 Hươu cao cổ (Giraffe)", correct: true },
            { text: "🦓 Ngựa vằn (Zebra)", correct: false },
            { text: "🐘 Voi (Elephant)", correct: false },
        ],
        audio: "Giraffe sound",
    },
];
```

### Thêm Bài Đọc Mới

```javascript
const readingExercises = [
    // ... bài cũ ...
    {
        text: `Đoạn văn tiếng Anh ở đây...`,
        questions: [
            {
                question: "Câu hỏi 1?",
                options: [
                    { text: "Đáp án A", correct: true },
                    { text: "Đáp án B", correct: false },
                ],
            },
        ],
    },
];
```

### Thêm Bài Viết Mới

```javascript
const writingExercises = [
    // ... bài cũ ...
    {
        prompt: "Hoàn thành câu: I am ___.",
        correctAnswers: ["happy", "sad", "tired", "excited", "busy"],
        hint: "Trả lời: một cảm xúc",
        feedback: {
            correct: "Tuyệt vời! Bạn đúng rồi! 🌟",
            incorrect: "Hãy thử lại. Nghĩ về một cảm xúc khác.",
        },
    },
];
```

---

## 🔧 Tùy Chỉnh Hệ Thống Điểm

Trong `assets/js/app.js`, tìm hàm `addScore()`:
```javascript
function addScore(points) {
    appState.score += points;
    // các dòng khác...
}
```

Tìm nơi gọi `addScore()` để thay đổi điểm:
```javascript
// Thay đổi số điểm này
addScore(5);   // Từ vựng
addScore(10);  // Bài nghe
addScore(15);  // Bài viết
addScore(20);  // Trò chơi
```

---

## 🌐 Lưu Trữ Tiến Độ

Website lưu tiến độ trong `localStorage`. Để xóa dữ liệu:

**Trong Developer Tools (F12):**
1. Mở Console
2. Gõ: `localStorage.clear()`
3. Nhấn Enter

Hoặc trong code:
```javascript
// Xóa dữ liệu
localStorage.removeItem('englishLearningProgress');

// Hoặc inspect
console.log(localStorage.getItem('englishLearningProgress'));
```

---

## 🚀 Triển Khai Online

### Option 1: GitHub Pages (Miễn phí)
1. Tạo repository GitHub
2. Tải folder `web` lên
3. Kích hoạt GitHub Pages trong Settings
4. Website sẽ có sẵn ở `yourusername.github.io/repo-name`

### Option 2: Netlify (Miễn phí)
1. Đăng ký tại netlify.com
2. Kéo thả folder `web` vào
3. Website sẽ deploy tự động

### Option 3: Firebase Hosting (Miễn phí)
1. Cài Firebase CLI
2. Khởi tạo project
3. Deploy: `firebase deploy`

---

## 🐛 Troubleshooting

### Website không mở
- Kiểm tra file `index.html` tồn tại
- Thử mở bằng trình duyệt khác
- Xóa cache: Ctrl+Shift+Delete

### Phát âm không hoạt động
- Kiểm tra âm lượng máy
- Thử trình duyệt Chrome (hỗ trợ Web Speech API tốt nhất)
- Kiểm tra Console (F12) có lỗi gì không

### Dữ liệu không lưu
- Kiểm tra localStorage có bị disable không
- Xóa dữ liệu cũ: `localStorage.clear()`
- Mở file mới trong Tab riêng

### Giao diện lỗi
- F5 để refresh
- Ctrl+Shift+R để hard refresh (xóa cache)
- Mở Developer Tools (F12) xem lỗi CSS

---

## 💡 Tips & Mẹo

### Tạo Bìa Ngoài Trang (Optional)
Thêm file `start_page.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>English Learning</title>
</head>
<body style="text-align: center; padding: 50px;">
    <h1>🌟 English Learning Land 🌟</h1>
    <p>Chào mừng đến với thế giới học tiếng Anh!</p>
    <a href="index.html" style="font-size: 20px; padding: 20px;">Bắt Đầu Học 📚</a>
</body>
</html>
```

### Thêm Âm Thanh (Optional)
Tìm nơi gọi `playListeningAudio()` và sử dụng Audio API thay vì Text-to-Speech:
```javascript
const audio = new Audio('path-to-audio-file.mp3');
audio.play();
```

### Tăng Độ Khó
- Thêm từ vựng phức tạp hơn
- Làm bài đọc dài hơn
- Thêm bài tập nghe nhanh hơn
- Tăng yêu cầu chính tả trong bài viết

---

## 📚 Tài Nguyên Thêm

- **Emoji**: https://emojipedia.org/
- **Colors**: https://htmlcolorcodes.com/
- **Font**: https://fonts.google.com/
- **Icons**: https://fontawesome.com/

---

## 🤝 Đóng Góp

Bạn có thể:
- Thêm từ vựng mới
- Tạo bài tập thêm
- Sửa lỗi
- Cải thiện giao diện
- Dịch sang ngôn ngữ khác

---

Hữu ích! Chúc bạn phát triển website thành công! 🚀

