import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Pokédex Lite — Browse, Search & Favorite Pokémon",
  description:
    "A lightweight Pokédex web app. Browse all Pokémon, search by name, filter by type, and save your favourites.",
    icons: {
    icon: "/favicon.jpg", 
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
