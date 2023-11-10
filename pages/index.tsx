import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout"

export default function Home() {
  const router = useRouter()
  const [rollNo, setRollNo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (rollNo.length < 8) return setError("Please enter a valid roll no."); 
    setError("");
    router.push(`/status?rollNo=${rollNo}`);
  }

  return (
    <Layout>
      <div className="h-[82vh] flex justify-center items-center">
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-2xl text-gray-600">Please enter your RGU roll number to check your examination application status</p>
          <div className="w-full flex items-center gap-5 p-2 rounded-full justify-between border border-blue-500">
            <input
              type="text"
              placeholder="RGU ROll No."
              className="input outline-0 pl-4 w-full"
              value={rollNo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRollNo(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key.toLowerCase() === "enter" && handleSubmit()}
            />
            <div
              className="group inline-block rounded-full bg-blue-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 cursor-pointer"
              onClick={handleSubmit}
            >
              <span
                className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent"
              >
                Submit
              </span>
            </div>
          </div>
          {
            error &&
            (
              <p className="text-red-500 text-center text-md">{error}</p>
            )
          }
        </div>
      </div>
    </Layout>
  )
}
