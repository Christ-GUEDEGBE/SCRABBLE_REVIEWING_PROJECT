import { prisma } from './db/prisma';
import { GAME_CONFIG } from './constants/config';

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface GameSettings {
  letterCount: number;
  requiredLetter: string;
}

export function generateLetterDraw(requiredLetter: string): string[] {
  let draw = [requiredLetter];
  const availableLetters = LETTERS.split('')
    .filter(l => l !== requiredLetter);

  while (draw.length < GAME_CONFIG.MAX_WORD_LENGTH) {
    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    draw.push(availableLetters[randomIndex]);
    availableLetters.splice(randomIndex, 1);
  }
  
  return draw.sort(() => Math.random() - 0.5);
}

export function createEmptyBottomRow(length: number): string[] {
  return Array(length).fill("");
}

export async function isValidWord(word: string): Promise<boolean> {
  if (word.length < GAME_CONFIG.MIN_WORD_LENGTH || 
      word.length > GAME_CONFIG.MAX_WORD_LENGTH) {
    return false;
  }

  const foundWord = await prisma.word.findUnique({
    where: {
      word: word.toUpperCase(),
    },
    include: {
      positions: {
        include: {
          letter: true
        }
      }
    }
  });

  return !!foundWord;
}

export async function getWordDetails(word: string) {
  return prisma.word.findUnique({
    where: {
      word: word.toUpperCase(),
    },
    include: {
      natures: {
        include: {
          nature: true
        }
      },
      positions: {
        include: {
          letter: true
        }
      }
    }
  });
}