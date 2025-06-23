import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const userMessage = body.messages?.[body.messages.length - 1]?.content ?? "";
  const url = "http://34.128.98.251:5000";
  const fullUrl = `${url}/api/query`;
  const oldUrl = "http://34.128.98.251:8080/api/query_nlp";
  const res = await fetch(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userMessage }),
  });

  const data = await res.json();

  let content = "";

  if (data.result?.error) {
    content = `❌ *Terjadi error saat eksekusi SQL:*\n\n\`${data.result.error}\`\n\nCoba ubah pertanyaannya agar menghasilkan satu SQL saja.`;
  } else {
    content = `✅ *Jawaban untuk pertanyaan:* "${
      data.question
    }"\n\n\`\`\`json\n${JSON.stringify(data.result, null, 2)}\n\`\`\``;
  }

  return NextResponse.json({
    messages: [
      {
        role: "assistant",
        content: data,
      },
    ],
  });
}
