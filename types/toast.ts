import { AlertColor } from '@mui/material';

export type Toast = {
  id: string;
  message: string;
  severity: AlertColor;
  duration: number;
}

export type ToastContextType = {
  addToast: (message: string, severity?: AlertColor, duration?: number) => void;
  removeToast: (id: string) => void;
}
