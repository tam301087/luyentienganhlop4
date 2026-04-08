/* ============================================
   ENGLISH LEARNING LAND - MAIN APP LOGIC
   ============================================ */

// State Management
const appState = {
    currentSection: 'vocabulary',
    currentTopic: 'animals',
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
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('🚀 Initializing English Learning Land...');
    
    // Load vocabulary
    updateVocabulary('animals');
    
    // Load other exercises
    appState.currentListeningExercise = getRandomListeningExercise();
    appState.currentReadingExercise = getRandomReadingExercise();
    appState.currentWritingExercise = getRandomWritingExercise();
    appState.memoryGameCards = getMemoryGameCards();
    
    // Setup event listeners
    setupMenuListeners();
    setupVocabularyListeners();
    setupTopicListeners();
    setupListeningListeners();
    setupReadingListeners();
    setupWritingListeners();
    setupGameListeners();
    
    // Load saved progress
    loadProgress();
    
    // Initial render
    renderVocabularyCards();
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

function setupTopicListeners() {
    const topicButtons = document.querySelectorAll('.topic-btn');
    topicButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.dataset.topic;
            changeTopic(topic);
        });
    });
}

function changeTopic(topic) {
    appState.currentTopic = topic;
    appState.currentVocabIndex = 0;
    updateVocabulary(topic);
    
    // Update button styles
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.topic === topic) {
            btn.classList.add('active');
        }
    });
    
    renderVocabularyCards();
}

function updateVocabulary(topic) {
    appState.vocabulary = getVocabularyForTopic(topic);
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
    saveProgress();
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    const progressDisplay = document.getElementById('progressDisplay');
    
    if (scoreDisplay) {
        scoreDisplay.textContent = appState.score;
    }
    
    if (progressDisplay) {
        const percentage = appState.totalExercises > 0 
            ? Math.round((appState.completedExercises / appState.totalExercises) * 100)
            : 0;
        progressDisplay.textContent = percentage + '%';
    }
}

// ============================================
// LOCAL STORAGE - SAVE/LOAD PROGRESS
// ============================================

function saveProgress() {
    const progress = {
        score: appState.score,
        completedExercises: appState.completedExercises,
        totalExercises: appState.totalExercises,
        timestamp: new Date().toISOString(),
    };
    localStorage.setItem('englishLearningProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('englishLearningProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        appState.score = progress.score || 0;
        appState.completedExercises = progress.completedExercises || 0;
        appState.totalExercises = progress.totalExercises || 0;
        updateScoreDisplay();
    }
}

console.log('✅ App logic loaded successfully!');
