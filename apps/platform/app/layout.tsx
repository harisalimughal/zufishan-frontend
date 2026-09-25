import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "../lib/theme/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { SplashScreen } from "../components/SplashScreen/SplashScreen";
import { ReactQueryProvider } from "../components/ReactQueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zufishan",
  description: "Zufishan learning platform"
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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SplashScreen />
        <ReactQueryProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
