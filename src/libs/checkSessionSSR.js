import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export const checkSessionSSR = async () => {
    const supabase = createServerComponentClient({cookies})
  
      const { data } = await supabase.auth.getSession()
      return data
  
  }