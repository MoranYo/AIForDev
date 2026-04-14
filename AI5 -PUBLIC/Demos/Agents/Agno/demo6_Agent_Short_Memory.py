from agno.agent import Agent
from agno.models.openai import OpenAIChat
from secret_key import openai_api_key
import os
os.environ["OPENAI_API_KEY"] = openai_api_key

agent = Agent(
    model=OpenAIChat(id="gpt-5"),
    markdown=True,
    add_history_to_messages=True,
    num_history_runs=5
)

agent.print_response("The magic number is 5, remember that for the future", stream=True)
agent.print_response("What is the capital of France?", stream=True)
agent.print_response("What is the magic number?", stream=True)
agent.print_response("What was my first question?", stream=True)
