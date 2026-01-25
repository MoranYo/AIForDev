from crewai import Agent, Crew, Task, Process
from crewai.tools import BaseTool, tool

from tools import repl, file_read_tool

from dotenv import load_dotenv
load_dotenv()

coding_agent = Agent(
    role="Coding Expert",
    goal="You are able to get a coding task and generate python code to handle the task",
    backstory="You are a python coding expert with experience in data analysis and scientific computing.",
    tools=[file_read_tool],
    verbose=True
    
)

coding_task = Task(
    description="""
    write python code for this problem: {problem}. return only the code with no comment and remarks and make sure
    it is syntactically correct python code that can be executed directly. Use the file reading tool to read any files if needed.
    make sure to return answer from the code.
    """,
    expected_output="complete python code that solves the problem. make sure to return the result in the code",
    agent=coding_agent
)

##################################### Agent 2


Code_runner_agent = Agent(
    role='Code Runner',
    goal="Execute the python code provided by the coding agent and return the result",
    backstory="""You are a python code execution expert with experience in data analysis and scientific computing.
                You are able to run python code and return the result.
                """,
    tools=[repl],
    verbose=True,
)

execution_task = Task(
    description="execute the python code",
    expected_output="the actual execution result",
    agent=Code_runner_agent,
    context=[coding_task]
)


# ################# Crew

crew = Crew(
    agents=[coding_agent, Code_runner_agent],
    tasks=[coding_task, execution_task],
    verbose=True,
    process=Process.sequential
)



inputs = {'problem': "Analyze the data in the file people.csv and provide a summary of the findings."}

result = crew.kickoff(inputs=inputs)
print('##############################################################')
print(result)