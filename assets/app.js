// Get all the cards
const cards = document.querySelectorAll('.card');
//Api For jokes
const url = 'https://icanhazdadjoke.com/';
//Elements for the joke
const btn = document.querySelector('#randomJokes');
const result = document.querySelector('#textArea');
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
      //clear the content of random number data and random jokes section
      traviaElement.textContent ="";
      result.textContent = "";

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

//Random joke functionality
btn.addEventListener('click', () => {
  fetchDadJoke();
});


const fetchDadJoke = async () => {
  result.textContent = 'Loading...';
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'bootcamp project',
      },
    });
    if (!response.ok) {
      throw new Error(' error');
    }
    const data = await response.json();
    result.textContent = data.joke;
  } catch (error) {
    console.log(error.message);
    result.textContent = 'There was an error...';
  }
};
// https://cors-anywhere.herokuapp.com/corsdemo -Don't forget to click on this server
//Generating random number facts api
const apiUrl = "http://numbersapi.com/random/trivia";
const traviaElement = document.getElementById('numberTrivia');
const clickEvent = document.querySelector('.fetch-button');
// console.log(clickEvent);
// console.log(traviaElement);

//fetching api
clickEvent.addEventListener('click', function(event) {
  event.preventDefault();
fetch(apiUrl)
.then((response) => response.text())
.then((data) => {
  traviaElement.textContent = data;
}) 
.catch((error) => {
  console.log("Error fetching the numberTrivia", error);
});
});

// Displaying saved Trivia data when the page loads
window.onload = () => {
  const savedTrivia = localStorage.getItem('lastTrivia');
  if (savedTrivia) {
    traviaElement.textContent = savedTrivia;
  }
};