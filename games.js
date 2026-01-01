const cardsData = [
    { name: 'rocket', icon: 'bi-rocket-takeoff-fill' },
    { name: 'moon', icon: 'bi-moon-stars-fill' },
    { name: 'sun', icon: 'bi-sun-fill' },
    { name: 'star', icon: 'bi-stars' },
    { name: 'globe', icon: 'bi-globe-americas' },
    { name: 'cloud', icon: 'bi-cloud-lightning-fill' },
    { name: 'lightning', icon: 'bi-lightning-charge-fill' },
    { name: 'satellite', icon: 'bi-broadcast' }
];


const gameBoard = document.getElementById('game-board');
const moveCountEl = document.getElementById('move-count');
const restartBtn = document.getElementById('restart-btn');
const winMessage = document.getElementById('win-message');

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchesFound = 0;

function initGame() {
    // Reset state
    gameBoard.innerHTML = '';
    moves = 0;
    matchesFound = 0;
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    moveCountEl.textContent = moves;
    winMessage.classList.add('d-none');

    // Duplicate and Shuffle
    const doubleCards = [...cardsData, ...cardsData];
    doubleCards.sort(() => 0.5 - Math.random());

    // Generate HTML
    doubleCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = card.name;

        cardElement.innerHTML = `
            <div class="front-face">
                <i class="bi ${card.icon}"></i>
            </div>
            <div class="back-face">
            </div>
        `;

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    incrementMoves();
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Highlight match
    firstCard.querySelector('.front-face').style.background = '#dcfce7';
    firstCard.querySelector('.front-face').style.borderColor = '#22c55e';
    secondCard.querySelector('.front-face').style.background = '#dcfce7';
    secondCard.querySelector('.front-face').style.borderColor = '#22c55e';

    resetBoard();
    matchesFound++;
    if (matchesFound === cardsData.length) {
        setTimeout(() => {
            winMessage.classList.remove('d-none');
            // Optional: Confetti or success sound here
        }, 500);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function incrementMoves() {
    moves++;
    moveCountEl.textContent = moves;
}

restartBtn.addEventListener('click', initGame);

// Start game on load
initGame();
