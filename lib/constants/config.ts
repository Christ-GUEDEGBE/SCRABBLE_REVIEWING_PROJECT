export const GAME_CONFIG = {
  DEFAULT_LETTER_COUNT: 5,
  DEFAULT_REQUIRED_LETTER: 'A',
  MAX_WORD_LENGTH: 7,
  MIN_WORD_LENGTH: 2,
} as const;

export const WORD_NATURES = {
  NOM: 'nom',
  VERBE: 'verbe',
  ADJECTIF: 'adjectif',
  ADVERBE: 'adverbe',
  PREPOSITION: 'préposition',
  ARTICLE: 'article',
  PRONOM: 'pronom',
  CONJONCTION: 'conjonction',
} as const;