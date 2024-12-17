import type { Word } from '@/types/word';

interface WordDetailsProps {
  word: Word;
}

export default function WordDetails({ word }: WordDetailsProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">{word.word}</h3>
      <div className="space-y-2">
        {word.natures?.map((nature) => (
          <span
            key={nature.natureId}
            className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2"
          >
            {nature.nature.nature}
          </span>
        ))}
      </div>
    </div>
  );
}
