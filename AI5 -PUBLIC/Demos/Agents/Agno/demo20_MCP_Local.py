# C:\Users\miche\Desktop\AI5 -PUBLIC\Demos\MCP\Demo1_WeatherServiceMCP

from agno.agent import Agent
from agno.models.openai import OpenAIChat
import os
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key
from agno.tools.mcp import MCPTools
from mcp import StdioServerParameters
import asyncio



async def AI5_run_agent(prompt : str):

        mcp_tools = MCPTools(
        server_params=StdioServerParameters(
            command="node",
            args=["C:\\Users\\miche\\Desktop\\AI5 -PUBLIC\\Demos\\MCP\\Demo1_WeatherServiceMCP\\index.js"],
        ),
        timeout_seconds=30
    ) 
    
        agent = Agent(
            tools=[mcp_tools],
            markdown=True,
            model=OpenAIChat(id="gpt-4o"),
            
        )
    
        await agent.aprint_response(prompt,stream=True, debug_mode=True)


asyncio.run(AI5_run_agent("What is the weather in london?"))

