const textElement = document.getElementById('text');
const body = document.body;

const messages = [
    "Bonne nuit",
    "Fais de beaux rêves",
    "Dors bien",
    "À demain",
    "Repose-toi bien"
];

const backgrounds = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
];

const animations = [
    'pulse 1s ease-in-out',
    'rotate 1s ease-in-out',
    'fadeIn 1s ease-in-out'
];

let currentIndex = 0;

function changeText() {
    // Effet de sortie
    textElement.style.opacity = '0';
    textElement.style.transform = 'scale(0.5)';
    
    setTimeout(() => {
        // Changer le texte et le fond
        currentIndex = (currentIndex + 1) % messages.length;
        textElement.textContent = messages[currentIndex];
        body.style.background = backgrounds[currentIndex % backgrounds.length];
        
        // Changer l'animation
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        textElement.style.animation = randomAnimation;
        
        // Effet d'entrée
        textElement.style.opacity = '1';
        textElement.style.transform = 'scale(1)';
    }, 500);
}

// Changer le texte toutes les 3 secondes
setInterval(changeText, 3000);
