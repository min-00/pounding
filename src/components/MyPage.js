import React from 'react'
import '../CSS/MyPage.scoped.css'

//MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

function MyPage() {
  return (
    <div>
      <div className='id_card'>
        <div className='profile'>
          <Avatar src="/broken-image.jpg" className='avatar' />
          <h4>홍길동</h4>
        </div>
        <Button variant="contained" className='button'>로그아웃</Button>
      </div>

      <Box className="menu_list">

        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="비밀번호 재설정" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="자주 묻는 질문" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="회원 탈퇴" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="로그아웃" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </div>
  )
}

export default MyPage