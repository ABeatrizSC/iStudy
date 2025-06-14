'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/resources/assets/styles/Theme';
import { Button, CustomLink, FieldError } from '@/components';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { formScheme, RegisterForm, validationScheme } from "./formScheme";
import { useFormik } from "formik";
import { User } from '@/resources/services/auth-user/user.resource';
import { ToastContainer } from 'react-toastify';
import { useRegister } from '@/hooks/auth-user/useRegister';
import { PATH } from '@/constants/path';

export default function Register() {
  const useUserRegister = useRegister();

  const formik = useFormik<RegisterForm>({
    initialValues: formScheme,
    validationSchema: validationScheme,
    onSubmit: onSubmit
  });

  async function onSubmit(values: RegisterForm) {
    const newUser: User = { name: values.name, email: values.email, password: values.password }

    useUserRegister.mutate(newUser);
    resetForm(values);
  }

  const resetForm = (values: RegisterForm) => {
    values.name = '';
    values.email = '';
    values.password = '';
    values.passwordMatch = '';
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
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoComplete="name"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      },
                    },
                  }}
                />
                <FieldError error={formik.errors.name} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  required
                  fullWidth
                  label="E-mail"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      },
                    },
                  }}
                />
                <FieldError error={formik.errors.email}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  required
                  fullWidth
                  type="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      },
                    },
                  }}
                />
                <FieldError error={formik.errors.password}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="passwordMatch"
                  name="passwordMatch"
                  label="Password confirm"
                  type="password"
                  required
                  fullWidth
                  autoComplete="passwordMatch"
                  value={formik.values.passwordMatch}
                  onChange={formik.handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      },
                    },
                  }}
                />
                <FieldError error={formik.errors.passwordMatch}/>
              </Grid>
            </Grid>
            <Button label='Create account' type='submit'/>
            <Grid container justifyContent="center">
                <CustomLink href={PATH.LOGIN}>
                    Already have an account? Login
                </CustomLink>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer position='bottom-right' />
    </ThemeProvider>
  );
}