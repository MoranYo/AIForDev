from typing import Optional

from agno.agent import Agent
from agno.eval.reliability import ReliabilityEval, ReliabilityResult
from agno.models.openai import OpenAIChat
from agno.run.response import RunResponse
from agno.tools.calculator import CalculatorTools

from dotenv import load_dotenv

load_dotenv(override=True)


agent = Agent(
    model=OpenAIChat(id="gpt-4o-mini"),
    tools=[CalculatorTools(add=True, multiply=True, exponentiate=True)],
)
response: RunResponse = agent.run(
    "What is 10*5 then to the power of 2? do it step by step"
)
evaluation = ReliabilityEval(
    agent_response=response,
    expected_tool_calls=["multiply", "exponentiate"],
)
result: Optional[ReliabilityResult] = evaluation.run(print_results=True)
result.assert_passed()