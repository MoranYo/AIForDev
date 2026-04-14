from agno.agent import Agent
from agno.models.openai import OpenAIChat
import os
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key



def add_item(agent : Agent, item: str) -> str:
    """ Add an item to the shopping list """
    print("ADDING TO SHOPPING LIST!!!")
    agent.session_state["shopping_list"].append(item)
    return f"Added {item} to the shopping list."


agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    session_state={"shopping_list": []},
    add_session_state_to_context=True, # Required so the agent is aware of the session state,
    enable_agentic_state = True,  # Adds a tool to manage the session state
    tools=[add_item],
)

response = agent.run("Add 'milk', 'eggs', and 'bread' to the shopping list.")
print(f"Response: {response.content}")
print(f"Session State: {response.session_state}")
