import React from 'react';
import "../styles/button.css"

function StartButton({getTable}) {
  return (
      <div className="button-container">
        <button className="button" onClick={() => {getTable()}}>Загрузить данные</button>
      </div>
  );
}

export default StartButton;