"use client"

import { checkSession, signOut } from "@/libs/checkSession"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Header = () => {
  const [session, setSession] = useState()
  const router = useRouter()

  useEffect(() => {
    checkSession().then((data) => {
      if (data.session !== null) {
        return setSession(data)
      } else {
        return setSession(false)
      }
    })
  }, [])

  const handleSignOut = () => {
    signOut()
    router.refresh()
    setSession(false)
  }

  const handleSignIn = () => {
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="bg-blue-800  text-center p-3 flex items-center justify-center">
      <section className="flex items-center justify-between text-white max-w-[60vw] w-full">
        <Link href={'/'} className="font-semibold transition hover:scale-105">TodoApp</Link>
        {!session ? (
          <button
            onClick={handleSignIn}
            className="border-2 font-semibold border-blue-300 p-2 rounded-3xl transition hover:scale-105"
          >
            Sign in
          </button>
        ) : (
          <button
            className="border-2 font-semibold border-blue-300 p-2 rounded-3xl transition hover:scale-105"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        )}
      </section>
    </header>
  )
}

export default Header
