import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import {z} from 'zod'

const server = new McpServer({
    name: 'Weather Service',
    version: '1.0.0'
})

server.tool(
    'getWeather',
    { city: z.string() },
    async ({ city }) => {
        // Logic.....
        return {
            content: [
                {
                    type: 'text',
                    text: `The weather in ${city} is Sunny!`
                }
            ]
        }
    }
)

// STDIO - Standard Input/Output (basically means the server runs on the same machine as the client)
// SSE - Server-Sent Events 
// HTTP-STREAMABLE - HTTP streaming responses (Meaning we can host the server on a different machine)
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

const transport = new StdioServerTransport()
await server.connect(transport)