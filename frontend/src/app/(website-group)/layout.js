import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/website/global/Header";
import Footer from "@/components/website/global/Footer";
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
  title: "Create Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f3f4f6]`}
      >
        <ReduxProvidor>
          <Header />
          {children}
          <Footer />
        </ReduxProvidor>
      </body>
    </html>
  );
}
