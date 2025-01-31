import React, { createContext, useState, useContext, useCallback } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoaderContext = createContext();

export const MuiLoader = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoader = useCallback(() => setLoading(true), []);
    const hideLoader = useCallback(() => setLoading(false), []);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}
            <Backdrop
                // sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                sx={{
                    color: '#fff',
                    zIndex: 1000, // Default zIndex for the loader
                }}
                open={loading}
            >
                <CircularProgress sx={{ color: 'blue' }} color="inherit" />
            </Backdrop>
        </LoaderContext.Provider>
    );
};

// Hook to use loader functions
export const useLoader = () => useContext(LoaderContext);
