'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/resources/assets/styles/Theme';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {Button, CustomLink, FieldError } from '@/components';
import { formScheme, LoginForm, validationScheme } from "./formScheme";
import { useFormik } from "formik";
import { UserCredentials } from '@/resources/services/auth-user/user.resource';
import { ToastContainer } from 'react-toastify';
import { useLogin } from '@/hooks/auth-user/useLogin';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const useUserLogin = useLogin();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik<LoginForm>({
    initialValues: formScheme,
    validationSchema: validationScheme,
    onSubmit: onSubmit
  });

  async function onSubmit(values: LoginForm) {
    const user: UserCredentials = { email: values.email, password: values.password };

    useUserLogin.mutate(user);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}
          >
            <div className='w-full'>
              <TextField
                id="email"
                label="E-mail"
                margin="normal"
                required
                fullWidth
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                color="primary"
                sx={{
                  mb: 0,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                  },
                }}
              />
              <FieldError error={formik.errors.email} />
            </div>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                sx={{
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  }}
    
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="show/hide Passowrd"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility color="primary" /> : <VisibilityOff color="primary" />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Passowrd"
              />
              <FieldError error={formik.errors.password} />
            </FormControl>
            <Button label="Login" type="submit" />
            <Grid container justifyContent="center">
                <CustomLink href='/register'>
                  Don't have an account yet? Sign Up
                </CustomLink>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer position='bottom-right' />
    </ThemeProvider>
  );
}