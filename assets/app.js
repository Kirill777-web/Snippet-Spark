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

// API for search bar
function searchUrl() {
  var searchText = searchElement.value.trim();

  const access_key = 'YOUR_ACCESS_KEY';
  const type = 'web'; // For standard web search.
  const device = 'desktop'; // Defaults to desktop.

  // Construct the full URL using template literals
  const fullURL = `http://api.serpstack.com/search?access_key=${access_key}&query=${searchText}&type=${type}&device=${device}`;

  // Make the API request
  fetch(fullURL)
    .then((res) => {
      if (!res.ok) {
        // If there's an error response, try to parse its body as JSON
        return res.json().then((errData) => {
          throw new Error(
            'Search API error: ' + (errData.info || 'Unknown error')
          );
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(
        'There was an error with the fetch operation:',
        error.message
      );
    });
}

//Test comments
