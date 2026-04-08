/* ============================================
   ENGLISH LEARNING LAND - MAIN APP LOGIC
   ============================================ */

// State Management
const appState = {
    currentSection: 'vocabulary',
    currentTopic: 'animals',
    currentLevel: 1,
    currentVocabIndex: 0,
    currentListeningExercise: null,
    currentReadingExercise: null,
    currentWritingExercise: null,
    currentGameType: 'memory',
    score: 0,
    totalExercises: 0,
    completedExercises: 0,
    vocabulary: [],
    memoryGameCards: [],
    memoryGameFlipped: [],
    memoryGameMatched: new Set(),
    // User state
    currentUser: null,
    users: (() => {
        try {
            return JSON.parse(localStorage.getItem('englishLearningUsers') || '{}');
        } catch (e) {
            console.warn('Could not load users from localStorage:', e);
            return {};
        }
    })(),
    settings: {
        backgroundImage: '',
        language: 'vi'
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('🚀 Initializing English Learning Land v2.0...');
    
    // Setup event listeners first
    setupMenuListeners();
    setupVocabularyListeners();
    setupTopicListeners();
    setupUserListeners();
    setupListeningListeners();
    setupReadingListeners();
    setupWritingListeners();
    setupGameListeners();
    
    // Load saved progress (this may change currentLevel and score)
    loadProgress();
    
    // Initialize level selector (now with correct score)
    initializeLevelSelector();
    
    // Render topic buttons for current level
    renderTopicButtons();
    
    // Load vocabulary for current level
    updateVocabulary(appState.currentTopic, appState.currentLevel);
    
    // Load other exercises
    appState.currentListeningExercise = getRandomListeningExercise();
    appState.currentReadingExercise = getRandomReadingExercise();
    appState.currentWritingExercise = getRandomWritingExercise();
    appState.memoryGameCards = getMemoryGameCards();
    
    // Update UI
    updateUserUI();
    
    // Initial render
    renderVocabularyCards();
    renderSpeakingPractice();
    updateScoreDisplay();
}

// ============================================
// MENU NAVIGATION
// ============================================

function setupMenuListeners() {
    const menuButtons = document.querySelectorAll('.menu-btn');
    menuButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = btn.dataset.section;
            switchSection(section);
        });
    });
}

// ============================================
// LEVEL SELECTOR
// ============================================

function initializeLevelSelector() {
    console.log('Initializing level selector...');
    const levelGrid = document.getElementById('levelGrid');
    console.log('levelGrid element:', levelGrid);
    if (!levelGrid) {
        console.error('levelGrid not found!');
        return;
    }
    
    levelGrid.innerHTML = '';
    console.log('LEVELS array:', LEVELS);
    
    LEVELS.forEach(level => {
        console.log('Creating level card for:', level.id);
        const isSelected = level.id === appState.currentLevel;
        const isUnlocked = isLevelUnlocked(level.id, appState.score);
        const card = document.createElement('div');
        card.className = `level-card${isSelected ? ' selected-level' : ''}${!isUnlocked ? ' locked' : ''}`;
        card.style.background = level.color;
        card.style.cursor = isUnlocked ? 'pointer' : 'not-allowed';
        card.style.opacity = isUnlocked ? '1' : '0.6';
        
        const lockIcon = isUnlocked ? '' : '🔒 ';
        const html = `
            <div class="level-emoji">${lockIcon}${level.emoji}</div>
            <div class="level-name">${level.name}</div>
            <div class="level-desc">${level.description}</div>
            ${!isUnlocked ? `<div class="level-requirement">Cần ${level.required_score} điểm</div>` : ''}
        `;
        
        card.innerHTML = html;
        if (isUnlocked) {
            card.addEventListener('click', () => selectLevel(level.id));
        }
        levelGrid.appendChild(card);
    });
    console.log('Level selector initialized with', LEVELS.length, 'levels');
}

function selectLevel(levelId) {
    // Check if level is unlocked
    if (!isLevelUnlocked(levelId, appState.score)) {
        const requiredScore = getLevelInfo(levelId).required_score;
        alert(`🔒 Level này cần ${requiredScore} điểm để mở khóa! Bạn hiện có ${appState.score} điểm.`);
        return;
    }

    appState.currentLevel = levelId;
    appState.currentVocabIndex = 0;
    
    // Render topic buttons for new level
    renderTopicButtons();
    
    // Set default topic if current topic not available
    const availableTopics = getAvailableTopicsForLevel(levelId);
    if (!availableTopics.includes(appState.currentTopic)) {
        appState.currentTopic = availableTopics[0];
    }
    
    updateVocabulary(appState.currentTopic, levelId);
    renderVocabularyCards();
    renderSpeakingPractice();
    initializeLevelSelector();
    
    const levelName = getLevelInfo(levelId).name;
    alert(`🎉 Bạn đã chọn: ${levelName}`);
}

function updateVocabulary(topic, level = appState.currentLevel) {
    appState.vocabulary = getVocabularyForTopic(topic, level);
}

function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionName);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update menu button styles
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionName) {
            btn.classList.add('active');
        }
    });
    
    appState.currentSection = sectionName;
    
    // Initialize section content
    switch(sectionName) {
        case 'listening':
            appState.currentListeningExercise = getRandomListeningExercise();
            renderListeningExercise();
            break;
        case 'reading':
            appState.currentReadingExercise = getRandomReadingExercise();
            renderReadingExercise();
            break;
        case 'writing':
            appState.currentWritingExercise = getRandomWritingExercise();
            renderWritingExercise();
            break;
        case 'games':
            renderGames();
            break;
    }
}

// ============================================
// VOCABULARY SECTION
// ============================================

function setupVocabularyListeners() {
    const playAudioBtn = document.getElementById('playAudio');
    const nextVocabBtn = document.getElementById('nextVocab');
    
    if (playAudioBtn) {
        playAudioBtn.addEventListener('click', playCurrentVocabAudio);
    }
    
    if (nextVocabBtn) {
        nextVocabBtn.addEventListener('click', nextVocabulary);
    }
}

function renderTopicButtons() {
    const topicSelector = document.querySelector('.topic-selector');
    if (!topicSelector) return;

    const availableTopics = getAvailableTopicsForLevel(appState.currentLevel);
    topicSelector.innerHTML = '';

    availableTopics.forEach(topic => {
        const button = document.createElement('button');
        button.className = 'topic-btn';
        button.dataset.topic = topic;
        if (topic === appState.currentTopic) {
            button.classList.add('active');
        }

        // Translate topic names
        const topicNames = {
            animals: 'Động Vật 🦁',
            colors: 'Màu Sắc 🎨',
            fruits: 'Trái Cây 🍎',
            numbers: 'Số Đếm 🔢',
            family: 'Gia Đình 👨‍👩‍👧',
            body_parts: 'Bộ Phận Cơ Thể 🫀',
            clothes: 'Quần Áo 👕',
            food: 'Đồ Ăn 🍕',
            school: 'Trường Học 🏫',
            weather: 'Thời Tiết 🌤️',
            transportation: 'Phương Tiện 🚗',
            sports: 'Thể Thao ⚽',
            hobbies: 'Sở Thích 🎨',
            emotions: 'Cảm Xúc 😊'
        };

        button.textContent = topicNames[topic] || topic;
        topicSelector.appendChild(button);
    });

    // Re-setup listeners
    setupTopicListeners();
}

function changeTopic(topic) {
    appState.currentTopic = topic;
    appState.currentVocabIndex = 0;
    updateVocabulary(topic, appState.currentLevel);
    
    // Update button styles
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.topic === topic) {
            btn.classList.add('active');
        }
    });
    
    renderVocabularyCards();
}

function renderVocabularyCards() {
    const container = document.getElementById('vocabCards');
    if (!container) return;
    
    container.innerHTML = '';
    
    appState.vocabulary.forEach((vocab, index) => {
        const card = document.createElement('div');
        card.className = `vocab-card ${index === appState.currentVocabIndex ? 'active' : ''}`;
        card.innerHTML = `
            <div class="vocab-emoji">${vocab.emoji}</div>
            <div class="vocab-english">${vocab.english}</div>
            <div class="vocab-vietnamese">${vocab.vietnamese}</div>
        `;
        
        card.addEventListener('click', () => {
            appState.currentVocabIndex = index;
            renderVocabularyCards();
            playCurrentVocabAudio();
        });
        
        container.appendChild(card);
    });
    renderSpeakingPractice();
}

function renderSpeakingPractice() {
    const speakingLevelName = document.getElementById('speakingLevelName');
    const speakingList = document.getElementById('speakingList');
    if (!speakingList || !speakingLevelName) return;

    speakingLevelName.textContent = getLevelInfo(appState.currentLevel).name;
    const sentences = getSpeakingSentencesForLevel(appState.currentLevel);
    speakingList.innerHTML = '';

    sentences.forEach((sentence, index) => {
        const item = document.createElement('div');
        item.className = 'speaking-sentence';
        item.innerHTML = `
            <span>${sentence}</span>
            <button class="btn btn-small speak-btn" data-sentence="${sentence}">🔊 Phát âm</button>
        `;
        speakingList.appendChild(item);
    });

    // Add event listeners for speak buttons
    document.querySelectorAll('.speak-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sentence = e.target.dataset.sentence;
            speakSentence(sentence);
        });
    });
}

function speakSentence(sentence) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'en-US';
    utterance.rate = 0.8; // Slower for learning
    speechSynthesis.speak(utterance);
}

function playCurrentVocabAudio() {
    if (appState.vocabulary.length === 0) return;
    
    const currentVocab = appState.vocabulary[appState.currentVocabIndex];
    const utterance = new SpeechSynthesisUtterance(currentVocab.english);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
    
    addScore(5);
}

function nextVocabulary() {
    appState.currentVocabIndex = (appState.currentVocabIndex + 1) % appState.vocabulary.length;
    renderVocabularyCards();
}

// ============================================
// LISTENING SECTION
// ============================================

function setupListeningListeners() {
    const playBtn = document.getElementById('playListeningAudio');
    if (playBtn) {
        playBtn.addEventListener('click', playListeningAudio);
    }
}

function renderListeningExercise() {
    const exercise = appState.currentListeningExercise;
    if (!exercise) return;
    
    // Update question
    const questionEl = document.getElementById('listeningQuestion');
    if (questionEl) {
        questionEl.textContent = exercise.question;
    }
    
    // Render options
    const optionsContainer = document.getElementById('listeningOptions');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        exercise.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.textContent = option.text;
            
            btn.addEventListener('click', () => {
                checkListeningAnswer(option.correct, btn, exercise.options);
            });
            
            optionsContainer.appendChild(btn);
        });
    }
    
    // Clear feedback
    const feedback = document.getElementById('listeningFeedback');
    if (feedback) {
        feedback.classList.remove('show', 'correct', 'incorrect');
    }
}

function playListeningAudio() {
    if (!appState.currentListeningExercise) return;
    
    const text = appState.currentListeningExercise.audio;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

function checkListeningAnswer(isCorrect, buttonEl, allOptions) {
    const feedback = document.getElementById('listeningFeedback');
    if (!feedback) return;
    
    // Disable all options
    document.querySelectorAll('#listeningOptions .btn-option').forEach(btn => {
        btn.disabled = true;
    });
    
    if (isCorrect) {
        buttonEl.classList.add('correct');
        feedback.textContent = '✅ Chính xác! Tuyệt vời! 🎉';
        feedback.classList.add('show', 'correct');
        addScore(10);
        
        // Load next exercise after delay
        setTimeout(() => {
            appState.currentListeningExercise = getRandomListeningExercise();
            renderListeningExercise();
        }, 2000);
    } else {
        buttonEl.classList.add('incorrect');
        feedback.textContent = '❌ Sai rồi! Hãy nghe lại và thử lần nữa.';
        feedback.classList.add('show', 'incorrect');
    }
}

// ============================================
// READING SECTION
// ============================================

function setupReadingListeners() {
    // Listeners will be added when rendering
}

function renderReadingExercise() {
    const exercise = appState.currentReadingExercise;
    if (!exercise) return;
    
    // Render text
    const textEl = document.getElementById('readingText');
    if (textEl) {
        textEl.innerHTML = `<p>${exercise.text}</p>`;
    }
    
    // Render questions
    const questionsContainer = document.getElementById('readingQuestions');
    if (questionsContainer) {
        questionsContainer.innerHTML = '';
        
        exercise.questions.forEach((questionObj, qIndex) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'reading-question-item';
            
            let html = `<div class="reading-question-text">Câu ${qIndex + 1}: ${questionObj.question}</div>`;
            
            questionObj.options.forEach((option, oIndex) => {
                html += `
                    <button class="btn-option" data-q="${qIndex}" data-correct="${option.correct}">
                        ${option.text}
                    </button>
                `;
            });
            
            questionDiv.innerHTML = html;
            questionsContainer.appendChild(questionDiv);
        });
        
        // Add listeners to options
        document.querySelectorAll('#readingQuestions .btn-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isCorrect = e.target.dataset.correct === 'true';
                checkReadingAnswer(isCorrect, btn);
            });
        });
    }
    
    // Clear feedback
    const feedback = document.getElementById('readingFeedback');
    if (feedback) {
        feedback.classList.remove('show', 'correct', 'incorrect');
    }
}

function checkReadingAnswer(isCorrect, buttonEl) {
    // Disable all options in this question
    const questionItem = buttonEl.closest('.reading-question-item');
    if (questionItem) {
        questionItem.querySelectorAll('.btn-option').forEach(btn => {
            btn.disabled = true;
        });
    }
    
    if (isCorrect) {
        buttonEl.classList.add('correct');
        addScore(10);
    } else {
        buttonEl.classList.add('incorrect');
    }
}

// ============================================
// WRITING SECTION
// ============================================

function setupWritingListeners() {
    const submitBtn = document.getElementById('submitWriting');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitWritingAnswer);
    }
    
    const input = document.getElementById('writingInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitWritingAnswer();
            }
        });
    }
}

function renderWritingExercise() {
    const exercise = appState.currentWritingExercise;
    if (!exercise) return;
    
    // Render prompt
    const promptEl = document.getElementById('writingPrompt');
    if (promptEl) {
        promptEl.innerHTML = `<p>${exercise.prompt}</p><p style="font-size: 0.9em; color: #999;">💡 ${exercise.hint}</p>`;
    }
    
    // Clear input
    const input = document.getElementById('writingInput');
    if (input) {
        input.value = '';
        input.focus();
    }
    
    // Clear feedback
    const feedback = document.getElementById('writingFeedback');
    if (feedback) {
        feedback.classList.remove('show', 'correct', 'incorrect');
    }
}

function submitWritingAnswer() {
    const input = document.getElementById('writingInput');
    if (!input || !appState.currentWritingExercise) return;
    
    const answer = input.value.trim().toLowerCase();
    const exercise = appState.currentWritingExercise;
    const feedback = document.getElementById('writingFeedback');
    
    input.disabled = true;
    
    const isCorrect = exercise.correctAnswers.some(correct => 
        correct.toLowerCase() === answer
    );
    
    if (isCorrect) {
        feedback.textContent = `✅ ${exercise.feedback.correct}`;
        feedback.classList.add('show', 'correct');
        addScore(15);
        
        setTimeout(() => {
            appState.currentWritingExercise = getRandomWritingExercise();
            renderWritingExercise();
        }, 2000);
    } else {
        feedback.textContent = `❌ ${exercise.feedback.incorrect}`;
        feedback.classList.add('show', 'incorrect');
        input.disabled = false;
    }
}

// ============================================
// GAMES SECTION
// ============================================

function setupGameListeners() {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const gameType = e.currentTarget.id === 'gameMemory' ? 'memory' : 'dragdrop';
            switchGame(gameType);
        });
    });
}

function switchGame(gameType) {
    appState.currentGameType = gameType;
    
    // Update game card styles
    document.querySelectorAll('.game-card').forEach(card => {
        card.classList.remove('active');
        if ((gameType === 'memory' && card.id === 'gameMemory') ||
            (gameType === 'dragdrop' && card.id === 'gameDragDrop')) {
            card.classList.add('active');
        }
    });
    
    if (gameType === 'memory') {
        renderMemoryGame();
    } else {
        renderDragDropGame();
    }
}

function renderGames() {
    renderMemoryGame();
}

// Memory Game
function renderMemoryGame() {
    const content = document.getElementById('gameContent');
    if (!content) return;
    
    // Reset game state
    appState.memoryGameFlipped = [];
    appState.memoryGameMatched = new Set();
    appState.memoryGameCards = getMemoryGameCards();
    
    content.innerHTML = '<div class="memory-grid" id="memoryGrid"></div>';
    
    const grid = document.getElementById('memoryGrid');
    
    appState.memoryGameCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'memory-card';
        cardEl.textContent = card.front;
        cardEl.dataset.index = index;
        
        cardEl.addEventListener('click', () => {
            flipMemoryCard(index, cardEl);
        });
        
        grid.appendChild(cardEl);
    });
}

function flipMemoryCard(index, cardEl) {
    if (appState.memoryGameMatched.has(index) || appState.memoryGameFlipped.includes(index)) {
        return;
    }
    
    if (appState.memoryGameFlipped.length >= 2) {
        return;
    }
    
    cardEl.classList.add('flipped');
    cardEl.textContent = appState.memoryGameCards[index].back;
    appState.memoryGameFlipped.push(index);
    
    if (appState.memoryGameFlipped.length === 2) {
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const [index1, index2] = appState.memoryGameFlipped;
    const card1 = appState.memoryGameCards[index1];
    const card2 = appState.memoryGameCards[index2];
    
    const match = card1.pair === card2.pair;
    
    setTimeout(() => {
        if (match) {
            appState.memoryGameMatched.add(index1);
            appState.memoryGameMatched.add(index2);
            addScore(20);
            
            if (appState.memoryGameMatched.size === appState.memoryGameCards.length) {
                setTimeout(() => {
                    alert('🎉 Chúc mừng! Bạn đã chiến thắng trò chơi! 🏆');
                    addScore(50);
                    renderMemoryGame();
                }, 500);
            }
        } else {
            document.querySelectorAll('.memory-card').forEach((card, idx) => {
                if ([index1, index2].includes(idx)) {
                    card.classList.remove('flipped');
                    card.textContent = appState.memoryGameCards[idx].front;
                }
            });
        }
        
        appState.memoryGameFlipped = [];
    }, 800);
}

// Drag and Drop Game (simple version)
function renderDragDropGame() {
    const content = document.getElementById('gameContent');
    if (!content) return;
    
    const vocab = getVocabularyForTopic('animals').slice(0, 4);
    
    let html = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="border-right: 3px dashed #667eea; padding-right: 20px;">
                <h3>Hình ảnh 🖼️</h3>
                <div style="display: flex; flex-direction: column; gap: 15px;">
    `;
    
    vocab.forEach((word, idx) => {
        html += `<div style="font-size: 3em; text-align: center; cursor: pointer; padding: 10px; border-radius: 10px; background: #f9f9f9;" class="drag-item" draggable="true" data-word="${word.english}">${word.emoji}</div>`;
    });
    
    html += `
                </div>
            </div>
            <div style="padding-left: 20px;">
                <h3>Từ Tiếng Anh ✏️</h3>
                <div style="display: flex; flex-direction: column; gap: 15px;">
    `;
    
    shuffleArray(vocab).forEach((word) => {
        html += `
            <div class="drop-zone" data-word="${word.english}" style="
                padding: 20px;
                border: 3px dashed #667eea;
                border-radius: 10px;
                text-align: center;
                min-height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                background: #f0f0f0;
            ">
                ${word.english}
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
        </div>
    `;
    
    content.innerHTML = html;
    
    // Simple click matching for mobile compatibility
    document.querySelectorAll('.drag-item').forEach(item => {
        item.addEventListener('click', () => {
            const word = item.dataset.word;
            const zone = document.querySelector(`.drop-zone[data-word="${word}"]`);
            if (zone) {
                zone.classList.add('correct');
                zone.style.background = '#4caf50';
                zone.style.color = 'white';
                item.style.opacity = '0.5';
                addScore(15);
            }
        });
    });
}

// ============================================
// SCORE & PROGRESS
// ============================================

function addScore(points) {
    appState.score += points;
    appState.completedExercises++;
    appState.totalExercises++;
    updateScoreDisplay();
    initializeLevelSelector(); // Update level unlock status
    saveProgress();
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    const progressDisplay = document.getElementById('progressDisplay');
    
    if (scoreDisplay) {
        scoreDisplay.textContent = appState.score;
    }
    
    if (progressDisplay) {
        // Calculate progress towards next level
        const currentLevel = getLevelInfo(appState.currentLevel);
        const nextLevel = getLevelInfo(appState.currentLevel + 1);
        
        if (nextLevel) {
            const currentRequired = currentLevel.required_score;
            const nextRequired = nextLevel.required_score;
            const progressInLevel = appState.score - currentRequired;
            const levelRange = nextRequired - currentRequired;
            const percentage = levelRange > 0 ? Math.min(Math.round((progressInLevel / levelRange) * 100), 100) : 100;
            progressDisplay.textContent = percentage + '%';
        } else {
            // Max level reached
            progressDisplay.textContent = '100%';
        }
    }
}

// ============================================
// LOCAL STORAGE - SAVE/LOAD PROGRESS
// ============================================

function saveProgress() {
    if (appState.currentUser) {
        saveUserProgress();
    } else {
        const progress = {
            score: appState.score,
            completedExercises: appState.completedExercises,
            totalExercises: appState.totalExercises,
            currentLevel: appState.currentLevel,
            timestamp: new Date().toISOString(),
        };
        try {
            localStorage.setItem('englishLearningProgress', JSON.stringify(progress));
        } catch (e) {
            console.warn('Could not save progress to localStorage:', e);
        }
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('englishLearningProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            appState.score = progress.score || 0;
            appState.completedExercises = progress.completedExercises || 0;
            appState.totalExercises = progress.totalExercises || 0;
            appState.currentLevel = progress.currentLevel || 1;
            if (!isLevelUnlocked(appState.currentLevel, appState.score)) {
                appState.currentLevel = 1;
            }
            updateScoreDisplay();
        }
    } catch (e) {
        console.warn('Could not load progress from localStorage:', e);
    }
}

// ============================================
// USER MANAGEMENT
// ============================================

function setupUserListeners() {
    const loginBtn = document.getElementById('loginBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const settingsModal = document.getElementById('settingsModal');
    const loginClose = document.getElementById('loginClose');
    const settingsClose = document.getElementById('settingsClose');
    const loginForm = document.getElementById('loginForm');
    const settingsForm = document.getElementById('settingsForm');
    const registerBtn = document.getElementById('registerBtn');

    // Load user settings
    loadUserSettings();

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    settingsBtn.addEventListener('click', () => {
        if (!appState.currentUser) {
            alert('Vui lòng đăng nhập trước!');
            return;
        }
        loadSettingsForm();
        settingsModal.style.display = 'block';
    });

    logoutBtn.addEventListener('click', logout);

    loginClose.addEventListener('click', () => loginModal.style.display = 'none');
    settingsClose.addEventListener('click', () => settingsModal.style.display = 'none');

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === settingsModal) settingsModal.style.display = 'none';
    });

    loginForm.addEventListener('submit', handleLogin);
    settingsForm.addEventListener('submit', handleSettingsUpdate);
    registerBtn.addEventListener('click', handleRegister);
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (appState.users[username] && appState.users[username].password === password) {
        appState.currentUser = username;
        loadUserProgress();
        updateUserUI();
        document.getElementById('loginModal').style.display = 'none';
        alert(`Chào mừng ${username}!`);
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
}

function handleRegister() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Vui lòng nhập tên đăng nhập và mật khẩu!');
        return;
    }

    if (appState.users[username]) {
        alert('Tên đăng nhập đã tồn tại!');
        return;
    }

    appState.users[username] = {
        password: password,
        displayName: username,
        score: 0,
        currentLevel: 1,
        settings: { backgroundImage: '', language: 'vi' }
    };

    try {
        localStorage.setItem('englishLearningUsers', JSON.stringify(appState.users));
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
    } catch (e) {
        console.warn('Could not save users to localStorage:', e);
        alert('Đăng ký thành công! (Dữ liệu có thể không được lưu)');
    }
}

function handleSettingsUpdate(e) {
    e.preventDefault();
    if (!appState.currentUser) return;

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const backgroundImage = document.getElementById('backgroundImage').value;
    const language = document.getElementById('language').value;

    if (newPassword && newPassword !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    const user = appState.users[appState.currentUser];
    if (newUsername) user.displayName = newUsername;
    if (newPassword) user.password = newPassword;
    user.settings.backgroundImage = backgroundImage;
    user.settings.language = language;

    localStorage.setItem('englishLearningUsers', JSON.stringify(appState.users));
    applyUserSettings();
    document.getElementById('settingsModal').style.display = 'none';
    alert('Cài đặt đã được cập nhật!');
}

function loadSettingsForm() {
    if (!appState.currentUser) return;
    const user = appState.users[appState.currentUser];
    document.getElementById('newUsername').value = user.displayName || '';
    document.getElementById('backgroundImage').value = user.settings.backgroundImage || '';
    document.getElementById('language').value = user.settings.language || 'vi';
}

function loadUserProgress() {
    if (!appState.currentUser) return;
    const user = appState.users[appState.currentUser];
    appState.score = user.score || 0;
    appState.currentLevel = user.currentLevel || 1;
    appState.settings = user.settings || { backgroundImage: '', language: 'vi' };
    applyUserSettings();
    updateScoreDisplay();
}

function saveUserProgress() {
    if (!appState.currentUser) return;
    const user = appState.users[appState.currentUser];
    user.score = appState.score;
    user.currentLevel = appState.currentLevel;
    try {
        localStorage.setItem('englishLearningUsers', JSON.stringify(appState.users));
    } catch (e) {
        console.warn('Could not save users to localStorage:', e);
    }
}

function loadUserSettings() {
    const savedSettings = localStorage.getItem('englishLearningSettings');
    if (savedSettings) {
        appState.settings = JSON.parse(savedSettings);
        applyUserSettings();
    }
}

function applyUserSettings() {
    if (appState.settings.backgroundImage) {
        document.body.style.backgroundImage = `url(${appState.settings.backgroundImage})`;
        document.body.style.backgroundSize = 'cover';
    }
    // Language settings can be implemented later
}

function updateUserUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');

    if (appState.currentUser) {
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        userName.textContent = appState.users[appState.currentUser].displayName || appState.currentUser;
    } else {
        loginBtn.style.display = 'inline-block';
        userInfo.style.display = 'none';
    }
}

function logout() {
    saveUserProgress();
    appState.currentUser = null;
    appState.score = 0;
    appState.currentLevel = 1;
    updateUserUI();
    updateScoreDisplay();
    alert('Đã đăng xuất!');
}

console.log('✅ App logic loaded successfully!');
