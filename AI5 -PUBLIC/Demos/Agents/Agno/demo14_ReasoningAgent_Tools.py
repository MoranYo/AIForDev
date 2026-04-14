from agno.agent import Agent
from agno.models.openai import OpenAIChat
import os
from agno.tools.reasoning import ReasoningTools
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key


agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    reasoning=True,
    tools=[ReasoningTools(think=True, analyze=True, add_instructions=True)],
    instructions="Use tables where possible"
    )

agent.print_response("Solve the trolley problem. Evaluate multiple ethical frameworks. Include an ASCII diagram of your solution.", stream=True, show_full_reasoning=True)
