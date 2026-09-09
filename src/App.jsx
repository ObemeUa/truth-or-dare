import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import CardScreen from './components/CardScreen';
import VictoryScreen from './components/VictoryScreen';
import { getRandomQuestion, resetUsedQuestions } from './data/questions';

const WINNING_SCORE = 40;

export default function App() {
  const [screen, setScreen] = useState('start');
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [adultMode, setAdultMode] = useState(false);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [winner, setWinner] = useState(null);

  const currentPlayer = players[currentPlayerIndex];

  const handleStartGame = useCallback((playerNames, isAdult) => {
    setPlayers(playerNames.map(name => ({ name, score: 0 })));
    setAdultMode(isAdult);
    setCurrentPlayerIndex(0);
    setWinner(null);
    resetUsedQuestions();
    setScreen('game');
  }, []);

  const handleChoice = useCallback((choice) => {
    setCurrentChoice(choice);
    const question = getRandomQuestion(choice, adultMode);
    setCurrentQuestion(question);
    setScreen('card');
  }, [adultMode]);

  const handleResult = useCallback((completed) => {
    const points = completed ? (currentChoice === 'truth' ? 1 : 2) : 0;
    
    setPlayers(prev => {
      const updated = prev.map((p, i) => 
        i === currentPlayerIndex 
          ? { ...p, score: p.score + points }
          : p
      );
      
      // Check for winner
      if (updated[currentPlayerIndex].score >= WINNING_SCORE) {
        setWinner(updated[currentPlayerIndex]);
        setTimeout(() => setScreen('victory'), 0);
      } else {
        setCurrentPlayerIndex(idx => (idx + 1) % updated.length);
        setTimeout(() => setScreen('game'), 0);
      }
      
      return updated;
    });
  }, [currentChoice, currentPlayerIndex]);

  const handleEndGame = useCallback((mode) => {
    if (mode === 'finish') {
      const leader = [...players].sort((a, b) => b.score - a.score)[0] || currentPlayer;
      setWinner(leader);
      setScreen('victory');
    } else {
      setPlayers([]);
      setCurrentPlayerIndex(0);
      setAdultMode(false);
      setCurrentChoice(null);
      setCurrentQuestion('');
      setWinner(null);
      resetUsedQuestions();
      setScreen('start');
    }
  }, [players, currentPlayer]);

  const handlePlayAgain = useCallback(() => {
    setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
    setCurrentPlayerIndex(0);
    setWinner(null);
    resetUsedQuestions();
    setScreen('game');
  }, []);

  const handleNewGame = useCallback(() => {
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setAdultMode(false);
    setCurrentChoice(null);
    setCurrentQuestion('');
    setWinner(null);
    resetUsedQuestions();
    setScreen('start');
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-dark-bg bg-grid bg-radial-glow overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'start' && (
          <StartScreen key="start" onStart={handleStartGame} />
        )}
        {screen === 'game' && (
          <GameScreen
            key="game"
            players={players}
            currentPlayer={currentPlayer}
            currentPlayerIndex={currentPlayerIndex}
            onChoice={handleChoice}
            onEndGame={handleEndGame}
          />
        )}
        {screen === 'card' && (
          <CardScreen
            key="card"
            question={currentQuestion}
            choice={currentChoice}
            playerName={currentPlayer?.name}
            onResult={handleResult}
          />
        )}
        {screen === 'victory' && (
          <VictoryScreen
            key="victory"
            winner={winner}
            players={players}
            onPlayAgain={handlePlayAgain}
            onNewGame={handleNewGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
