"""Main entry point for the chat agent with UI interaction."""

import os
from typing import Optional
from agents.chat_agent import create_chat_agent, send_message


def run_interactive_chat(
    model_name: str = "gemini-2.0-flash-exp",
    api_key: Optional[str] = None,
) -> None:
    """
    Run an interactive chat session with the agent.
    
    Args:
        model_name (str): Model name for the agent
        api_key (Optional[str]): API key for authentication
    """
    # Get API key from environment if not provided
    if api_key is None:
        api_key = os.getenv("GOOGLE_API_KEY")
    
    if not api_key:
        print("Warning: No API key provided. For local LLM, configure base_url.")
    
    # Create agent
    print("Initializing chat agent...")
    agent = create_chat_agent(model_name=model_name, api_key=api_key)
    print("Agent ready! Type 'quit' or 'exit' to stop.\n")
    
    # Interactive loop
    while True:
        try:
            user_input = input("You: ").strip()
            
            if not user_input:
                continue
            
            if user_input.lower() in ["quit", "exit", "bye"]:
                print("Goodbye!")
                break
            
            # Send message to agent
            response = send_message(agent, user_input)
            print(f"Agent: {response}\n")
            
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"Error: {e}")
            continue


def main() -> None:
    """Main entry point."""
    print("=" * 50)
    print("Simple ADK Chat Agent with Local LLM Support")
    print("=" * 50)
    print()
    
    run_interactive_chat()


if __name__ == "__main__":
    main()
