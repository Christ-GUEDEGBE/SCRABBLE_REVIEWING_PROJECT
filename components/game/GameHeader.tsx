import { Settings } from 'lucide-react';
import { Button } from '@mui/material';
import { GameSettings } from '@/lib/game-logic';

interface GameHeaderProps {
  settings: GameSettings;
  onSettingsClick: () => void;
}

export default function GameHeader({ settings, onSettingsClick }: GameHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        SELECTION: **{settings.requiredLetter}, {settings.letterCount} LETTERS**
      </h1>
      <Button 
        variant="contained" 
        onClick={onSettingsClick}
        sx={{ marginLeft: 'auto' }}
      >
        Settings
      </Button>
    </div>
  );
}