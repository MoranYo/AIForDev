from crewai import Agent, Task, Crew
from crewai_tools import MCPServerAdapter
from mcp import StdioServerParameters

import os
os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"

server_params = [
    StdioServerParameters(
        command="python",
        args=["C:\\Users\\miche\\Desktop\\AI5 -PUBLIC\\Demos\\Agents\\CrewAI\\Lab9 - CrewAI MCPS\\MCP_Server\\main.py"],
    )
]

with MCPServerAdapter(server_params) as tools:
    for tool in tools:
        print(tool.name)

    agent = Agent(
        role="Scraper Manager",
        goal="Scrape data from API and store it in a database",
        backstory="An expert in database management and web scraping",
        tools=tools,
        verbose=True
    )

    task = Task(
        description="Use this URL to get data: {url}, store the data in a a database, choose a relevent name for the database and collection, and insert that data.",
        expected_output="The name of the database and collection where the data is stored. and the first document data",
        agent=agent
    )

    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True,
        
    )

    result = crew.kickoff(inputs={"url": "https://jsonplaceholder.typicode.com/users"})
    print("#######################")
    print(result)