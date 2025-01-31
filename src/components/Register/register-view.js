import React, { useMemo } from 'react'
import { TextField, Button, Grid, Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { showSnackbar } from '../../common/wrappers/Snackbar';
import { useNavigate } from 'react-router-dom';
import endpoint from '../../common/config/endpoints';
import { axiosPoint } from '../../common/config/axios';
import { useLoader } from '../../common/wrappers/MuiLoader';
import GoogleLogin from '../../common/wrappers/GoogleLogin';

const RegisterView = () => {

    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    const defaultValues = useMemo(() => ({
        email: '',
        username: '',
        password: ''
    }), []);

    const methods = useForm({
        defaultValues
    });

    const handleRegister = async () => {

        try {
            showLoader();
            const response = await axios.post(endpoint([axiosPoint.USER, axiosPoint.register]), {
                "email": methods.getValues("email"),
                "username": methods.getValues("username"),
                "password": methods.getValues("password")
            });

            if (response.status === 400) {
                hideLoader();
                showSnackbar(response?.data, "error");
                return;
            }
            hideLoader();
            showSnackbar("Used registered successfully. Please login with your credentials.", "success");
            navigate("/login")
            return null;
        } catch (error) {
            hideLoader();
            showSnackbar(error?.response?.data, "error");
            return;
        }
    }

    const renderForm = (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
                {/* Left Side - Image */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src="https://cdn.pixabay.com/photo/2015/11/06/13/25/blog-1027861_640.jpg"
                            alt="Placeholder"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </Box>
                </Grid>

                {/* Right Side - Form */}
                <Grid item xs={12} md={6}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                label="Email"
                                variant="outlined"
                                {...methods.register("email")}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Username"
                                variant="outlined"
                                {...methods.register("username")}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                {...methods.register("password")}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" fullWidth onClick={() => handleRegister()}>
                                Submit
                            </Button>
                        </Grid>
                        <Grid item>

                            <GoogleLogin/>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
    return (
        <FormProvider methods={methods}>
            {renderForm}
        </FormProvider>

    )
}

export default React.memo(RegisterView)