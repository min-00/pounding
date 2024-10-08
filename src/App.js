import React from 'react';
import './App.css';

//routes
import { Routes, Route, useLocation } from 'react-router-dom';
import MyCalendar from './components/MyCalendar'
import Home from './components/Home'
import List from './components/List'
import MyPage from './components/MyPage'
import Nav from './components/Nav';
import DdayAdd from './components/DdayAdd';
import Weather from './components/Weather';
import DdayEdit from './components/DdayEdit';


function App() {
  const location = useLocation();
  const hiddenNavParhs = ['/ddayadd','/ddayedit', '/ddayedit/*']

  return (
    <div className="App">
      {/* 본문영역 */}
      <div style={{ paddingBottom: '86px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mycalendar" element={<MyCalendar />} />
          <Route path="/list" element={<List />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/ddayadd" element={<DdayAdd />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/ddayedit" element={<DdayEdit />} />
        </Routes>
      </div>

      {!hiddenNavParhs.includes(location.pathname) && <Nav />}
    </div>
  );
}

export default App;
