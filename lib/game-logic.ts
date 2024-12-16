export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface GameSettings {
  letterCount: number;
  requiredLetter: string;
}

export function generateLetterDraw(requiredLetter: string): string[] {
  let draw = [requiredLetter];
  while (draw.length < 7) {
    const randomLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    if (!draw.includes(randomLetter)) {
      draw.push(randomLetter);
    }
  }
  return draw.sort(() => Math.random() - 0.5);
}

export function createEmptyBottomRow(length: number): string[] {
  return Array(length).fill("");
}

export function isValidWord(word: string): boolean {
  // TODO: Implement dictionary check
  return word.length > 0;
}