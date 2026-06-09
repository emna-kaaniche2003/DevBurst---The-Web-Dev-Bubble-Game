// UI Management

const UI = {
    // Show screen
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    },
    
    // Show modal
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    },
    
    // Hide modal
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    },
    
    // Hide all modals
    hideAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    },
    
    // Update score display
    updateScore(score) {
        const scoreElement = document.getElementById('score-value');
        if (scoreElement) {
            scoreElement.textContent = score;
            scoreElement.classList.add('score-update');
            setTimeout(() => {
                scoreElement.classList.remove('score-update');
            }, 300);
        }
    },
    
    // Update timer display
    updateTimer(seconds) {
        const timerElement = document.getElementById('timer-value');
        if (timerElement) {
            timerElement.textContent = seconds + 's';
            
            // Add warning class if time is low
            if (seconds <= 3 && seconds > 0) {
                timerElement.classList.add('timer-warning');
            } else {
                timerElement.classList.remove('timer-warning');
            }
        }
    },
    
    // Update question progress
    updateQuestionProgress(current, total) {
        const progressElement = document.getElementById('question-progress');
        if (progressElement) {
            progressElement.textContent = `${current} / ${total}`;
        }
    },
    
    // Update question title
    updateQuestionTitle(title) {
        const titleElement = document.getElementById('question-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    },
    
    // Update terminal tip
    updateTerminalTip(tip) {
        const tipElement = document.getElementById('terminal-tip');
        if (tipElement) {
            tipElement.textContent = tip;
        }
    },
    
    // Update level info
    updateLevelInfo(levelData) {
        const fileNameElement = document.getElementById('level-file-name');
        const badgeElement = document.getElementById('level-badge');
        
        if (fileNameElement) {
            fileNameElement.textContent = levelData.fileName;
        }
        
        if (badgeElement) {
            badgeElement.textContent = levelData.badge;
        }
    },
    
    // Show level info modal
    showLevelInfoModal(levelIndex) {
        const explanation = LEVEL_EXPLANATIONS[levelIndex + 1];
        
        if (explanation) {
            document.getElementById('level-info-title').textContent = explanation.title;
            document.getElementById('level-info-text').textContent = explanation.text;
            this.showModal('level-info-modal');
        }
    },
    
    // Show result modal
    showResultModal(correct, wrong, scoreGained) {
        document.getElementById('correct-count').textContent = correct;
        document.getElementById('error-count').textContent = wrong;
        document.getElementById('score-gained').textContent = '+' + scoreGained;
        this.showModal('result-modal');
    },
    
    // Show level complete modal
    showLevelCompleteModal(levelName, totalScore, isLastLevel = false) {
        if (isLastLevel) {
            this.showGameCompleteModal(totalScore);
        } else {
            document.getElementById('level-name-complete').textContent = levelName;
            document.getElementById('level-total-score').textContent = totalScore;
            this.showModal('level-complete-modal');
        }
    },
    
    // Show game complete modal
    showGameCompleteModal(finalScore) {
        document.getElementById('final-score-value').textContent = finalScore;
        this.showModal('game-complete-modal');
    },
    
    // Create score popup at position
    createScorePopup(x, y, points) {
        Collision.createScorePopup(x, y, points);
    }
};