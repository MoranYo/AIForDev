# Simple ADK Chat Agent with Local LLM Support

A simple Google Agent Development Kit (ADK) agent that enables UI interaction with a local LLM.

## Project Structure

```
/agents          # Agent implementations and flows
  chat_agent.py  # Main chat agent with local LLM support
  chat_flow.py   # Flow orchestration for chat interactions
/tools           # ADK tools for specific operations
  chat_tools.py  # Tools for processing and formatting messages
/helpers         # Helper utilities
/tests           # Test files
main.py          # Entry point for running the agent
requirements.txt # Python dependencies
```

## Setup

1. **Install dependencies:**

```powershell
pip install -r requirements.txt
```

2. **Set up API key (if using Google AI):**

```powershell
$env:GOOGLE_API_KEY = "your-api-key-here"
```

For local LLM, configure the `base_url` parameter in `create_chat_agent()`.

## Usage

Run the interactive chat agent:

```powershell
python main.py
```

The agent will start an interactive session where you can:
- Type messages to chat with the agent
- Type `quit`, `exit`, or `bye` to end the session
- Press Ctrl+C to interrupt

## Configuration

Modify `agents/chat_agent.py` to customize:
- `model_name`: Change the model
- `base_url`: Point to your local LLM endpoint
- `temperature`: Adjust response creativity (0.0-1.0)
- `max_output_tokens`: Control response length

## Using with Local LLM

To use a local LLM (like Ollama or LM Studio):

1. Start your local LLM server
2. Update `create_chat_agent()` in `agents/chat_agent.py`:

```python
agent = create_chat_agent(
    model_name="your-local-model",
    base_url="http://localhost:11434",  # Your local LLM URL
)
```

## Development

### Running Tests

```powershell
pytest tests/
```

### Code Style

This project follows:
- PEP-8 formatting
- Google-style docstrings
- Type hints throughout
- Pure function design

## Architecture

- **Agent**: Manages LLM connection and generation
- **Tools**: Pure functions for specific operations
- **Flow**: Orchestrates multi-step interactions
- **Main**: Entry point for UI interaction

## License

MIT
