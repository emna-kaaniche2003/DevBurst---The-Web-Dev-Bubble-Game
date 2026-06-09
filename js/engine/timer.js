// Timer Engine

const Timer = {
    duration: 10, // seconds 
    remaining: 10,
    interval: null,
    onTick: null,
    onComplete: null,
    
    // Start the timer
    start(duration = 10) { 
        this.duration = duration;
        this.remaining = duration;
        
        // Clear any existing interval
        this.stop();
        
        // LOGIQUE DE TIC-TAC
            if (this.remaining > 0 && this.remaining <= 3) {
                playSound('audio-tick'); 
            }
            
        // Update immediately
        if (this.onTick) this.onTick(this.remaining);
        
        // Start countdown
        this.interval = setInterval(() => {
            this.remaining--;

            // >>> DÉCLENCHEMENT DU SON TIC-TAC ICI <<<
            // Joue le son si le temps restant est 3, 2, ou 1.
            if (this.remaining > 0 && this.remaining <= 3) {
                // playSound est défini dans utils.js
                playSound('audio-tick'); 
            }
            // >>> FIN LOGIQUE TIC-TAC <<<
            
            if (this.onTick) {
                this.onTick(this.remaining);
            }
            
            if (this.remaining <= 0) {
                this.stop();
                if (this.onComplete) {
                    this.onComplete();
                }
            }
        }, 1000);
    },
    
    // Stop the timer
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    
    
};