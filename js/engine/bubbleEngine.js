// Bubble Engine

const BubbleEngine = {
    bubbles: [],
    container: null,
    animationFrame: null,
    
    // Initialize bubble engine
    init(containerId) {
        this.container = document.getElementById(containerId);
        this.bubbles = [];
    },
    
    
    // Create bubbles for a question
    createBubbles(correctAnswers, incorrectAnswers, bubbleType) {
        this.clear();
        
        // Combine and shuffle answers
        const allAnswers = [
            ...correctAnswers.map(answer => ({ text: answer, isCorrect: true })),
            ...incorrectAnswers.map(answer => ({ text: answer, isCorrect: false }))
        ];
        
        // Mélanger l'ordre des bulles
        const shuffled = shuffle(allAnswers);
        
        // Create bubble elements
        shuffled.forEach((answer, index) => {
            const bubble = this.createBubble(answer.text, answer.isCorrect, bubbleType, index);
            this.bubbles.push(bubble);
            this.container.appendChild(bubble.element);
        });
        
        // Start animation
        this.startAnimation();
    },
    
    // Create a single bubble
    createBubble(text, isCorrect, bubbleType, index) {
        const element = document.createElement('div');
        element.className = `bubble ${bubbleType}`;
        element.textContent = text;
        element.dataset.correct = isCorrect;
        
        // Random starting position
        const containerRect = this.container.getBoundingClientRect();
        const x = randomFloat(50, containerRect.width - 150);
        const y = randomFloat(100, containerRect.height - 200);
        
        // Random velocity
        const vx = randomFloat(-0.5, 0.5);
        const vy = randomFloat(-0.5, 0.5);
        
        // Random size
        const size = randomFloat(0.9, 1.2);
        
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.transform = `scale(${size})`;
        
        // Animation delay for staggered appearance
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'opacity 0.3s ease';
            element.style.opacity = '1';
        }, index * 50);
        
        return {
            element,
            x,
            y,
            vx,
            vy,
            isCorrect,
            isPopped: false
        };
    },
    
    // Start bubble animation
    startAnimation() {
        const animate = () => {
            this.updateBubbles();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    },
    
    // Update bubble positions
    updateBubbles() {
        const containerRect = this.container.getBoundingClientRect();
        
        this.bubbles.forEach(bubble => {
            if (bubble.isPopped) return;
            
            // Update position
            bubble.x += bubble.vx;
            bubble.y += bubble.vy;
            
            // Bounce off walls
            const bubbleRect = bubble.element.getBoundingClientRect();
            const bubbleWidth = bubbleRect.width;
            const bubbleHeight = bubbleRect.height;
            
            if (bubble.x <= 0 || bubble.x + bubbleWidth >= containerRect.width) {
                bubble.vx *= -1;
                bubble.x = clamp(bubble.x, 0, containerRect.width - bubbleWidth);
            }
            
            if (bubble.y <= 80 || bubble.y + bubbleHeight >= containerRect.height - 20) {
                bubble.vy *= -1;
                bubble.y = clamp(bubble.y, 80, containerRect.height - bubbleHeight - 20);
            }
            
            // Apply position
            bubble.element.style.left = bubble.x + 'px';
            bubble.element.style.top = bubble.y + 'px';
        });
    },
    
    // Stop animation
    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    },
    // Pop a bubble
    popBubble(bubble, callback) {
        if (bubble.isPopped) return;
        
        bubble.isPopped = true;
        const isCorrect = bubble.isCorrect;
        
        // Add pop animation class
        bubble.element.classList.add(isCorrect ? 'pop-correct' : 'pop-wrong');
        
        // Get position for effects
        const rect = bubble.element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create particle burst
        Collision.createParticleBurst(x, y, isCorrect);
        
        // Play sounds 
        playSound('audio-pop');
        
        if (isCorrect) {
       
            playSound('audio-correct');
        } else {
       
          playSound('audio-wrong'); 
        }
        
        // Remove bubble after animation
        setTimeout(() => {
            bubble.element.remove();
        }, 400);
        
        // Call callback
        if (callback) {
            callback(isCorrect);
        }
    },
    
    // Get all bubbles
    getAllBubbles() {
        return this.bubbles;
    },
    
    // Get all bubble elements
    getAllBubbleElements() {
        return this.bubbles.map(b => b.element);
    },
    
    // Clear all bubbles
    clear() {
        this.stopAnimation();
        this.bubbles.forEach(bubble => {
            if (bubble.element && bubble.element.parentNode) {
                bubble.element.remove();
            }
        });
        this.bubbles = [];
    },
    
    // Get remaining correct bubbles count
    getRemainingCorrectCount() {
        return this.bubbles.filter(b => !b.isPopped && b.isCorrect).length;
    }
};