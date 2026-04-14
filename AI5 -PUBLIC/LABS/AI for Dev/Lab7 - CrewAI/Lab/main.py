import os
os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"

from crewai import Agent, Task, Crew, Process
from crewai.tools import tool
from crewai_tools import  FileReadTool
from langchain_experimental.utilities import PythonREPL


#Tool 1
@tool("repl")
def repl(code: str) -> str:
	"""Use this tool to execute python code"""
	return PythonREPL().run(command=code)

#Tool 2
file_read_tool = FileReadTool()


coding_agent = Agent(
    role="Python Devloper",
    goal="Craft a well designed and thought out code to answer the given problem",
    backstory="A senior python dev",

    llm="gpt-4o",
    tools=[file_read_tool],
    verbose=True
)


coding_task = Task(
    description=""" 
                    Write python code for this problem: {problem}. 
                    return only the code with no comments or remarks, and make sure the code will RETURN the results to solve the problem, this code will be executed by another agent.
 				""",
     expected_output="Complete python code that solves the problem",
     agent=coding_agent
)

# ##################################### 

executing_agent = Agent(
    role="Python Code Executor",
    goal="Execute python code and return the results",
     backstory="""
				You are a Python developer with extensive experience in software and its best practices.
            	You can execute code, debug, and optimize Python solutions effectively.
	""",
    llm="gpt-4o",
    tools=[repl],
    verbose=True
    
)

executing_task = Task(
    description="Execute the python code provided by the coding agent to solve the given problem and return the results from the execution, use the repl tool to execute python code",
    expected_output="The actual execution results",
    agent=executing_agent,
    context=[coding_task]
)

inputs = {'problem': 'the agent should read the file "people.csv", and create a code that returns the column names and find the mean age'}

crew = Crew(
    agents=[coding_agent, executing_agent],
    tasks=[coding_task, executing_task],
    verbose=True,
    process=Process.sequential
)

result = crew.kickoff(inputs=inputs)
print(result)