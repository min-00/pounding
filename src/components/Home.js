import React from 'react'
import '../CSS/Home.scoped.css'

//MUI
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function Home() {

  return (
    <div>
      <div className='dday'>
        <div className='img_wrap'>
          <img src="./IMAGE/Home/poster2.jpg" alt="" />
        </div>
        <h2>D-DAY</h2>
        <p>그랜드 민트 페스티벌</p>
        <div className='button_wrap'>
          <Stack spacing={2} direction="row">
            <Button variant="contained">체크리스트</Button>
            <Button variant="contained">일기남기기</Button>
          </Stack>
        </div>
      </div>

      <div className='weather'>
        <div className='weather_wrap'>
        <h3>강남구</h3>
        <h3>30℃</h3>
        </div>
        <div className='weather_wrap'>
        <h3>맑음</h3>
        <h3>{<WbSunnyIcon />}</h3>
        </div>
      </div>

      <Box className="floating">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </div>
  )
}

export default Home