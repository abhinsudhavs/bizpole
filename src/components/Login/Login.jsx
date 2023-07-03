import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Stack, TextField, Typography, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material'
import { useDispatch } from 'react-redux';


const Login = () => {

    const [user, setUser] = useState({ email: '', password: '', category: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
        category: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          category: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
         
          if (values.email === 'testuser@gmail.com' && values.password === 'testuser@2021') {
            navigate('/test', { state: { category: values.category } });
          } else {
            alert('Invalid email or password');
          }
        },
      });

const gotoSignup=()=>{
    navigate('/signup')
}

    return (
        <>
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{

            }}>
                <Stack sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: "center",
                    justifyContent: 'center',
                    width: '50%',
                    height: '100vh',
                    bgcolor: 'red',
                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 100%),url(./images/login-bg.jpeg), lightgray 50% / cover no-repeat",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}>
                    <Box component="img" src='./images/logo.png' />
                </Stack>
                <Stack alignItems={{ xs: 'center', md: 'center' }} justifyContent="center" sx={{
                    height: '100vh',
                    width: { xs: '100%', md: '50%' }
                }}>
                    <Stack sx={{
                        borderRadius: "20px",
                        background: "#FFF",
                        boxShadow: "0px 6px 60px 0px rgba(0, 0, 0, 0.08)",
                        alignItems: 'flex-start',
                        padding: '50px',
                        width: { xs: '90%', md: '60%' }
                    }}>
                        <Typography variant='h2' sx={{
                            color: "#282C40",
                            fontSize: "31.5px",
                            fontWeight: '700',
                        }}>Sign in</Typography>
                        <Stack component="form" sx={{ width: '100%', }} spacing={5} mt={5} onSubmit={formik.handleSubmit}>
                            <TextField variant='standard' label="Your Email" placeholder='Enter your email' fullWidth
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && formik.errors.email ? true : false}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField variant='standard' label="Password" placeholder='Enter Password'
                                fullWidth
                                id="password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && formik.errors.password ? true : false}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <FormControl variant="standard" fullWidth error={formik.touched.category && formik.errors.category ? true : false}>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="">Select Category</MenuItem>
                                    <MenuItem value="sports">Sports</MenuItem>
                                    <MenuItem value="arts">Arts</MenuItem>
                                    <MenuItem value="history">History</MenuItem>
                                    <MenuItem value="physics">Physics</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type="submit" variant='contained' disableElevation sx={{
                                fontWeight: '400',
                                fontSize: '14px',
                                color: '#fff',
                                textTransform: 'uppercase'
                            }}>Sign in</Button>
                        </Stack>
                        <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} alignItems={'center'} justifyContent={'center'} mt={4}>
                            <Typography variant='body1' sx={{
                                textAlign: 'center',
                                color: "rgba(130, 134, 154, 0.85)",
                            }}>Don't have an Account? </Typography>
                            <Typography onClick={gotoSignup} sx={{ color: "rgba(130, 134, 154, 0.85)", fontWeight: '600', cursor:'pointer' }}>Sign up</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default Login