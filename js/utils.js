// Utility Functions

// Random number between min and max
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random float between min and max
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Shuffle array (Fisher-Yates algorithm)
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Get random element from array
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Play sound
function playSound(soundId) {
    // 1. VÉRIFICATION : Si le jeu est coupé ET que ce n'est PAS la musique de fond, on arrête
    if (GameState.isMuted && soundId !== 'audio-background') {
        return; 
    }
    
    const audio = document.getElementById(soundId);
    
    if (audio) { 
        audio.currentTime = 0;
        
        // Pour les effets sonores (pop, correct, wrong, tick)
        if (soundId !== 'audio-background') {
            // Le volume est toujours 0.3 pour les effets, sauf si mute est actif
            audio.volume = 0.3; 
        } else {
            // Pour la musique de fond (géré par le volume directement)
            audio.volume = GameState.isMuted ? 0 : 0.15; 
        }
        
        audio.play().catch(err => console.log('Audio play failed:', err));
    }
}
// Format time (seconds to mm:ss)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Clamp value between min and max
//empêcher les bulles de sortir de la zone de jeu
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}