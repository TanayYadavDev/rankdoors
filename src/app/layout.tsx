import type { Metadata } from 'next';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'RankDoors — Your Door to a Better Rank | Sagar Public School Bhopal',
  description: 'Self-managed JEE test and analytics platform for Sagar Public School, Bhopal (Saket Nagar). Classes 9–12.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-stone-50 text-slate-800 dark:bg-[#0F172A] dark:text-slate-100 min-h-screen flex flex-col font-sans selection:bg-[#722F37] selection:text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <Footer />
        <ThemeToggle />
      </body>
    </html>
  );
}
