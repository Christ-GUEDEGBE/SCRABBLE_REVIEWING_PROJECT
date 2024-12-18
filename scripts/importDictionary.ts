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
    console.log('Creating letters...');
    await createLettersIfNotExist();

    // Modification du nom du fichier
    const filePath = path.join(process.cwd(), 'dico.txt');
    const fileContent = readFileSync(filePath, 'utf-8');
    const words = fileContent.split('\n')
      .map(w => w.trim().toUpperCase()) // Assure que tous les mots sont en majuscules
      .filter(w => w && w.length <= 7 && /^[A-Z]+$/.test(w)); // Filtre les caractères spéciaux

    const totalWords = words.length;
    console.log(`Importing ${totalWords} words...`);

    // Traitement par lots pour améliorer les performances
    const batchSize = 100;
    for (let i = 0; i < words.length; i += batchSize) {
      const batch = words.slice(i, i + batchSize);
      await Promise.all(batch.map(async (word) => {
        try {
          // Créer le mot
          const createdWord = await prisma.word.create({
            data: {
              word: word,
              length: word.length,
            },
          });

          // Créer et ATTENDRE les positions des lettres
          await Promise.all(
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
        } catch (error) {
          console.error(`Error importing word ${word}:`, error);
        }
      }));
      console.log(`Processed ${Math.min(i + batchSize, totalWords)}/${totalWords} words`);
    }

    console.log('Dictionary import completed successfully');
  } catch (error) {
    console.error('Error importing dictionary:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importDictionary();
