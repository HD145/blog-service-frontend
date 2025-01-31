import React, { useMemo } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { showSnackbar } from '../../common/wrappers/Snackbar';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../common/hooks/use-context';
import endpoint from '../../common/config/endpoints';
import { axiosPoint } from '../../common/config/axios';
import { useLoader } from '../../common/wrappers/MuiLoader';

const BlogPost = () => {

    const navigate = useNavigate();
    const {showLoader, hideLoader} = useLoader();

    const userDetails = useAuthContext();

    const defaultValues = useMemo(() => ({
        title: '',
        description: ''
    }), []);

    const methods = useForm({
        defaultValues
    });

    const handlePost = async () => {
        try {
            showLoader();
            const response = await axios.post(endpoint([axiosPoint.BLOG, axiosPoint.post]), {
                title: methods.getValues("title"),
                description: methods.getValues("description"),
                username: userDetails?.username
            }, {withCredentials:true})
            showSnackbar("Blog posted sucessfully.", "success");
            navigate("/blogs")
        } catch (error) {
            hideLoader();
            showSnackbar(error?.response?.data, "error");
            return;
        }
    }
    const renderForm = (
        <Box
            sx={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" component="h1" align="center" gutterBottom>
                Create a Blog Post
            </Typography>

            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                {...methods.register("title")}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                {...methods.register("description")}
                sx={{ mb: 2 }}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={() => handlePost()}
                sx={{
                    alignSelf: 'center',
                    width: '50%',
                    padding: 1,
                }}
            >
                Post
            </Button>
        </Box>
    )
    return (
        <FormProvider methods={methods}>
            {renderForm}
        </FormProvider>
    )
}

export default BlogPost