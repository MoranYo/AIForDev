from agno.agent import Agent
from agno.embedder.openai import OpenAIEmbedder
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.vectordb.lancedb import LanceDb
from agno.knowledge.url import UrlKnowledge

import os
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key

kb = UrlKnowledge(
    urls=["https://science.nasa.gov/climate-change/effects/"],
    vector_db=LanceDb(
        uri="tmp/lancedb",
        table_name="climate_change_effects",
        embedder=OpenAIEmbedder(),
    )
)

agent = Agent(
    model=OpenAIChat(id="gpt-5"),
    knowledge=kb,
    tools=[DuckDuckGoTools()],
    instructions=["After using your knowledge base, use DuckDuckGo to search for up-to-date information."],
    markdown=True
)

if agent.knowledge is not None:
    agent.knowledge.load()
    
    
response = agent.print_response("What are the effects of climate change according to NASA?")

