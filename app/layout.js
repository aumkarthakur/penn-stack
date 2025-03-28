import { Bricolage_Grotesque } from 'next/font/google';
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

export const metadata = {
  title: 'PEN Stack',
  description: 'A modern full stack',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} antialiased`}>
      <body className="font-bricolage antialiased">{children}</body>
    </html>
  );
}
