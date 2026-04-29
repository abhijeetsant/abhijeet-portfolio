export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Gemini API key not configured" });
  try {
    const body = req.body;
    const bodyStr = JSON.stringify(body);
    if (bodyStr.length > 50000) return res.status(413).json({ error: "Request too large" });
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: bodyStr });
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: "Gemini API error", status: response.status });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
