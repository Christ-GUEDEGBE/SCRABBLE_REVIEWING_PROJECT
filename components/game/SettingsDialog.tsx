"use client";

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
              value={settings.letterCount}
              onChange={(e) => onSave({ ...settings, letterCount: parseInt(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requiredLetter">Required Letter</Label>
            <Input
              id="requiredLetter"
              maxLength={1}
              value={settings.requiredLetter}
              onChange={(e) => onSave({ ...settings, requiredLetter: e.target.value.toUpperCase() })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}