import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TodoApp",
  description: "TodoApp | Next Js & Supabase",
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <main className="grid min-w-screen place-content-center min-h-[92vh] bg-slate-50 relative ">
          {children}
        </main>
      </body>
    </html>
  )
}
