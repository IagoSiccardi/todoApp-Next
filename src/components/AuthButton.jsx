"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkSession, signOut } from "@/libs/checkSession"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


const AuthButton = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [user, setUser] = useState(false)

  useEffect(() => {
        checkSession()
        .then( data => {
          setUser(data);

        })

  }, [])

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.SITE_URL}/auth/callback`,
      },
    })
    router.reload()
  }

  const handleSingOut = () => {
    signOut()
    setUser(false)
  }

  return (
      <div className="h-[200px] w-[300px] bg-white flex items-center justify-center rounded-3xl flex-col gap-4">
        {user?.session  === null ? (
          <>
            <h2 className="text-2xl font-bold text-blue-900">
              Sign in to continue
            </h2>
            <button
              onClick={handleSignIn}
              className="button rounded-xl bg-blue-800 text-white p-2 text-xl"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
          
            <button
              onClick={handleSingOut}
              className="button rounded-xl bg-blue-800 text-white p-2 text-2xl font-semibold"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
  )
}

export default AuthButton
