serpapi = "YOUR_SERPAPI_KEY_HERE"
openai = "YOUR_OPENAI_API_KEY_HERE"

from typing import TypedDict, Annotated
from langchain_core.messages import HumanMessage, AnyMessage, AIMessage
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END, add_messages
from langchain.tools import tool
from langchain_community.utilities import SerpAPIWrapper
import requests
import os
os.environ["OPENAI_API_KEY"] = openai
os.environ["SERPAPI_API_KEY"] = serpapi

search = SerpAPIWrapper()

class State(TypedDict):
    messages : Annotated[list[AnyMessage], add_messages]

@tool()
def search_tool(query : str):
    """ Use this tool to look up answers from google """
    print("Tool Search Activated!")
    try:
        return search.run(query)
    except Exception as e:
        return f"Error during search: {e}"

@tool()
def fetch_url_content(url : str):
    """ Use this tool to send a GET request to a url and return the content """
    try:
        response = requests.get(url)
        return response.text
    except Exception as e:
        return f"Error fetching URL content: {e}"

tools = [search_tool, fetch_url_content]

model = ChatOpenAI(model="gpt-4o").bind_tools(tools)

tool_node = ToolNode(tools)

def run_llm(state : State) -> dict:
    messages = state["messages"]
    new_message =  model.invoke(messages)
    return {"messages" : [new_message]}

graph_builder = StateGraph(State)

# Nodes
graph_builder.add_node("llm", run_llm)
graph_builder.add_node("tools", tool_node)
graph_builder.add_node("llm_explain", run_llm)


# Edges
graph_builder.add_edge(START, "llm")
graph_builder.add_conditional_edges("llm", tools_condition)
graph_builder.add_edge("tools", "llm_explain")
graph_builder.add_edge("llm_explain", END)

graph = graph_builder.compile()


messages = []

while True:
    user_input = input("Enter your query: ")
    messages.append(HumanMessage(content=user_input))
    result = graph.invoke({'messages': messages})
    messages = result["messages"]
    print(messages)
    # print("AI Response:", messages[-1].content)

