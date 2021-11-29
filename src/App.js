import { useState, useEffect } from "react";
import Card from "./card";
import "./App.css";

const deck = [
  { n: "X", m: false },
  { n: "Z", m: false },
  { n: "Y", m: false },
  { n: "O", m: false },
  { n: "1", m: false },
  { n: "2", m: false },
];

function Memory() {
  const [state_cards, setCards] = useState([]);
  const [state_choiceOne, setChoiceOne] = useState(null);
  const [state_choiceTwo, setChoiceTwo] = useState(null);
  const [state_disabled, setDisabled] = useState(false);

  const doubleDeckAndShuffle = () => {
    const doubleDeck = [...deck, ...deck];
    const doubleDeckAddId = doubleDeck.map((item) => ({
      ...item,
      id: Math.random(),
    }));
    for (let i = doubleDeckAddId.length; i > 0; i--) {
      const randomNo = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      const temp = doubleDeckAddId[currentIndex];
      doubleDeckAddId[currentIndex] = doubleDeckAddId[randomNo];
      doubleDeckAddId[randomNo] = temp;
    }
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(doubleDeckAddId);
  };

  useEffect(() => {
    if (state_choiceOne && state_choiceTwo) {
      setDisabled(true);

      if (state_choiceOne.n === state_choiceTwo.n) {
        setCards((oldDeck) => {
          return oldDeck.map((card) => {
            if (card.n === state_choiceOne.n) {
              return { ...card, m: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [state_choiceOne, state_choiceTwo]);

  const handleCardClick = (card) => {
    if (state_choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };
  //mount
  useEffect(() => {
    doubleDeckAndShuffle();
  }, []);

  return (
    <div className="App">
      <div className="gameboard">
        {state_cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClickToMain={handleCardClick}
            flipped={
              card === state_choiceOne || card === state_choiceTwo || card.m
            }
            disabled={state_disabled}
          />
        ))}
      </div>
      <div className="newgame">
        <button onClick={doubleDeckAndShuffle}>New Game</button>
      </div>
    </div>
  );
}

export default Memory;
