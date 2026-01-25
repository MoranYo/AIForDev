from typing import TypedDict, Annotated
from langchain_core.messages import HumanMessage, AnyMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END, add_messages
openai = "YOUR_OPENAI_API_KEY_HERE"


import os
os.environ["OPENAI_API_KEY"] = openai


class State(TypedDict):
    messages : Annotated[list[AnyMessage], add_messages]
    name : str = ""
    
    
llm = ChatOpenAI(model="gpt-3.5-turbo")

def run_llm(state : State):
    print("STATE!!!", state["messages"])
    message = llm.invoke(state["messages"])
    return {"messages" : [message], "name": "Avi"}

graph_builder = StateGraph(State)
graph_builder.add_node("node1", run_llm)
graph_builder.add_edge(START, "node1")
graph_builder.add_edge("node1", END)
graph = graph_builder.compile()

messages = [HumanMessage(content="Tell me a joke about computers.")]
result = graph.invoke({'messages': messages, 'name': ""})
print("FINAL RESULT:", result['messages'][-1].content)
print("FINAL RESULT:", result['name'])