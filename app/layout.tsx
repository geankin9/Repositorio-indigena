import type { Metadata } from "next";
import { Outfit, Manrope } from "next/font/google";
import "./globals.css";
import { readHomeData } from "@/lib/dataService";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let pageTitle = "Hola Mundo | Sistema";
  let description = "Sistema fullstack funcionando correctamente.";
  
  try {
    const data = readHomeData();
    if (data.meta) {
      pageTitle = data.meta.pageTitle;
      description = data.meta.description;
    }
  } catch (error) {
    console.error("Error cargando metadata:", error);
  }

  return {
    title: pageTitle,
    description: description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50 font-sans selection:bg-amber-500/30">
        {children}
      </body>
    </html>
  );
}
