// Main Game Logic

let questionStartScore = 0;

// Initialize game on load
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});
// Background Music Playback
function playBackgroundMusic() {
    const audio = document.getElementById('audio-background');
    if (audio) {
        // Volume faible pour les musiques d'ambiance
        audio.volume = 0.15; 
        audio.play().catch(err => {
            // Affichage d'un message si le navigateur bloque l'autoplay.
            // C'est normal à l'initialisation.
            console.log("Lecture de la musique de fond bloquée. Tentative au premier clic utilisateur.");
        });
    }
}
function updateSoundIcon(isMuted) {
    const iconElement = document.getElementById('sound-icon');
    const audioBackground = document.getElementById('audio-background');

    if (iconElement) {
        iconElement.textContent = isMuted ? '🔇' : '🔊'; // 🔇 (Mute) ou 🔊 (Volume)
    }

    // Contrôle direct de la musique de fond
    if (audioBackground) {
        audioBackground.volume = isMuted ? 0 : 0.15;
    }
}

// Gère le clic sur le bouton Mute/Unmute
function toggleSound() {
    const isMuted = GameState.toggleMute();
    updateSoundIcon(isMuted);
}

// Initialize game
function initGame() {
    // Show splash screen
    UI.showScreen('splash-screen');
    
    
    // Simulate loading
    setTimeout(() => {
        UI.showScreen('main-menu');
    }, 2500);
    
    // Initialize bubble engine
    BubbleEngine.init('bubbles-container');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize timer callbacks
    setupTimer();

    updateSoundIcon(GameState.isMuted);
    
}

// Setup all event listeners
function setupEventListeners() {
    // Main menu buttons
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('how-to-play-btn').addEventListener('click', showHowToPlay);
    
    // Modal buttons
    document.getElementById('start-level-btn').addEventListener('click', startCurrentLevel);
    document.getElementById('next-question-btn').addEventListener('click', handleNextQuestion);
    document.getElementById('next-level-btn').addEventListener('click', handleNextLevel);
    document.getElementById('replay-btn').addEventListener('click', replayGame);
    document.getElementById('menu-btn').addEventListener('click', returnToMenu);
    document.getElementById('close-game-btn').addEventListener('click', returnToMenu);
    
    // Close modal buttons
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                UI.hideModal(modal.id);
            }
        });
    });
    
    // Bubble click handler
    document.getElementById('bubbles-container').addEventListener('click', handleBubbleClick);

    // son
    document.getElementById('toggle-sound-btn').addEventListener('click', toggleSound);
}

// Setup timer
function setupTimer() {
    Timer.onTick = (remaining) => {
        UI.updateTimer(remaining);
    };
    
    Timer.onComplete = () => {
        endQuestion();
    };
}

// Start game
function startGame() {
    
    GameState.init();
    GameState.startLevel(0);
    playBackgroundMusic();
    
    // Show level info modal
    UI.showLevelInfoModal(GameState.currentLevel);
}

// Start current level
function startCurrentLevel() {
    UI.hideAllModals();
    UI.showScreen('game-screen');

    // Active l'état de jeu pour rendre les bulles cliquables.
    // L'état est vérifié dans handleBubbleClick.
    GameState.isPlaying = true;
    
    const levelData = GameState.getCurrentLevel();
    UI.updateLevelInfo(levelData);
    
    startQuestion();
}

// Start a question
function startQuestion() {
    const questionData = GameState.getCurrentQuestion();
    const levelData = GameState.getCurrentLevel();
    
    if (!questionData) {
        endLevel();
        return;
    }
    
    // Store starting score for this question
    questionStartScore = GameState.score;
    
    // Update UI
    UI.updateQuestionTitle(questionData.title);
    UI.updateTerminalTip(questionData.tip);
    UI.updateQuestionProgress(
        GameState.currentQuestion + 1,
        levelData.questions.length
    );
    UI.updateScore(GameState.score);
    
    // Create bubbles
    BubbleEngine.createBubbles(
        questionData.correct,
        questionData.incorrect,
        levelData.bubbleType
    );
    
    // Start timer
    Timer.start(10);
}

// Handle bubble click
function handleBubbleClick(e) {
    if (!GameState.isPlaying) return;
    
    const bubbleElement = e.target.closest('.bubble');
    if (!bubbleElement) return;
    
    // Find the bubble object
    const bubble = BubbleEngine.getAllBubbles().find(b => b.element === bubbleElement);
    if (!bubble || bubble.isPopped) return;
    
    // Stop event propagation to prevent multiple clicks
    e.stopPropagation();
    
    // Pop the bubble
    BubbleEngine.popBubble(bubble, (isCorrect) => {
        handleBubblePopped(isCorrect, e.clientX, e.clientY);
    });
}

// Handle bubble popped
function handleBubblePopped(isCorrect, x, y) {
    if (isCorrect) {
        // Correct answer
        GameState.addScore(10);
        GameState.incrementCorrect();
        UI.createScorePopup(x, y, 10);
    } else {
        // Wrong answer
        GameState.addScore(-5);
        GameState.incrementWrong();
        UI.createScorePopup(x, y, -5);
    }
    
    // Update score display
    UI.updateScore(GameState.score);
    
    // Check if all correct bubbles are popped
    if (BubbleEngine.getRemainingCorrectCount() === 0) {
        // Bonus for completing all correct answers
        GameState.addScore(20);
        UI.updateScore(GameState.score);
        
        // End question after a short delay
        setTimeout(() => {
            endQuestion();
        }, 500);
    }
}

// End question
function endQuestion() {
    Timer.stop();
    BubbleEngine.stopAnimation();
    GameState.isPlaying = false;
    
    // Calculate score gained this question
    const scoreGained = Math.max(0, GameState.score - questionStartScore);
    
    // Show result modal
    UI.showResultModal(
        GameState.correctAnswers,
        GameState.wrongAnswers,
        scoreGained
    );
}

// Handle next question
function handleNextQuestion() {
    UI.hideAllModals();
    
    GameState.nextQuestion();
    
    if (GameState.isLevelComplete()) {
        endLevel();
    } else {
        GameState.isPlaying = true;
        startQuestion();
    }
}

// End level
function endLevel() {
    BubbleEngine.clear();
    
    const levelData = GameState.getCurrentLevel();
    const isLastLevel = GameState.currentLevel === GAME_LEVELS.length - 1;
    
    UI.showLevelCompleteModal(
        levelData.name,
        GameState.score,
        isLastLevel
    );
}

// Handle next level
function handleNextLevel() {
    UI.hideAllModals();
    
    GameState.nextLevel();
    
    if (GameState.isGameComplete()) {
        endGame();
    } else {
        // Show next level info
        UI.showLevelInfoModal(GameState.currentLevel);
    }
}

// End game
function endGame() {
    BubbleEngine.clear();
    UI.showGameCompleteModal(GameState.getTotalScore());
}

// Replay game
function replayGame() {
    UI.hideAllModals();
    startGame();
}

// Return to menu
function returnToMenu() {
    UI.hideAllModals();
    BubbleEngine.clear();
    Timer.stop();
    GameState.init();
    UI.showScreen('main-menu');
}

// Show how to play
function showHowToPlay() {
    UI.showModal('how-to-play-modal');
}