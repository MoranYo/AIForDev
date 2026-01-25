from mcp.server.fastmcp import FastMCP

mcp = FastMCP('calculator')


@mcp.tool()
def add(a: float, b: float) -> float:
    """
    Add two numbers together.
    
    Args:
        a (float): First number
        b (float): Second number
    
    Returns:
        float: Sum of a and b
    """
    return a + b


@mcp.tool()
def subtract(a: float, b: float) -> float:
    """
    Subtract b from a.
    
    Args:
        a (float): First number
        b (float): Second number
    
    Returns:
        float: Difference of a and b
    """
    return a - b


@mcp.tool()
def multiply(a: float, b: float) -> float:
    """
    Multiply two numbers.
    
    Args:
        a (float): First number
        b (float): Second number
    
    Returns:
        float: Product of a and b
    """
    return a * b


@mcp.tool()
def divide(a: float, b: float) -> float:
    """
    Divide a by b.
    
    Args:
        a (float): Numerator
        b (float): Denominator
    
    Returns:
        float: Quotient of a and b
    
    Raises:
        ValueError: If b is zero
    """
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b


if __name__ == "__main__":
    mcp.run(transport="stdio")
