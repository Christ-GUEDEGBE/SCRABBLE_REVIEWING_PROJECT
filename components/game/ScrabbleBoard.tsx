"use client";

import { useState, useEffect } from 'react';
import { GAME_CONFIG } from '@/lib/constants/config';
import { useToast } from '@/hooks/use-toast';
import GameHeader from './GameHeader';
import LetterGrid from './LetterGrid';
import GameProgress from './GameProgress';
import BottomRow from './BottomRow';
import WordDetails from './WordDetails';
import SettingsDialog from './SettingsDialog';
import { generateLetterDraw, createEmptyBottomRow, GameSettings } from '@/lib/game-logic';
import type { Word } from '@/types/word';

export default function ScrabbleBoard() {
  const { addToast } = useToast();
  const [topLetters, setTopLetters] = useState<string[]>([]);
  const [bottomLetters, setBottomLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<Word[]>([]);
  const [totalWords, setTotalWords] = useState(3);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [currentWordDetails, setCurrentWordDetails] = useState<Word | null>(null);
  const [settings, setSettings] = useState<GameSettings>({
    letterCount: GAME_CONFIG.DEFAULT_LETTER_COUNT,
    requiredLetter: GAME_CONFIG.DEFAULT_REQUIRED_LETTER
  });

  useEffect(() => {
    generateNewDraw();
  }, []);

  const generateNewDraw = () => {
    setTopLetters(generateLetterDraw(settings.requiredLetter));
    setBottomLetters(createEmptyBottomRow(settings.letterCount));
    setCurrentWordDetails(null);
    setIsValid(null);
  };

  const handleSettingsSave = (newSettings: GameSettings) => {
    setSettings(newSettings);
    generateNewDraw();
  };

  const calculatePossibleWords = async () => {
    try {
      const response = await fetch(
        `/api/words?requiredLetter=${settings.requiredLetter}&maxLength=${settings.letterCount}`
      );
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch word count');
      }
      
      setTotalWords(data.count);
    } catch (error) {
      addToast('Error calculating possible words', 'error');
      setTotalWords(0);
    }
  };

  useEffect(() => {
    calculatePossibleWords();
  }, [settings.letterCount, settings.requiredLetter]);

  const handleWordCheck = async () => {
    const word = bottomLetters.join("");
    
    // Vérifications préliminaires
    if (bottomLetters.some(letter => letter === "")) {
      setIsValid(false);
      addToast("Le mot n'est pas complet", "error");
      return;
    }

    if (word.length < GAME_CONFIG.MIN_WORD_LENGTH) {
      setIsValid(false);
      addToast(`Le mot doit faire au moins ${GAME_CONFIG.MIN_WORD_LENGTH} lettres`, "error");
      return;
    }

    if (!word.includes(settings.requiredLetter)) {
      setIsValid(false);
      addToast(`Le mot doit contenir la lettre ${settings.requiredLetter}`, "error");
      return;
    }

    if (foundWords.some(w => w.word === word.toUpperCase())) {
      setIsValid(false);
      addToast("Ce mot a déjà été trouvé", "warning");
      return;
    }

    try {
      const response = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify word');
      }

      setIsValid(data.isValid);
      
      if (data.isValid && data.wordInfo) {
        setFoundWords(prev => [...prev, data.wordInfo]);
        setCurrentWordDetails(data.wordInfo);
        addToast("Mot trouvé !", "success");
      } else {
        addToast("Ce mot n'existe pas dans le dictionnaire", "error");
      }
    } catch (error) {
      addToast("Erreur lors de la vérification du mot", "error");
      setIsValid(false);
    }
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
            setCurrentWordDetails(null);
          }}
          onCheck={handleWordCheck}
        />

        {currentWordDetails && (
          <WordDetails word={currentWordDetails} />
        )}
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