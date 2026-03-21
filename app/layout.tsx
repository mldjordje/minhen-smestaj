import type { Metadata } from "next";
import { AppSessionProvider } from "@/components/app-session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minhen Smestaj",
  description:
    "Platforma za rezervacije i operativno upravljanje smestajem u Minhenu."
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="sr">
      <body>
        <AppSessionProvider>{children}</AppSessionProvider>
      </body>
    </html>
  );
}
