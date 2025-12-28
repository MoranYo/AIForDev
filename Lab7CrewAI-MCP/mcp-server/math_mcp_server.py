from fastmcp import MCP

class MathMCP(MCP):
    def __init__(self):
        super().__init__()

    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

    def multiply(self, a, b):
        return a * b

    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero.")
        return a / b

if __name__ == "__main__":
    math_mcp = MathMCP()
    print("Addition:", math_mcp.add(10, 5))
    print("Subtraction:", math_mcp.subtract(10, 5))
    print("Multiplication:", math_mcp.multiply(10, 5))
    print("Division:", math_mcp.divide(10, 5))