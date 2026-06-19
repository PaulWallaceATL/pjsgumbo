import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pjsgumbo.com"),
  title: {
    default: "PJ's Gumbo — Atlanta Made. Cajun Soul.",
    template: "%s · PJ's Gumbo",
  },
  description:
    "Authentic Louisiana gumbo made from scratch in Atlanta with fresh ingredients and a slow-cooked roux. Order delivery or pickup.",
  openGraph: {
    title: "PJ's Gumbo — Atlanta Made. Cajun Soul.",
    description:
      "Authentic Louisiana gumbo made from scratch in Atlanta with fresh ingredients and a slow-cooked roux.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
