"use client";

import { useState, useEffect } from 'react';
import { Settings, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LetterTile from '@/components/LetterTile';
import SettingsDialog from '@/components/SettingsDialog';
import { cn } from '@/lib/utils';

export default function ScrabbleBoard() {
  const [topLetters, setTopLetters] = useState<string[]>([]);
  const [bottomLetters, setBottomLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [totalWords, setTotalWords] = useState(3);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [letterCount, setLetterCount] = useState(5);
  const [requiredLetter, setRequiredLetter] = useState("K");

  useEffect(() => {
    generateNewDraw();
  }, []);

  const generateNewDraw = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let draw = [requiredLetter];
    while (draw.length < 7) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      if (!draw.includes(randomLetter)) {
        draw.push(randomLetter);
      }
    }
    // Shuffle the array
    draw.sort(() => Math.random() - 0.5);
    setTopLetters(draw);
    setBottomLetters(Array(letterCount).fill(""));
  };

  const handleTileClick = (letter: string, index: number, isTop: boolean) => {
    if (isTop) {
      const emptyIndex = bottomLetters.findIndex(l => l === "");
      if (emptyIndex !== -1) {
        const newBottom = [...bottomLetters];
        newBottom[emptyIndex] = letter;
        setBottomLetters(newBottom);
        
        const newTop = [...topLetters];
        newTop[index] = "";
        setTopLetters(newTop);
      }
    }
  };

  const resetBottomRow = () => {
    const newTop = [...topLetters];
    bottomLetters.forEach((letter) => {
      if (letter) {
        const emptyIndex = newTop.findIndex(l => l === "");
        if (emptyIndex !== -1) {
          newTop[emptyIndex] = letter;
        }
      }
    });
    setTopLetters(newTop);
    setBottomLetters(Array(letterCount).fill(""));
    setIsValid(null);
  };

  const checkWord = () => {
    const word = bottomLetters.join("");
    // This is a placeholder - you'll need to implement actual word validation
    const isValidWord = true; // Replace with actual dictionary check
    setIsValid(isValidWord);
    if (isValidWord) {
      setFoundWords([...foundWords, word]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          SELECTION: **{requiredLetter}, {letterCount} LETTERS**
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-12">
        {/* Top row */}
        <div className="grid grid-cols-7 gap-4">
          {topLetters.map((letter, index) => (
            <LetterTile
              key={`top-${index}`}
              letter={letter}
              onClick={() => handleTileClick(letter, index, true)}
            />
          ))}
        </div>

        {/* Progress */}
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

        {/* Bottom row */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={resetBottomRow}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 grid grid-cols-5 gap-4">
            {bottomLetters.map((letter, index) => (
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
            onClick={checkWord}
            className={cn(
              isValid === true && "bg-green-500 text-white",
              isValid === false && "bg-red-500 text-white"
            )}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        onSave={(settings) => {
          setLetterCount(settings.letterCount);
          setRequiredLetter(settings.requiredLetter);
          generateNewDraw();
        }}
      />
    </div>
  );
}