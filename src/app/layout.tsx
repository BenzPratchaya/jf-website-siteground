import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"]
});

// font-thin = 100;
// font-extralight = 200;
// font-light = 300;
// font-normal = 400;
// font-medium = 500;
// font-semibold = 600;
// font-bold = 700;

export const metadata: Metadata = {
  title: "J.F.Advance Med Co.,Ltd.",
  description: "J.F.Advance Med ผู้นำเข้าและจัดจำหน่ายเครื่องมือแพทย์คุณภาพสูง ระบบเอกซเรย์, อัลตราซาวด์, MRI และโซลูชัน IT ทางการแพทย์ สำหรับโรงพยาบาลและคลินิกชั้นนำในประเทศไทย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
