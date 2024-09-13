import React from 'react';
import './App.css';

//routes
import { Routes, Route } from 'react-router-dom';
import MyCalendar from './components/MyCalendar'
import Home from './components/Home'
import List from './components/List'
import MyPage from './components/MyPage'
import Nav from './components/Nav';


function App() {

  return (
    <div className="App">
      {/* 본문영역 */}
      <div style={{ paddingBottom: '86px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mycalendar" element={<MyCalendar />} />
          <Route path="/list" element={<List />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>

      <Nav className="Nav" />
    </div>
  );
}

export default App;
