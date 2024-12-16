import { RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LetterTile from './LetterTile';

interface BottomRowProps {
  letters: string[];
  isValid: boolean | null;
  onReset: () => void;
  onCheck: () => void;
}

export default function BottomRow({ letters, isValid, onReset, onCheck }: BottomRowProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      
      <div className="flex-1 grid grid-cols-5 gap-4">
        {letters.map((letter, index) => (
          <LetterTile
            key={`bottom-${index}`}
            letter={letter}
            isEmpty={!letter}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={onCheck}
        className={cn(
          isValid === true && "bg-green-500 text-white",
          isValid === false && "bg-red-500 text-white"
        )}
      >
        <Check className="h-4 w-4" />
      </Button>
    </div>
  );
}