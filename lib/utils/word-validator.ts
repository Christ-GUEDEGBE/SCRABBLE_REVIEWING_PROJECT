import { isValidWord, getWordDetails } from '../game-logic';
import type { WordValidation } from '@/types/word';

export async function validateWord(word: string): Promise<WordValidation> {
  const isValid = await isValidWord(word);
  return {
    isValid,
    word
  };
}

export async function getWordInfo(word: string) {
  return getWordDetails(word);
}