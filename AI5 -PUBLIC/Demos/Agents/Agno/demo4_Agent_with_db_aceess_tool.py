from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools import tool
from secret_key import openai_api_key
import os
import random
os.environ["OPENAI_API_KEY"] = openai_api_key
from pymongo import MongoClient

@tool()
def get_users() -> list:
    """ Get users data from a mongodb database """
    client = MongoClient(port=27017)
    db = client["AI5"]
    users_table = db["users"]
    # SELECT * FROM USERS
    data = list(users_table.find({}))
    return data

agent = Agent(
    role="Database Admin",
    goal="Report about the current users in the database",
    model=OpenAIChat(id="gpt-4"),
    description="You're excited about database administration, you have a sense of humor.",
    markdown=True,
    expected_output="Show a brief summary.",
    tools=[get_users]
)

agent.print_response("Tell me the current users in the database.", stream=True)