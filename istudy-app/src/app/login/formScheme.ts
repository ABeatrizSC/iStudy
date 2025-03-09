import * as Yup from 'yup'

export interface LoginForm {
    email: string;
    password: string;
}

export const validationScheme  = Yup.object().shape({
    email: Yup.string().trim().required('Email is required!').email('Invalid Email!'),
    password: Yup.string().required('Password is required').min(7, 'Password must have at least 7 characters!').max(8, 'Password must have up to 8 characters!')
})

export const formScheme: LoginForm = { email: '', password: '' }