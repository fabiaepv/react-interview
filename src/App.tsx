import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import './App.css';

interface GuessedWord {
  text: string;
  guessed: boolean;
}

const TRIES = 5;
const GUESS_WORD = "WIZELINE";
const GAME_OVER = "GAME OVER 😪";
const YOU_WON = "YOU WON 🥳";

const GameWrapper = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-content: center;
  display: block;
  text-align: center;
`;

const LifeWrapper = styled.h1``;

const InputChar = styled.input`
  width: 50px;
  height: 50px;
  font-size: 45px;
  text-align: center;
`;

const CharacterBox = styled.span`
  width: 50px;
  height: 50px;
  font-size: 30px;
  text-align: center;
  background-color: white;
  color: black;
`

const BoxesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  width: 800px;
  width: 100%;
  justify-content: center;
`;

const GameOver = styled.h1`
  color: red;
`;

const WonGame = styled.h1`
  color: green;
`;

const InputActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  margin-top: 25px;
  justify-content: center;
`;

const ButtonTry = styled.button``;

function App() {
  const initialState = GUESS_WORD.split('').map((char) => {
    return { text: char, guessed: false };
  });
  const [tries, setTries] = useState(TRIES);
  const [guessWord, setGuessWord] = useState<GuessedWord[]>(initialState);
  const [input, setInput] = useState("");
  const [wonGame, setWonGame] = useState(false);
  const [loseGame, setLoseGame] = useState(false);

  const handleClick = () => {
    if (!hasCharacter(input.toUpperCase())) {
      setTries((prev) => prev - 1);
    } else {
      updateGuessedState(input);
    }

    setInput("");
  };

  const updateGuessedState = (searchText: string) => {
    const updatedGuessWord = guessWord.map((word) => {
      if (word.text === searchText.toUpperCase()) {
        return { ...word, guessed: true };
      }
      return word;
    });

    setGuessWord(updatedGuessWord);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const hasCharacter = (searchText: string) => {
    return guessWord.some((word) => word.text === searchText);
  };

  useEffect(() => {
    if (tries === 0) setLoseGame(true);
    if (guessWord.every((word) => word.guessed === true)) setWonGame(true);
  }, [guessWord, tries]);


  return (
    <GameWrapper>
      {wonGame && <WonGame>{YOU_WON}</WonGame>}
      {loseGame && <GameOver>{GAME_OVER}</GameOver>}
      {!wonGame && !loseGame && (
        <>
          <LifeWrapper>Lifes {tries}</LifeWrapper>
          <BoxesWrapper>
            {guessWord.map((char, index) => (
              <CharacterBox key={index}>{char.guessed ? char.text : ""}</CharacterBox>
            ))}
          </BoxesWrapper>
          <InputActionWrapper>
            <InputChar onChange={handleChange} value={input}/>
            <ButtonTry onClick={handleClick}> Try </ButtonTry>
          </InputActionWrapper>
        </>
      )}
    </GameWrapper>
  );
}

export default App;