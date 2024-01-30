import React, { useState } from "react";
function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  let value = "";
  //   let btnCaption = "Edit";
  const handleClick = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      console.log("isEditing");
      onChangeName(symbol, playerName);
    }
    // btnCaption = "Save";
  };

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          ></input>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>
        {/* {btnCaption} */}
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}

export default Player;
