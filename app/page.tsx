import ScrabbleBoard from '@/components/game/ScrabbleBoard';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-2xl mx-auto">
        <ScrabbleBoard />
      </div>
    </main>
  );
}