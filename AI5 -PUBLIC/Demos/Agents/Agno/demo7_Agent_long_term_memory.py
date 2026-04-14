from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.storage.sqlite import SqliteStorage
from secret_key import openai_api_key
import os
os.environ["OPENAI_API_KEY"] = openai_api_key

agent = Agent(
    model=OpenAIChat(id="gpt-5"),
    markdown=True,
    session_id="my_session_123",
    storage=SqliteStorage(table_name="agent_sessions", db_file="/temp/agent2.db"),
    add_history_to_messages=True,
)

agent.print_response("What was my first question?", stream=True)
