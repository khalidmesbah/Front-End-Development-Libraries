import { useEffect, useState } from "react";
import store, { fetchQuotes } from "./store";
import { Icon } from "@iconify/react";
const generateRandomHexCode = () => {
  return (
    "#" +
    Math.floor(Math.random() * 0xf4240)
      .toString(16)
      .padStart(6, `0123abc`[Math.floor(Math.random() * 7)])
  );
};
const getComplementHex = (hex) => {
  hex = hex.slice(1);
  const hexSystem = `fedcba9876543210`;
  let complementHex = `#`;
  for (let i = 0; i < hex.length; i++) {
    complementHex +=
      hexSystem[hexSystem.length - 1 - hexSystem.indexOf(hex[i])];
  }
  return complementHex;
};
let primaryColor = generateRandomHexCode();
let secondaryColor = getComplementHex(primaryColor);
const App = () => {
  const quotes = store.getState();
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const [quote, setQuote] = useState("");
  const [isRandomModeActivated, setIsRandomModeActivated] = useState(false);
  const defaultText = "Life is hard, you gotta handle it.";
  const defaultAuthor = "Khalid Mesbah";
  primaryColor = generateRandomHexCode();
  secondaryColor = getComplementHex(primaryColor);
  document.body.style.background = primaryColor;

  useEffect(() => {
    if (!isRandomModeActivated) return;
    const interval = setInterval(() => {
      setQuote(quotes[randomIndex]);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [quote, isRandomModeActivated]);

  return (
    <div
      className="quote-box"
      id="quote-box"
      style={{ color: primaryColor, background: secondaryColor }}
    >
      <h1 className="quote-text" id="text">
        <Icon
          icon="fa:quote-left"
          className="quote-left"
          color={primaryColor}
          width="1em"
          height="1em"
        />
        {quote?.text || defaultText}
      </h1>
      <h4 id="author">- {quote?.author || defaultAuthor}</h4>
      <div className="options">
        <div className="social-links">
          <a
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_blank"
            href="https://twitter.com/intent/tweet?hashtags=quotes,KhalidMesbah&amp;related=freecodecamp&amp;text=%22I%E2%80%99ve%20missed%20more%20than%209000%20shots%20in%20my%20career.%20I%E2%80%99ve%20lost%20almost%20300%20games.%2026%20times%20I%E2%80%99ve%20been%20trusted%20to%20take%20the%20game%20winning%20shot%20and%20missed.%20I%E2%80%99ve%20failed%20over%20and%20over%20and%20over%20again%20in%20my%20life.%20And%20that%20is%20why%20I%20succeed.%22%20Michael%20Jordan"
          >
            <Icon
              icon="akar-icons:twitter-fill"
              color={primaryColor}
              width="2em"
              height="2em"
            />
          </a>
          <a
            className="button"
            id="tumblr-quote"
            title="Post this quote on tumblr!"
            target="_blank"
            href="https://www.tumblr.com/widgets/share/tool?posttype=quote&amp;tags=quotes,freecodecamp&amp;caption=Michael%20Jordan&amp;content=I%E2%80%99ve%20missed%20more%20than%209000%20shots%20in%20my%20career.%20I%E2%80%99ve%20lost%20almost%20300%20games.%2026%20times%20I%E2%80%99ve%20been%20trusted%20to%20take%20the%20game%20winning%20shot%20and%20missed.%20I%E2%80%99ve%20failed%20over%20and%20over%20and%20over%20again%20in%20my%20life.%20And%20that%20is%20why%20I%20succeed.&amp;canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&amp;shareSource=tumblr_share_button"
          >
            <Icon
              icon="akar-icons:tumblr-fill"
              color={primaryColor}
              width="2em"
              height="2em"
            />
          </a>
        </div>
        <div className="buttons">
          <button
            className="button"
            id="new-quote"
            onClick={() => setQuote(quotes[randomIndex])}
            style={{ color: secondaryColor, background: primaryColor }}
          >
            New quote
          </button>
          <button
            className="button"
            id="random-quote"
            onClick={() => setIsRandomModeActivated((prev) => !prev)}
            style={{ color: secondaryColor, background: primaryColor }}
          >
            Random mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
