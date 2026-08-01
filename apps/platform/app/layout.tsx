import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "../lib/theme/ThemeContext";
import { SplashScreen } from "../components/SplashScreen/SplashScreen";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ranenla",
  description: "Ranenla learning platform"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SplashScreen />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
