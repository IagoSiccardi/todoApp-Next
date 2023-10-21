import Form from "@/components/Form"

const page = () => {
  return (
    <section className="justify-center items-center flex flex-col w-100 w-[400px] bg-white p-5 rounded-xl ">
      <h2 className="mb-4 pb-1 border-b-2 text-left w-full text-2xl font-bold text-blue-800">
        Edit your task
      </h2>
      <Form />
    </section>
  )
}

export default page