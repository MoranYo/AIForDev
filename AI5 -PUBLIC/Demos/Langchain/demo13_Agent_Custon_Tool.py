from secret_keys import openai, serp_api_key
import os

from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType
from langchain.agents import tool

os.environ['OPENAI_API_KEY'] = openai

from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-3.5-turbo")


@tool()
def get_word_length(word: str) -> int:
    """Custom tool that returns the length of a given word."""
    return len(word)

tools = [
    Tool(
        name="Word Length",
        func=get_word_length.run,
        description="Use this tool to get the length of a given word. Input should be a single word."
    )
]

agent = initialize_agent(
    llm=model,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    tools=tools,
    verbose=True
)

agent.invoke("What is the length of the word 'extraordinary'?")