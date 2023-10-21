"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"


const page = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [inputValue, setInputValue] = useState()
  const [errors, setErrors] = useState()

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
      }
      {
        try {
          const { data, error } = await supabase
            .from("todos")
            .insert([{ name: inputValue, done: false }])
            .select()
            await router.push('/')
            router.refresh()

          if (error) {
            setErrors(error)
            throw error
          }

          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  return (
    <section className="justify-center items-center flex flex-col w-100 w-[400px] bg-white p-5 rounded-xl ">
      <h2 className="mb-4 pb-1 border-b-2 text-left w-full text-2xl font-bold text-blue-800">
        Add a task
      </h2>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          type="text"
          name="name"
          className="text-lg rounded-lg p-2 w-100 outline-none mb-5"
          placeholder="Write your task"
          onChange={handleChange}
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
    </section>
  )
}

export default page
