require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
let accessToken = null;
let sessionId = null;

app.get("/", (req, res) => {
  res.send(`
    <h1>CyberArk Agent</h1>
    <p><a href="/login">Login with OAuth</a></p>
  `);
});

// STEP 1: Start OAuth login
app.get("/login", (req, res) => {
  const url = `${process.env.AUTH_URL}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(
    process.env.REDIRECT_URI
  )}&scope=openid`;
  res.redirect(url);
});

// STEP 2: Callback endpoint
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  
  console.log("📍 Callback received");
  console.log("Full query:", req.query);
  console.log("Full URL:", req.originalUrl);

  if (!code) {
    console.error("❌ No code in query params");
    return res.send(`
      <h2>❌ No Authorization Code</h2>
      <p>Full URL: ${req.originalUrl}</p>
      <p>Query params: ${JSON.stringify(req.query)}</p>
      <a href="/login">Try again</a>
    `);
  }

  try {
    const response = await axios.post(
      process.env.TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    accessToken = response.data.access_token;

    res.send(`
      <h2>✅ Auth Success</h2>
      <p>Access Token received.</p>
      <a href="/call-gateway">Call Gateway</a>
    `);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.send("❌ Token exchange failed");
  }
});

// STEP 3: Call Gateway (MCP endpoint)
app.get("/call-gateway", async (req, res) => {
  if (!accessToken) {
    return res.send("❌ No token. Go to /login first.");
  }

  try {
    // First, make initial request to establish session and get session ID
    console.log("📍 Calling gateway to establish session...");
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
            name: "CyberArk Agent",
            version: "1.0.0",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept": "application/json, text/event-stream",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📍 Init response:", initResponse.data);

    // Parse session ID from response header
    const mpcSessionId = initResponse.headers["mcp-session-id"];
    if (mpcSessionId) {
      sessionId = mpcSessionId;
      console.log("📍 Session ID:", sessionId);
    }

    res.send(`
      <h2>✅ Gateway Connected</h2>
      <p>Server: <strong>calculator</strong></p>
      <p><a href="/tools">List Tools</a> | <a href="/">Home</a></p>
    `);
  } catch (err) {
    console.error("Gateway error:", err.response?.data || err.message);
    res.send(`
      <h2>❌ Gateway Error</h2>
      <pre>${JSON.stringify(err.response?.data || err.message, null, 2)}</pre>
      <p><a href="/login">Login again</a></p>
    `);
  }
});

// List tools via gateway
app.get("/tools", async (req, res) => {
  if (!accessToken || !sessionId) {
    return res.send("❌ No session. <a href='/login'>Login first</a>");
  }

  try {
    console.log("📍 Requesting tools list...");
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
          "Accept": "application/json, text/event-stream",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📍 Tools raw response:", toolsResponse.data);

    let toolsHtml = "<h2>📋 Available Tools</h2>";
    
    try {
      // Parse the event-stream format: "event: message\r\ndata: {...}\r\n\r\n"
      const responseStr = toolsResponse.data;
      const dataMatch = responseStr.match(/data: ({.*})/);
      
      if (dataMatch && dataMatch[1]) {
        const jsonData = JSON.parse(dataMatch[1]);
        console.log("📍 Parsed JSON:", jsonData);
        
        if (jsonData.result && jsonData.result.tools) {
          const tools = jsonData.result.tools;
          toolsHtml += "<ul>";
          tools.forEach((tool) => {
            toolsHtml += `<li><strong>${tool.name}</strong>: ${tool.description || "No description"}</li>`;
          });
          toolsHtml += "</ul>";
        } else {
          toolsHtml += `<p>No tools found in response</p>`;
          toolsHtml += `<pre>${JSON.stringify(jsonData, null, 2)}</pre>`;
        }
      } else {
        toolsHtml += `<p>Could not parse response format</p>`;
        toolsHtml += `<pre>${responseStr}</pre>`;
      }
    } catch (e) {
      console.error("Error parsing tools:", e);
      toolsHtml += `<p>Error parsing response: ${e.message}</p>`;
      toolsHtml += `<pre>${toolsResponse.data}</pre>`;
    }

    toolsHtml += '<p><a href="/call-gateway">Back</a> | <a href="/">Home</a></p>';

    res.send(toolsHtml);
  } catch (err) {
    console.error("Tools list error:", err.response?.data || err.message);
    res.send(`
      <h2>❌ Error Listing Tools</h2>
      <pre>${JSON.stringify(err.response?.data || err.message, null, 2)}</pre>
      <p><a href="/call-gateway">Back</a></p>
    `);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Agent running on http://localhost:${port}`);
});
