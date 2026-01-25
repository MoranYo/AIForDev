from typing import TypedDict, Literal
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    text : str    

# Nodes
def node_1(state : State):
    print("In node 1")
    return {"text" : state["text"] + "-1-"}

def node_2(state : State):
    print("In node 2")
    return {"text" : state["text"] + "-2-"}

def node_3(state : State):
    print("In node 3")
    return {"text" : state["text"] + "-3-"}

import random
def get_random_node(state : State) -> Literal["node_2", "node_3"]:
    if random.random() > 0.5:
        return "node_2"
    else:
        return "node_3"
    
    
graph = StateGraph(State)
graph.add_node("node_1", node_1)
graph.add_node("node_2", node_2)
graph.add_node("node_3", node_3)

graph.add_edge(START, "node_1")
graph.add_conditional_edges("node_1", get_random_node)
graph.add_edge("node_2", END)
graph.add_edge("node_3", END)

compiled_graph = graph.compile()
result = compiled_graph.invoke({"text" : ""})
print("FINAL RESULT!", result["text"])