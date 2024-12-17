export interface Word {
  id: number;
  word: string;
  length: number;
  natures?: WordNature[];
  positions?: WordPosition[];
}

export interface WordNature {
  natureId: number;
  nature: Nature;
}

export interface Nature {
  id: number;
  nature: string;
  description?: string;
}

export interface WordPosition {
  letterId: number;
  position: number;
  letter: Letter;
}

export interface Letter {
  id: number;
  letter: string;
  position: number;
}

export interface WordValidation {
  isValid: boolean;
  word: string;
}