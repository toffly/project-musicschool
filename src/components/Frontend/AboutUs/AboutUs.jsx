import React from 'react'
import AboutUs1 from './AboutUs1.jsx/AboutUs1'
import AboutUs2 from './AboutUs2.jsx/AboutUs2'
import AboutUs3 from './AboutUs3.jsx/AboutUs3'
import { Container } from '@mui/material';


const AboutUs = () => {
  return (
    <Container maxWidth="xl" sx={{display: 'flex',flexDirection: 'column', gap: '2rem'}}>
      <AboutUs1/>
      <AboutUs2/>
    </Container>
  )
}

export default AboutUs