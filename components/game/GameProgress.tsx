interface GameProgressProps {
  foundWords: string[];
  totalWords: number;
}

export default function GameProgress({ foundWords, totalWords }: GameProgressProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg font-medium">
        Progress: {foundWords.length}/{totalWords}
      </div>
      <div className="space-x-2">
        {foundWords.map((word, index) => (
          <span
            key={index}
            className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}