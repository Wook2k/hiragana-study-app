import React, { useState, useEffect } from 'react';
import HiraganaData from './HiraganaData';
import './FlashCardPage.css';

const FlashCardPage = () => {
  const [currentHiragana, setCurrentHiragana] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  // 새 문제를 로드하는 함수
  const loadNewQuestion = () => {
    const filteredHiraganaData = HiraganaData.filter(
      (item) => item.romaji !== '' && item.char !== ''
    );
    const randomHiragana = filteredHiraganaData[
      Math.floor(Math.random() * filteredHiraganaData.length)
    ];
    setCurrentHiragana(randomHiragana);

    let randomOptions = [randomHiragana.image];
    while (randomOptions.length < 4) {
      const randomImage =
        filteredHiraganaData[
          Math.floor(Math.random() * filteredHiraganaData.length)
        ].image;
      if (!randomOptions.includes(randomImage)) {
        randomOptions.push(randomImage);
      }
    }

    randomOptions = randomOptions.sort(() => Math.random() - 0.5);
    setOptions(randomOptions);
    setIsCorrect(null);
    setSelectedOption('');
  };

  // 첫 문제 로드
  useEffect(() => {
    loadNewQuestion();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentHiragana.image) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      // 틀렸을 경우 2초 뒤에 자동으로 다음 문제 로드
      setTimeout(() => loadNewQuestion(), 2000);
    }
  };

  const nextQuestion = () => {
    loadNewQuestion();
  };

  return (
    <div className="flashcard-page">
      <h2>카드 선택 게임</h2>
      {currentHiragana && (
        <div className="quiz-container">
          <p className="romaji">{currentHiragana.romaji}</p>
          <p className="instruction">이 발음에 해당하는 이미지를 선택하세요.</p>

          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOption === option
                    ? isCorrect === true
                      ? 'correct'
                      : isCorrect === false
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <img src={option} alt="Option" className="option-image" />
              </button>
            ))}
          </div>

          {isCorrect !== null && (
            <div className="feedback">
              {isCorrect ? (
                <>
                  <p className="correct-feedback">정답입니다! 🎉</p>
                  {/* 정답 맞혔을 때만 버튼을 보여줌 */}
                  <button onClick={nextQuestion} className="next-button">
                    다음 문제
                  </button>
                </>
              ) : (
                <p className="incorrect-feedback">
                  틀렸습니다! 정답은 {currentHiragana.char} 입니다.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlashCardPage;
