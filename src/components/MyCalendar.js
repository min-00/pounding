import React, { useEffect, useState } from 'react'; 
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import { ref, onValue } from 'firebase/database'; 
import { db } from '../firebase'; 

// MUI
import FavoriteIcon from '@mui/icons-material/Favorite';

function MyCalendar() {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]); 

  useEffect(() => {
    const tasksRef = ref(db, 'dday/'); 

    // 데이터 읽기
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const taskList = [];

      if (data) {
        for (let id in data) {
          taskList.push({ id, ...data[id] });
        }
      }

      // 이벤트 날짜 설정
      const eventDates = taskList.map(task => new Date(task.date).toDateString());
      setEvents(eventDates);
    });
  }, []);

  //타일에 아이콘 표시
  const tileContent = ({ date, view }) => {
    // 이벤트가 있는 날짜인지 확인
    const dateString = date.toDateString();
    if (events.includes(dateString)) {
      return (
  <div style={{ position : 'absolute', width : '100%', left: '50%', margin: "0 0 0 -50%" , top : '35px' }}>
    <div></div> 
          <FavoriteIcon style={{ color: '#f8537b' }} />
        </div>
      ); 
    }
    return null;
  };

  return (
    <div>
      <Calendar 
        onChange={onChange} 
        value={value} 
        tileContent={tileContent} // 커스텀 타일 콘텐츠 추가
      />
    </div>
  );
}

export default MyCalendar;

