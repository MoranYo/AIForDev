from crewai import Agent, Crew, Task, Process
from crewai_tools import MCPServerAdapter
from mcp import StdioServerParameters

import os
os.environ["op"] = "DEBUG"

server_params = StdioServerParameters(
    command=["//workspaces//AIForDev//Lab7CrewAI-MCP//venv//bin//python3"],
    args=[""]
)

with MCPServerAdapter(server_params) as tools
