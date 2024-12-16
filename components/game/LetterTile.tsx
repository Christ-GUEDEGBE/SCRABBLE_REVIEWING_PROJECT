import { cn } from '@/lib/utils';

interface LetterTileProps {
  letter: string;
  isEmpty?: boolean;
  onClick?: () => void;
}

export default function LetterTile({ letter, isEmpty = false, onClick }: LetterTileProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer transition-all",
        isEmpty ? "border-2 border-dashed border-gray-300 bg-white" :
        letter ? "bg-amber-700/90 text-white shadow-md hover:bg-amber-600" : "bg-transparent"
      )}
    >
      {letter}
    </div>
  );
}