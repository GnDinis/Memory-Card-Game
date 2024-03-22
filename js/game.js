const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const suits = [
    'ace_of_clubs',
    'ace_of_hearts',
    'ace_of_spades',
    'jack_of_clubs',
    'jack_of_spades',
    'king_of_spades',
    'queen_of_clubs',
    'queen_of_diamonds',
    'queen_of_hearts',
    'queen_of_spades',
];

const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkCards = () => {

    const firstSuit = firstCard.getAttribute('data-suits');
    const secondSuit = secondCard.getAttribute('data-suits');

    if(firstSuit === secondSuit){

        firstCard.firstChild.classList.add('disable_card');
        secondCard.firstChild.classList.add('disable_card');

        firstCard = '';
        secondCard = '';

    } else {

        setTimeout(() => {

            firstCard.classList.remove('reveal_card');
            secondCard.classList.remove('reveal_card');

            firstCard = '';
            secondCard = '';

            checkEndGame();

        }, 500)
    }
}

const checkEndGame = () => {

    const disableCards = document.querySelectorAll('disable_card');

    if( disableCards.length === 20 ){
        clearInterval(this.loop);
        alert(`Congrats ${spanPlayer.innerHTML} you won the game! Your time was ${timer.innerHTML}`);
    }
}

const revealCard = ( { target } ) => {

    if(target.parentNode.className.includes('reveal_card')){
        return;
    }

    if(firstCard === ''){
        target.parentNode.classList.add('reveal_card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal_card');
        secondCard = target.parentNode;

        checkCards();
    }
    
}

const createCard = (suits) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('/images/${suits}.png')`


    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-suits', suits)

    return card;
} 

const loadGame = () => {

    const duplicateSuits = [ ...suits, ...suits ];

    const shuffleSuits =  duplicateSuits.sort( () => Math.random() - 0.5 );

    shuffleSuits.forEach((suits) => {
        
        const card = createCard(suits);
        grid.appendChild(card);

    });
}

const startTime = () => {

    this.loop = setInterval(() => {

        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;

    }, 1000)
}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');

    startTime();
    loadGame();
}

