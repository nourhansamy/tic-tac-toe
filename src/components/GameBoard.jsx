import React from "react";

function GameBoard({ onSelectSquare, gameBoard }) {
  //   let gameBoard = initialGameBoard;
  //   for (const turn of turns) {
  //     gameBoard[turn.square.row][turn.square.col] = turn.player;
  //   }
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);
  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedGameBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedGameBoard;
  //     });
  //     onSelectSquare();
  //   }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}> */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
