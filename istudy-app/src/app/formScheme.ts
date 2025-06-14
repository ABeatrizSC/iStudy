import * as Yup from 'yup';

export interface AccountSettingsForm {
  name: string;
  email: string;
  password: string;
  newPassword?: string;
}

export const validationScheme = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required!'),
  email: Yup.string()
    .trim()
    .required('Email is required!')
    .email('Invalid Email!'),
  password: Yup.string()
    .required('Password is required')
    .min(7, 'Password must have at least 7 characters!')
    .max(8, 'Password must have up to 8 characters!'),
  newPassword: Yup.string()
    .trim()
    .min(7, 'New password must have at least 7 characters!')
    .max(8, 'New password must have up to 8 characters!')
    .notRequired(),
});
