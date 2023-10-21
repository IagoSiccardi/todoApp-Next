"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AuthButton = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      setUser(data.session)
    }

    checkSession()
  }, [])

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    })
  }

  const handleSingOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }


  return (
    <div className=" p-3 flex gap-2 justify-center bg-blue-100">
      {!user ? (
        <button
          onClick={handleSignIn}
          className="button rounded-xl bg-black text-white p-2"
        >
          Sign In
        </button>
      ) : (
        <button
          onClick={handleSingOut}
          className="button rounded-xl bg-slate-800 text-white p-2"
        >
          Sign Out
        </button>
      )}
    </div>
  )
}

export default AuthButton
