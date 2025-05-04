import GlamMakeupGuide from '@/components/guides/GlamMakeupGuide';
import Header from '@/components/Header';

export default function GlamMakeupPage() {
  return (
    <main>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50">
        <GlamMakeupGuide />
      </div>
    </main>
  );
} 