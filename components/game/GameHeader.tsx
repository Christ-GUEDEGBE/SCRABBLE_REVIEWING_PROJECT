import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { GameSettings } from '@/lib/game-logic';

interface GameHeaderProps {
  settings: GameSettings;
}

export default function GameHeader({ settings }: GameHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        SELECTION: **{settings.requiredLetter}, {settings.letterCount} LETTERS**
      </h1>
      <Button 
        variant="contained" 
        onClick={() => router.push('/settings')}
      >
        Settings
      </Button>
    </div>
  );
}