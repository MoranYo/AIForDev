require("dotenv").config();
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const app = express();

let accessToken = null;
let sessionId = null;

// In-memory PKCE/state store for demo purposes.
let pkceStore = {
  state: null,
  codeVerifier: null,
};

function base64UrlEncode(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function generateRandomString(size = 32) {
  return base64UrlEncode(crypto.randomBytes(size));
}

function generateCodeChallenge(codeVerifier) {
  const hash = crypto.createHash("sha256").update(codeVerifier).digest();
  return base64UrlEncode(hash);
}

function extractJsonFromEventStream(streamData) {
  if (typeof streamData === "object" && streamData !== null) {
    return streamData;
  }

  const responseStr = typeof streamData === "string" ? streamData : JSON.stringify(streamData);
  const match = responseStr.match(/data:\s*({.*})/s);
  if (!match) {
    try {
      return JSON.parse(responseStr);
    } catch (_err) {
      return null;
    }
  }

  try {
    return JSON.parse(match[1]);
  } catch (err) {
    console.error("Failed to parse event-stream JSON", err);
    return null;
  }
}

async function listToolsFromGateway() {
  const toolsResponse = await axios.post(
    process.env.GATEWAY_URL,
    {
      jsonrpc: "2.0",
      id: "2",
      method: "tools/list",
      params: {},
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "mcp-session-id": sessionId,
        Accept: "application/json, text/event-stream",
        "Content-Type": "application/json",
      },
    }
  );

  const parsed = extractJsonFromEventStream(toolsResponse.data);
  return parsed?.result?.tools || [];
}

function findProxiedToolName(tools, baseName) {
  const exact = tools.find((tool) => tool.name === baseName);
  if (exact) return exact.name;

  const proxied = tools.find((tool) => tool.name.startsWith(`${baseName}__`));
  if (proxied) return proxied.name;

  return baseName;
}

app.get("/", (req, res) => {
  res.send(`
    <h1>CyberArk Agent with PKCE</h1>
    <p><a href="/login">Login with OAuth + PKCE</a></p>
  `);
});

// STEP 1: Start OAuth login with PKCE
app.get("/login", (req, res) => {
  const state = generateRandomString(24);
  const codeVerifier = generateRandomString(48);
  const codeChallenge = generateCodeChallenge(codeVerifier);

  pkceStore.state = state;
  pkceStore.codeVerifier = codeVerifier;

  const authParams = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    scope: process.env.SCOPE || "openid",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const url = `${process.env.AUTH_URL}?${authParams.toString()}`;
  res.redirect(url);
});

// STEP 2: Callback endpoint
app.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  console.log("Callback received:", req.query);

  if (!code) {
    return res.status(400).send(`
      <h2>No authorization code</h2>
      <pre>${JSON.stringify(req.query, null, 2)}</pre>
      <p><a href="/login">Try again</a></p>
    `);
  }

  if (!state || state !== pkceStore.state) {
    return res.status(400).send(`
      <h2>Invalid state</h2>
      <p>Possible CSRF or stale login flow.</p>
      <p><a href="/login">Try again</a></p>
    `);
  }

  try {
    const tokenParams = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code_verifier: pkceStore.codeVerifier,
    });

    const tokenResponse = await axios.post(process.env.TOKEN_URL, tokenParams, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    accessToken = tokenResponse.data.access_token;

    pkceStore.state = null;
    pkceStore.codeVerifier = null;

    res.send(`
      <h2>Auth Success</h2>
      <p>Access token received.</p>
      <p><a href="/call-gateway">Call Gateway</a></p>
      <p><a href="/tools">List Tools</a></p>
    `);
  } catch (err) {
    console.error("Token exchange error:", err.response?.data || err.message);
    res.status(500).send(`
      <h2>Token exchange failed</h2>
      <pre>${JSON.stringify(err.response?.data || err.message, null, 2)}</pre>
      <p><a href="/login">Try again</a></p>
    `);
  }
});

// STEP 3: Initialize MCP session through Gateway
app.get("/call-gateway", async (req, res) => {
  if (!accessToken) {
    return res.send(`No token. <a href="/login">Login first</a>`);
  }

  try {
    const initResponse = await axios.post(
      process.env.GATEWAY_URL,
      {
        jsonrpc: "2.0",
        id: "1",
        method: "initialize",
        params: {
          protocolVersion: "2024-11-05",
          capabilities: {},
          clientInfo: {
            name: "CyberArk Agent PKCE",
            version: "1.0.0",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json, text/event-stream",
          "Content-Type": "application/json",
        },
      }
    );

    sessionId = initResponse.headers["mcp-session-id"] || null;

    res.send(`
      <h2>Gateway Connected</h2>
      <p>Session ID: ${sessionId || "not returned"}</p>
      <p><a href="/tools">List Tools</a></p>
      <p><a href="/run-add">Run add tool</a></p>
      <p><a href="/">Home</a></p>
    `);
  } catch (err) {
    const errorData = err.response?.data || err.message;
    const errorStatus = err.response?.status;
    const errorHeaders = err.response?.headers;
    console.error("Gateway init error:", {
      status: errorStatus,
      headers: errorHeaders,
      data: errorData,
    });

    res.status(500).send(`
      <h2>Gateway init failed</h2>
      <p>Status: ${errorStatus || "unknown"}</p>
      <p>Headers: <pre>${JSON.stringify(errorHeaders, null, 2)}</pre></p>
      <pre>${JSON.stringify(errorData, null, 2)}</pre>
      <p><a href="/login">Login again</a></p>
    `);
  }
});

// STEP 4: List tools
app.get("/tools", async (req, res) => {
  if (!accessToken || !sessionId) {
    return res.send(`No session. <a href="/call-gateway">Initialize first</a>`);
  }

  try {
    const tools = await listToolsFromGateway();

    const html = tools.length
      ? `<ul>${tools
          .map(
            (tool) =>
              `<li><strong>${tool.name}</strong>: ${tool.description || "No description"}</li>`
          )
          .join("")}</ul>`
      : `<p>No tools found.</p>`;

    res.send(`
      <h2>Available Tools</h2>
      ${html}
      <p><a href="/run-add">Run add tool</a></p>
      <p><a href="/call-gateway">Back</a></p>
    `);
  } catch (err) {
    console.error("Tools error:", err.response?.data || err.message);
    res.status(500).send(`
      <h2>Tools request failed</h2>
      <pre>${JSON.stringify(err.response?.data || err.message, null, 2)}</pre>
      <p><a href="/call-gateway">Back</a></p>
    `);
  }
});

// STEP 5: Call calculator add tool
app.get("/run-add", async (req, res) => {
  if (!accessToken || !sessionId) {
    return res.send(`No session. <a href="/call-gateway">Initialize first</a>`);
  }

  try {
    const tools = await listToolsFromGateway();
    const toolName = findProxiedToolName(tools, "add");

    if (!tools.length) {
      return res.send(`
        <h2>No tools available</h2>
        <p><a href="/tools">Fetch tools first</a></p>
      `);
    }

    const toolResponse = await axios.post(
      process.env.GATEWAY_URL,
      {
        jsonrpc: "2.0",
        id: "3",
        method: "tools/call",
        params: {
          name: toolName,
          arguments: {
            a: 5,
            b: 3,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "mcp-session-id": sessionId,
          Accept: "application/json, text/event-stream",
          "Content-Type": "application/json",
        },
      }
    );

    res.send(`
      <h2>Tool Call Result</h2>
      <p>Using tool name: <strong>${toolName}</strong></p>
      <pre>${typeof toolResponse.data === "string" ? toolResponse.data : JSON.stringify(toolResponse.data, null, 2)}</pre>
      <p><a href="/tools">Back to tools</a></p>
    `);
  } catch (err) {
    console.error("Tool call error:", err.response?.data || err.message);
    res.status(500).send(`
      <h2>Tool call failed</h2>
      <pre>${JSON.stringify(err.response?.data || err.message, null, 2)}</pre>
      <p><a href="/tools">Back</a></p>
    `);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Agent running at http://localhost:${port}`);
});
