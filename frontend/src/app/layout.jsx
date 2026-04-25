import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvidor from "@/redux/ReduxProvidor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Fullstack App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f3f4f6]`}>
        <ReduxProvidor>
          {children}
        </ReduxProvidor>
      </body>
    </html>
  );
}