"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

const Task = ({ name, done, id }) => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const params = useParams()

  const handleDelete = async (id) => {
    await supabase.from("todos").delete().eq("id", id)
    if (params) {
      router.push("/")
    }
    router.refresh()
  }

  return (
    <article
      href={"/task/" + id}
      className="w-full flex flex-col items-center justify-center border-b-2 mb-2 p-5 relative"
    >
      <button
        className="absolute top-1 right-2 "
        onClick={() => handleDelete(id)}
      >
        <AiOutlineClose className="font-bold text-2xl text-red-500 hover:scale-150 transition" />
      </button>
      {params?.id ? (
        <Link
          href={`/task/${id}/edit`}
          className="absolute bottom-3 right-2 "
        >
          <AiOutlineEdit className="font-bold text-2xl text-green-500 hover:scale-150 transition" />
        </Link>
      ) : null}
      <Link
        href={`/task/${id}`}
        className="w-full flex justify-center flex-col items-center"
      >
        <p className="text-xl font-bold">{name}</p>

        <p className="capitalize text-xl font-bold text-red-600">
          {JSON.stringify(done)}
        </p>
      </Link>
    </article>
  )
}

export default Task
