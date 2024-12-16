"use client";

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { GameSettings } from '@/lib/game-logic';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
}

export default function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onSave,
}: SettingsDialogProps) {
  const handleSave = () => {
    onSave(settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)}>
      <DialogTitle>Game Settings</DialogTitle>
      <DialogContent>
        <div className="space-y-4 py-4">
          <TextField
            fullWidth
            label="Number of Letters"
            type="number"
            InputProps={{ inputProps: { min: 3, max: 7 } }}
            value={settings.letterCount}
            onChange={(e) => onSave({ ...settings, letterCount: parseInt(e.target.value) })}
          />
          <TextField
            fullWidth
            label="Required Letter"
            inputProps={{ maxLength: 1 }}
            value={settings.requiredLetter}
            onChange={(e) => onSave({ ...settings, requiredLetter: e.target.value.toUpperCase() })}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}