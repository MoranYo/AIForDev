from mcp.server.fastmcp import FastMCP

mcp = FastMCP("math-server")


@mcp.tool()
def add(n1 : int, n2 : int) -> int:
    """ Use this tool to add two numbers together """
    return n1 + n2

@mcp.tool()
def mul(n1 : int, n2 : int) -> int:
    """ Use this tool to multiply two numbers """
    return n1 * n2

@mcp.tool()
def subtract(n1 : int, n2 : int) -> int:
    """ use this tool to subtract 2 numbers """
    return n1 - n2

@mcp.tool()
def divide(n1 : int, n2 : int) -> int:
    """ use this tool to divide 2 numbers """
    if n2 == 0:
        return "Error 0 divide check"
    return n1 / n2

@mcp.tool()
def power(n1 : int, n2 : int) -> int:
    """ use this tool to power 2 numbers """
    return n1 ** n2

mcp.run(transport="stdio")
# STDIO
# HTTP-STREAMABLE
# SSE