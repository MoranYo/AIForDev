"""Chat interaction tool for UI communication."""

from google.genai.tools import tool


@tool()
def process_user_message(message: str) -> str:
    """
    Process a user message from the UI.
    
    Args:
        message (str): The user's input message
        
    Returns:
        str: Acknowledgment that message was received
    """
    return f"Received message: {message}"


@tool()
def format_response(response: str) -> dict[str, str]:
    """
    Format agent response for UI display.
    
    Args:
        response (str): The raw response from the agent
        
    Returns:
        dict[str, str]: Formatted response with metadata
    """
    return {
        "content": response,
        "status": "success",
        "timestamp": "",
    }
