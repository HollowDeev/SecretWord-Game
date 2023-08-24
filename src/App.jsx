//* CSS
import "./App.css";

//* React
import { useCallback, useEffect, useState } from "react";

//* Data
import { wordList } from "./data/words";

//* Components

//* Paginas
import StartPage from "./pages/StartPage/StartPage";
import { GamePage } from "./pages/GamePage/GamePage";
import { OverPage } from "./pages/OverPage/OverPage";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState([]);
  const [pickedCategory, setPickedCategory] = useState([]);
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [WrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(50);

  const pickWordAndCategory = useCallback(() => {
    //Pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  //* Start Game
  const startGame = useCallback(() => {
    // clear all letter
    setGuessedLetters([])
    setWrongLetters([])
    // Pick word end pick category
    const { word, category } = pickWordAndCategory();

    // create an array of latters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //* Process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already benn utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      WrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetter) => [
        ...actualWrongLetter,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  //* check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    if(!guessedLetters.length == 0){
      if(guessedLetters.length === uniqueLetters.length){
        //* add 100 to score
        console.log(guessedLetters.length)
        console.log(uniqueLetters.length)
        setScore((actualScore) => actualScore += 100)
        
        startGame()
      }
    }
  

  }, [guessedLetters, startGame, letters])

  console.log(WrongLetters)

  //* check end condition
  useEffect(() => {
    if(guesses <= 0){
      setGuessedLetters([])
      setWrongLetters([])
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //* Restarts the game
  const retry = () => {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage == "start" && <StartPage startGame={startGame} />}
      {gameStage == "game" && (
        <GamePage
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          WrongLetters={WrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage == "end" && <OverPage retry={retry} score={score} />}
    </div>
  );
}

export default App;
