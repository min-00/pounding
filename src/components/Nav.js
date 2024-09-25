import React from 'react'

// MUI
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Nav() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ width: 1, position: 'fixed', bottom: 0, left: 0, right: 0 }} >
            <BottomNavigation
                className='nav_color'
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="홈" icon={<HomeIcon />} to='/'  component={Link}/>
                <BottomNavigationAction label="캘린더" icon={<EventAvailableIcon />} to='/mycalendar'  component={Link}/>
                <BottomNavigationAction label="리스트" icon={<ChecklistIcon />} to='/list'  component={Link}/>
                <BottomNavigationAction label="마이페이지" icon={<AccountCircleIcon />} to='/mypage'  component={Link}/>
            </BottomNavigation>
        </Box>
    )
}

export default Nav