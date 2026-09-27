import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StarField } from "@/components/ui/StarField";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Axel Bot — Dashboard Discord",
    template: "%s | Axel Bot",
  },
  description:
    "Axel Bot : le bot Discord tout-en-un d’Axel community’s. Modération, tickets, niveaux, giveaways et bien plus, configurables depuis un dashboard moderne.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={spaceGrotesk.variable}>
      <body className="min-h-screen antialiased">
        <StarField />
        {children}
      </body>
    </html>
  );
}
