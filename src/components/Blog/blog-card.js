import React, { useEffect, useMemo, useState } from 'react'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Divider,
    Grid,
    TextField,
    Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { axiosPoint } from '../../common/config/axios';
import endpoint from '../../common/config/endpoints';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { showSnackbar } from '../../common/wrappers/Snackbar';
import useAuthContext from '../../common/hooks/use-context';
import { useLoader } from '../../common/wrappers/MuiLoader';

const BlogCard = ({ data }) => {

    const userDetails = useAuthContext();
    const { showLoader, hideLoader } = useLoader();

    const [blogData, setBlogData] = useState(null)
    const defaultValues = useMemo(() => ({
        comment: ''
    }), []);

    const methods = useForm({
        defaultValues
    });

    const loadBlogData = async (id) => {
        try {
            showLoader();
            const response = await axios.get(endpoint([axiosPoint.BLOG, id]), {withCredentials:true})
            console.log(response);
            setBlogData(response?.data ?? {})
            hideLoader();
        } catch (error) {
            showSnackbar(error?.response?.data, "error");
            return;
        }
    }
    useEffect(() => {
        loadBlogData(data._id)
    }, [])
    const handlePostComment = async () => {
        try {
            showLoader();
            const response = await axios.post(endpoint([axiosPoint.BLOG, axiosPoint.comment, data._id]), {
                userId: userDetails?.username,
                text: methods.getValues("comment"),
            }, {withCredentials:true})
            loadBlogData(data._id)
            showSnackbar("Comment posted.", "success");
        } catch (error) {
            hideLoader();
            showSnackbar(error?.response?.data, "error");
            return;
        }
    }

    const renderForm = (
        <Card>
            {/* <CardContent> */}
            <Typography
                variant="h5"
                component="div"
                sx={{ borderBottom: '2px solid', display: 'inline-block', mb: 2 }}
            >
                {blogData?.title}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                    <CardMedia
                        component="img"
                        image="https://www.shutterstock.com/image-photo/nomad-work-concept-image-computer-600nw-359143844.jpg"
                        alt={blogData?.title}
                        sx={{
                            borderRadius: '50%',
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    <Typography variant="body1" color="text.secondary">
                        {blogData?.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <IconButton>
                            <FavoriteIcon color={blogData?.likedBy?.includes("hd") ? "error" : "inherit"} /> ~ {blogData ? blogData?.likedBy?.length : 0}
                        </IconButton>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(blogData?.postedAt).toLocaleDateString('en-GB')}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* </CardContent> */}
            <Divider />
            <CardContent>
                <Box mt={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Add a comment..."
                        size="small"
                        {...methods.register("comment")}
                    />
                    <Button onClick={() => handlePostComment()} variant="contained" color="primary" sx={{ mt: 1 }}>
                        Comment
                    </Button>
                </Box>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    Comments
                </Typography>
                {blogData && blogData?.comments.length && [...blogData?.comments].reverse()?.map((comment, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                        {comment?.text} ~ <strong>{comment?.author}</strong>
                    </Typography>
                ))}

            </CardContent>
        </Card>
    )
    return (
        <FormProvider methods={methods}>
            {renderForm}
        </FormProvider>
    );
}

export default BlogCard