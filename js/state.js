// Game State Management

const GameState = {
    currentLevel: 0,
    currentQuestion: 0,
    score: 0,
    levelScore: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    isPlaying: false,
    isPaused: false,
    isMuted: false,
    
    // Initialize or reset state
    init() {
        this.currentLevel = 0;
        this.currentQuestion = 0;
        this.score = 0;
        this.levelScore = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.isPlaying = false;
        this.isPaused = false;
    },
    // Basculer son
    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    },
    
    // Start a new level
    startLevel(levelIndex) {
        this.currentLevel = levelIndex;
        this.currentQuestion = 0;
        this.levelScore = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.isPlaying = true;
    },
    
    // Get current level data
    getCurrentLevel() {
        return GAME_LEVELS[this.currentLevel];
    },
    
    // Get current question data
    getCurrentQuestion() {
        const level = this.getCurrentLevel();
        return level ? level.questions[this.currentQuestion] : null;
    },
    
    // Move to next question
    nextQuestion() {
        this.currentQuestion++;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
    },
    
    // Check if level is complete
    isLevelComplete() {
        const level = this.getCurrentLevel();
        return this.currentQuestion >= level.questions.length;
    },
    
    // Move to next level
    nextLevel() {
        this.currentLevel++;
        this.currentQuestion = 0;
        this.levelScore = 0;
    },
    
    // Check if game is complete
    isGameComplete() {
        return this.currentLevel >= GAME_LEVELS.length;
    },
    
    // Add score
    addScore(points) {
        this.score += points;
        this.levelScore += points;
    },
    
    // Increment correct answers
    incrementCorrect() {
        this.correctAnswers++;
    },
    
    // Increment wrong answers
    incrementWrong() {
        this.wrongAnswers++;
    },
    
    // Get total score
    getTotalScore() {
        return this.score;
    },
    
    // Get level score
    getLevelScore() {
        return this.levelScore;
    }
};