import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Скасувати
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Видалити
        </Button>
      </DialogActions>
    </Dialog>
  );
};
