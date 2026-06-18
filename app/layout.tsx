import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
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
      className={`${inter.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
