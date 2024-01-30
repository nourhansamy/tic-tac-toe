import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./Winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])]; // Deep copy
  // let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }
  return gameBoard;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveCurrentPlayer(gameTurns);

  // Derive gameBoard
  const gameBoard = deriveGameBoard(gameTurns);

  // Check for winner
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setGameTurns([]);
  }
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) =>
    //   currActivePlayer === "X" ? "O" : "X"
    // );
    setGameTurns((prevTurns) => {
      // let currentPlayer = "X";

      // if (prevTurns.length > 0 && prevTurns[0].player == "X") {
      //   currentPlayer = "O";
      // }
      const currentPlayer = deriveCurrentPlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winnerName={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          // activePlayerSymbol={activePlayer}
          gameBoard={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
