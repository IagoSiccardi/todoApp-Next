"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { useRouter, usePathname, useParams } from "next/navigation"

const Form = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const pathName = usePathname()
  const params = useParams()
  const [inputValue, setInputValue] = useState("")
  const [errors, setErrors] = useState()

  const getUser = async () => {
    const {
      data: {
        session: { user },
      },
    } = await supabase.auth.getSession()
    const userId = user.id

    return userId
  }

  const getTaskById = async () => {
    const { data } = await supabase.from("todos").select().eq("id", params.id)
    setInputValue(data[0].name)
  }

  if (pathName.slice(-4) === "edit") {
    getTaskById()
  }

  const handleEdit = async () => {
    await supabase
      .from("todos")
      .update({ name: inputValue })
      .eq("id", params.id)

    router.push("/task/" + params.id)
    router.refresh()
  }

  const handleAdd = async () => {
    const userId = await getUser()

    const { data, error } = await supabase
      .from("todos")
      .insert([{ name: inputValue, done: false, "user-id": userId }])
      .select()

    router.push("/")
    router.refresh()

    if (error) {
      setErrors(error)
      throw error
    }

    console.log(data)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputValue) {
      setErrors("A name is required.")
    } else {
      if (inputValue.length <= 3) {
        setErrors("The name must be greater than 3 characters.")
        throw new Error("The name must be greater than 3 characters.")
      } else {
        if (pathName.slice(-4) === "edit") {
          try {
            handleEdit()
          } catch (error) {
            console.log(error)
          }
        } else {
          try {
            handleAdd()
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }
  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <input
        autoComplete="off"
        type="text"
        name="name"
        className="text-lg rounded-lg p-2 w-100 outline-none mb-5"
        onChange={handleChange}
        placeholder={
          pathName.slice(-4) === "edit" ? inputValue : "Write your task"
        }
      />
      <button className="w-full rounded-lg bg-blue-800 text-white flex items-center justify-center p-2 cursor-pointer font-semibold transition hover:scale-105">
        Save
      </button>
      {errors && (
        <div className="mt-3 text-center text-red-600 font-medium">
          {errors}
        </div>
      )}
    </form>
  )
}

export default Form
