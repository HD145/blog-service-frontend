import { Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MuiModal from '../../common/wrappers/MuiModal';
import BlogPost from '../Blog/blog-post';

const images = [
  'https://as2.ftcdn.net/v2/jpg/06/03/32/23/1000_F_603322356_pu1dWL25pMy8xhgqrVloNM7udCGOgG9S.jpg',
  'https://www.shutterstock.com/image-vector/speak-on-speech-bubble-260nw-2495008449.jpg',
];

const HomeView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [postBlog, setPostBlog] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <Box
          component="img"
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          sx={{ width: '100%', height: 'auto' }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={()=>setPostBlog(true)}>
            Post
          </Button>
        </Box>
      </Box>

      <MuiModal maxWidth="md" open={postBlog} handleClose={() => setPostBlog(false)} component={<BlogPost/>} />

    </Box>
  );
};

export default HomeView;
