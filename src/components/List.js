import '../CSS/List.scoped.css';
import { ref, onValue, remove  } from "firebase/database";
import { db } from "../firebase";
import { useState, useEffect } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete'; 
import Button from '@mui/material/Button'; 
import EditIcon from '@mui/icons-material/Edit';

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

  const removeData = (id) => {
    const taskRef = ref(db, `dday/${id}`);
    remove(taskRef)
      .then(() => {
        console.log('삭제 완료');
      })
      .catch((error) => {
        console.error('삭제 중 오류 발생:', error);
      });
  };

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
          <Box  className='delete'>
            <Button>
            <DeleteIcon onClick={() => removeData(task.id)}  fontSize="large"/> 
            </Button>
            <Button component={Link} to={`/ddayedit`} className='edit'>
            <EditIcon fontSize="large"/> 
            </Button>
          </Box>
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
