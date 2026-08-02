import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haidermillwala.github.io"),
  title: "Haider Millwala | Senior Software Engineer",
  description:
    "A VS Code inspired portfolio for Haider Millwala, Senior Software Engineer specializing in Java, Spring Boot, GCP, Kubernetes, microservices, and event-driven systems.",
  openGraph: {
    title: "Haider Millwala | Portfolio",
    description:
      "Browse Haider Millwala's overview, experience, projects, resume, and contact details as a developer workspace.",
    images: ["/profile.png"],
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
