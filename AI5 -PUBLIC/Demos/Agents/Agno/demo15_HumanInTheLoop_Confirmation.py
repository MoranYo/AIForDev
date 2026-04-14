import json
import requests
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools import tool
from agno.utils import pprint
from rich.console import Console
from rich.prompt import Prompt
import os
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key

@tool(requires_confirmation=True)
def get_top_hackernews_stories(number_stories : int) -> str:
    """Fetch top stories from Hacker News.

    Args:
        num_stories (int): Number of stories to retrieve

    Returns:
        str: JSON string containing story details
    """

    response = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json")
    stories_ids = response.json()
    # get story details
    all_stories = []
    for story_id in stories_ids[:number_stories]:
        story_response = requests.get(f'https://hacker-news.firebaseio.com/v0/item/{story_id}.json')
        story = story_response.json()
        all_stories.append(story)
    return json.dumps(all_stories)


agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    tools=[get_top_hackernews_stories],
    markdown=True
)

console = Console()

resp = agent.run("Fetch the top 2 hackernews stories.")
if resp.is_paused:
    for tool in resp.tools_requiring_confirmation:
        # Ask for confirmation
        console.print(f'Tool Name [bold blue]{tool.tool_name}[/] requires confimation ')
        message =  Prompt.ask("Do you want to continue?", choices=['y', 'n'])
        message = message.strip().lower()
        if message == 'n':
            tool.confirmed = False
        else:
            tool.confirmed = True

run_response = agent.continue_run(run_response=resp, stream=True)
pprint.pprint_run_response(run_response)