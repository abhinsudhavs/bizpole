import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Stack,
    TextField,
    Typography,
    Button,
} from '@mui/material';

const SignUp = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            localStorage.setItem('user', JSON.stringify(values));
            navigate('/');
        },
    });

    return (
        <>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                sx={{}}
            >
                <Stack sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: "center",
                    justifyContent: 'center',
                    width: '50%',
                    height: '100vh',
                    bgcolor: 'red',
                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 100%),url(./images/regimg.jpeg), lightgray 50% / cover no-repeat",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}>
                    <Box component="img" src='./images/logoreg.png' />
                </Stack>
                <Stack
                    alignItems={{ xs: 'center', md: 'center' }}
                    justifyContent="center"
                    sx={{
                        height: '100vh',
                        width: { xs: '100%', md: '50%' },
                    }}
                >
                    <Stack
                        sx={{
                            borderRadius: '20px',
                            background: '#FFF',
                            boxShadow: '0px 6px 60px 0px rgba(0, 0, 0, 0.08)',
                            alignItems: 'flex-start',
                            padding: '50px',
                            width: { xs: '90%', md: '60%' },
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                color: '#282C40',
                                fontSize: '31.5px',
                                fontWeight: '700',
                            }}
                        >
                            Registration
                        </Typography>
                        <Stack
                            component="form"
                            sx={{ width: '100%' }}
                            spacing={5}
                            mt={5}
                            onSubmit={formik.handleSubmit}
                        >
                            <TextField
                                variant="standard"
                                label="Your Email"
                                placeholder="Enter your email"
                                fullWidth
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && formik.errors.email ? true : false}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                variant="standard"
                                label="Password"
                                placeholder="Enter Password"
                                fullWidth
                                id="password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && formik.errors.password ? true : false}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <TextField
                                variant="standard"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                        ? true
                                        : false
                                }
                                helperText={
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                }
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disableElevation
                                sx={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Register
                            </Button>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ width: '100%' }}
                            alignItems="center"
                            justifyContent="center"
                            mt={4}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: 'center',
                                    color: 'rgba(130, 134, 154, 0.85)',
                                }}
                            >
                                Already have an account?{' '}
                            </Typography>
                            <Typography
                                onClick={() => navigate('/')}
                                sx={{ color: 'rgba(130, 134, 154, 0.85)', fontWeight: '600', cursor: 'pointer' }}
                            >
                                Sign in
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};

export default SignUp;
