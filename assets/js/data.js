/* ============================================
   ENGLISH LEARNING LAND - DATA FILE v2.0
   Contains all educational content + Level System
   ============================================ */

// ============================================
// LEVEL SYSTEM
// ============================================

const LEVEL_NAMES = [
    'Dễ', 'Cơ Bản', 'Tiếp Theo', 'Vững Vàng', 'Nâng Cao', 'Thử Thách', 'Ráp Từ', 'Mạnh Dạn', 'Chuẩn Bị', 'Tốc Độ',
    'Tự Tin', 'Sáng Tạo', 'Bạn Đồng Hành', 'Giao Tiếp', 'Phát Triển', 'Thuyết Trình', 'Chuyên Nghiệp', 'Thành Thạo', 'Siêu Sao', 'Chuyên Gia'
];

const LEVEL_COLORS = [
    '#4caf50', '#42a5f5', '#ff9800', '#ab47bc', '#f44336', '#29b6f6', '#8e24aa', '#ffa726', '#66bb6a', '#5c6bc0',
    '#ec407a', '#7e57c2', '#26a69a', '#ff7043', '#9ccc65', '#d4e157', '#ffca28', '#5d4037', '#78909c', '#29b6f6'
];

const LEVELS = Array.from({ length: 20 }, (_, index) => {
    const id = index + 1;
    return {
        id,
        name: `Level ${id}: ${LEVEL_NAMES[index]}`,
        emoji: '⭐'.repeat(Math.min(3, id)),
        color: LEVEL_COLORS[index % LEVEL_COLORS.length],
        description: `Tăng số từ vựng và câu luyện nói ở level ${id}`,
        required_score: index === 0 ? 0 : index * 50,
    };
});

// ============================================
// VOCABULARY MASTER LIST
// ============================================

const vocabularyMaster = {
    animals: [
        { english: "Cat", vietnamese: "Mèo", emoji: "🐱" },
        { english: "Dog", vietnamese: "Chó", emoji: "🐶" },
        { english: "Lion", vietnamese: "Sư tử", emoji: "🦁" },
        { english: "Elephant", vietnamese: "Voi", emoji: "🐘" },
        { english: "Monkey", vietnamese: "Khỉ", emoji: "🐵" },
        { english: "Bird", vietnamese: "Chim", emoji: "🐦" },
        { english: "Fish", vietnamese: "Cá", emoji: "🐠" },
        { english: "Bear", vietnamese: "Gấu", emoji: "🐻" },
        { english: "Tiger", vietnamese: "Hổ", emoji: "🐯" },
        { english: "Giraffe", vietnamese: "Hươu cao cổ", emoji: "🦒" },
        { english: "Zebra", vietnamese: "Ngựa vằn", emoji: "🦓" },
        { english: "Penguin", vietnamese: "Chim cánh cụt", emoji: "🐧" },
        { english: "Frog", vietnamese: "Ếch", emoji: "🐸" },
        { english: "Rabbit", vietnamese: "Thỏ", emoji: "🐰" },
        { english: "Turtle", vietnamese: "Rùa", emoji: "🐢" },
        { english: "Panda", vietnamese: "Gấu trúc", emoji: "🐼" },
        { english: "Horse", vietnamese: "Ngựa", emoji: "🐴" },
        { english: "Cow", vietnamese: "Bò", emoji: "🐄" },
        { english: "Sheep", vietnamese: "Cừu", emoji: "🐑" },
        { english: "Chicken", vietnamese: "Gà", emoji: "🐔" },
    ],
    colors: [
        { english: "Red", vietnamese: "Đỏ", emoji: "🔴" },
        { english: "Blue", vietnamese: "Xanh da trời", emoji: "🔵" },
        { english: "Yellow", vietnamese: "Vàng", emoji: "🟡" },
        { english: "Green", vietnamese: "Xanh lá cây", emoji: "🟢" },
        { english: "Pink", vietnamese: "Hồng", emoji: "💗" },
        { english: "Purple", vietnamese: "Tím", emoji: "🟣" },
        { english: "Orange", vietnamese: "Cam", emoji: "🟠" },
        { english: "Black", vietnamese: "Đen", emoji: "⚫" },
        { english: "White", vietnamese: "Trắng", emoji: "⚪" },
        { english: "Gray", vietnamese: "Xám", emoji: "⬜" },
        { english: "Brown", vietnamese: "Nâu", emoji: "🟤" },
        { english: "Silver", vietnamese: "Bạc", emoji: "✨" },
        { english: "Gold", vietnamese: "Vàng kim", emoji: "🟡" },
        { english: "Turquoise", vietnamese: "Xanh ngọc", emoji: "🟦" },
        { english: "Magenta", vietnamese: "Hồng đậm", emoji: "🟥" },
        { english: "Cyan", vietnamese: "Xanh lơ", emoji: "🟦" },
        { english: "Beige", vietnamese: "Be", emoji: "🟫" },
        { english: "Lime", vietnamese: "Xanh nõn chuối", emoji: "🟢" },
        { english: "Navy", vietnamese: "Xanh hải quân", emoji: "🔵" },
        { english: "Olive", vietnamese: "Xanh ô liu", emoji: "🟢" },
    ],
    fruits: [
        { english: "Apple", vietnamese: "Táo", emoji: "🍎" },
        { english: "Banana", vietnamese: "Chuối", emoji: "🍌" },
        { english: "Orange", vietnamese: "Cam", emoji: "🍊" },
        { english: "Strawberry", vietnamese: "Dâu", emoji: "🍓" },
        { english: "Watermelon", vietnamese: "Dưa hấu", emoji: "🍉" },
        { english: "Grape", vietnamese: "Nho", emoji: "🍇" },
        { english: "Pineapple", vietnamese: "Dứa", emoji: "🍍" },
        { english: "Kiwi", vietnamese: "Kiwi", emoji: "🥝" },
        { english: "Mango", vietnamese: "Xoài", emoji: "🥭" },
        { english: "Blueberry", vietnamese: "Việt quất", emoji: "🫐" },
        { english: "Cherry", vietnamese: "Anh đào", emoji: "🍒" },
        { english: "Lemon", vietnamese: "Chanh", emoji: "🍋" },
        { english: "Pear", vietnamese: "Lê", emoji: "🍐" },
        { english: "Peach", vietnamese: "Đào", emoji: "🍑" },
        { english: "Plum", vietnamese: "Mận", emoji: "🍑" },
        { english: "Apricot", vietnamese: "Mơ", emoji: "🍑" },
        { english: "Kiwi", vietnamese: "Kiwi", emoji: "🥝" },
        { english: "Papaya", vietnamese: "Đu đủ", emoji: "🥭" },
        { english: "Pomegranate", vietnamese: "Lựu", emoji: "🍎" },
        { english: "Coconut", vietnamese: "Dừa", emoji: "🥥" },
    ],
    numbers: [
        { english: "One", vietnamese: "Một", emoji: "1️⃣" },
        { english: "Two", vietnamese: "Hai", emoji: "2️⃣" },
        { english: "Three", vietnamese: "Ba", emoji: "3️⃣" },
        { english: "Four", vietnamese: "Bốn", emoji: "4️⃣" },
        { english: "Five", vietnamese: "Năm", emoji: "5️⃣" },
        { english: "Six", vietnamese: "Sáu", emoji: "6️⃣" },
        { english: "Seven", vietnamese: "Bảy", emoji: "7️⃣" },
        { english: "Eight", vietnamese: "Tám", emoji: "8️⃣" },
        { english: "Nine", vietnamese: "Chín", emoji: "9️⃣" },
        { english: "Ten", vietnamese: "Mười", emoji: "🔟" },
        { english: "Eleven", vietnamese: "Mười một", emoji: "1️⃣1️⃣" },
        { english: "Twelve", vietnamese: "Mười hai", emoji: "1️⃣2️⃣" },
        { english: "Thirteen", vietnamese: "Mười ba", emoji: "1️⃣3️⃣" },
        { english: "Fourteen", vietnamese: "Mười bốn", emoji: "1️⃣4️⃣" },
        { english: "Fifteen", vietnamese: "Mười lăm", emoji: "1️⃣5️⃣" },
        { english: "Sixteen", vietnamese: "Mười sáu", emoji: "1️⃣6️⃣" },
        { english: "Seventeen", vietnamese: "Mười bảy", emoji: "1️⃣7️⃣" },
        { english: "Eighteen", vietnamese: "Mười tám", emoji: "1️⃣8️⃣" },
        { english: "Nineteen", vietnamese: "Mười chín", emoji: "1️⃣9️⃣" },
        { english: "Twenty", vietnamese: "Hai mươi", emoji: "2️⃣0️⃣" },
    ],
    family: [
        { english: "Mother", vietnamese: "Mẹ", emoji: "👩" },
        { english: "Father", vietnamese: "Bố", emoji: "👨" },
        { english: "Sister", vietnamese: "Chị/Em gái", emoji: "👧" },
        { english: "Brother", vietnamese: "Anh/Em trai", emoji: "👦" },
        { english: "Grandmother", vietnamese: "Bà", emoji: "👵" },
        { english: "Grandfather", vietnamese: "Ông", emoji: "👴" },
        { english: "Aunt", vietnamese: "Chị/Cô", emoji: "🧑‍🦰" },
        { english: "Uncle", vietnamese: "Chú/Anh", emoji: "👨‍🦱" },
        { english: "Cousin", vietnamese: "Anh/em họ", emoji: "👶" },
        { english: "Baby", vietnamese: "Bé", emoji: "👶" },
        { english: "Parent", vietnamese: "Cha mẹ", emoji: "👪" },
        { english: "Sibling", vietnamese: "Anh chị em", emoji: "👨‍👩‍👧" },
        { english: "Grandson", vietnamese: "Cháu trai", emoji: "👦" },
        { english: "Granddaughter", vietnamese: "Cháu gái", emoji: "👧" },
        { english: "Niece", vietnamese: "Cháu gái", emoji: "👧" },
        { english: "Nephew", vietnamese: "Cháu trai", emoji: "👦" },
        { english: "Brother-in-law", vietnamese: "Anh/em rể", emoji: "👨" },
        { english: "Sister-in-law", vietnamese: "Chị/em dâu", emoji: "👩" },
        { english: "Stepmother", vietnamese: "Mẹ kế", emoji: "👩" },
    ],
    body_parts: [
        { english: "Head", vietnamese: "Đầu", emoji: "🗣️" },
        { english: "Eyes", vietnamese: "Mắt", emoji: "👀" },
        { english: "Nose", vietnamese: "Mũi", emoji: "👃" },
        { english: "Mouth", vietnamese: "Miệng", emoji: "👄" },
        { english: "Ears", vietnamese: "Tai", emoji: "👂" },
        { english: "Hair", vietnamese: "Tóc", emoji: "💇" },
        { english: "Arm", vietnamese: "Cánh tay", emoji: "💪" },
        { english: "Hand", vietnamese: "Bàn tay", emoji: "🖐️" },
        { english: "Finger", vietnamese: "Ngón tay", emoji: "👆" },
        { english: "Leg", vietnamese: "Chân", emoji: "🦵" },
        { english: "Foot", vietnamese: "Bàn chân", emoji: "🦶" },
        { english: "Toe", vietnamese: "Ngón chân", emoji: "🦶" },
        { english: "Neck", vietnamese: "Cổ", emoji: "🦒" },
        { english: "Shoulder", vietnamese: "Vai", emoji: "🤷" },
        { english: "Back", vietnamese: "Lưng", emoji: "🦴" },
        { english: "Chest", vietnamese: "Ngực", emoji: "🫁" },
        { english: "Stomach", vietnamese: "Bụng", emoji: "🍽️" },
        { english: "Knee", vietnamese: "Đầu gối", emoji: "🦵" },
        { english: "Elbow", vietnamese: "Khủy tay", emoji: "🦾" },
        { english: "Wrist", vietnamese: "Cổ tay", emoji: "🤝" },
    ],
    clothes: [
        { english: "Shirt", vietnamese: "Áo sơ mi", emoji: "👕" },
        { english: "Pants", vietnamese: "Quần", emoji: "👖" },
        { english: "Dress", vietnamese: "Váy", emoji: "👗" },
        { english: "Shoes", vietnamese: "Giày", emoji: "👟" },
        { english: "Hat", vietnamese: "Mũ", emoji: "🎩" },
        { english: "Socks", vietnamese: "Tất", emoji: "🧦" },
        { english: "Jacket", vietnamese: "Áo khoác", emoji: "🧥" },
        { english: "Skirt", vietnamese: "Váy ngắn", emoji: "👙" },
        { english: "T-shirt", vietnamese: "Áo thun", emoji: "👕" },
        { english: "Sweater", vietnamese: "Áo len", emoji: "🧶" },
        { english: "Coat", vietnamese: "Áo măng tô", emoji: "🧥" },
        { english: "Gloves", vietnamese: "Găng tay", emoji: "🧤" },
        { english: "Scarf", vietnamese: "Khăn quàng", emoji: "🧣" },
        { english: "Belt", vietnamese: "Thắt lưng", emoji: "🪢" },
        { english: "Underwear", vietnamese: "Đồ lót", emoji: "🩲" },
        { english: "Swimsuit", vietnamese: "Đồ bơi", emoji: "🏊" },
        { english: "Boots", vietnamese: "Ủng", emoji: "🥾" },
        { english: "Sandals", vietnamese: "Dép", emoji: "🩴" },
        { english: "Cap", vietnamese: "Mũ lưỡi trai", emoji: "🧢" },
        { english: "Tie", vietnamese: "Cà vạt", emoji: "👔" },
    ],
    food: [
        { english: "Apple", vietnamese: "Táo", emoji: "🍎" },
        { english: "Banana", vietnamese: "Chuối", emoji: "🍌" },
        { english: "Bread", vietnamese: "Bánh mì", emoji: "🍞" },
        { english: "Milk", vietnamese: "Sữa", emoji: "🥛" },
        { english: "Rice", vietnamese: "Cơm", emoji: "🍚" },
        { english: "Egg", vietnamese: "Trứng", emoji: "🥚" },
        { english: "Chicken", vietnamese: "Gà", emoji: "🍗" },
        { english: "Fish", vietnamese: "Cá", emoji: "🐟" },
        { english: "Pizza", vietnamese: "Pizza", emoji: "🍕" },
        { english: "Cake", vietnamese: "Bánh", emoji: "🎂" },
        { english: "Water", vietnamese: "Nước", emoji: "💧" },
        { english: "Juice", vietnamese: "Nước ép", emoji: "🧃" },
        { english: "Tea", vietnamese: "Trà", emoji: "☕" },
        { english: "Coffee", vietnamese: "Cà phê", emoji: "☕" },
        { english: "Soup", vietnamese: "Súp", emoji: "🍜" },
        { english: "Salad", vietnamese: "Salad", emoji: "🥗" },
        { english: "Ice cream", vietnamese: "Kem", emoji: "🍦" },
        { english: "Chocolate", vietnamese: "Sô cô la", emoji: "🍫" },
        { english: "Cookie", vietnamese: "Bánh quy", emoji: "🍪" },
        { english: "Candy", vietnamese: "Kẹo", emoji: "🍬" },
    ],
    school: [
        { english: "Teacher", vietnamese: "Giáo viên", emoji: "👩‍🏫" },
        { english: "Student", vietnamese: "Học sinh", emoji: "👨‍🎓" },
        { english: "Classroom", vietnamese: "Lớp học", emoji: "🏫" },
        { english: "Book", vietnamese: "Sách", emoji: "📚" },
        { english: "Pencil", vietnamese: "Bút chì", emoji: "✏️" },
        { english: "Pen", vietnamese: "Bút", emoji: "🖊️" },
        { english: "Notebook", vietnamese: "Vở", emoji: "📓" },
        { english: "Desk", vietnamese: "Bàn", emoji: "🪑" },
        { english: "Chair", vietnamese: "Ghế", emoji: "💺" },
        { english: "Blackboard", vietnamese: "Bảng", emoji: "🖼️" },
        { english: "School bag", vietnamese: "Cặp sách", emoji: "🎒" },
        { english: "Eraser", vietnamese: "Tẩy", emoji: "📏" },
        { english: "Ruler", vietnamese: "Thước", emoji: "📐" },
        { english: "Glue", vietnamese: "Keo", emoji: "🧴" },
        { english: "Scissors", vietnamese: "Kéo", emoji: "✂️" },
        { english: "Crayons", vietnamese: "Bút màu", emoji: "🖍️" },
        { english: "Paint", vietnamese: "Sơn", emoji: "🎨" },
        { english: "Computer", vietnamese: "Máy tính", emoji: "💻" },
        { english: "Library", vietnamese: "Thư viện", emoji: "📖" },
        { english: "Homework", vietnamese: "Bài tập về nhà", emoji: "📝" },
    ],
    weather: [
        { english: "Sunny", vietnamese: "Nắng", emoji: "☀️" },
        { english: "Rainy", vietnamese: "Mưa", emoji: "🌧️" },
        { english: "Cloudy", vietnamese: "Nhiều mây", emoji: "☁️" },
        { english: "Windy", vietnamese: "Gió", emoji: "💨" },
        { english: "Snowy", vietnamese: "Tuyết", emoji: "❄️" },
        { english: "Hot", vietnamese: "Nóng", emoji: "🔥" },
        { english: "Cold", vietnamese: "Lạnh", emoji: "🧊" },
        { english: "Storm", vietnamese: "Bão", emoji: "⛈️" },
        { english: "Rainbow", vietnamese: "Cầu vồng", emoji: "🌈" },
        { english: "Thunder", vietnamese: "Sấm", emoji: "⚡" },
        { english: "Lightning", vietnamese: "Chớp", emoji: "⚡" },
        { english: "Fog", vietnamese: "Sương mù", emoji: "🌫️" },
        { english: "Hurricane", vietnamese: "Bão tố", emoji: "🌀" },
        { english: "Drought", vietnamese: "Hạn hán", emoji: "🏜️" },
        { english: "Flood", vietnamese: "Lũ lụt", emoji: "🌊" },
        { english: "Temperature", vietnamese: "Nhiệt độ", emoji: "🌡️" },
        { english: "Humidity", vietnamese: "Độ ẩm", emoji: "💧" },
        { english: "Forecast", vietnamese: "Dự báo", emoji: "📺" },
        { english: "Season", vietnamese: "Mùa", emoji: "🍂" },
        { english: "Climate", vietnamese: "Khí hậu", emoji: "🌍" },
    ],
    transportation: [
        { english: "Car", vietnamese: "Ô tô", emoji: "🚗" },
        { english: "Bus", vietnamese: "Xe buýt", emoji: "🚌" },
        { english: "Train", vietnamese: "Tàu hỏa", emoji: "🚂" },
        { english: "Plane", vietnamese: "Máy bay", emoji: "✈️" },
        { english: "Bike", vietnamese: "Xe đạp", emoji: "🚲" },
        { english: "Motorcycle", vietnamese: "Xe máy", emoji: "🏍️" },
        { english: "Boat", vietnamese: "Thuyền", emoji: "⛵" },
        { english: "Ship", vietnamese: "Tàu thủy", emoji: "🚢" },
        { english: "Truck", vietnamese: "Xe tải", emoji: "🚚" },
        { english: "Taxi", vietnamese: "Taxi", emoji: "🚕" },
        { english: "Subway", vietnamese: "Tàu điện ngầm", emoji: "🚇" },
        { english: "Helicopter", vietnamese: "Trực thăng", emoji: "🚁" },
        { english: "Bicycle", vietnamese: "Xe đạp", emoji: "🚴" },
        { english: "Scooter", vietnamese: "Xe tay ga", emoji: "🛵" },
        { english: "Rickshaw", vietnamese: "Xe kéo", emoji: "人力车" },
        { english: "Horse", vietnamese: "Ngựa", emoji: "🐎" },
        { english: "Camel", vietnamese: "Lạc đà", emoji: "🐪" },
        { english: "Elephant", vietnamese: "Voi", emoji: "🐘" },
        { english: "Road", vietnamese: "Đường", emoji: "🛣️" },
        { english: "Highway", vietnamese: "Đại lộ", emoji: "🛣️" },
    ],
    sports: [
        { english: "Football", vietnamese: "Bóng đá", emoji: "⚽" },
        { english: "Basketball", vietnamese: "Bóng rổ", emoji: "🏀" },
        { english: "Tennis", vietnamese: "Quần vợt", emoji: "🎾" },
        { english: "Swimming", vietnamese: "Bơi lội", emoji: "🏊" },
        { english: "Running", vietnamese: "Chạy", emoji: "🏃" },
        { english: "Cycling", vietnamese: "Đạp xe", emoji: "🚴" },
        { english: "Baseball", vietnamese: "Bóng chày", emoji: "⚾" },
        { english: "Volleyball", vietnamese: "Bóng chuyền", emoji: "🏐" },
        { english: "Golf", vietnamese: "Golf", emoji: "⛳" },
        { english: "Soccer", vietnamese: "Bóng đá", emoji: "⚽" },
        { english: "Hockey", vietnamese: "Khúc côn cầu", emoji: "🏒" },
        { english: "Boxing", vietnamese: "Quyền anh", emoji: "🥊" },
        { english: "Wrestling", vietnamese: "Đấu vật", emoji: "🤼" },
        { english: "Judo", vietnamese: "Judo", emoji: "🥋" },
        { english: "Karate", vietnamese: "Karate", emoji: "🥋" },
        { english: "Badminton", vietnamese: "Cầu lông", emoji: "🏸" },
        { english: "Table tennis", vietnamese: "Bóng bàn", emoji: "🏓" },
        { english: "Skiing", vietnamese: "Trượt tuyết", emoji: "🎿" },
        { english: "Skating", vietnamese: "Trượt băng", emoji: "⛸️" },
        { english: "Diving", vietnamese: "Lặn", emoji: "🤿" },
    ],
    hobbies: [
        { english: "Reading", vietnamese: "Đọc sách", emoji: "📖" },
        { english: "Writing", vietnamese: "Viết", emoji: "✍️" },
        { english: "Drawing", vietnamese: "Vẽ", emoji: "🎨" },
        { english: "Painting", vietnamese: "Họa", emoji: "🖌️" },
        { english: "Music", vietnamese: "Âm nhạc", emoji: "🎵" },
        { english: "Singing", vietnamese: "Hát", emoji: "🎤" },
        { english: "Dancing", vietnamese: "Nhảy múa", emoji: "💃" },
        { english: "Cooking", vietnamese: "Nấu ăn", emoji: "👨‍🍳" },
        { english: "Gardening", vietnamese: "Làm vườn", emoji: "🌱" },
        { english: "Photography", vietnamese: "Chụp ảnh", emoji: "📷" },
        { english: "Fishing", vietnamese: "Câu cá", emoji: "🎣" },
        { english: "Hiking", vietnamese: "Đi bộ đường mòn", emoji: "🥾" },
        { english: "Camping", vietnamese: "Cắm trại", emoji: "⛺" },
        { english: "Traveling", vietnamese: "Du lịch", emoji: "✈️" },
        { english: "Shopping", vietnamese: "Mua sắm", emoji: "🛍️" },
        { english: "Watching TV", vietnamese: "Xem TV", emoji: "📺" },
        { english: "Playing games", vietnamese: "Chơi game", emoji: "🎮" },
        { english: "Collecting", vietnamese: "Sưu tầm", emoji: "🃏" },
        { english: "Knitting", vietnamese: "Đan", emoji: "🧶" },
        { english: "Sewing", vietnamese: "May vá", emoji: "🪡" },
    ],
    emotions: [
        { english: "Happy", vietnamese: "Vui vẻ", emoji: "😊" },
        { english: "Sad", vietnamese: "Buồn", emoji: "😢" },
        { english: "Angry", vietnamese: "Giận dữ", emoji: "😠" },
        { english: "Surprised", vietnamese: "Bất ngờ", emoji: "😮" },
        { english: "Scared", vietnamese: "Sợ hãi", emoji: "😨" },
        { english: "Excited", vietnamese: "Hào hứng", emoji: "🤩" },
        { english: "Tired", vietnamese: "Mệt mỏi", emoji: "😴" },
        { english: "Bored", vietnamese: "Nhàm chán", emoji: "😑" },
        { english: "Confused", vietnamese: "Bối rối", emoji: "😕" },
        { english: "Proud", vietnamese: "Tự hào", emoji: "😌" },
        { english: "Jealous", vietnamese: "Ghen tị", emoji: "😤" },
        { english: "Grateful", vietnamese: "Biết ơn", emoji: "🙏" },
        { english: "Hopeful", vietnamese: "Hy vọng", emoji: "🤞" },
        { english: "Disappointed", vietnamese: "Thất vọng", emoji: "😞" },
        { english: "Worried", vietnamese: "Lo lắng", emoji: "😟" },
        { english: "Calm", vietnamese: "Bình tĩnh", emoji: "😌" },
        { english: "Nervous", vietnamese: "Bồn chồn", emoji: "😬" },
        { english: "Shy", vietnamese: "Nhút nhát", emoji: "😊" },
        { english: "Brave", vietnamese: "Dũng cảm", emoji: "🦁" },
        { english: "Kind", vietnamese: "Tử tế", emoji: "🤗" },
    ],
};

const speakingSentences = [
    "Hello, my name is ...",
    "I like to play football.",
    "My favorite color is blue.",
    "I have a cat and a dog.",
    "This is my family.",
    "I can read a story.",
    "I go to school every day.",
    "She likes apples and bananas.",
    "He is my best friend.",
    "I am nine years old.",
    "My teacher is kind.",
    "I love English class.",
    "I wake up early in the morning.",
    "I can count from one to twenty.",
    "I want to travel by plane.",
    "I can write a short sentence.",
    "I am happy to learn new words.",
    "My house is near the school.",
    "I have two brothers and one sister.",
    "I like to sing songs in English.",
    "I can introduce myself confidently.",
    "I like to read books about animals.",
    "I can help my family at home.",
    "I enjoy learning English with games.",
    "I can say the days of the week.",
    "I can tell the time in English.",
    "I can describe my favorite food.",
    "I like to draw and write stories.",
    "I am practicing speaking with friends.",
    "I want to be fluent in English one day.",
];

function getVocabularyCountForLevel(level) {
    return Math.min(4 + level, 20);
}

function getAvailableTopicsForLevel(level) {
    const allTopics = Object.keys(vocabularyMaster);
    const topicsPerLevel = 5;
    const startIndex = ((level - 1) % Math.ceil(allTopics.length / topicsPerLevel)) * topicsPerLevel;
    const topics = allTopics.slice(startIndex, startIndex + topicsPerLevel);
    
    // If not enough topics, add from beginning
    if (topics.length < topicsPerLevel) {
        topics.push(...allTopics.slice(0, topicsPerLevel - topics.length));
    }
    
    return topics;
}

function getSpeakingSentencesForLevel(level) {
    const count = Math.min(3 + level, speakingSentences.length);
    return speakingSentences.slice(0, count);
}

function getLevelInfo(levelId) {
    return LEVELS.find(l => l.id === levelId) || LEVELS[0];
}

function isLevelUnlocked(levelId, currentScore) {
    const level = getLevelInfo(levelId);
    return currentScore >= level.required_score;
}

// Listening Exercise Data
const listeningExercises = [
    {
        question: "Bạn vừa nghe tiếng gì?",
        options: [
            { text: "🐕 Tiếng chó sủa", correct: true },
            { text: "🐈 Tiếng mèo kêu", correct: false },
            { text: "🦁 Tiếng sư tử gầm", correct: false },
        ],
        audio: "Woof woof! The dog is barking loudly.",
    },
    {
        question: "Đây là màu gì?",
        options: [
            { text: "🔴 Đỏ (Red)", correct: true },
            { text: "🔵 Xanh da trời (Blue)", correct: false },
            { text: "🟡 Vàng (Yellow)", correct: false },
        ],
        audio: "This color is red, like a ripe apple.",
    },
    {
        question: "Đây là trái cây gì?",
        options: [
            { text: "🍎 Táo (Apple)", correct: true },
            { text: "🍌 Chuối (Banana)", correct: false },
            { text: "🍊 Cam (Orange)", correct: false },
        ],
        audio: "An apple a day keeps the doctor away.",
    },
    {
        question: "Đây là số gì?",
        options: [
            { text: "1️⃣ Một (One)", correct: true },
            { text: "2️⃣ Hai (Two)", correct: false },
            { text: "3️⃣ Ba (Three)", correct: false },
        ],
        audio: "One is the first number we learn.",
    },
    {
        question: "Đây là động vật gì?",
        options: [
            { text: "🐱 Mèo (Cat)", correct: true },
            { text: "🐶 Chó (Dog)", correct: false },
            { text: "🐭 Chuột (Mouse)", correct: false },
        ],
        audio: "The cat is sleeping on the mat.",
    },
    {
        question: "Đây là gia đình ai?",
        options: [
            { text: "👨‍👩‍👧 Bố, mẹ, con gái", correct: true },
            { text: "👨‍👩‍👦 Bố, mẹ, con trai", correct: false },
            { text: "👨‍👩‍👧‍👦 Gia đình 4 người", correct: false },
        ],
        audio: "Mother, father, and daughter make a happy family.",
    },
];

// Reading Comprehension Data
const readingExercises = [
    {
        text: `My name is Tom. I am 9 years old. I live with my mother, father, and my sister Sarah. 
                We have two pets: a dog named Max and a cat named Whiskers. 
                I like to play with them in the garden every day. My favorite color is blue.`,
        questions: [
            {
                question: "Tom bao nhiêu tuổi?",
                options: [
                    { text: "8 tuổi", correct: false },
                    { text: "9 tuổi", correct: true },
                    { text: "10 tuổi", correct: false },
                ],
            },
            {
                question: "Tom sống với ai?",
                options: [
                    { text: "Mẹ, bố, em trai", correct: false },
                    { text: "Mẹ, bố, chị gái", correct: true },
                    { text: "Chỉ sống với mẹ", correct: false },
                ],
            },
            {
                question: "Thú cưng của Tom là gì?",
                options: [
                    { text: "Chỉ có chó", correct: false },
                    { text: "Chó và mèo", correct: true },
                    { text: "Chỉ có mèo", correct: false },
                ],
            },
        ],
    },
    {
        text: `Sarah likes to eat fruits. Her favorite fruits are apples and bananas. 
                In the morning, she eats one apple. In the afternoon, she eats one banana.
                She also likes oranges and strawberries. But she doesn't like watermelon.
                Sarah goes to school every day and studies English.`,
        questions: [
            {
                question: "Sarah thích ăn trái cây gì?",
                options: [
                    { text: "Táo và chuối", correct: true },
                    { text: "Cam và dâu", correct: false },
                    { text: "Dưa hấu", correct: false },
                ],
            },
            {
                question: "Sarah ăn táo vào lúc nào?",
                options: [
                    { text: "Chiều", correct: false },
                    { text: "Sáng", correct: true },
                    { text: "Tối", correct: false },
                ],
            },
        ],
    },
];

// Writing Exercises Data
const writingExercises = [
    {
        prompt: "Hoàn thành câu: My name is ___.",
        correctAnswers: ["tom", "sarah", "john", "alice", "emma", "david"],
        hint: "Trả lời: Tên bạn hoặc một tên khác",
        feedback: {
            correct: "Tuyệt vời! Bạn đã trả lời đúng! 🎉",
            incorrect: "Không chính xác. Hãy thử lại với một tên khác.",
        },
    },
    {
        prompt: "Hoàn thành câu: I like ___.",
        correctAnswers: ["dogs", "cats", "colors", "fruits", "games", "english"],
        hint: "Trả lời: danh từ bạn thích",
        feedback: {
            correct: "Xuất sắc! Bạn học rất tốt! 🌟",
            incorrect: "Hãy thử một lần nữa với một từ khác.",
        },
    },
    {
        prompt: "Hoàn thành câu: My favorite color is ___.",
        correctAnswers: ["red", "blue", "yellow", "green", "pink", "purple", "orange", "black"],
        hint: "Trả lời: tên một màu",
        feedback: {
            correct: "Rất tốt! Đó là một câu trả lời tuyệt vời! 👍",
            incorrect: "Gần rồi! Hãy thử một màu khác.",
        },
    },
    {
        prompt: "Hoàn thành câu: I have ___ pet(s).",
        correctAnswers: ["one", "two", "three", "four", "five", "a", "no"],
        hint: "Trả lời: con số hoặc 'a' hoặc 'no'",
        feedback: {
            correct: "Perfect! Bạn giỏi thực sự! 🏆",
            incorrect: "Không chính xác. Hãy thử lại với con số khác.",
        },
    },
    {
        prompt: "Hoàn thành câu: I am ___ years old.",
        correctAnswers: ["eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"],
        hint: "Trả lời: số tuổi của bạn (từ 8 đến 15)",
        feedback: {
            correct: "Tuyệt! Bạn đã trả lời đúng tuổi! 🎂",
            incorrect: "Hãy thử lại với số tuổi khác.",
        },
    },
];

// Memory Game Data
const memoryGameCards = [
    { pair: 1, front: "🐱", back: "Cat" },
    { pair: 1, front: "🐱", back: "Cat" },
    { pair: 2, front: "🔴", back: "Red" },
    { pair: 2, front: "🔴", back: "Red" },
    { pair: 3, front: "🍎", back: "Apple" },
    { pair: 3, front: "🍎", back: "Apple" },
    { pair: 4, front: "👩", back: "Mother" },
    { pair: 4, front: "👩", back: "Mother" },
    { pair: 5, front: "🐶", back: "Dog" },
    { pair: 5, front: "🐶", back: "Dog" },
    { pair: 6, front: "🍌", back: "Banana" },
    { pair: 6, front: "🍌", back: "Banana" },
    { pair: 7, front: "1️⃣", back: "One" },
    { pair: 7, front: "1️⃣", back: "One" },
    { pair: 8, front: "🟡", back: "Yellow" },
    { pair: 8, front: "🟡", back: "Yellow" },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function getVocabularyCountForLevel(level) {
    return Math.min(4 + level, 20);
}

function getVocabularyForTopic(topic, level = appState?.currentLevel || 1) {
    console.log('getVocabularyForTopic called with topic:', topic, 'level:', level);
    const list = vocabularyMaster[topic] || vocabularyMaster.animals;
    console.log('List found:', list ? list.length : 'null', 'items');
    const count = getVocabularyCountForLevel(level);
    console.log('Count:', count);
    const result = shuffleArray(list.slice(0, count));
    console.log('Result:', result.length, 'items');
    return result;
}

function getSpeakingSentencesForLevel(level) {
    const count = Math.min(3 + level, speakingSentences.length);
    return speakingSentences.slice(0, count);
}

function getLevelInfo(levelId) {
    return LEVELS.find(l => l.id === levelId) || LEVELS[0];
}

function isLevelUnlocked(levelId, currentScore) {
    const level = getLevelInfo(levelId);
    return currentScore >= level.required_score;
}

function getRandomListeningExercise() {
    return listeningExercises[Math.floor(Math.random() * listeningExercises.length)];
}

function getRandomReadingExercise() {
    return readingExercises[Math.floor(Math.random() * readingExercises.length)];
}

function getRandomWritingExercise() {
    return writingExercises[Math.floor(Math.random() * writingExercises.length)];
}

function getMemoryGameCards() {
    return shuffleArray(memoryGameCards);
}

