// Generated through AI
/**
 * ============================================================================
 * THE ZYRATH INCIDENT - Simplified Text-Only Intro
 * ============================================================================
 */

class IntroAnimation {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 22; // Total intro duration in seconds
        
        // Audio
        this.bgMusic = null;
        this.initAudio();
        
        // UI elements
        this.setupUI();
        
        // Animation callbacks
        this.onComplete = null;
    }
    
    /**
     * Initialize background music for intro
     */
    initAudio() {
        try {
            this.bgMusic = new Audio('audio/game_bgm.mp3');
            this.bgMusic.volume = 0.25;
            this.bgMusic.loop = false;
            this.bgMusic.preload = 'auto';
        } catch (error) {
            console.warn('Intro music not available:', error);
        }
    }
    
    /**
     * Setup UI overlays - simple black background with text
     */
    setupUI() {
        // Main intro container - black background only
        this.introContainer = document.createElement('div');
        this.introContainer.id = 'introContainer';
        this.introContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000000;
            z-index: 5000;
            display: none;
            pointer-events: auto;
        `;
        
        // Narration text overlay - centered on black
        this.narrationText = document.createElement('div');
        this.narrationText.id = 'narrationText';
        this.narrationText.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Courier New', monospace;
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 4px;
            line-height: 1.6;
            max-width: 80%;
            opacity: 0;
            transition: opacity 0.5s;
            z-index: 5002;
            text-shadow: 0 0 20px rgba(255,255,255,0.5);
        `;
        
        // Title card
        this.titleCard = document.createElement('div');
        this.titleCard.id = 'titleCard';
        this.titleCard.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Impact', 'Arial Black', sans-serif;
            font-size: 72px;
            color: #ff0000;
            text-align: center;
            text-shadow: 0 0 40px rgba(255,0,0,0.9), 0 0 80px rgba(255,0,0,0.6);
            opacity: 0;
            z-index: 5003;
            white-space: nowrap;
        `;
        this.titleCard.textContent = 'THE ZYRATH INCIDENT';
        
        // Skip button
        this.skipButton = document.createElement('button');
        this.skipButton.textContent = 'SKIP INTRO';
        this.skipButton.style.cssText = `
            position: absolute;
            bottom: 30px;
            right: 30px;
            padding: 12px 24px;
            background: rgba(255,0,0,0.8);
            color: #fff;
            border: 2px solid #ff0000;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            cursor: pointer;
            z-index: 5004;
            transition: all 0.3s;
            pointer-events: auto;
        `;
        this.skipButton.onmouseover = () => {
            this.skipButton.style.background = 'rgba(255,0,0,1)';
            this.skipButton.style.transform = 'scale(1.05)';
        };
        this.skipButton.onmouseout = () => {
            this.skipButton.style.background = 'rgba(255,0,0,0.8)';
            this.skipButton.style.transform = 'scale(1)';
        };
        this.skipButton.onclick = () => this.skip();
        
        // Assemble UI - no 3D scene elements
        this.introContainer.appendChild(this.narrationText);
        this.introContainer.appendChild(this.titleCard);
        this.introContainer.appendChild(this.skipButton);
        document.body.appendChild(this.introContainer);
    }
    
    /**
     * Start the intro animation - text-only version
     */
    play(onComplete) {
        this.isPlaying = true;
        this.currentTime = 0;
        this.startTime = null;
        this.onComplete = onComplete;
        
        // Show intro container (black background with text)
        this.introContainer.style.display = 'block';
        
        // Start background music
        if (this.bgMusic) {
            this.bgMusic.currentTime = 0;
            this.bgMusic.play().catch(err => {
                console.warn('Could not play intro music:', err);
            });
        }
        
        // Start text animation loop
        this.animate();
    }
    
    /**
     * Skip the intro
     */
    skip() {
        this.isPlaying = false;
        this.introContainer.style.display = 'none';
        
        // Stop music
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
        
        if (this.onComplete) {
            this.onComplete();
        }
    }
    
    /**
     * Main animation loop - text-only version
     */
    animate() {
        if (!this.isPlaying) return;
        
        // Use actual delta time for smooth animation
        const now = performance.now() / 1000; // Convert to seconds
        if (!this.startTime) this.startTime = now;
        this.currentTime = now - this.startTime;
        
        // Update text based on timeline
        this.updateTimeline(this.currentTime);
        
        // Check if intro is complete
        if (this.currentTime >= this.duration) {
            this.complete();
            return;
        }
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
    
    /**
     * Update timeline based on current time - text-only version
     */
    updateTimeline(time) {
        // Phase 1: Opening narration (0-4s)
        if (time < 4) {
            this.showNarration("THE YEAR IS 2248...");
        }
        // Phase 2: (4-8s)
        else if (time < 8) {
            this.showNarration("INFECTED ROAM THE STREETS...");
        }
        // Phase 3: (8-12s)
        else if (time < 12) {
            this.showNarration("SURVIVAL IS ALL THAT MATTERS...");
        }
        // Phase 4: (12-16s)
        else if (time < 16) {
            this.showNarration("A DOOR... A CHANCE...");
        }
        // Phase 5: Title card (16-22s)
        else if (time < 22) {
            this.hideNarration();
            this.showTitleCard();
        }
    }
    
    /**
     * Show narration text with smooth fade transition
     */
    showNarration(text) {
        if (this.narrationText.textContent !== text) {
            this.narrationText.style.opacity = '0';
            setTimeout(() => {
                this.narrationText.textContent = text;
                this.narrationText.style.opacity = '1';
            }, 300);
        } else {
            this.narrationText.style.opacity = '1';
        }
    }
    
    /**
     * Hide narration text
     */
    hideNarration() {
        this.narrationText.style.opacity = '0';
    }
    
    /**
     * Show title card
     */
    showTitleCard() {
        this.titleCard.style.transition = 'opacity 2s ease-in';
        this.titleCard.style.opacity = '1';
    }
    
    /**
     * Complete intro sequence
     */
    complete() {
        this.isPlaying = false;
        
        // Fade out
        this.introContainer.style.transition = 'opacity 1s ease-out';
        this.introContainer.style.opacity = '0';
        
        // Stop music
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
        
        setTimeout(() => {
            this.introContainer.style.display = 'none';
            this.introContainer.style.opacity = '1'; // Reset for next time
            
            if (this.onComplete) {
                this.onComplete();
            }
        }, 1000);
    }
}
