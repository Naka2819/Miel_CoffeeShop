import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getDictionary, hasLocale, locales } from "./dictionaries";

const dmSans = localFont({
  src: [
    { path: "../../fonts/dm-sans-latin-opsz-normal.woff2", style: "normal" },
    { path: "../../fonts/dm-sans-latin-opsz-italic.woff2", style: "italic" },
  ],
  weight: "100 1000",
  variable: "--font-dm-sans",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={dmSans.variable} suppressHydrationWarning>
      <head>
        {/* Signale que JavaScript est actif avant l'affichage : les cases à faire apparaître
            partent alors cachées, sans clignotement. Sans JavaScript, elles restent visibles. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Nav lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
