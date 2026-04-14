

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.embedder.openai import OpenAIEmbedder
from agno.storage.sqlite import SqliteStorage
from agno.vectordb.lancedb import LanceDb, SearchType
from agno.knowledge.url import UrlKnowledge
from agno.tools import tool
import random
base_url = "https://science.nasa.gov/climate-change/effects/"

import os
os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"

@tool()
def get_weather_condition(location: str):
    """A tool to get current weather condition for a given location."""
    weather_conditions = ["sunny", "rainy", "cloudy", "stormy", "snowy"]
    return random.choice(weather_conditions)

kb = UrlKnowledge(
    urls=[base_url],
    vector_db=LanceDb(
        uri="tmp/lancedb",
        table_name="globalwarming",
        search_type=SearchType.hybrid,
        embedder=OpenAIEmbedder(),
    )
)

kb.load(recreate=False)

agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    knowledge=kb,
    session_id='fixed_session_123',
    storage=SqliteStorage(table_name="agent_sessions", db_file="/tmp2/agent.db"),
    tools=[get_weather_condition],
    markdown=True,
    instructions=["Always prefer using storage for previous interactions before using your knowledgebase",
                  "Use the tool only when asked about weather in specific location"],
    # add_history_to_messages=True
)


agent.print_response("Summarize the effects of global warming changes according to NASA.", stream=True)
agent.print_response("What is the risk of Longer Wildfire Season?", stream=True)
agent.print_response("Summarize the effects of global change", stream=True)
agent.print_response("What is the weather in Rome?", stream=True)
