import BootstrapInit from "@/helper/BootstrapInit";
import RouteScrollToTop from "@/helper/RouteScrollToTop";
import ErrorBoundary from "@/helper/ErrorBoundary";
import CustomGSAP from "@/helper/CustomGsap";
import { Marcellus } from "next/font/google";
import "./globals.css";

/* Marcellus – Google Font */
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

export async function generateMetadata() {
  return {
    title: {
      default: "EliteStay - Template",
      template: "%s | EliteStay",
    },
    description: "EliteStay - Hotel Booking Multi-Purpose Next Js Template.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${marcellus.variable}`}>
      <body>
        <ErrorBoundary>
          <BootstrapInit />
          <RouteScrollToTop />
          <CustomGSAP />
        </ErrorBoundary>

        {children}
      </body>
    </html>
  );
}
