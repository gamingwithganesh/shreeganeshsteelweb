import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Steel Fabrication Guides, Welding Tips & Metallurgy Insights | SGWWSP Blog',
  description:
    'Expert engineering guides on steel gate designs, SS 304 vs 316 metallurgy, industrial PEB shed installation, laser cutting tolerances, and maintenance tips by Shree Ganesh Steel Workshop.',
  keywords: [
    'steel fabrication guides',
    'welding tips maharashtra',
    'gate design trends yavatmal',
    'stainless steel grade guide',
    'peb shed cost calculation nagpur',
  ],
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
