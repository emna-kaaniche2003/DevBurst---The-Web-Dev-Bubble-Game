// Collision Detection Engine

const Collision = {
    // Check if point is inside bubble
    isPointInBubble(x, y, bubble) {
        const rect = bubble.getBoundingClientRect();
        return (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        );
    },
    
    // Get bubble at position
    getBubbleAtPosition(x, y, bubbles) {
        for (let i = bubbles.length - 1; i >= 0; i--) {
            if (this.isPointInBubble(x, y, bubbles[i])) {
                return bubbles[i];
            }
        }
        return null;
    },
    
    // Create particle burst effect
    createParticleBurst(x, y, isCorrect) {
        const particleCount = 8;
        const container = document.getElementById('game-canvas');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${isCorrect ? 'correct' : 'wrong'}`;
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = randomFloat(30, 60);
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            container.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    },
    
    // Create score popup
    createScorePopup(x, y, points) {
        const popup = document.createElement('div');
        popup.className = `score-popup ${points > 0 ? 'positive' : 'negative'}`;
        popup.textContent = points > 0 ? `+${points}` : points;
        popup.style.left = x + 'px';
        popup.style.top = y + 'px';
        
        const container = document.getElementById('game-canvas');
        container.appendChild(popup);
        
        // Remove after animation
        setTimeout(() => {
            popup.remove();
        }, 1000);
    }
};
