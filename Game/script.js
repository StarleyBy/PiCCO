// PiCCO Arcade Game JavaScript
class PiCCOGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.gameRunning = false;
        
        // Player properties
        this.player = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            width: 40,
            height: 30,
            speed: 5,
            type: 'standard-monitoring', // standard-monitoring -> thermodilution -> pulse-contour -> picco
            radarRange: 50,
            radarActive: false
        };
        
        // Game elements
        this.enemies = [];
        this.bullets = [];
        this.powerUps = [];
        
        // Weapon types for UI
        this.weapons = [
            { name: 'vasopressor', color: '#ff9800', key: '1' },
            { name: 'inotrope', color: '#f44336', key: '2' },
            { name: 'vasodilator', color: '#4caf50', key: '3' },
            { name: 'fluid', color: '#2196f3', key: '4' },
            { name: 'blood', color: '#b71c1c', key: '5' },
            { name: 'fusid', color: '#9c27b4', key: '6' },
            { name: 'nitro', color: '#ffc107', key: '7' },
            { name: 'O2', color: '#03dac6', key: '8' }
        ];
        
        // Controls
        this.keys = {};
        this.setupEventListeners();
        
        // Game state
        this.upgrades = {
            thermodilution: false,
            pulseContour: false,
            calibrated: false // Full PiCCO upgrade
        };
        
        // Upgrade timers
        this.thermodilutionTimer = null;
        this.pulseContourTimer = null;
        this.thermodilutionAvailable = false;
        this.pulseContourAvailable = false;
        
        // Enemy types - pathologies that require PiCCO for diagnosis/treatment
        this.enemyTypes = [
            {
                name: 'shock',
                color: '#ff5722',
                health: 1,
                speed: 0.3,
                size: 30,
                description: 'Shock - inadequate tissue perfusion'
            },
            {
                name: 'hypovolemia',
                color: '#9c27b0',
                health: 1,
                speed: 0.2,
                size: 25,
                description: 'Hypovolemia - decreased blood volume'
            },
            {
                name: 'vasoconstriction',
                color: '#607d8b',
                health: 1,
                speed: 0.2,
                size: 28,
                description: 'Vasoconstriction - narrowed blood vessels'
            },
            {
                name: 'sepsis',
                color: '#795548',
                health: 2,
                speed: 0.3,
                size: 35,
                description: 'Sepsis - life-threatening organ dysfunction'
            },
            {
                name: 'cardiogenic-shock',
                color: '#e91e63',
                health: 2,
                speed: 0.2,
                size: 40,
                description: 'Cardiogenic shock - heart pump failure'
            }
        ];
        
        // Special enemy types that appear with lower frequency
        this.specialEnemyTypes = [
            {
                name: 'tamponade',
                color: '#3f51b5',
                health: 5,
                speed: 1.0,
                size: 38,
                description: 'Tamponade - cardiac compression'
            },
            {
                name: 'pulm-embolism',
                color: '#009688',
                health: 4,
                speed: 2.0,
                size: 32,
                description: 'Pulmonary embolism - blocked artery'
            }
        ];
        
        // Bullet types - medications and interventions
        this.bulletTypes = [
            {
                name: 'vasopressor',
                color: '#ff9800',
                effectiveness: {
                    'shock': 0.8,
                    'hypovolemia': 0.5,
                    'vasoconstriction': -0.2, // Makes it worse
                    'sepsis': 0.4,
                    'cardiogenic-shock': 0.5
                }
            },
            {
                name: 'inotrope',
                color: '#f44336',
                effectiveness: {
                    'shock': 0.6,
                    'hypovolemia': 0.3,
                    'vasoconstriction': 0.3,
                    'sepsis': 0.5,
                    'cardiogenic-shock': 0.9
                }
            },
            {
                name: 'vasodilator',
                color: '#4caf50',
                effectiveness: {
                    'shock': 0.4,
                    'hypovolemia': -0.4, // Makes it worse
                    'vasoconstriction': 0.9,
                    'sepsis': 0.6,
                    'cardiogenic-shock': -0.1 // Makes it worse
                }
            },
            {
                name: 'fluid',
                color: '#2196f3',
                effectiveness: {
                    'shock': 0.7,
                    'hypovolemia': 0.9,
                    'vasoconstriction': 0.3,
                    'sepsis': 0.4,
                    'cardiogenic-shock': -0.2 // Makes it worse
                }
            },
            {
                name: 'blood',
                color: '#b71c1c',
                effectiveness: {
                    'shock': 0.8,
                    'hypovolemia': 0.9,
                    'vasoconstriction': 0.1,
                    'sepsis': 0.3,
                    'cardiogenic-shock': 0.2
                }
            },
            {
                name: 'fusid',
                color: '#9c27b4',
                effectiveness: {
                    'shock': 0.2,
                    'hypovolemia': 0.1,
                    'vasoconstriction': 0.1,
                    'sepsis': 0.7,
                    'cardiogenic-shock': 0.1
                }
            },
            {
                name: 'nitro',
                color: '#ffc107',
                effectiveness: {
                    'shock': 0.2,
                    'hypovolemia': -0.4, // Makes it worse
                    'vasoconstriction': 0.8,
                    'sepsis': 0.3,
                    'cardiogenic-shock': 0.4
                }
            },
            {
                name: 'O2',
                color: '#03dac6',
                effectiveness: {
                    'shock': 0.5,
                    'hypovolemia': 0.2,
                    'vasoconstriction': 0.2,
                    'sepsis': 0.4,
                    'cardiogenic-shock': 0.3
                }
            }
        ];
        
        // Initialize game
        this.init();
    }
    
    init() {
        this.gameRunning = true;
        
        // Set timers for upgrades
        this.thermodilutionTimer = setTimeout(() => {
            this.thermodilutionAvailable = true;
            this.updatePlayerInfo();
            this.showPowerUpMessage('Thermodilution upgrade available!');
        }, 5000); // 5 seconds
        
        this.pulseContourTimer = setTimeout(() => {
            this.pulseContourAvailable = true;
            this.updatePlayerInfo();
            this.showPowerUpMessage('Pulse Contour Analysis upgrade available!');
        }, 10000); // 10 seconds after thermodilution
        
        this.gameLoop();
        this.spawnEnemy();
        // Spawn enemies every 3 seconds instead of 2, and only if there are less than 2 enemies on screen
        setInterval(() => {
            if (this.enemies.length < 2) {
                this.spawnEnemy();
            }
        }, 3000);
    }
    
    setupEventListeners() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            
            // Shooting with number keys 1-8 for weapons
            if (e.key >= '1' && e.key <= '8') {
                e.preventDefault();
                const weaponIndex = parseInt(e.key) - 1;
                this.shoot(weaponIndex);
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        
        // Touch controls for mobile
        let touchStartX = 0;
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartX = e.touches[0].clientX;
            
            // Check if touching buttons
            const rect = this.canvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - rect.left;
            const touchY = e.touches[0].clientY - rect.top;
            
            // Check if touching any weapon buttons
            for (let i = 0; i < 8; i++) {
                const weaponBtn = document.getElementById(`weapon-${i+1}-btn`);
                if (weaponBtn && this.isPointInButton(touchX, touchY, weaponBtn)) {
                    this.shoot(i);
                    break;
                }
            }
            
            if (this.isPointInButton(touchX, touchY, document.getElementById('inject-btn'))) {
                this.handleInject();
            } else if (this.isPointInButton(touchX, touchY, document.getElementById('calibrate-btn'))) {
                this.handleCalibrate();
            }
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touchX = e.touches[0].clientX;
            const movement = touchX - touchStartX;
            
            // Move player based on swipe direction
            this.player.x += movement * 0.5; // Reduced sensitivity
            
            // Keep player within canvas bounds
            this.player.x = Math.max(this.player.width/2, Math.min(this.canvas.width - this.player.width/2, this.player.x));
            
            touchStartX = touchX;
        });
        
        // Weapon button event listeners
        for (let i = 0; i < 8; i++) {
            const weaponBtn = document.getElementById(`weapon-${i+1}-btn`);
            if (weaponBtn) {
                weaponBtn.addEventListener('click', () => this.shoot(i));
            }
        }
        
        // Other button event listeners
        document.getElementById('inject-btn').addEventListener('click', () => this.handleInject());
        document.getElementById('calibrate-btn').addEventListener('click', () => this.handleCalibrate());
    }
    
    isPointInButton(x, y, button) {
        if (!button) return false;
        
        const rect = button.getBoundingClientRect();
        const canvasRect = this.canvas.getBoundingClientRect();
        
        // Adjust coordinates relative to canvas
        const adjustedX = x + canvasRect.left;
        const adjustedY = y + canvasRect.top;
        
        return (
            adjustedX >= rect.left &&
            adjustedX <= rect.right &&
            adjustedY >= rect.top &&
            adjustedY <= rect.bottom
        );
    }
    
    handleInject() {
        if (!this.upgrades.thermodilution && this.thermodilutionAvailable) {
            // Upgrade to thermodilution
            this.upgrades.thermodilution = true;
            this.player.type = 'thermodilution';
            this.updatePlayerInfo();
            this.showPowerUpMessage('Thermodilution upgrade acquired!');
            
            // Set timer for calibration button to appear after thermodilution upgrade
            setTimeout(() => {
                if (this.upgrades.thermodilution && !this.upgrades.calibrated) {
                    this.updatePlayerInfo(); // This will show the calibrate button
                }
            }, 5000); // 5 seconds after thermodilution upgrade
        } else if (this.upgrades.thermodilution && !this.upgrades.pulseContour && this.pulseContourAvailable) {
            // Upgrade to pulse contour
            this.upgrades.pulseContour = true;
            this.player.type = 'pulse-contour';
            this.player.radarRange = 80;
            this.updatePlayerInfo();
            this.showPowerUpMessage('Pulse Contour Analysis upgrade acquired!');
        }
    }
    
    handleCalibrate() {
        if (this.upgrades.thermodilution && !this.upgrades.calibrated) {
            // Full PiCCO calibration (skip pulse contour requirement)
            this.upgrades.calibrated = true;
            this.player.type = 'picco';
            this.player.radarRange = 120;
            this.updatePlayerInfo();
            this.showPowerUpMessage('PiCCO Fully Calibrated! Maximum efficiency achieved!');
        }
    }
    
    updatePlayerInfo() {
        const infoElement = document.getElementById('player-info');
        
        if (this.upgrades.calibrated) {
            infoElement.textContent = 'Player: PiCCO (Fully Calibrated)';
            infoElement.style.color = '#4caf50';
        } else if (this.upgrades.pulseContour) {
            infoElement.textContent = 'Player: Pulse Contour Analysis';
            infoElement.style.color = '#ffeb3b';
        } else if (this.upgrades.thermodilution) {
            infoElement.textContent = 'Player: Thermodilution';
            infoElement.style.color = '#00bcd4';
        } else {
            infoElement.textContent = 'Player: Standard Monitoring';
            infoElement.style.color = '#0f0';
        }
        
        // Show/hide buttons based on upgrades and availability
        const injectBtn = document.getElementById('inject-btn');
        const calibrateBtn = document.getElementById('calibrate-btn');
        
        injectBtn.style.display = (!this.upgrades.thermodilution && this.thermodilutionAvailable) ? 'inline-block' : 'none';
        
        // Calibrate button appears after thermodilution upgrade and before calibration
        if (this.upgrades.thermodilution && !this.upgrades.calibrated) {
            calibrateBtn.style.display = 'inline-block';
        } else {
            calibrateBtn.style.display = 'none';
        }
        
        // Update weapon button states based on effectiveness when PiCCO is calibrated
        if (this.upgrades.calibrated) {
            this.updateWeaponButtons();
        }
    }
    
    updateWeaponButtons() {
        // Find the closest enemy to determine which weapons are effective
        let closestEnemy = null;
        let minDistance = Infinity;
        
        for (const enemy of this.enemies) {
            const distance = Math.sqrt(
                Math.pow(enemy.x - this.player.x, 2) +
                Math.pow(enemy.y - this.player.y, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                closestEnemy = enemy;
            }
        }
        
        if (closestEnemy) {
            // Update each weapon button based on effectiveness against the closest enemy
            for (let i = 0; i < this.weapons.length; i++) {
                const weapon = this.weapons[i];
                const weaponBtn = document.getElementById(`weapon-${i+1}-btn`);
                
                if (weaponBtn) {
                    const bulletType = this.bulletTypes.find(bullet => bullet.name === weapon.name);
                    const effectiveness = bulletType ? (bulletType.effectiveness[closestEnemy.name] || 0.5) : 0.5;
                    
                    // If effectiveness is less than 0.3, make the button inactive
                    if (effectiveness < 0.3) {
                        weaponBtn.style.opacity = '0.5';
                        weaponBtn.style.pointerEvents = 'none';
                    } else {
                        weaponBtn.style.opacity = '1';
                        weaponBtn.style.pointerEvents = 'auto';
                    }
                }
            }
        } else {
            // If no enemies, make all buttons active
            for (let i = 0; i < this.weapons.length; i++) {
                const weaponBtn = document.getElementById(`weapon-${i+1}-btn`);
                if (weaponBtn) {
                    weaponBtn.style.opacity = '1';
                    weaponBtn.style.pointerEvents = 'auto';
                }
            }
        }
    }
    
    // Additional methods for equipment management
    getEquipmentInfo() {
        if (this.upgrades.calibrated) {
            return {
                name: 'PiCCO',
                radars: ['BP', 'CVP', 'HR', 'SpO2', 'EKG', 'MTt', 'DSt', 'SV', 'ITBVI', 'ELWI', 'CFI', 'GEDVI'],
                weapons: 4
            };
        } else if (this.upgrades.pulseContour) {
            return {
                name: 'Pulse Contour Analysis',
                radars: ['BP', 'CVP', 'HR', 'SpO2', 'EKG', 'SV'],
                weapons: 2
            };
        } else if (this.upgrades.thermodilution) {
            return {
                name: 'Thermodilution',
                radars: ['BP', 'CVP', 'HR', 'SpO2', 'EKG', 'MTt', 'DSt'],
                weapons: 2
            };
        } else {
            return {
                name: 'Standard Monitoring',
                radars: ['BP', 'CVP', 'HR', 'SpO2', 'EKG'],
                weapons: 1
            };
        }
    }
    
    // Cleanup method to clear timers when game ends
    cleanup() {
        if (this.thermodilutionTimer) {
            clearTimeout(this.thermodilutionTimer);
            this.thermodilutionTimer = null;
        }
        if (this.pulseContourTimer) {
            clearTimeout(this.pulseContourTimer);
            this.pulseContourTimer = null;
        }
    }
    
    showPowerUpMessage(message) {
        // Create temporary message element
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.position = 'absolute';
        messageEl.style.top = '50%';
        messageEl.style.left = '50%';
        messageEl.style.transform = 'translate(-50%, -50%)';
        messageEl.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        messageEl.style.color = 'white';
        messageEl.style.padding = '10px';
        messageEl.style.borderRadius = '5px';
        messageEl.style.zIndex = '100';
        messageEl.style.fontWeight = 'bold';
        
        document.getElementById('game-container').appendChild(messageEl);
        
        // Remove message after delay
        setTimeout(() => {
            document.getElementById('game-container').removeChild(messageEl);
        }, 2000);
    }
    
    shoot(weaponIndex) {
        // Determine bullet properties based on selected weapon
        if (weaponIndex < 0 || weaponIndex >= this.weapons.length) {
            return; // Invalid weapon index
        }
        
        const weapon = this.weapons[weaponIndex];
        const bulletType = this.bulletTypes.find(bullet => bullet.name === weapon.name);
        
        if (!bulletType) {
            return; // Weapon not found in bullet types
        }
        
        // Determine bullet properties based on player type
        let bulletSpeed = 5;
        let bulletDamage = 1;
        
        // Upgrade bullets based on player type
        if (this.upgrades.calibrated) {
            // PiCCO: More accurate and effective bullets
            bulletSpeed = 8;
            bulletDamage = 3;
        } else if (this.upgrades.pulseContour || this.upgrades.thermodilution) {
            // Upgraded systems: Moderately improved bullets
            bulletSpeed = 6;
            bulletDamage = 2;
        }
        
        // Create multiple bullets if player has advanced equipment
        const bulletCount = this.upgrades.calibrated ? 2 : 1; // PiCCO shoots 2 bullets at once
        
        for (let i = 0; i < bulletCount; i++) {
            // Offset bullets slightly for PiCCO dual shooting
            const offset = bulletCount > 1 ? (i === 0 ? -5 : 5) : 0;
            
            this.bullets.push({
                x: this.player.x + offset,
                y: this.player.y,
                width: 5,
                height: 10,
                speed: bulletSpeed,
                damage: bulletDamage,
                color: bulletType.color,
                name: bulletType.name,
                typeData: bulletType // Store the full bullet type data for effectiveness calculations
            });
        }
    }
    
    // Method to calculate effectiveness of a bullet against an enemy
    calculateEffectiveness(bullet, enemy) {
        // Get the effectiveness value for this bullet type against this enemy type
        const effectiveness = bullet.typeData.effectiveness[enemy.name] || 0.5; // Default to 0.5 if no specific value
        
        // Apply player upgrade bonuses
        let upgradeMultiplier = 1;
        if (this.upgrades.calibrated) {
            // PiCCO: Better targeting and effectiveness
            upgradeMultiplier = 1.5;
        } else if (this.upgrades.pulseContour || this.upgrades.thermodilution) {
            // Upgraded systems: Moderate improvement
            upgradeMultiplier = 1.2;
        }
        
        // Calculate final damage
        const baseDamage = bullet.damage;
        const finalDamage = baseDamage * effectiveness * upgradeMultiplier;
        
        // Show effectiveness feedback
        if (effectiveness < 0) {
            this.showEffectivenessMessage(`Counterproductive! ${bullet.name} worsened ${enemy.name}`, 'red');
        } else if (effectiveness < 0.3) {
            this.showEffectivenessMessage(`Minimally effective: ${bullet.name} vs ${enemy.name}`, 'orange');
        } else if (effectiveness > 0.8) {
            this.showEffectivenessMessage(`Highly effective: ${bullet.name} vs ${enemy.name}`, 'green');
        }
        
        return finalDamage;
    }
    
    showEffectivenessMessage(message, color = 'white') {
        // Create temporary effectiveness message element
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.position = 'absolute';
        messageEl.style.top = '20%';
        messageEl.style.left = '50%';
        messageEl.style.transform = 'translate(-50%, -50%)';
        messageEl.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        messageEl.style.color = color;
        messageEl.style.padding = '8px';
        messageEl.style.borderRadius = '4px';
        messageEl.style.zIndex = '90';
        messageEl.style.fontWeight = 'bold';
        messageEl.style.fontSize = '14px';
        messageEl.style.textAlign = 'center';
        messageEl.style.pointerEvents = 'none'; // Allow clicks to pass through
        
        document.getElementById('game-container').appendChild(messageEl);
        
        // Remove message after delay
        setTimeout(() => {
            if (messageEl.parentNode) {
                document.getElementById('game-container').removeChild(messageEl);
            }
        }, 1500);
    }
    
    // Override the collision detection to use effectiveness
    checkBulletEnemyCollision() {
        // This method will be called from the update method instead of the simple collision check
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                if (this.checkCollision(this.bullets[i], this.enemies[j])) {
                    // Calculate effectiveness instead of applying fixed damage
                    const damage = this.calculateEffectiveness(this.bullets[i], this.enemies[j]);
                    
                    // Apply damage (can be negative)
                    this.enemies[j].health -= damage; // Subtract because positive damage should reduce health
                    
                    // Add 1 point for successful hit
                    this.score += 1;
                    this.updateScore();
                    
                    // Remove bullet
                    this.bullets.splice(i, 1);
                    
                    if (this.enemies[j].health <= 0) {
                        // Enemy destroyed - add 50 points
                        this.score += 50;
                        this.updateScore();
                        
                        // Chance to drop power-up
                        if (Math.random() < 0.1) { // 10% chance
                            this.spawnPowerUp(this.enemies[j].x, this.enemies[j].y);
                        }
                        
                        this.enemies.splice(j, 1);
                    } else if (this.enemies[j].health > this.enemies[j].maxHealth) {
                        // If health exceeds max due to negative damage (counterproductive med), cap it
                        this.enemies[j].health = this.enemies[j].maxHealth;
                    }
                    break; // Break to avoid checking other enemies with same bullet
                }
            }
        }
    }
    
    spawnEnemy() {
        if (!this.gameRunning) return;
        
        // Determine if we should spawn a special enemy (10% chance after score 20)
        let enemyType;
        if (this.score >= 20 && Math.random() < 0.1) {
            // Spawn special enemy
            enemyType = this.specialEnemyTypes[Math.floor(Math.random() * this.specialEnemyTypes.length)];
        } else {
            // Spawn regular enemy
            enemyType = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
        }
        
        this.enemies.push({
            x: Math.random() * (this.canvas.width - enemyType.size),
            y: -enemyType.size,
            width: enemyType.size,
            height: enemyType.size,
            speed: enemyType.speed,
            health: enemyType.health,
            maxHealth: enemyType.health,
            color: enemyType.color,
            name: enemyType.name,
            description: enemyType.description
        });
    }
    
    // Method to create more complex enemy movement patterns
    updateEnemyMovement() {
        // For future implementation of more complex movement patterns
        // Currently handled in the update() method
    }
    
    update() {
        // Move player based on keyboard input
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.player.x -= this.player.speed;
        }
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.player.x += this.player.speed;
        }
        
        // Keep player within canvas bounds
        this.player.x = Math.max(this.player.width/2, Math.min(this.canvas.width - this.player.width/2, this.player.x));
        
        // Update bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].y -= this.bullets[i].speed;
            
            // Remove bullets that go off screen
            if (this.bullets[i].y < 0) {
                this.bullets.splice(i, 1);
            }
        }
        
        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].y += this.enemies[i].speed;
            
            // Remove enemies that go off screen
            if (this.enemies[i].y > this.canvas.height) {
                this.enemies.splice(i, 1);
                // Player loses points if enemy escapes
                this.score = Math.max(0, this.score - 5);
                this.updateScore();
            }
        }
        
        // Check collisions between bullets and enemies using effectiveness
        this.checkBulletEnemyCollision();
        
        // Update power-ups
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            this.powerUps[i].y += this.powerUps[i].speed;
            
            // Remove power-ups that go off screen
            if (this.powerUps[i].y > this.canvas.height) {
                this.powerUps.splice(i, 1);
            }
            
            // Check collision with player
            if (this.checkCollision(this.player, this.powerUps[i])) {
                this.applyPowerUp(this.powerUps[i]);
                this.powerUps.splice(i, 1);
            }
        }
        
        // Activate radar periodically
        this.player.radarActive = (Date.now() % 2000) < 10; // Active 100ms every 2 seconds
    }
    
    getEnemyPoints(enemy) {
        // More points for harder enemies
        return Math.floor(enemy.maxHealth * 10);
    }
    
    spawnPowerUp(x, y) {
        const powerUpTypes = [
            { name: 'thermodilution', color: '#00bcd4' },
            { name: 'pulse-contour', color: '#ffeb3b' },
            { name: 'calibration', color: '#4caf50' }
        ];
        
        this.powerUps.push({
            x: x,
            y: y,
            width: 20,
            height: 20,
            speed: 1.5,
            color: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)].color,
            name: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)].name
        });
    }
    
    applyPowerUp(powerUp) {
        // Power ups can provide temporary boosts or abilities
        // For now, we'll just give bonus points
        this.score += 50;
        this.updateScore();
    }
    
    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars in background
        this.drawStars();
        
        // Draw radar if active
        if (this.player.radarActive) {
            this.drawRadar();
        }
        
        // Draw player
        this.drawPlayer();
        
        // Draw enemies
        this.enemies.forEach(enemy => {
            this.drawEnemy(enemy);
        });
        
        // Draw bullets
        this.bullets.forEach(bullet => {
            this.drawBullet(bullet);
        });
        
        // Draw power-ups
        this.powerUps.forEach(powerUp => {
            this.drawPowerUp(powerUp);
        });
        
        // Draw enemy labels
        this.enemies.forEach(enemy => {
            this.drawEnemyLabel(enemy);
        });
        
        // Draw bullet labels
        this.bullets.forEach(bullet => {
            this.drawBulletLabel(bullet);
        });
        
        // Update weapon buttons if PiCCO is calibrated
        if (this.upgrades.calibrated) {
            this.updateWeaponButtons();
        }
    }
    
    drawStars() {
        // Draw simple star background
        this.ctx.fillStyle = '#fff';
        for (let i = 0; i < 50; i++) {
            const x = (Date.now() / 50 + i * 73) % this.canvas.width;
            const y = (i * 123) % this.canvas.height;
            this.ctx.fillRect(x, y, 1, 1);
        }
    }
    
    drawRadar() {
        // Draw different radar types based on equipment
        if (this.upgrades.calibrated) {
            // PiCCO radar - full analysis with multiple parameters
            this.drawPiCCORadar();
        } else if (this.upgrades.pulseContour) {
            // Pulse contour radar - SV detection
            this.drawPulseContourRadar();
        } else if (this.upgrades.thermodilution) {
            // Thermodilution radar - MTt and DSt
            this.drawThermodilutionRadar();
        } else {
            // Standard monitoring radar - basic
            this.drawStandardRadar();
        }
    }
    
    drawStandardRadar() {
        // Basic circular radar with pulsating effect
        this.ctx.beginPath();
        this.ctx.arc(
            this.player.x,
            this.player.y,
            this.player.radarRange,
            0,
            2 * Math.PI
        );
        
        // Faint green pulsating effect
        const pulse = Math.sin(Date.now() / 200) * 0.3;
        this.ctx.strokeStyle = `rgba(0, 255, 0, ${0.3 + pulse})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        // Add simple scanning line
        const scanAngle = (Date.now() / 500) % (2 * Math.PI);
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x, this.player.y);
        this.ctx.lineTo(
            this.player.x + Math.cos(scanAngle) * this.player.radarRange,
            this.player.y + Math.sin(scanAngle) * this.player.radarRange
        );
        this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
    
    drawThermodilutionRadar() {
        // Thermodilution radar - shows MTt and DSt
        this.ctx.beginPath();
        this.ctx.arc(
            this.player.x,
            this.player.y,
            this.player.radarRange,
            0,
            2 * Math.PI
        );
        
        // Blue pulsating effect
        const pulse = Math.sin(Date.now() / 200) * 0.2;
        this.ctx.strokeStyle = `rgba(0, 188, 212, ${0.5 + pulse})`;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
        
        // Add MTt and DSt indicators with animation
        const mttAngle = (Date.now() / 1000) % (2 * Math.PI);
        const dstAngle = ((Date.now() / 1000) + Math.PI) % (2 * Math.PI);
        
        // MTt line with animation
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x, this.player.y);
        this.ctx.lineTo(
            this.player.x + Math.cos(mttAngle) * (this.player.radarRange * 0.7),
            this.player.y + Math.sin(mttAngle) * (this.player.radarRange * 0.7)
        );
        this.ctx.strokeStyle = `rgba(255, 255, 0, ${0.5 + Math.sin(Date.now() / 200) * 0.3})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // DSt line with animation
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x, this.player.y);
        this.ctx.lineTo(
            this.player.x + Math.cos(dstAngle) * (this.player.radarRange * 0.5),
            this.player.y + Math.sin(dstAngle) * (this.player.radarRange * 0.5)
        );
        this.ctx.strokeStyle = `rgba(255, 165, 0, ${0.5 + Math.sin(Date.now() / 300) * 0.3})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Add scanning effect
        const scanAngle = (Date.now() / 400) % (2 * Math.PI);
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x, this.player.y);
        this.ctx.lineTo(
            this.player.x + Math.cos(scanAngle) * this.player.radarRange,
            this.player.y + Math.sin(scanAngle) * this.player.radarRange
        );
        this.ctx.strokeStyle = 'rgba(0, 188, 212, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
    
    drawPulseContourRadar() {
        // Pulse contour radar - shows SV with waveform
        this.ctx.beginPath();
        this.ctx.arc(
            this.player.x,
            this.player.y,
            this.player.radarRange,
            0,
            2 * Math.PI
        );
        
        // Yellow pulsating effect
        const pulse = Math.sin(Date.now() / 150) * 0.2;
        this.ctx.strokeStyle = `rgba(255, 235, 59, ${0.5 + pulse})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw pulse wave pattern with animation
        this.ctx.beginPath();
        const waveY = this.player.y + 20;
        for (let x = this.player.x - this.player.radarRange; x < this.player.x + this.player.radarRange; x += 5) {
            const waveValue = Math.sin((x - this.player.x + Date.now() / 50) / 20) * 10;
            if (x === this.player.x - this.player.radarRange) {
                this.ctx.moveTo(x, waveY + waveValue);
            } else {
                this.ctx.lineTo(x, waveY + waveValue);
            }
        }
        this.ctx.strokeStyle = `rgba(255, 0, 0, ${0.5 + Math.sin(Date.now() / 100) * 0.3})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Add scanning effect
        const scanAngle = (Date.now() / 300) % (2 * Math.PI);
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x, this.player.y);
        this.ctx.lineTo(
            this.player.x + Math.cos(scanAngle) * this.player.radarRange,
            this.player.y + Math.sin(scanAngle) * this.player.radarRange
        );
        this.ctx.strokeStyle = 'rgba(255, 235, 59, 0.4)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
    
    drawPiCCORadar() {
        // Advanced PiCCO radar - shows multiple parameters with complex animation
        this.ctx.beginPath();
        this.ctx.arc(
            this.player.x,
            this.player.y,
            this.player.radarRange,
            0,
            2 * Math.PI
        );
        
        // Green pulsating effect
        const pulse = Math.sin(Date.now() / 100) * 0.3;
        this.ctx.strokeStyle = `rgba(76, 175, 80, ${0.5 + pulse})`;
        this.ctx.lineWidth = 2 + Math.sin(Date.now() / 200) * 0.5;
        this.ctx.stroke();
        
        // Multiple radar lines for different parameters with animation
        const paramCount = 8;
        for (let i = 0; i < paramCount; i++) {
            const angle = (i / paramCount) * 2 * Math.PI;
            const length = this.player.radarRange * (0.6 + 0.4 * Math.sin(Date.now() / 300 + i));
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.player.x, this.player.y);
            this.ctx.lineTo(
                this.player.x + Math.cos(angle + Date.now() / 2000) * length,
                this.player.y + Math.sin(angle + Date.now() / 2000) * length
            );
            
            // Different colors for different parameters with animation
            const colors = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0', '#FFEB3B', '#00BCD4', '#8BC34A'];
            this.ctx.strokeStyle = `rgba(${this.hexToRgb(colors[i % colors.length])}, ${0.5 + Math.sin(Date.now() / 200 + i) * 0.3})`;
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();
        }
        
        // Add scanning effect
        const scanAngle = (Date.now() / 200) % (2 * Math.PI);
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x, this.player.y);
        this.ctx.lineTo(
            this.player.x + Math.cos(scanAngle) * this.player.radarRange,
            this.player.y + Math.sin(scanAngle) * this.player.radarRange
        );
        this.ctx.strokeStyle = 'rgba(76, 175, 80, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        // Add inner parameter circles with animation
        for (let i = 1; i <= 3; i++) {
            const radius = this.player.radarRange * (i / 4);
            this.ctx.beginPath();
            this.ctx.arc(
                this.player.x,
                this.player.y,
                radius,
                0,
                2 * Math.PI
            );
            this.ctx.strokeStyle = `rgba(76, 175, 80, ${0.2 + Math.sin(Date.now() / 500 + i) * 0.1})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
        }
    }
    
    hexToRgb(hex) {
        // Convert hex color to RGB values for rgba usage
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
            : '255, 255, 255';
    }
    
    drawPlayer() {
        // Draw player ship based on type
        if (this.upgrades.calibrated) {
            // PiCCO - advanced ship
            this.ctx.fillStyle = '#4caf50';
            this.ctx.fillRect(
                this.player.x - this.player.width/2, 
                this.player.y - this.player.height/2, 
                this.player.width, 
                this.player.height
            );
            
            // Add details for PiCCO
            this.ctx.fillStyle = '#8bc34a';
            this.ctx.fillRect(
                this.player.x - this.player.width/2 + 5, 
                this.player.y - this.player.height/2 + 5, 
                this.player.width - 10, 
                5
            );
        } else if (this.upgrades.pulseContour) {
            // Pulse contour - upgraded ship
            this.ctx.fillStyle = '#ffeb3b';
            this.ctx.fillRect(
                this.player.x - this.player.width/2, 
                this.player.y - this.player.height/2, 
                this.player.width, 
                this.player.height
            );
        } else if (this.upgrades.thermodilution) {
            // Thermodilution - upgraded ship
            this.ctx.fillStyle = '#00bcd4';
            this.ctx.fillRect(
                this.player.x - this.player.width/2, 
                this.player.y - this.player.height/2, 
                this.player.width, 
                this.player.height
            );
        } else {
            // Standard monitoring - basic ship
            this.ctx.fillStyle = '#0ff';
            this.ctx.fillRect(
                this.player.x - this.player.width/2, 
                this.player.y - this.player.height/2, 
                this.player.width, 
                this.player.height
            );
        }
    }
    
    drawEnemy(enemy) {
        // Draw enemy with special effects based on type
        this.ctx.fillStyle = enemy.color;
        
        // Different shapes for different enemy types
        if (enemy.name === 'sepsis') {
            // Sepsis - irregular shape
            this.ctx.beginPath();
            this.ctx.arc(enemy.x + enemy.width/2, enemy.y + enemy.height/2, enemy.width/2, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Add pulsating effect for sepsis
            const pulse = Math.sin(Date.now() / 200) * 0.3;
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + pulse})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        } else if (enemy.name === 'cardiogenic-shock') {
            // Cardiogenic shock - heart-like shape
            this.drawHeart(enemy.x + enemy.width/2, enemy.y + enemy.height/2, enemy.width/2);
        } else if (enemy.name === 'tamponade') {
            // Tamponade - diamond shape
            this.ctx.beginPath();
            this.ctx.moveTo(enemy.x + enemy.width/2, enemy.y);
            this.ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height/2);
            this.ctx.lineTo(enemy.x + enemy.width/2, enemy.y + enemy.height);
            this.ctx.lineTo(enemy.x, enemy.y + enemy.height/2);
            this.ctx.closePath();
            this.ctx.fill();
        } else {
            // Regular enemies - rectangles or circles
            if (enemy.name === 'hypovolemia') {
                // Hypovolemia - circle
                this.ctx.beginPath();
                this.ctx.arc(enemy.x + enemy.width/2, enemy.y + enemy.height/2, enemy.width/2, 0, 2 * Math.PI);
                this.ctx.fill();
            } else {
                // Other enemies - rectangles
                this.ctx.fillRect(
                    enemy.x, 
                    enemy.y, 
                    enemy.width, 
                    enemy.height
                );
            }
        }
        
        // Draw health bar
        const healthPercent = enemy.health / enemy.maxHealth;
        this.ctx.fillStyle = '#f00';
        this.ctx.fillRect(
            enemy.x, 
            enemy.y - 10, 
            enemy.width, 
            5
        );
        this.ctx.fillStyle = '#0f0';
        this.ctx.fillRect(
            enemy.x, 
            enemy.y - 10, 
            enemy.width * healthPercent, 
            5
        );
    }
    
    drawHeart(x, y, size) {
        // Draw a heart shape for cardiogenic shock
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size * 0.2);
        this.ctx.bezierCurveTo(
            x, y - size * 0.3,
            x - size * 0.4, y - size * 0.3,
            x - size * 0.4, y + size * 0.1
        );
        this.ctx.bezierCurveTo(
            x - size * 0.4, y + size * 0.5,
            x, y + size * 0.8,
            x, y + size * 0.2
        );
        this.ctx.moveTo(x, y + size * 0.2);
        this.ctx.bezierCurveTo(
            x, y - size * 0.3,
            x + size * 0.4, y - size * 0.3,
            x + size * 0.4, y + size * 0.1
        );
        this.ctx.bezierCurveTo(
            x + size * 0.4, y + size * 0.5,
            x, y + size * 0.8,
            x, y + size * 0.2
        );
        this.ctx.fill();
    }
    
    drawBullet(bullet) {
        this.ctx.fillStyle = bullet.color;
        this.ctx.fillRect(
            bullet.x - bullet.width/2, 
            bullet.y - bullet.height/2, 
            bullet.width, 
            bullet.height
        );
    }
    
    drawPowerUp(powerUp) {
        this.ctx.fillStyle = powerUp.color;
        this.ctx.beginPath();
        this.ctx.arc(
            powerUp.x + powerUp.width/2, 
            powerUp.y + powerUp.height/2, 
            powerUp.width/2, 
            0, 
            2 * Math.PI
        );
        this.ctx.fill();
    }
    
    drawEnemyLabel(enemy) {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '8px Arial';
        this.ctx.fillText(
            enemy.name, 
            enemy.x, 
            enemy.y - 15
        );
    }
    
    drawBulletLabel(bullet) {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '8px Arial';
        this.ctx.fillText(
            bullet.name, 
            bullet.x - 10, 
            bullet.y - 5
        );
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        this.updatePlayerInfo();
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    // Cleanup method to clear timers when game ends
    cleanup() {
        if (this.thermodilutionTimer) {
            clearTimeout(this.thermodilutionTimer);
            this.thermodilutionTimer = null;
        }
        if (this.pulseContourTimer) {
            clearTimeout(this.pulseContourTimer);
            this.pulseContourTimer = null;
        }
    }
}

// Start the game when the page loads
window.onload = () => {
    const game = new PiCCOGame();
    
    // Handle page unload to cleanup timers
    window.addEventListener('beforeunload', () => {
        game.cleanup();
    });
};