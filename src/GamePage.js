import React, { useState } from 'react';
import HiraganaData from './HiraganaData';
import answers from './Answer';
import './GamePage.css';

const GamePage = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  // 게임 시작 함수
  const startGame = () => {
    setScore(0);
    setAnswer('');
    setFeedback('');
    nextQuestion();
  };

  // 다음 문제로 이동
  const nextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * HiraganaData.length);
    const randomChar = HiraganaData[randomIndex].char;
    setCurrentQuiz(randomChar);
  };

  // 정답 체크 함수
  const checkAnswer = () => {
    const correctAnswer = answers[currentQuiz];
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      setScore(score + 1);
      setFeedback('정답입니다! 🎉');
    } else {
      setFeedback(`틀렸습니다! 정답은 "${correctAnswer}"입니다.`);
    }
    setAnswer('');
    nextQuestion();
  };

  return (
    <div className="game-page">
      <header className="game-header">
        <h1>히라가나 퀴즈 게임</h1>
        <p className="instructions">
          히라가나 문자의 로마자 발음을 입력하세요!
        </p>
      </header>
      <div className="game-content">
        {currentQuiz ? (
          <div className="quiz-section">
            <div className="quiz-card">
              <p className="hiragana-char">{currentQuiz}</p>
            </div>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="로마자 발음 입력"
              className="answer-input"
            />
            <button onClick={checkAnswer} className="action-button">
              확인
            </button>
            {feedback && <p className="feedback">{feedback}</p>}
            <p className="score">현재 점수: {score}</p>
          </div>
        ) : (
          <div className="start-container">
            <button className="start-button" onClick={startGame}>
              게임 시작
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
