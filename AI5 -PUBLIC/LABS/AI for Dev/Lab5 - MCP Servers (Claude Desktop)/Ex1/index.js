import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import axios from "axios"

const server = new McpServer({
    name: "Products MCP Server",
    version: "1.0.0"
})



server.tool(
    "GetProducts",
    {},
    async () => {
        const response = await axios.get('https://fakestoreapi.com/products')
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data)
                }
            ]
        }

    }
)

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
const transport = new StdioServerTransport()
await server.connect(transport)