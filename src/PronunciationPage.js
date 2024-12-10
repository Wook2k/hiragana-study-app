import React, { useState, useEffect } from 'react';
import HiraganaData from './HiraganaData'; // HiraganaData.js에서 데이터 가져오기
import './PronunciationPage.css';

const PronunciationPage = () => {
  const [currentHiragana, setCurrentHiragana] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  // 랜덤 히라가나 문제 생성
  useEffect(() => {
    // romaji가 비어 있지 않은 항목만 필터링
    const filteredHiraganaData = HiraganaData.filter(item => item.romaji !== "" && item.char !== "");

    const randomHiragana = filteredHiraganaData[Math.floor(Math.random() * filteredHiraganaData.length)];
    setCurrentHiragana(randomHiragana);

    // 4개의 발음 예시를 랜덤하게 생성
    let randomOptions = [randomHiragana.romaji];
    while (randomOptions.length < 4) {
      const randomRomaji = filteredHiraganaData[Math.floor(Math.random() * filteredHiraganaData.length)].romaji;
      // 중복되지 않는 발음만 추가
      if (randomRomaji && !randomOptions.includes(randomRomaji)) {
        randomOptions.push(randomRomaji);
      }
    }

    randomOptions = randomOptions.sort(() => Math.random() - 0.5); // 랜덤 순서로 정렬
    setOptions(randomOptions);
  }, []);

  // 선택된 발음 예시 확인
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentHiragana.romaji) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      // 틀린 답을 선택하면 5초 후에 다음 문제로 넘어감
      setTimeout(nextQuestion, 2000);
    }
  };

  // 새 문제 시작
  const nextQuestion = () => {
    setIsCorrect(null);
    setSelectedOption('');
    // romaji가 비어 있지 않은 항목만 필터링
    const filteredHiraganaData = HiraganaData.filter(item => item.romaji !== "" && item.char !== "");

    const randomHiragana = filteredHiraganaData[Math.floor(Math.random() * filteredHiraganaData.length)];
    setCurrentHiragana(randomHiragana);

    let randomOptions = [randomHiragana.romaji];
    while (randomOptions.length < 4) {
      const randomRomaji = filteredHiraganaData[Math.floor(Math.random() * filteredHiraganaData.length)].romaji;
      // 중복되지 않는 발음만 추가
      if (randomRomaji && !randomOptions.includes(randomRomaji)) {
        randomOptions.push(randomRomaji);
      }
    }

    randomOptions = randomOptions.sort(() => Math.random() - 0.5); // 랜덤 순서로 정렬
    setOptions(randomOptions);
  };

  return (
    <div className="pronunciation-page">
      <h2>발음 선택 게임</h2>
      <div className="card-container">
        {/* public/card 폴더에서 이미지 가져오기 */}
        {currentHiragana && (
          <img src={`${process.env.PUBLIC_URL}${currentHiragana.image}`} alt="Hiragana Card" className="hiragana-image" />
        )}
      </div>

      {currentHiragana && (
        <div className="quiz-container">
          <p className="question">히라가나: {currentHiragana.char}</p>
          <p className="romaji-prompt">이 히라가나의 발음은 무엇일까요?</p>

          {/* 발음 예시 선택 */}
          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 정답 피드백 */}
          {isCorrect !== null && (
            <div className="feedback">
              {isCorrect ? (
                <p className="correct-feedback">정답입니다! 🎉</p>
              ) : (
                <p className="incorrect-feedback">틀렸습니다! 정답은 {currentHiragana.romaji}입니다.</p>
              )}
              {/* 정답 맞혔을 때만 버튼을 보여줌 */}
              {isCorrect && <button onClick={nextQuestion} className="next-button">다음 문제</button>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PronunciationPage;
