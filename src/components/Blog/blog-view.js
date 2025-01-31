import React, { useEffect, useState } from 'react'
import { showSnackbar } from '../../common/wrappers/Snackbar'
import axios from 'axios'
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Grid, ButtonBase, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MuiModal from '../../common/wrappers/MuiModal';
import BlogCard from './blog-card';
import useAuthContext from '../../common/hooks/use-context';
import { axiosPoint } from '../../common/config/axios';
import endpoint from '../../common/config/endpoints';
import { useLoader } from '../../common/wrappers/MuiLoader';
import { useNavigate } from 'react-router-dom';

const BlogView = ({ userId = null,link=axiosPoint.userBlogs }) => {

    const [userBlogs, setUserBlogs] = useState(null)
    const [modalData, setModalData] = useState(null);

    const { showLoader, hideLoader } = useLoader();

    const userDetails = useAuthContext();
    const navigate = useNavigate();

    const loadUserBlogs = async () => {
        try {
            showLoader();
            const response = await axios.post(endpoint([axiosPoint.BLOG, link]), { username: userId ?? userDetails.username },
                { withCredentials: true }
            )
            setUserBlogs(response?.data ?? [])
            hideLoader();
            showSnackbar("Data Loaded Successfully.", "success");
            return;

        } catch (error) {
            hideLoader();
            console.log(error);
            
            showSnackbar(error?.response?.data, "error");
            return;
        }
    }

    useEffect(() => {
        loadUserBlogs();
    }, [userId])

    const handleOpenProfile = async (user) => {
        try {

            navigate(`/profile/${user}`)
        } catch (error) {
            hideLoader();
            showSnackbar(error?.response?.data, "error");
            return;
        }
    }

    return (
        <>
            <Grid container spacing={1}>
                {userBlogs?.map((card) => (
                    <Grid item xs={6} sm={4} md={3} key={card._id}>

                        <Card sx={{ maxWidth: 200, margin: 'auto', width: '100%' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://www.shutterstock.com/image-photo/nomad-work-concept-image-computer-600nw-359143844.jpg"
                                alt={card.title}
                                sx={{
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                    margin: 'auto',
                                    mt: 1,
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" align="center">
                                    {card.title}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <IconButton>
                                        {card.likes > 0 ? (
                                            <FavoriteIcon color="error" />
                                        ) : (
                                            <FavoriteBorderIcon />
                                        )}
                                    </IconButton>
                                    <Typography variant="body2">{card.likes}</Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Typography variant="body2" color="textSecondary" align="right">
                                        {new Date(card?.postedAt).toLocaleDateString('en-GB')}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                                <Button onClick={() => setModalData(card)}>Read</Button>
                                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right', cursor: 'pointer' }}
                                    onClick={() => handleOpenProfile(card?.username)}>
                                    {card?.username}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <MuiModal maxWidth="lg" open={modalData !== null} handleClose={() => setModalData(null)} component={<BlogCard data={modalData} />} />

        </>
    )
}

export default BlogView