import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        variant="outline"
        size="icon"
        onClick={onSettingsClick}
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
}