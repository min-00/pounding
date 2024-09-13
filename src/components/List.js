import '../CSS/List.scoped.css'

//MUI
import React from 'react'
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
  return (
    <div>
      <div className='top_menu'>
        <Stack direction="row" >
          <div className='Chip_menu'>
          <Chip variant="outlined" size="middle" icon={<FaceIcon />} label="여행" />
          <Chip variant="outlined" size="middle" icon={<FaceIcon />} label="콘서트" />
          <Chip variant="outlined" size="middle" icon={<FaceIcon />} label="뮤지컬" />
          </div>
        <CalendarTodayIcon/>
        </Stack>
      </div>


      <Card className='list_card'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="./IMAGE/Home/poster.gif"
            alt="그린민트페스티벌"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              그린민트페스티벌 2024
            </Typography>
            <Typography className='content' variant="body2" sx={{ color: 'text.secondary' }}>
              이번 그민페 포스터 디자인 개구림. 엠피엠지 디자이너 퇴사했나? 아직 페스티벌 시작도 멀었으니 일단 말 그만할게...
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card className='list_card'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="./IMAGE/Home/poster2.jpg"
            alt="그린민트페스티벌"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              그린민트페스티벌 2023
            </Typography>
            <Typography variant="body2" className='content' sx={{ color: 'text.secondary' }}>
              오늘은 정말 특별한 날이었다. 그린민트페스티벌에서 하현상의 공연을 실제로 보다니. 예전부터 노래듣기를 좋아했는데, 이렇게 직접 라이브로 보는 건 처음이라서 많이 기대됨!!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card className='list_card'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="./IMAGE/Home/poster3.jpg"
            alt="데이식스 콘서트"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              DAY6 CONCERT〈Welcome to the Show〉
            </Typography>
            <Typography variant="body2" className='content' sx={{ color: 'text.secondary' }}>
            데이식스 콘서트 장소 도착했는데, 이미 팬들이 너무 많았음. 엠디줄 기다리다가 힘들어서 포기함. 대신 기다리다가 다른 사람들이랑 이야기하는 건 재밌었으니 ㅇㅋ.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Box className="floating">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </div>
  )
}

export default List