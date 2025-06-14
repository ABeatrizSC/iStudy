'use client';

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { AccountDetails, UpdateAccount } from '@/resources/services/auth-user/user.resource';
import { useDeleteAccount } from '@/hooks/auth-user/useDeleteAccount';
import { Button, ConfirmationModal, FieldError } from '../';
import { useUpdateAccount } from '@/hooks/auth-user/useUpdateAccount';
import { useFormik } from 'formik';
import { AccountSettingsForm, validationScheme } from '@/app/formScheme';

interface UserAccountSettingsModalProps {
  userData: AccountDetails | undefined;
  open: boolean;
  handleClose: () => void;
}

export const UserAccountSettingsModal: React.FC<UserAccountSettingsModalProps> = ({
  userData = { email: '', name: '' },
  open,
  handleClose,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [deleteAccountPassword, setDeleteAccountPassword] = useState('');
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const updateAccount = useUpdateAccount();
  const deleteAccount = useDeleteAccount();

  const formik = useFormik<AccountSettingsForm>({
    initialValues: {
      name: userData.name,
      email: userData.email,
      password: '',
      newPassword: '',
    },
    enableReinitialize: true, 
    validationSchema: validationScheme,
    onSubmit: (values) => {
      const updatedData: UpdateAccount = {
        name: values.name,
        email: values.email,
        currentPassword: values.password,
        newPassword: values.newPassword,
      };

      updateAccount.mutate(updatedData, {
        onSuccess: () => {
          handleClose();
          formik.resetForm();
          setDeleteAccountPassword('');
        },
      });
    },
  });

  return (
    <> 
        <Dialog open={open} onClose={handleClose} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle textAlign="center" textTransform="uppercase">
                    Account settings
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <Box display="flex" alignItems="center" gap={1} width="100%" sx={{flexDirection: 'column'}}>
                        <div className='w-full flex items-center gap-2'>
                            <InputLabel htmlFor="name" sx={{ minWidth: 'fit-content' }}>
                                Username:
                            </InputLabel>
                            <OutlinedInput
                                id="name"
                                name="name"
                                fullWidth
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && !!formik.errors.name}
                            />
                        </div>
                        <FieldError error={formik.touched.name && formik.errors.name} />
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} width="100%" sx={{ flexDirection: 'column'}}>
                        <div className='w-full flex items-center gap-2'>
                            <InputLabel htmlFor="email" sx={{ minWidth: 'fit-content' }}>
                                Email:
                            </InputLabel>
                            <OutlinedInput
                                id="email"
                                name="email"
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && !!formik.errors.email}
                            />
                        </div>
                        <FieldError error={formik.touched.email && formik.errors.email} />
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} width="100%" sx={{ flexDirection: 'column'}}>
                        <div className='w-full flex items-center gap-2'>
                            <InputLabel htmlFor="password" sx={{ minWidth: 'fit-content' }}>
                                Current password:
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                type={showCurrentPassword ? 'text' : 'password'}
                                fullWidth
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && !!formik.errors.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton onClick={() => setShowCurrentPassword((prev) => !prev)} edge="end">
                                        {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <FieldError error={formik.touched.password && formik.errors.password} />
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} width="100%" sx={{ flexDirection: 'column'}}>
                        <div className='w-full flex items-center gap-2'>
                            <InputLabel htmlFor="newPassword" sx={{ minWidth: 'fit-content' }}>
                                New password:
                            </InputLabel>
                            <OutlinedInput
                                id="newPassword"
                                name="newPassword"
                                placeholder="Optional"
                                type={showNewPassword ? 'text' : 'password'}
                                fullWidth
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.newPassword && !!formik.errors.newPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton onClick={() => setShowNewPassword((prev) => !prev)} edge="end">
                                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <FieldError error={formik.touched.newPassword && formik.errors.newPassword} />
                    </Box>

                    <hr />
                    <h3 className="text-center">DELETE ACCOUNT</h3>
                    <Box display="flex" alignItems="center" gap={1} width="100%">
                        <InputLabel htmlFor="delete-password" sx={{ minWidth: 'fit-content' }}>
                        Password:
                        </InputLabel>
                        <OutlinedInput
                        id="delete-password"
                        type={showDeletePassword ? 'text' : 'password'}
                        size="small"
                        fullWidth
                        value={deleteAccountPassword}
                        onChange={(e) => setDeleteAccountPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton onClick={() => setShowDeletePassword((prev) => !prev)} edge="end">
                                {showDeletePassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }
                        />
                    </Box>

                    <Button
                        color="red"
                        style="self-center"
                        onClick={() => setOpenConfirmationModal(true)}
                    >
                        Delete
                    </Button>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} style="!bg-transparent !text-red-500">
                        Cancel
                    </Button>
                    <Button type="submit">
                        Update data
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

        <ConfirmationModal
            title={'Are you sure you want to delete your account?'}
            description="This action cannot be undone."
            action={() => deleteAccount.mutate({ password: deleteAccountPassword })}
            open={openConfirmationModal}
            handleClose={() => setOpenConfirmationModal(false)}
            agreeText="Delete account"
        />
    </>
  );
};