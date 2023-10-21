import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const metadata = {
  title: "TodoApp | Task"
}

const page = async ({ params }) => {
  const supabase = createClientComponentClient()
  const { data } = await supabase.from("todos").select().eq("id", +params.id)

  return <div>{data[0].name}</div>
}

export default page
