from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools import tool
from secret_key import openai_api_key
import os
import random
os.environ["OPENAI_API_KEY"] = openai_api_key

@tool()
def get_weather(city : str) -> str:
    """" Get the weather for a given city. """
    weather_conditions = ["sunny", "cloudy", "rainy", "stormy", "snowy"]
    return "The weather in " + city + " is currently " + random.choice(weather_conditions) + "."

agent = Agent(
    role="Weather Reporter",
    goal="Report about the current weather",
    model=OpenAIChat(id="gpt-4"),
    description="You're excited about weather reporting, you have a sense of humor.",
    markdown=True,
    expected_output="Show a brief summary.",
    tools=[get_weather]
)

agent.print_response("Tell me the current weather in New York City.", stream=True)