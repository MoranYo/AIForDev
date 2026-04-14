from crewai import Crew, Agent, Task
import os
os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"

marine_agent = Agent(
    role="You are an ocean biologist.",
    goal="Give compelling information about marine life.",
    backstory="You are a renowned ocean biologist with years of experience studying marine ecosystems. you always use humor to explain everything",
    verbose=True # shows details in the output,    
)

task1 = Task(
    description="Tell me all about the great white shark!",
    agent=marine_agent,
    expected_output="Explain in bullet points."
    
)

crew = Crew(
    agents=[marine_agent],
    tasks=[task1],
    verbose=True # shows details in the output
)

result = crew.kickoff()
print(result)