import React from 'react'

const TokenPopup = ({ token, onClose }) => {
    return (
      <div className="token-popup text-stone-700">
        <div className="token-popup-content">
          <h2>Your Token:</h2>
          <p>{token}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  

export default TokenPopup;