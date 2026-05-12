const API_PREFIX = "/api";

function getBackendBaseUrl() {
  return (process.env.API_URL || process.env.VITE_API_URL || "").replace(/\/$/, "");
}

function getTargetUrl(req) {
  const backendBaseUrl = getBackendBaseUrl();

  if (!backendBaseUrl) {
    return null;
  }

  const requestUrl = new URL(req.url, "http://localhost");
  const proxiedPath = `/${requestUrl.searchParams.get("path") || ""}`.replace(/\/$/, "");
  const query = new URLSearchParams(requestUrl.searchParams);
  query.delete("path");

  const apiBase = backendBaseUrl.endsWith(API_PREFIX)
    ? backendBaseUrl
    : `${backendBaseUrl}${API_PREFIX}`;
  const targetUrl = new URL(`${apiBase}${proxiedPath}`);
  targetUrl.search = query.toString();

  return targetUrl;
}

async function readBody(req) {
  if (req.body !== undefined) {
    if (Buffer.isBuffer(req.body)) {
      return req.body;
    }

    if (typeof req.body === "string") {
      return Buffer.from(req.body);
    }

    return Buffer.from(JSON.stringify(req.body));
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  const targetUrl = getTargetUrl(req);

  if (!targetUrl) {
    return res.status(500).json({
      message: "API_URL or VITE_API_URL must point to the Render backend URL"
    });
  }

  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;
  delete headers["content-length"];
  delete headers.origin;

  const hasBody = !["GET", "HEAD"].includes(req.method);
  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: hasBody ? await readBody(req) : undefined
  });

  res.status(response.status);
  response.headers.forEach((value, key) => {
    if (!["content-encoding", "content-length", "transfer-encoding"].includes(key)) {
      res.setHeader(key, value);
    }
  });

  return res.send(Buffer.from(await response.arrayBuffer()));
}
