from agno.agent import Agent
from agno.models.openai import OpenAIChat
from secret_key import openai_api_key
import os
os.environ["OPENAI_API_KEY"] = openai_api_key

agent = Agent(
    model=OpenAIChat(id="gpt-4"),
    markdown=True,
    add_history_to_messages=True
)

agent.print_response("What was my last question?")
agent.print_response("What is the capital of france?")
agent.print_response("What was my last question again?")