import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// core styles are required for all packages
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/mantine/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vegoboken",
  description: "En app för att samla dina vegetariska recept!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme} forceColorScheme="light">{children}</MantineProvider>
      </body>
    </html>
  );
}
