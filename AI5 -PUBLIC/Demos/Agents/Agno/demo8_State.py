
from agno.tools import tool
import os
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key
from agno.agent import Agent
from agno.models.openai import OpenAIChat

@tool(description="Add an item to a shopping list")
def add_item(agent : Agent, item : str) -> None:
    agent.session_state["shopping_list"].append(item)
    print(f"The {item} has been added to the shopping list.")

@tool(description="Check if an item is in the shopping list")
def check_item(agent: Agent, item: str) -> bool:
    return item in agent.session_state["shopping_list"]

agent = Agent(
    role="You manage shopping lists for users.",
    model=OpenAIChat(id="gpt-5"),
    markdown=True,
    session_state = {"shopping_list": []},
    tools=[add_item, check_item]
)


agent.print_response("Add milk, eggs and bread to the shopping list", stream=True)
agent.print_response("Add coffee to the shopping list", stream=True)
print(agent.session_state["shopping_list"])
agent.print_response("Is there a milk in my shopping list", stream=True)
