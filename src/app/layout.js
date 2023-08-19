"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Do Pham Nguyen</title>
        <meta
          name="description"
          content="Welcome to the official website of Đỗ Phạm Nguyên. Explore the profile of Đỗ Phạm Nguyên, a multi-talented individual with a passion for innovation, creativity, and technology. This site provides a comprehensive collection of information about Đỗ Phạm Nguyên, including their background, achievements, skills, and experiences. Discover the remarkable journey of Đỗ Phạm Nguyên and get inspired by their accomplishments in various fields."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          backgroundPosition:
            "calc(0% + -" +
            mousePos.x / 70 +
            "px) calc(0% + -" +
            mousePos.y / 70 +
            "px)",
        }}
        className={inter.className}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
