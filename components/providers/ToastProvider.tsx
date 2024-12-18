'use client';

import { useToastProvider } from '@/hooks/use-toast';
import { Alert, Snackbar } from '@mui/material';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast, ToastContext } = useToastProvider();

  return (
    <ToastContext.Provider value={{ addToast: useToastProvider().addToast, removeToast }}>
      {children}
      {toasts.map((toast) => (
        <Snackbar 
          key={toast.id}
          open={true}
          autoHideDuration={toast.duration}
          onClose={() => removeToast(toast.id)}
        >
          <Alert severity={toast.severity} onClose={() => removeToast(toast.id)}>
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
}
