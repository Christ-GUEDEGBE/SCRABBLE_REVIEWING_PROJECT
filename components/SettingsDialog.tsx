"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (settings: { letterCount: number; requiredLetter: string }) => void;
}

export default function SettingsDialog({
  open,
  onOpenChange,
  onSave,
}: SettingsDialogProps) {
  const [letterCount, setLetterCount] = useState(5);
  const [requiredLetter, setRequiredLetter] = useState("K");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="letterCount">Number of Letters</Label>
            <Input
              id="letterCount"
              type="number"
              min={3}
              max={7}
              value={letterCount}
              onChange={(e) => setLetterCount(parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requiredLetter">Required Letter</Label>
            <Input
              id="requiredLetter"
              maxLength={1}
              value={requiredLetter}
              onChange={(e) => setRequiredLetter(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {
            onSave({ letterCount, requiredLetter });
            onOpenChange(false);
          }}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}