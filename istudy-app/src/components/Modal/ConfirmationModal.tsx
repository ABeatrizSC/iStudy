import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '../Button';
import { DialogContentText } from '@mui/material';

interface ConfirmationModalProps {
    title: string;
    description?: string;
    agreeText?: string;
    action: () => void;
    open: boolean;
    handleClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, description, agreeText = "Agree", action, open, handleClose }) => {
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style='!bg-transparent !text-red-500'>Cancel</Button>
          <Button onClick={action}>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    );
};