from agno.agent import Agent
from agno.models.openai import OpenAIChat
from secret_key import openai_api_key
import os
os.environ["OPENAI_API_KEY"] = openai_api_key


info_agent = Agent(
    name="Info Agent",
    role="General information Expert",
    goal="Summarizing general information about a given topic",
    model=OpenAIChat(id="gpt-4"),
    expected_output="Give 7 bullet points summarizing the topic.",
)

info_agent.print_response("Tell me some facts about Black Holes", stream=True)