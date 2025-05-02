import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Button } from "../Button";

interface StartGameOptionsModalProps {
    restartAction: () => void;
    retryWrongAnswersAction: () => void;
    open: boolean;
    handleClose: () => void;
}

export const StartGameOptionsModal: React.FC<StartGameOptionsModalProps> = ({ restartAction, retryWrongAnswersAction, open, handleClose }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="text-center">
                Would you like to:
            </DialogTitle>
            <DialogActions>
                <Button onClick={retryWrongAnswersAction}>
                    Retry only wrong answers
                </Button>
                <Button onClick={restartAction} style='!bg-transparent !text-red-500'>
                    Restart game
                </Button>
            </DialogActions>
        </Dialog>
    )
}