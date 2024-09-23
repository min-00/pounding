import '../CSS/List.scoped.css';
import { ref, child, get } from "firebase/database";
import { db } from "../firebase";
import { useState, useEffect } from 'react';
import { onValue } from "firebase/database";
import { Link } from 'react-router-dom';

// MUI
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function List() {
  const [tasks, setTasks] = useState([]);

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

      // 날짜를 기준으로 내림차순 정렬
      taskList.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTasks(taskList);
    });
  }, []);

  // 삭제
  // const removeData = () => {
  //   remove(ref(db, "/test/0e24bcf6769"));
  // };

  return (
    <div>
      <div className='top_menu'>
        <Stack direction="row">
          <div className='Chip_menu'>
            <Chip variant="outlined" size="middle" icon={<FaceIcon />} label="여행" />
            <Chip variant="outlined" size="middle" icon={<FaceIcon />} label="콘서트" />
            <Chip variant="outlined" size="middle" icon={<FaceIcon />} label="뮤지컬" />
          </div>
          <CalendarTodayIcon />
        </Stack>
      </div>

      {tasks.map(task => (
        <Card className='list_card' key={task.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={task.imageUrl}
              alt={task.title}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ margin: '0px' }}>
                {task.date}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" style={{ margin: '0px 0 10px' }}>
                {task.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ width: '90%', margin: 'auto', marginBottom: '10px' }}>
                {task.content}<br />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      <Box className="floating" to='/ddayadd' component={Link}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
}

export default List;
