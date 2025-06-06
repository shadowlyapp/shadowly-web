export async function fetchTranscriptData(videoId: string, lang?: string, isAutoGenerated?: boolean) {
    const params = new URLSearchParams({ id: videoId });
    if (lang) params.set("lang", lang);
    if (isAutoGenerated) params.set("autogen", "1");
  
    const res = await fetch(`http://localhost:3001/api/transcript/scrape?${params}`);
    if (!res.ok) throw new Error(`Transcript fetch failed with status ${res.status}`);
  
    return await res.json();
  }