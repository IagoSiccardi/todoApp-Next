import Task from "@/components/Task"
import { checkSessionSSR } from "@/libs/checkSessionSSR"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const metadata = {
  title: "TodoApp | Task",
}

const page = async ({ params }) => {
  const session = await checkSessionSSR()

  if (session.session === null) {
    redirect("/login")
  }

  const supabase = createServerComponentClient({cookies})
  const { data } = await supabase.from("todos").select().eq("id", +params.id)

  return (
    <section className="transition p-3 justify-center  flex flex-col w-100 w-[500px] bg-white  rounded-xl relative ">
      <h2 className="text-left text-xl font-bold text-blue-800 border-b-2 pb-2 mb-3">
        Your task
      </h2>
      <div className="w-full">
        <Task
          key={data[0]?.id}
          name={data[0]?.name}
          id={data[0]?.id}
          done={data[0]?.done}
        />
      </div>
    </section>
  )
}

export default page
