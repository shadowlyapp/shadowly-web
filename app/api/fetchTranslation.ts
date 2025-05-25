export async function fetchTranslation(
    word: string,
    source: string,
    target: string
  ): Promise<string> {
    const res = await fetch("http://localhost:3001/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word, source, target }),
    });
  
    if (!res.ok) {
      throw new Error(`Translation failed: ${res.status}`);
    }
  
    const data = await res.json();
    return data.translatedText || "";
  }