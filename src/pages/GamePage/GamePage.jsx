/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import "./GamePage.css";
export const GamePage = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  WrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState();
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)
    setLetter('')
    letterInputRef.current.focus()
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinha a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, index) =>
          guessedLetters.includes(letter) ? (
            <span key={index} className="letter">
              {letter}
            </span>
          ) : (
            <span key={index} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
       
        {WrongLetters.map((letter, i) => <span key={i}>{letter}</span>)}
      </div>
    </div>
  );
};
