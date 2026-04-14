
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.reasoning import ReasoningTools

import os

from agno.storage.sqlite import SqliteStorage
from dotenv import load_dotenv

load_dotenv(override=True)


# --- 1. Define the Self-Reflection Instructions ---
# These instructions guide the agent's internal thought process.
SELF_REFLECTION_INSTRUCTIONS = [
    "Before providing the final answer, you must use the 'think()' tool to reason about the required steps.",
    "After generating a draft of the response, you must use the 'analyze()' tool to self-critique it.",
    "Your self-critique (analyze) must check the draft for:",
    "  a) Completeness: Did I answer all parts of the user's request?",
    "  b) Accuracy: Is the information logically sound and factually correct?",
    "  c) Clarity: Is the response easy to read and well-structured?",
    "Based on the analysis, revise the draft if necessary.",
    "Only output the final, revised response.",
    "Always provide a brief, professional response format."
]


# --- 2. Create the Agent with ReasoningTools ---
def create_self_reflecting_agent():
    """Initializes and returns the Agno Agent with self-reflection instructions."""

    # Use an LLM model (replace with your preferred model/wrapper)
    # Ensure you have the corresponding API key set in your environment variables.
    model = OpenAIChat(id="gpt-4o")

    # Create the agent
    reflection_agent = Agent(
        name="SelfReflectingAnalyst",
        model=model,
        # The ReasoningTools are key for self-reflection (think(), analyze())
        tools=[ReasoningTools()],
        description="You are a professional analyst that provides well-reasoned, self-critiqued, and high-quality reports.",
        instructions=SELF_REFLECTION_INSTRUCTIONS,
        # Display the reasoning steps in the output (optional, but helpful for debugging)
        markdown=True
    )
    return reflection_agent


agent = create_self_reflecting_agent()
agent.print_response("Explain the key differences between a HashMap and a TreeMap in Java, and provide a small code example for each")