import { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
library.add(fas, faTwitter, faFontAwesome)

const quoteDBurl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {

  const [quote, setQuote] = useState("United we stand, divided we fall.")
  const [author, setAuthor] = useState("Aesop")
  const [quotesArray, setQuotesArray] = useState(null)
  const [randomNumber, setRandomNumber] = useState(0)
  const [accentColor, setAccentColor] = useState('#263238')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON.quotes)
  }

  useEffect(()=>{fetchQuotes(quoteDBurl)}, [quoteDBurl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(Math.random()*quotesArray.length)
    setRandomNumber(randomInteger)
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    setAccentColor(COLORS_ARRAY[randomInteger])
  }
  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color:accentColor}}>
          <h2 id="text">
            <span id="quote-icon">
              <FontAwesomeIcon icon={faQuoteLeft}/>
            </span>
            {quote}
          </h2>
          <p id="author">- {author}</p>
          <div class="buttons">
            <a id="tweet-quote" 
            style={{backgroundColor: accentColor}} 
            href={encodeURI(`http://twitter.com/intent/tweet?text=${quote} -${author}`)}>
              <FontAwesomeIcon icon="fa-brands fa-twitter" />
            </a>
            <button id="new-quote" onClick={getRandomQuote} style={{backgroundColor: accentColor}}>Generate a Random Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
