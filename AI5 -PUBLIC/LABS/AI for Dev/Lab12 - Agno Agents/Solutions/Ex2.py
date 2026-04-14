from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools import tool
from secret_key import openai_api_key
import os
os.environ["OPENAI_API_KEY"] = openai_api_key
import requests

@tool()
def get_user_data(id : int) -> dict:
    """ Use this tool to get a specfic user's data by their ID """
    response = requests.get(f"https://jsonplaceholder.typicode.com/users/{id}")
    return response.json()

agent = Agent(
   model=OpenAIChat(id="gpt-4"),
   expected_output="User Data in bullets",
   tools=[get_user_data]
)

agent.print_response("Return only the name, username and email for user id 4, 5")