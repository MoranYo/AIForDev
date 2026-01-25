from mcp.server.fastmcp import FastMCP
import requests

mcp = FastMCP('name-origin')


@mcp.tool()
def get_name_origin(name: str) -> dict:
    """ 
    Use this tool to get the origin of a given name.
    
    args: name (str): The name to look up.
    
    returns: dict: A dictionary containing the probable origins of the name.
    """
    response = requests.get(f"https://api.nationalize.io/?name={name}")
    return response.json()
    

mcp.run(transport="stdio")

