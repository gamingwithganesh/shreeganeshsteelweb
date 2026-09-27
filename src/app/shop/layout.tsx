import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Steel Fabrication Catalog & Online Store | Custom Gates, SS Railings, Sheds',
  description:
    'Shop custom architectural metal fabrications, modern laser-cut steel gates, stainless steel handrails, agro trolleys & industrial structures with direct workshop pricing across Ghatanji, Yavatmal, Pandharkawada, Nagpur, Wardha, Akola.',
  keywords: [
    'steel shop online',
    'buy steel gate yavatmal',
    'custom ss railing price nagpur',
    'fabrication products ghatanji',
    'steel fabrication catalog maharashtra',
  ],
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
