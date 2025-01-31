import { Button } from '@mui/material'
import React from 'react'

const GoogleLogin = () => {
    const handleGoogleLogin = async () => {
        window.location.href = 'http://localhost:5000/auth/google';
    };
    return (
        <>
            <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
                Sign in with Google
            </Button>
        </>
    )
}

export default GoogleLogin