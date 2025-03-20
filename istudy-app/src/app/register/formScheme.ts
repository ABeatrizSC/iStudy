import * as Yup from 'yup'

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

export const validationScheme  = Yup.object().shape({
    name: Yup.string().trim().required('Name is required!'),
    email: Yup.string().trim().required('Email is required!').email('Invalid Email!'),
    password: Yup.string().required('Password is required').min(7, 'Password must have at least 7 characters!').max(8, 'Password must have up to 8 characters!'),
    passwordMatch: Yup.string().oneOf( [Yup.ref('password')], 'Password must match!' )
})

export const formScheme: RegisterForm = { email: '', name: '', password: '', passwordMatch: '' }