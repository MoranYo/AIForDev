from agno.agent import Agent
from agno.embedder.openai import OpenAIEmbedder
from agno.models.openai import OpenAIChat
# from agno.tools.duckduckgo import DuckDuckGoTools
from agno.vectordb.lancedb import LanceDb
from agno.knowledge.pdf import PDFKnowledgeBase

import os
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key

kb = PDFKnowledgeBase(
    path="./ThaiRecipes.pdf",
    vector_db=LanceDb(
        uri="tmp/lancedb",
        table_name="recipes_2",
        embedder=OpenAIEmbedder()
    )
)

agent = Agent(
    role="You are a thai cuisine expert.",
    model=OpenAIChat(id="gpt-5"),
    instructions=["Search your knowledgebase for thai recipes"],
    knowledge=kb,
    markdown=True
)

if agent.knowledge is not None:
    agent.knowledge.load()
    
    
agent.print_response("How do i make chicken and galangal in coconut milk soup?")