import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import { ConvexClientProvider } from "./components/convex-client-provider";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Mission Control — Dark Mode",
  description: "Realtime Kanban board in deep dark mode",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} bg-[#0f0f0f] text-[#f5f5f5]`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
