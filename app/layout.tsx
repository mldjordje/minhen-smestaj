import type { Metadata, Viewport } from "next";
import { AppSessionProvider } from "@/components/app-session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minhen Smestaj",
  description:
    "Platforma za rezervacije i operativno upravljanje smestajem u Minhenu."
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="sr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppSessionProvider>{children}</AppSessionProvider>
      </body>
    </html>
  );
}
