// Root layout: fonts, language and calculator providers, shell header/footer.
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BootCurtain from "../components/BootCurtain";
import GridOverlay from "../components/GridOverlay";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LanguageProvider from "../components/LanguageProvider";
import CalculatorStore from "../components/calculator/CalculatorStore";
import { en } from "../content/en";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: en.brand.metaTitle,
  description: en.brand.metaDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrains.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <GridOverlay />
        <LanguageProvider>
          <BootCurtain />
          <CalculatorStore>
            <Header />
            <main id="content" className="flex-1">
              {children}
            </main>
            <Footer />
          </CalculatorStore>
        </LanguageProvider>
      </body>
    </html>
  );
}
