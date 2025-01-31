import React from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { showSnackbar } from './wrappers/Snackbar';
import { useLoader } from './wrappers/MuiLoader';
import axios from 'axios';
import endpoint from './config/endpoints';
import { axiosPoint } from './config/axios';
import useAuthContext from './hooks/use-context';

const OtpView = ({onClose}) => {
    const { showLoader, hideLoader } = useLoader();

    const userDetails = useAuthContext();

    const methods = useForm({
        defaultValues: { otp: '' }, 
    });

    const handleOtpVerification = async () => {
        try {
            showLoader();
            const response = await axios.post(endpoint([axiosPoint.USER, axiosPoint.verifyOtp]), {
                username:userDetails?.username ?? "",
                otp: methods.getValues("otp")
            });

            if (response.status === 400) {
                hideLoader();
                showSnackbar(response?.data, "error");
                return;
            }
            hideLoader();
            onClose();
            showSnackbar("OTP verified successfully!", "success");
        } catch (error) {
            hideLoader();
            showSnackbar(error?.response?.data || "Failed to verify OTP. Please try again.", "error");
        }
    };

    const renderOtpForm = (
        <Box sx={{ padding: 2, maxWidth: 400, margin: '0 auto' }}>
            <Grid container spacing={2} direction="column">
                {/* OTP Input Field */}
                <Grid item>
                    <TextField
                        label="Enter OTP"
                        variant="outlined"
                        {...methods.register("otp")}
                        required
                        fullWidth
                    />
                </Grid>

                {/* Submit Button */}
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleOtpVerification()}
                    >
                        Verify OTP
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <FormProvider {...methods}>
            {renderOtpForm}
        </FormProvider>
    );
};

export default React.memo(OtpView);
