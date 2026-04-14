from agno.agent import Agent
from agno.models.openai import OpenAIChat
import os
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key


agent = Agent(model=OpenAIChat(id="o3-mini"))
agent.print_response("Solve the trolley problem. Evaluate multiple ethical frameworks. Include an ASCII diagram of your solution.", stream=True)
