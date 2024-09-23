import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { uid } from 'uid';
import { db } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../CSS/DdayAdd.scoped.css';
import { useNavigate } from 'react-router-dom';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function DdayAdd() {
    // 뒤로가기
    const navigate = useNavigate();
    const back = () => {
        navigate(-1);
    };

    // 데이터 쓰기
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const handleDateChange = e => {
        setDate(e.target.value);
    };
    const handleTitleChange = e => {
        setTitle(e.target.value);
    };
    const handleContentChange = e => {
        setContent(e.target.value);
    };
    const handleImageChange = e => {
        setImage(e.target.files[0]);
    };

    const writeData = async () => {
        // 유효성 검사
        if (!date || !title || !content || !image) {
            alert("모든 칸을 입력해주세요.");
            return;
        }

        const uuid = uid();
        let imageUrl = "";

        // 이미지 업로드
        if (image) {
            const storage = getStorage();
            const imageRef = storageRef(storage, `images/${uuid}_${image.name}`);
            await uploadBytes(imageRef, image);
            imageUrl = await getDownloadURL(imageRef);
        }

        // 데이터 저장
        await set(ref(db, "dday/" + uuid), {
            uuid,
            date,
            title,
            content,
            imageUrl 
        });

        // 입력 초기화
        setDate("");
        setTitle("");
        setContent("");
        setImage(null);

        // 제출 후 원래 페이지로 돌아가기
        navigate(-1);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton size="large" edge="start" sx={{ mr: 2 }}>
                            <ArrowBackIosIcon fontSize='small' onClick={back} />
                        </IconButton>
                        <Typography component="div" sx={{ flexGrow: 1 }}>
                            등록하기
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box
                component="form"
                autoComplete="off"
                className='dday_form'
            >
                <Typography className='form_title' align="left">
                    디데이 날짜
                </Typography>
                <TextField
                    type="date"
                    placeholder="디데이 날짜"
                    value={date}
                    onChange={handleDateChange}
                />

                <Typography className='form_title' align="left">
                    디데이 제목
                </Typography>
                <TextField
                    type="text"
                    placeholder="제목입력"
                    value={title}
                    onChange={handleTitleChange}
                />

                <Typography className='form_title' align="left">
                    메모
                </Typography>
                <TextField
                    type="text"
                    value={content}
                    onChange={handleContentChange}
                />

                <TextField
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <Button onClick={writeData} variant="contained" className='sm_btn'>
                    디데이 등록하기
                </Button>
            </Box>
        </div>
    );
}

export default DdayAdd;
