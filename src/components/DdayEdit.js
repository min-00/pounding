import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import '../CSS/DdayAdd.scoped.css';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function DdayEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await get(ref(db, `dday/${id}`));
            if (snapshot.exists()) {
                const data = snapshot.val();
                setDate(data.date);
                setTitle(data.title);
                setContent(data.content);
                setImageUrl(data.imageUrl);
            }
        };
        fetchData();
    }, [id]);

    const handleDateChange = e => setDate(e.target.value);
    const handleTitleChange = e => setTitle(e.target.value);
    const handleContentChange = e => setContent(e.target.value);
    const handleImageChange = e => setImage(e.target.files[0]);

    const updateData = async () => {
        if (!date || !title || !content) {
            alert("모든 칸을 입력해주세요.");
            return;
        }

        let newImageUrl = imageUrl;

        if (image) {
            const storage = getStorage();
            const imageRef = storageRef(storage, `images/${id}_${image.name}`);
            await uploadBytes(imageRef, image);
            newImageUrl = await getDownloadURL(imageRef);
        }

        await update(ref(db, `dday/${id}`), {
            date,
            title,
            content,
            imageUrl: newImageUrl
        });

        navigate(-1);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton size="large" edge="start" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
                            <ArrowBackIosIcon fontSize='small' />
                        </IconButton>
                        <Typography component="div" sx={{ flexGrow: 1 }}>
                            수정하기
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box component="form" autoComplete="off" className='dday_form'>
                <Typography className='form_title' align="left">디데이 날짜</Typography>
                <TextField type="date" value={date} onChange={handleDateChange} />

                <Typography className='form_title' align="left">디데이 제목</Typography>
                <TextField type="text" value={title} onChange={handleTitleChange} />

                <Typography className='form_title' align="left">메모</Typography>
                <TextField type="text" value={content} onChange={handleContentChange} />

                <TextField type="file" accept="image/*" onChange={handleImageChange} />

                <Button onClick={updateData} variant="contained" className='sm_btn'>
                    디데이 수정하기
                </Button>
            </Box>
        </div>
    );
}

export default DdayEdit;
