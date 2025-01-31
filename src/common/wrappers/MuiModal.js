import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = (maxWidth) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: maxWidth,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  position: 'relative',
  maxHeight: '75vh', // Add a maximum height for the modal
  overflowY: 'auto', // Enable vertical scrolling if content overflows
});

export default function MuiModal({ open, handleClose, component, maxWidth, ...props }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        {...props}
        sx={{ zIndex: 200 }} // Lower than the loader's zIndex
      >
        <Box sx={style(maxWidth)}>
          {/* Close Button at the top-right corner */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Render the passed component */}
          {component}
        </Box>
      </Modal>
    </div>
  );
}
