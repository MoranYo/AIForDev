import requests
from mcp.server.fastmcp import FastMCP

server = FastMCP("users-server")


@server.tool()
def get_user_data(user_id: int) -> dict:
    """ Use this tool to fetch user data by their id
    args: user_id (int): The ID of the user to look up.
    returns: dict: A dictionary containing the user's data.
    """
    response = requests.get(f"https://jsonplaceholder.typicode.com/users/{user_id}")
    return response.json()


server.run(transport='stdio')