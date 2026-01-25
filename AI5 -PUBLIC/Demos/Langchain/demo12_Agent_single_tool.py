from secret_keys import openai, serp_api_key
import os
from langchain_community.utilities import SerpAPIWrapper
from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType

os.environ['OPENAI_API_KEY'] = openai
os.environ['SERPAPI_API_KEY'] = serp_api_key

from langchain_openai import ChatOpenAI

search = SerpAPIWrapper()
model = ChatOpenAI(model="gpt-3.5-turbo")

tools = [
    Tool(
        name="Google Search",
        func=search.run,
        description="Use this tool to get up-to-date information on current events or to find specific details about a topic. Input should be a search query."
    )
]

agent = initialize_agent(
    llm=model,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    tools=tools,
    verbose=True
)

agent.invoke("What is the highest mountain in Israel?")