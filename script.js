const emojis = ['🍕', '🍔', '🍟', '🌮', '🍩', '🍪', '🍉', '🍓'];
let cards = [...emojis, ...emojis]; // Duplicar para tener pares
let revealedCards = [];
let matchedPairs = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  shuffle(cards);

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = '';
    card.addEventListener('click', () => revealCard(card));
    gameBoard.appendChild(card);
  });
}

function revealCard(card) {
  if (
    card.classList.contains('revealed') ||
    card.classList.contains('matched') ||
    revealedCards.length === 2
  ) return;

  card.classList.add('revealed');
  card.innerText = card.dataset.emoji;
  revealedCards.push(card);

  if (revealedCards.length === 2) {
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = revealedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;
    if (matchedPairs === emojis.length) {
      document.getElementById('message').innerText = '¡Ganaste!';
    }
  } else {
    card1.classList.remove('revealed');
    card2.classList.remove('revealed');
    card1.innerText = '';
    card2.innerText = '';
  }

  revealedCards = [];
}

createBoard();
