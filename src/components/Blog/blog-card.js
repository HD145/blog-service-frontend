import React from 'react'
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

const BlogCard = ({ data }) => {
    return (
        <Card>
            {/* <CardContent> */}
            <Typography
                variant="h5"
                component="div"
                sx={{ borderBottom: '2px solid', display: 'inline-block', mb: 2 }}
            >
                {data?.title}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                    <CardMedia
                        component="img"
                        image="https://www.shutterstock.com/image-photo/nomad-work-concept-image-computer-600nw-359143844.jpg"
                        alt={data?.title}
                        sx={{
                            borderRadius: '50%',
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    <Typography variant="body1" color="text.secondary">
                        {data?.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <IconButton>
                            <FavoriteIcon color={data?.likedBy?.includes("hd") ? "error" : "inherit"} /> ~ {data?.likedBy.length}
                        </IconButton>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(data?.postedAt).toLocaleDateString('en-GB')}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* </CardContent> */}
            <Divider />
            <CardContent>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    Comments
                </Typography>
                {data?.comments.map((comment, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                        {comment?.text} ~ <strong>{comment?.author}</strong>
                    </Typography>
                ))}
                <Box mt={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Add a comment..."
                        size="small"
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                        Submit
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default BlogCard