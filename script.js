// Compteur de clics
let count = 0;
const countElement = document.getElementById('count');
const incrementBtn = document.getElementById('incrementBtn');
const resetBtn = document.getElementById('resetBtn');

// Fonction pour incrémenter le compteur
incrementBtn.addEventListener('click', () => {
    count++;
    countElement.textContent = count;
    
    // Animation
    countElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        countElement.style.transform = 'scale(1)';
    }, 200);
});

// Fonction pour réinitialiser le compteur
resetBtn.addEventListener('click', () => {
    count = 0;
    countElement.textContent = count;
});

// Message du jour
const messages = [
    "Passez une excellente journée! 🌟",
    "N'oubliez pas de sourire aujourd'hui! 😊",
    "Vous êtes capable de grandes choses! 💪",
    "Continuez à apprendre et à grandir! 📚",
    "La créativité n'a pas de limites! 🎨"
];

const messageElement = document.getElementById('message');
const randomMessage = messages[Math.floor(Math.random() * messages.length)];
messageElement.textContent = randomMessage;

// Animation de transition douce
countElement.style.transition = 'transform 0.2s ease';

console.log('Script chargé avec succès! ✅');
