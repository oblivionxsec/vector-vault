import Navbar from '@/components/Navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Navbar />
      <div style={{ paddingTop: 56 }}>
        {children}
      </div>
    </div>
  );
}