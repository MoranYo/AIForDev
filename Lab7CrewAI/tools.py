from crewai import Agent, Task, Crew
from crewai.tools import tool
from crewai_tools import DirectoryReadTool, FileReadTool
from langchain_experimental.utilities import PythonREPL


#Tool 1
@tool("repl")
def repl(code: str) -> str:
	"""Useful for executing Python code"""
	return PythonREPL().run(command=code)

#Tool 2
file_read_tool = FileReadTool()