import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import '../CSS/List.scoped.css';

// MUI
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function MyCalendar() {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택한 이벤트 상태 추가

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

      setEvents(taskList); // 이벤트 전체 데이터를 저장
    });
  }, []);

  // 타일에 아이콘 표시 및 클릭 이벤트 처리
  const tileContent = ({ date }) => {
    const dateString = date.toDateString();
    const event = events.find(task => new Date(task.date).toDateString() === dateString);

    if (event) {
      return (
        <div style={{ position: 'absolute', width: '100%', left: '50%', margin: "0 0 0 -50%", top: '35px' }}>
          <div onClick={() => handleIconClick(event)} style={{ cursor: 'pointer' }}>
            <FavoriteIcon style={{ color: '#f8537b' }} />
          </div>
        </div>
      );
    }
    return null;
  };

  // 아이콘 클릭 시 이벤트 정보 설정
  const handleIconClick = (event) => {
    setSelectedEvent(event); // 선택된 이벤트를 직접 설정
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={tileContent} // 커스텀 타일 콘텐츠 추가
      />
      {selectedEvent && (
        <Card className='list_card' key={selectedEvent.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={selectedEvent.imageUrl} // 이미지 URL이 있는 경우
              alt={selectedEvent.title}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ margin: '0px' }}>
                {selectedEvent.date}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" style={{ margin: '0px 0 10px' }}>
                {selectedEvent.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ width: '90%', margin: 'auto', marginBottom: '10px' }}>
                {selectedEvent.content}<br />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}

export default MyCalendar;
