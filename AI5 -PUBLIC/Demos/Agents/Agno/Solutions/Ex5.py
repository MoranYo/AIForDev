from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.team import Team
from agno.tools.python import PythonTools
import os
from secret_key import openai_api_key
os.environ["OPENAI_API_KEY"] = openai_api_key

coding_agent = Agent(
    name="Coding Agent",
    role="You are a helpful coding assistant. You write code to solve problems.",
    goal="Create a code for a given task",
    model=OpenAIChat(id="gpt-4o"),
    instructions=["IN the generated code, include all required modules and packages",
                  "Dont include any examples of usages, only the code itself",
                  "Save the code into a python file called demo_test.py"
                  ]
)

exector_agent = Agent(
    name="Executor Agent",
    role="You are a helpful coding assistant. You execute code to solve problems.",
    goal="Execute python code",
    model=OpenAIChat(id="gpt-4o"),
    tools=[PythonTools()]
)


documenting_agent = Agent(
    name="Documenting Agent",
    role="You are a helpful coding assistant. You write documentation for code.",
    goal="Write documentation for a given code",
    model=OpenAIChat(id="gpt-4o"),
)


team = Team(
    name="Coding Team",
    model=OpenAIChat(id="gpt-4o"),
    members=[coding_agent, exector_agent, documenting_agent],
    instructions=[
        "Start with creating the code",
        "Execute that code",
        "Document each step in the code"
    ],
    markdown=True,
    show_members_responses=True,
    enable_agentic_context=True,  # Allow the agent to maintain a shared context and send that to members.

)


team.print_response("Create a function that sorts the following list of numbers: [5, 2, 9, 1, 5, 6]", stream=True, show_full_reasoning=True, stream_intermediate_steps=True)