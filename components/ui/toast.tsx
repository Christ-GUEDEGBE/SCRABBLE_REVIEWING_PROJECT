'use client';

import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useToastProvider, useToast } from '@/hooks/use-toast';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, addToast, removeToast, ToastContext } = useToastProvider();

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {toasts.map(toast => (
        <Snackbar 
          key={toast.id}
          open={true}
          autoHideDuration={toast.duration}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => removeToast(toast.id)}
            severity={toast.severity}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
}

export { useToast };
