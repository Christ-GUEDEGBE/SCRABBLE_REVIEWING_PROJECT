import LetterTile from './LetterTile';

interface LetterGridProps {
  letters: string[];
  onLetterClick?: (letter: string, index: number) => void;
}

export default function LetterGrid({ letters, onLetterClick }: LetterGridProps) {
  return (
    <div className="grid grid-cols-7 gap-4">
      {letters.map((letter, index) => (
        <LetterTile
          key={`tile-${index}`}
          letter={letter}
          onClick={() => letter && onLetterClick?.(letter, index)}
        />
      ))}
    </div>
  );
}