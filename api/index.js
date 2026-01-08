export default async function handler(req, res) {
  try {
    const apiKey = process.env.VITE_API_KEY;
    // Build target URL by appending the incoming path/query to the upstream cards endpoint
    const upstreamBase = "https://api.tcgdex.net/v2/en/cards";
    const suffix = req.url === "/" ? "" : req.url;
    const url = `${upstreamBase}${suffix}`;

    const upstreamRes = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey || "",
      },
    });

    const contentType = upstreamRes.headers.get("content-type") || "application/json";
    const body = await upstreamRes.text();

    res.status(upstreamRes.status);
    res.setHeader("content-type", contentType);
    return res.send(body);
  } catch (err) {
    console.error("API proxy error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
