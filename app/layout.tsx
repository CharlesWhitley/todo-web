import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = { title: "Todo", description: "Todo App" };

// 1) Load Inter and apply it globally
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className="
          min-h-screen
          bg-[linear-gradient(
            to_bottom,
            black_0px,
            black_calc(50%_-_20px),
            #201c1c_calc(50%_-_20px),
            #201c1c_100%
          )]
        "
      >
        <Header />
        
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
