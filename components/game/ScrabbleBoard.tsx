"use client";

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@mui/material';
import GameHeader from './GameHeader';
import LetterGrid from './LetterGrid';
import GameProgress from './GameProgress';
import BottomRow from './BottomRow';
import SettingsDialog from './SettingsDialog';
import { generateLetterDraw, createEmptyBottomRow, GameSettings } from '@/lib/game-logic';

export default function ScrabbleBoard() {
  const [topLetters, setTopLetters] = useState<string[]>([]);
  const [bottomLetters, setBottomLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [totalWords, setTotalWords] = useState(3);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [settings, setSettings] = useState<GameSettings>({
    letterCount: 5,
    requiredLetter: "K"
  });

  useEffect(() => {
    generateNewDraw();
  }, []);

  const generateNewDraw = () => {
    setTopLetters(generateLetterDraw(settings.requiredLetter));
    setBottomLetters(createEmptyBottomRow(settings.letterCount));
  };

  const handleSettingsSave = (newSettings: GameSettings) => {
    setSettings(newSettings);
    generateNewDraw();
  };

  return (
    <div className="space-y-8">
      <GameHeader
        settings={settings}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />

      <div className="space-y-12">
        <LetterGrid
          letters={topLetters}
          onLetterClick={(letter, index) => {
            const emptyIndex = bottomLetters.findIndex(l => l === "");
            if (emptyIndex !== -1) {
              const newBottom = [...bottomLetters];
              newBottom[emptyIndex] = letter;
              setBottomLetters(newBottom);
              
              const newTop = [...topLetters];
              newTop[index] = "";
              setTopLetters(newTop);
            }
          }}
        />

        <GameProgress
          foundWords={foundWords}
          totalWords={totalWords}
        />

        <BottomRow
          letters={bottomLetters}
          isValid={isValid}
          onReset={() => {
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
            setBottomLetters(createEmptyBottomRow(settings.letterCount));
            setIsValid(null);
          }}
          onCheck={() => {
            const word = bottomLetters.join("");
            const isValidWord = true; // TODO: Implement dictionary check
            setIsValid(isValidWord);
            if (isValidWord) {
              setFoundWords([...foundWords, word]);
            }
          }}
        />
      </div>

      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        settings={settings}
        onSave={handleSettingsSave}
      />
    </div>
  );
}