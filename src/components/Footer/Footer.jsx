import React from 'react'
import { Typography, AppBar, Box, Toolbar, Menu, Container, Button, Tooltip, MenuItem, IconButton, Stack } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <Container maxWidth="xl" sx={{
            // position: "absolute",
            bottom: 0,
            width: "100%",
            height: "60px",
            // background: "#6cf",
            borderTop: '1px solid #cecece',
            paddingTop: 2,
            marginTop: 10
        }}>

            <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <Box component="img" src="./images/logo-color.png" sx={{
                    width: { xs: "70px", md: '140px' },
                    display: { xs: 'flex', md: 'flex' },
                    paddingTop: 2
                }} />

                <Stack direction={"row"} spacing={4}>
                    <FacebookOutlinedIcon sx={{ color: "hsla(0, 0%, 38%, 1)" }} />
                    <TwitterIcon sx={{ color: "hsla(0, 0%, 38%, 1)" }} />
                    <YouTubeIcon sx={{ color: "hsla(0, 0%, 38%, 1)" }} />
                    <InstagramIcon sx={{ color: "hsla(0, 0%, 38%, 1)" }} />
                </Stack>

            </Stack>
            <Stack alignItems={'center'} justifyContent={'center'} direction={{ xs: "column", md: "row" }} spacing={{ xs: 1, md: 2 }} mt={2} pt={2} pb={2}>
                <Typography variant='body1' sx={{ color: "#626262", fontSize: '14px' }}> © Copyright Clinical Scholar </Typography>
                <Typography variant='body1' sx={{ color: "#626262", fontSize: '14px', display: { xs: 'none', md: 'flex' } }}> | </Typography>
                <Typography variant='body1' sx={{ color: "#626262", fontSize: '14px' }}> Powered by Quinoid Buisness Solutions </Typography>
            </Stack>

        </Container>
    )
}

export default Footer