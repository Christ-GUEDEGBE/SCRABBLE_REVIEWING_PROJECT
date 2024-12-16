import * as React from 'react';
import { AlertColor } from '@mui/material';
import { Toast, ToastContextType } from '@/types/toast';

const ToastContext = React.createContext<ToastContextType | null>(null);

export function useToastProvider() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((
    message: string, 
    severity: AlertColor = 'info',
    duration: number = 5000
  ) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, severity, duration }]);
    setTimeout(() => removeToast(id), duration);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    ToastContext,
  };
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
