import React from 'react'
import { Typography, AppBar, Box, Toolbar, Menu, Container, Button, Tooltip, MenuItem, IconButton, Stack } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useLocation, useNavigate } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {
    const location = useLocation();
    const { category } = location.state;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="static" sx={{
                bgcolor: '#fff'
            }}>
                <Container maxWidth="xl">
                    <Toolbar  disableGutters>

                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{width:'100%'}}>
                            <Box component="img" src="./images/logo-color.png" sx={{
                                width: {xs:"70px", md:'140px'},
                                display: { xs: 'flex', md: 'flex' }
                            }} />
                            <Box>
                                <Typography variant='body1' sx={{
                                    color:'#333',
                                    textTransform:'uppercase',
                                    fontSize:{xs:"12px", md:'18px'},
                                    fontWeight:'600'
                                }}>
                                EXAM CATEGORY: {category}
                                </Typography>
                           
                            </Box>
                            <Stack flexDirection="row">
                            <NotificationsNoneIcon sx={{ color: '#000' }} />
                            <ArrowDropDownIcon sx={{ color: '#000' }} />
                        </Stack>
                        </Stack>


                       
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default NavBar