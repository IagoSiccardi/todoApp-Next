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
    router.reload()
  }

  const handleSingOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }


  return (
    <div className=" p-3 flex gap-2 justify-center items-center bg-blue-100 w-[100vw] h-[100vh]">
      <div className="h-[200px] w-[300px] bg-white flex items-center justify-center rounded-3xl flex-col gap-4">
      <h2 className="text-2xl font-bold text-blue-900">Sign in to continue</h2>
      {!user ? (
        <button
          onClick={handleSignIn}
          className="button rounded-xl bg-blue-800 text-white p-2 text-xl"
        >
          Sign In
        </button>
      ) : (
        <button
          onClick={handleSingOut}
          className="button rounded-xl bg-blue-800 text-white p-2 text-xl"
        >
          Sign Out
        </button>
      )}
      </div>
    </div>
  )
}

export default AuthButton
