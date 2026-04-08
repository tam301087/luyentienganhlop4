/* ============================================
   ENGLISH LEARNING LAND - DATA FILE
   Contains all educational content
   ============================================ */

// Vocabulary Data
const vocabularyData = {
    animals: [
        { english: "Cat", vietnamese: "Mèo", emoji: "🐱" },
        { english: "Dog", vietnamese: "Chó", emoji: "🐶" },
        { english: "Lion", vietnamese: "Sư tử", emoji: "🦁" },
        { english: "Elephant", vietnamese: "Voi", emoji: "🐘" },
        { english: "Monkey", vietnamese: "Khỉ", emoji: "🐵" },
        { english: "Bird", vietnamese: "Chim", emoji: "🐦" },
        { english: "Fish", vietnamese: "Cá", emoji: "🐠" },
        { english: "Bear", vietnamese: "Gấu", emoji: "🐻" },
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
    ],
};

// Listening Exercise Data
const listeningExercises = [
    {
        question: "Bạn vừa nghe tiếng gì?",
        options: [
            { text: "🐕 Tiếng chó sủa", correct: true },
            { text: "🐈 Tiếng mèo kêu", correct: false },
            { text: "🦁 Tiếng sư tử gầm", correct: false },
        ],
        audio: "Dog barking sound",
    },
    {
        question: "Đây là màu gì?",
        options: [
            { text: "🔴 Đỏ (Red)", correct: true },
            { text: "🔵 Xanh da trời (Blue)", correct: false },
            { text: "🟡 Vàng (Yellow)", correct: false },
        ],
        audio: "Red color",
    },
    {
        question: "Đây là trái cây gì?",
        options: [
            { text: "🍎 Táo (Apple)", correct: true },
            { text: "🍌 Chuối (Banana)", correct: false },
            { text: "🍊 Cam (Orange)", correct: false },
        ],
        audio: "Apple sound",
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

// Shuffle function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Get shuffled vocabulary for a topic
function getVocabularyForTopic(topic) {
    return shuffleArray(vocabularyData[topic] || vocabularyData.animals);
}

// Get random listening exercise
function getRandomListeningExercise() {
    return listeningExercises[Math.floor(Math.random() * listeningExercises.length)];
}

// Get random reading exercise
function getRandomReadingExercise() {
    return readingExercises[Math.floor(Math.random() * readingExercises.length)];
}

// Get random writing exercise
function getRandomWritingExercise() {
    return writingExercises[Math.floor(Math.random() * writingExercises.length)];
}

// Get shuffled memory game cards
function getMemoryGameCards() {
    return shuffleArray(memoryGameCards);
}
