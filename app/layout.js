import "./globals.css";
import { Hind } from "next/font/google";
import Providers from "@/providers";
import { Suspense } from "react";
import Loading from "./loading";

const hind = Hind({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Vishnu's Portfolio",
  description:
    "Enthusiastic web developer, experienced in frontend web development. Passionate about responsive website design, enjoys researching and building innovative applications tailored to the needs of the business.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={hind.className}>
        <Providers>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
