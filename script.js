const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Show loading spinner
function startLoading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

// Hide loading spinner
function stopLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
    startLoading()
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank
    if (!quote.author) {
      authorText.innerText = 'Unknown'
    } else {
      authorText.innerText = quote.author
    }
    // Check quote length to determinate styling
    if (quote.text.length > 120) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }
    // set quote & hide loading spinner
    quoteText.innerText = quote.text
    stopLoading()
}

// Get quotes from API
async function getQuotes() {
  startLoading()
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // error handling
    console.log(error);
  }
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();