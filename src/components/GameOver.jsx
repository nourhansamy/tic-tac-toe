import React from "react";

function GameOver({ winnerName, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winnerName ? <p>{winnerName} won!!!!</p> : <p>It's a draw!</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}

export default GameOver;
