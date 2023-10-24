import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


export const checkSession = async () => {
  const supabase = createClientComponentClient()

    const { data } = await supabase.auth.getSession()
    return data

}



export const signOut = async () => {
    const supabase = createClientComponentClient()
    await supabase.auth.signOut()

}
