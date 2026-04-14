from typing import TypedDict, Annotated
from langchain_core.messages import HumanMessage, AnyMessage, AIMessage
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END, add_messages
from langchain.tools import tool
import os
openai = "YOUR_OPENAI_API_KEY"
os.environ["OPENAI_API_KEY"] = openai

class State(TypedDict):
    messages : Annotated[list[AnyMessage], add_messages]

@tool()
def string_length(text : str) -> int:
    """ Returns the length of the input string.
    """
    return len(text)

@tool()
def multiply_by_two(number : int) -> int:
    """ Multiplies the input number by two.
    """
    return number * 2

tools = [string_length, multiply_by_two]

model = ChatOpenAI(model="gpt-3.5-turbo").bind_tools(tools) 
# multiply_by_two
# string_length

def run_llm(state : State):
    messages = state["messages"]
    new_message =  model.invoke(messages)
    return {"messages" : [new_message]}

tool_node = ToolNode(tools)

graph_builder = StateGraph(State)
graph_builder.add_node("llm", run_llm)
graph_builder.add_node("tools", tool_node)
graph_builder.add_node("llm_with_result", run_llm)

graph_builder.add_edge(START, "llm")
graph_builder.add_conditional_edges("llm", tools_condition)
graph_builder.add_edge("tools", "llm_with_result")
graph_builder.add_edge("llm_with_result", END)

graph = graph_builder.compile()
result  = graph.invoke({'messages': [HumanMessage(content="What is 5 * 3?")]})
print("FINAL RESULT:", result['messages'])
print("FINAL RESULT:", result['messages'][-1].content)