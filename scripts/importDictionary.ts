import { prisma } from '../lib/db/prisma';
import { readFileSync } from 'fs';
import path from 'path';

async function createLettersIfNotExist() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letters = [];
  
  for (const letter of alphabet) {
    for (let position = 1; position <= 7; position++) {
      letters.push({ letter, position });
    }
  }

  await prisma.$transaction(
    letters.map((l) =>
      prisma.letter.upsert({
        where: { letter_position: { letter: l.letter, position: l.position } },
        create: l,
        update: {},
      })
    )
  );
}

async function importDictionary() {
  try {
    // Créer d'abord toutes les lettres possibles
    console.log('Creating letters...');
    await createLettersIfNotExist();

    // Lire le fichier
    const filePath = path.join(process.cwd(), 'dico_test.txt');
    const fileContent = readFileSync(filePath, 'utf-8');
    const words = fileContent.split('\n')
      .map(w => w.trim())
      .filter(w => w && w.length <= 7);

    console.log(`Importing ${words.length} words...`);

    for (const word of words) {
      // Créer le mot
      const createdWord = await prisma.word.create({
        data: {
          word: word,
          length: word.length,
        },
      });

      // Créer les positions des lettres
      const letterPositions = await Promise.all(
        Array.from(word).map(async (letter, idx) => {
          const letterRecord = await prisma.letter.findUnique({
            where: {
              letter_position: {
                letter: letter.toUpperCase(),
                position: idx + 1
              }
            }
          });

          if (!letterRecord) return null;

          return prisma.wordPosition.create({
            data: {
              wordId: createdWord.id,
              letterId: letterRecord.id,
              position: idx + 1
            }
          });
        })
      );

      console.log(`Imported word: ${word}`);
    }

    console.log('Dictionary import completed successfully');
  } catch (error) {
    console.error('Error importing dictionary:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importDictionary();
