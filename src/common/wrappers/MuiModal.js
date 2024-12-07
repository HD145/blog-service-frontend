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
  width: '100%', // Set width to 100% to allow maxWidth to take effect
  maxWidth: maxWidth, // Use maxWidth passed as a prop
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  position: 'relative', // Needed for absolute positioning of close button
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
