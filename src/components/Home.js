import React, { useEffect, useState } from 'react';
import '../CSS/Home.scoped.css';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import Weather from './Weather';

// MUI
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function Home() {
  const [latestTask, setLatestTask] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const tasksRef = ref(db, 'dday/'); // 데이터 경로 설정

    // 데이터 읽기
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const taskList = [];

      if (data) {
        for (let id in data) {
          taskList.push({ id, ...data[id] }); // id와 데이터 합치기
        }
      }

      const today = new Date();
      const upcomingTasks = taskList.filter(task => new Date(task.date) >= today);

      // 최근 데이터 불러오기
      if (upcomingTasks.length > 0) {
        const sortedTasks = upcomingTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        const latest = sortedTasks[0];
        setLatestTask(latest);

        // 디데이
        const dday = new Date(latest.date) - today;
        setDaysLeft(Math.ceil(dday / (1000 * 60 * 60 * 24))); // 남은 일수
      }
    });
  }, []);

  return (
    <div>
      <div className='dday'>
        <div className='img_wrap'>
          {latestTask ? (
            <img src={latestTask.imageUrl} alt={latestTask.title} />
          ) : (
            <img src="./IMAGE/Home/heart.png" alt="Default" />
          )}
        </div>
        <h2>{daysLeft === 0 ? ( // 당일인 경우
          <p>D-DAY</p>
        ) : (
          <p>{daysLeft > 0 ? `D-${daysLeft}` : `D+${Math.abs(daysLeft)}`}</p>
        )}</h2>
        {latestTask ? (
          <>
            <h3>{latestTask.title}</h3>
            <p>{latestTask.date}</p>
          </>
        ) : (
          <p>등록된 D-day가 없습니다.</p>
        )}
      </div>

      {<Weather />}
   
      <Box className="floating" to='/ddayadd' component={Link}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
}

export default Home;
