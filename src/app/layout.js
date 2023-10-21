import { Inter } from "next/font/google"
import "./globals.css"
import AuthButton from "@/components/AuthButton"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TodoApp",
  description: "TodoApp | Next Js & Supabase",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthButton />
        <main className="flex justify-center items-center min-h-[95vh] w-100 bg-slate-50 relative ">
          {children}
        </main>
      </body>
    </html>
  )
} 
