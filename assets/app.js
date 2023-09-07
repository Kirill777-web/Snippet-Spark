// Get all the cards
const cards = document.querySelectorAll('.card');
// Card flipping function
function flipCard(cardElement) {
  //Check if the card is flipped
  const isFlipped = cardElement.style.transform === 'rotateY(180deg)';
  //If the card already flipped it will rotate back to 0deg
  cardElement.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
}

// define the card elements here:
let visibleCards = 3; // Number of cards visible at a time
let cardWidth = 300; // Width of a single card(when changing value also change in css)
let margin = 30; // Space between cards
let cardsTotalWidth = cardWidth + margin; // Width of a card + its margin

//Movement boundaries
let totalCards = document.querySelectorAll('.card').length;
let maxTranslateValue = (totalCards - visibleCards) * cardsTotalWidth;
//maximum value that we can translate the cards container to the left
let minTranslateValue = 1500;
//Starting position of the card in my case from 5th card
let currentTranslateValue = 0;

// Select the cards container to apply the transform property
const cardsContainer = document.querySelector('.cards');

//Moving the cards
function moveCards(direction) {
  if (
    //For moving to the left boundary check
    direction === 1 &&
    currentTranslateValue > -maxTranslateValue + cardsTotalWidth
  ) {
    currentTranslateValue -= cardsTotalWidth;

    //For moving to the right and boundary check
  } else if (direction === -1 && currentTranslateValue < minTranslateValue) {
    currentTranslateValue += cardsTotalWidth;
  }

  //check if sliding to far to the right and left
  if (currentTranslateValue > minTranslateValue) {
    currentTranslateValue = minTranslateValue;
  } else if (
    currentTranslateValue <
    -maxTranslateValue + cardsTotalWidth * visibleCards
  ) {
    currentTranslateValue = -maxTranslateValue + cardsTotalWidth * visibleCards;
  }
  //calculated position to the cards, creating the visual sliding effect.
  cardsContainer.style.transform = `translateX(${currentTranslateValue}px)`;
}

//Search the cards functionality
document
  .getElementById('search-input')
  .addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      // 13 is the key code for Enter
      const query = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
      // Iterate over each card
      cards.forEach((card) => {
        const frontText = card
          .querySelector('.front')
          .textContent.toLowerCase(); // Convert text to lowercase for case-insensitive search

        if (frontText.includes(query)) {
          card.style.display = ''; // Show the card if it matches
        } else {
          card.style.display = 'none'; // Hide the card if it doesn't match
        }
      });
    }
  });
