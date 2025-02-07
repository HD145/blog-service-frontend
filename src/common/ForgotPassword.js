import React from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import axios from 'axios';
import { axiosPoint } from './config/axios';
import endpoint from './config/endpoints';
import { showSnackbar } from './wrappers/Snackbar';
import { useLoader } from './wrappers/MuiLoader';
import useAuthContext from './hooks/use-context';


const ForgotPassword = ({ onClose }) => {
    const { showLoader, hideLoader } = useLoader();
    const userDetails = useAuthContext();

    const methods = useForm({
        defaultValues: { password: '', confirmPassword: '' },
    });

    const handlePasswordUpdate = async () => {
        const { password, confirmPassword } = methods.getValues();

        if (password !== confirmPassword) {
            showSnackbar("Passwords do not match. Please try again.", "error");
            return;
        }

        try {
            showLoader();
            const response = await axios.post(endpoint([axiosPoint.USER, axiosPoint.updatePassword]), {
                newPassword:password,
                username:userDetails?.username
            });

            if (response.status === 400) {
                hideLoader();
                showSnackbar(response?.data, "error");
                return;
            }
            hideLoader();
            onClose();
            showSnackbar("Password updated successfully!", "success");
        } catch (error) {
            hideLoader();
            showSnackbar(error?.response?.data || "Failed to update password. Please try again.", "error");
        }
    };

    const renderPasswordUpdateForm = (
        <Box sx={{ padding: 2, maxWidth: 400, margin: '0 auto' }}>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        {...methods.register("password")}
                        required
                        fullWidth
                    />
                </Grid>

                <Grid item>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        {...methods.register("confirmPassword")}
                        required
                        fullWidth
                    />
                </Grid>

                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handlePasswordUpdate()}
                    >
                        Update Password
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <FormProvider {...methods}>
            {renderPasswordUpdateForm}
        </FormProvider>
    );
};

export default React.memo(ForgotPassword);
