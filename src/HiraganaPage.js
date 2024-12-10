import React from 'react';
import HiraganaData from './HiraganaData';
import './HiraganaPage.css';

function HiraganaPage() {
  const playSound = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const groupedData = [];
  for (let i = 0; i < HiraganaData.length; i += 5) {
    groupedData.push(HiraganaData.slice(i, i + 5));
  }

  return (
    <div className="hiragana-columns">
      {groupedData.map((group, index) => (
        <div className="hiragana-column" key={index}>
          {group.map((item, index) => (
            <button
              key={index}
              className="hiragana-button"
              onClick={() => playSound(item.audio)}
            >
              {item.char} <span>{item.romaji}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HiraganaPage;
