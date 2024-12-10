import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 각 페이지 컴포넌트
import GamePage from './GamePage';
import HiraganaPage from './HiraganaPage';
import PronunciationPage from './PronunciationPage';  // 발음 선택 페이지 추가
import FlashCardPage from './FlashCardPage';  // 카드 선택 페이지 추가

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 사이드 메뉴 토글 기능
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="app">
        {/* Header Section */}
        <header className="header">
          <h1>히라가나 학습</h1>
        </header>

        {/* 사이드 메뉴 버튼 (왼쪽 위에 고정) */}
        <button className="menu-toggle-button" onClick={toggleMenu}>☰</button>

        {/* Main Content Section */}
        <div className="main-content">
          {/* 왼쪽 사이드 메뉴 */}
          <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
            <div className="menu">
              <ul>
                <li><Link to="/">히라가나</Link></li>
                <li><Link to="/game">발음 쓰기</Link></li>
                <li><Link to="/pronunciation">발음 선택</Link></li> {/* 발음 선택 페이지 링크 */}
                <li><Link to="/flashcards">카드 선택</Link></li> {/* 카드 선택 페이지 링크 */}
              </ul>
            </div>
          </div>

          {/* 중앙 본문 영역 */}
          <div className={`content ${menuOpen ? 'menu-open' : ''}`}>
            <Routes>
              <Route path="/" element={<HiraganaPage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/pronunciation" element={<PronunciationPage />} /> {/* 발음 선택 페이지 */}
              <Route path="/flashcards" element={<FlashCardPage />} /> {/* 카드 선택 페이지 */}
            </Routes>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="footer">
          <p>© 2024 히라가나 학습 앱</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
