"use client";

import { useState } from "react";

export default function ChatTestPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Gagal memanggil API");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tes Chat ke API Flask</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tulis pertanyaan..."
        className="border px-4 py-2 w-full rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Kirim
      </button>

      <pre className="mt-6 p-4 bg-zinc-900 text-green-400 rounded">
        {response}
      </pre>
    </div>
  );
}
