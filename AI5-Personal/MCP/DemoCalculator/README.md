# Calculator MCP Server

A simple demo MCP server that provides basic calculator operations.

## Features

This MCP server provides four mathematical operations:
- `add`: Add two numbers
- `subtract`: Subtract two numbers
- `multiply`: Multiply two numbers
- `divide`: Divide two numbers (with zero-division protection)

## Installation

```bash
pip install -r requirements.txt
```

## Usage

Run the server:

```bash
python main.py
```

## Testing with MCP Inspector

```bash
npx @modelcontextprotocol/inspector python main.py
```

## Configuration for VS Code

Add to your `.vscode/mcp.json`:

```json
{
  "servers": {
    "calculator": {
      "command": "python",
      "args": ["c:\\GitHubPersonal\\AI5-Personal\\MCP\\DemoCalculator\\main.py"],
      "transport": "stdio"
    }
  }
}
```
