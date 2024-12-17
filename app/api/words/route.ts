import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { GAME_CONFIG } from '@/lib/constants/config';

// Vérification d'un mot
export async function POST(request: Request) {
  try {
    const { word } = await request.json();
    
    const wordRecord = await prisma.word.findUnique({
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

    return NextResponse.json({ 
      isValid: !!wordRecord,
      wordInfo: wordRecord
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify word' }, 
      { status: 500 }
    );
  }
}

// Obtenir le compte de mots possibles
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requiredLetter = searchParams.get('requiredLetter')?.toUpperCase();
    const maxLength = parseInt(searchParams.get('maxLength') || '7');

    if (!requiredLetter) {
      return NextResponse.json(
        { error: 'Required letter is missing' },
        { status: 400 }
      );
    }

    const count = await prisma.word.count({
      where: {
        length: {
          gte: GAME_CONFIG.MIN_WORD_LENGTH,
          lte: maxLength
        },
        positions: {
          some: {
            letter: {
              letter: requiredLetter
            }
          }
        }
      }
    });

    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get possible words count' },
      { status: 500 }
    );
  }
}