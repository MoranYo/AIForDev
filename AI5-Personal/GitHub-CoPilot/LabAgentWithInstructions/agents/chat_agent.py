"""Chat agent that connects to a local LLM."""

from typing import Any, Optional
from google.genai import Agent
from google.genai.types import GenerateContentConfig


def create_chat_agent(
    model_name: str = "gemini-2.0-flash-exp",
    api_key: Optional[str] = None,
    base_url: Optional[str] = None,
) -> Agent:
    """
    Create a chat agent that can interact with a local LLM.
    
    Args:
        model_name (str): The name of the model to use
        api_key (Optional[str]): API key for authentication (if needed)
        base_url (Optional[str]): Base URL for local LLM endpoint
        
    Returns:
        Agent: Configured agent instance
    """
    config = GenerateContentConfig(
        temperature=0.7,
        top_p=0.95,
        max_output_tokens=2048,
    )
    
    agent = Agent(
        model=model_name,
        config=config,
        system_instruction=(
            "You are a helpful AI assistant. "
            "Provide clear, concise, and accurate responses to user queries."
        ),
    )
    
    return agent


def send_message(agent: Agent, message: str) -> str:
    """
    Send a message to the agent and get a response.
    
    Args:
        agent (Agent): The agent instance
        message (str): User message to send
        
    Returns:
        str: Agent's response
    """
    response = agent.generate_content(message)
    return response.text
