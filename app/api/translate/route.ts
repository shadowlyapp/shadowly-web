// app/api/translate/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();
  const { word, source = "en", target = "es" } = body;
  const apiKey = process.env.DEEPL_API_KEY;

  if (!word || !apiKey) {
    return NextResponse.json(
      { error: "Missing word or DeepL API key" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      new URLSearchParams({
        text: word,
        source_lang: source.toUpperCase(),
        target_lang: target.toUpperCase(),
        auth_key: apiKey,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const translatedText = response.data.translations?.[0]?.text || "";

    return NextResponse.json({ translatedText });
  } catch (err: any) {
    console.error("🛑 DeepL translation error:", err.message);
    return NextResponse.json(
      { error: "Translation failed", details: err.message },
      { status: 500 }
    );
  }
}