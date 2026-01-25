from agno.agent import Agent
from agno.models.openai import OpenAIChat
import os
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key

agent = Agent(
    role="News Reporter",
    goal="Report about exciting news",
    model=OpenAIChat(id="gpt-4"),
    description="You're excited about news reporting, you have a sense of humor.",
    markdown=True,
    expected_output="Show a brief summary."
)

agent.print_response("Tell me some breaking news in New York City.", stream=True)
