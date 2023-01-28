"use client"
import { FormEvent, FormEventHandler, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let [input, setInput] = useState("");

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();

    setLoading(true);

    let result = await fetch("/api/makeart", {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({input})
    });
    let data = await result.json();

    
    router.push(`/art?artId=${data.artId}`);
    setLoading(false);
  }

  return (
    <div className="h-screen bg-background flex items-center justify-center flex-col text-white">
      <div className="flex justify-center p-5">
        <h1 className="text-5xl font-bold">
          Tell
          <span className="p-3 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black">
            ai
          </span>
          what to generate
        </h1>
      </div>
      <div className="flex justify-center p-5 pb-3">
        <form onSubmit={handleSubmit}>
          <input value={input} onChange={e => setInput((e.target as HTMLInputElement).value)} className="border-none rounded w-[360px] h-14 py-2 px-3 text-black text-lg focus:outline-none focus:shadow-outline" id="input" type="text" placeholder="Type at least three words..."/>
        </form>
      </div>
      <div onClick={handleSubmit} className="text-sm cursor-pointer underline">Continue...</div>
      {loading ? (
        "Loading..."
      ) : (
        ""
      )}
    </div>
  )
}
