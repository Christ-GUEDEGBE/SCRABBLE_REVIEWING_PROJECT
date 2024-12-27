"use client";

import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { GAME_CONFIG } from '@/lib/constants/config';
import type { GameSettings } from '@/lib/game-logic';

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<GameSettings>({
    letterCount: GAME_CONFIG.DEFAULT_LETTER_COUNT,
    requiredLetter: GAME_CONFIG.DEFAULT_REQUIRED_LETTER
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    if (!settings.requiredLetter || settings.letterCount < 3 || settings.letterCount > 7) {
      return;
    }
    
    try {
      localStorage.setItem('gameSettings', JSON.stringify(settings));
      router.push('/');
    } catch (error) {
      console.error('Failed to save settings:', error);
      // Idéalement, ajouter un toast ici
    }
  };

  return (
    <main className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Game Settings</h1>
          <Button onClick={() => router.push('/')} variant="text">
            Retour
          </Button>
        </div>
        <div className="space-y-4">
          <TextField
            fullWidth
            label="Number of Letters"
            type="number"
            InputProps={{ inputProps: { min: 3, max: 7 } }}
            value={settings.letterCount}
            onChange={(e) => setSettings(prev => (
              {...prev, letterCount: parseInt(e.target.value)}
            ))}
          />
          <TextField
            fullWidth
            label="Required Letter"
            inputProps={{ maxLength: 1 }}
            value={settings.requiredLetter}
            onChange={(e) => setSettings(prev => (
              {...prev, requiredLetter: e.target.value.toUpperCase()}
            ))}
          />
          <div className="flex justify-end space-x-4 pt-4">
            <Button onClick={() => router.push('/')} variant="outlined">
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              variant="contained"
              disabled={!settings.requiredLetter || settings.letterCount < 3 || settings.letterCount > 7}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
