import Task from "@/components/Task"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"

export const metadata = {
  title: "TodoApp | Home"
}


const page = async ({ searchParams }) => {
  const supabase = createServerComponentClient({ cookies })
  const page = (await searchParams.page) ? +searchParams.page : 1

  const fetchData = async (pagina) => {
    const limit = 6
    const max = pagina * limit
    const min = max - limit + 1
    const data = await supabase
      .from("todos")
      .select()
      .limit(limit)
      .range(min, max)

    return data
  }

  const { data } = await fetchData(page)

  return (
    <section className="transition p-10 justify-center items-center flex flex-col w-100 w-[500px] bg-white  rounded-xl relative ">
      <h2 className="mb-4 pb-1 border-b-2 text-left w-full text-2xl font-bold text-blue-800">
        Tasks
      </h2>
      {data.length > 0 ? (
        data.map(({ id, name, done }) => {
          return <Task key={id} name={name} done={done} id={id} />
        })
      ) : (
        <div className="h-[100px] flex items-center justify-center text-xl text-gray-500 font-semibold">
          No pending task...
        </div>
      )}
      <Link
        href={"/new"}
        className=" w-full rounded-lg bg-blue-800 text-white flex items-center justify-center p-2 mb-6 cursor-pointer font-semibold transition hover:scale-105"
      >
        Add tasks
      </Link>
      <div className="flex gap-0 absolute bottom-0 right-3 p-3 rounded-xl text-white items-center font-semibold">
        <Link
          href={{
            pathname: "/",
            query: { page: page > 1 ? page - 1 : 1 },
          }}
          className={`p-2 rounded-l-xl transition text-white ${ page === 1 ? 'bg-slate-500' : ' bg-blue-600 hover:scale-105'}`}
        >
          <button disabled={page === 1 && true}>Previous</button>
        </Link>
        <Link
          href={{
            pathname: "/",
            query: { page: +page + 1 },
          }}
          className={`p-2 rounded-r-xl transition text-white ${ data?.length < 6 ? 'bg-slate-500' : ' bg-blue-800 hover:scale-105'}`}
        >
          <button disabled={data?.length < 6 && true}>Next</button>
        </Link>
      </div>
    </section>
  )
}

export default page
