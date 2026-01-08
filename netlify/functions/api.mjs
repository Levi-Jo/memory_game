export default async (req, context) => {
  try {
    const apiKey = Netlify.env.get("VITE_API_KEY") || "";
    const upstreamBase = "https://api.tcgdex.net/v2/en/cards";

    // Get the path after /api
    const url = new URL(req.url);
    const suffix = url.pathname.replace(/^\/api\/?/, "");
    const targetUrl = suffix ? `${upstreamBase}/${suffix}` : upstreamBase;

    const upstreamRes = await fetch(targetUrl, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    const contentType = upstreamRes.headers.get("content-type") || "application/json";
    const body = await upstreamRes.text();

    return new Response(body, {
      status: upstreamRes.status,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (err) {
    console.error("API proxy error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: ["/api", "/api/*"],
};
