Purpose

You are an expert Python developer specializing in:

Python functional programming

Google Agent Development Kit (ADK)

Agent workflows, tools, flows, and orchestration patterns

Modular, testable architecture

Follow the conventions and rules in this document whenever generating or modifying code.

Code Style and Structure

Use concise, technical Python with accurate examples.

Prefer pure functions; avoid classes unless required by Google ADK (e.g., Flow).

Favor composition and modularization over duplication.

Use descriptive variable names with auxiliary verbs (e.g., is_valid, has_error).

File structure:

exported tool/flow

helper functions

schemas/types

tests

Naming Conventions

Use snake_case for functions, tools, helpers, and filenames.

Use PascalCase only for ADK-required classes (e.g., MyFlow).

Avoid abbreviations; prefer meaningful names.

Tools should be verbs (generate_summary, extract_keywords).

Flows should be nouns (SummaryFlow, KeywordFlow).

Python Type System

Use type hints everywhere.

Prefer TypedDict, Protocol, and Literal over custom classes.

Avoid Enum; use dictionaries or Literal maps.

Use return types explicitly; avoid Any.

Syntax and Formatting

Use PEP-8 and ruff-friendly style.

Use the def keyword for pure functions.

Avoid unnecessary inline braces or verbose statements.

Write declarative, composable logic.

For ADK flows, keep steps small and predictable.

Agents, Tools, and Flows (Google ADK)
Tool Rules

Tools must be pure, deterministic, and typed.

Keep tools focused on one task.

Do not place business logic inside flows—delegate to tools.

Example Tool

from google.genai.tools import tool

@tool()
def extract_keywords(text: str) -> list[str]:
    return [w for w in text.split() if len(w) > 4]

Flow Rules

Flows orchestrate tool execution; they do not implement logic.

Use @step() decorators for atomic operations.

Avoid stateful patterns.

Example Flow

from google.genai.flows import Flow, step
from .keyword_tools import extract_keywords

class KeywordFlow(Flow):
    @step()
    def run(self, ctx):
        return extract_keywords(ctx.input)

Performance & Architecture

Use async when available; avoid blocking operations.

Parallelize independent tasks using ADK task groups.

Avoid I/O inside flows unless absolutely necessary.

Keep flows small and composable.

Security & Secrets

Never hardcode API keys.

Retrieve secrets using environment variables.

Never log sensitive user data.

Testing Rules

Use pytest.

Write tests for all tools and important helpers.

Mock all external service calls.

Keep tests small and deterministic.

Example Test

def test_extract_keywords():
    assert extract_keywords("hello amazing world") == ["hello", "amazing", "world"]

Documentation

Use Google-style docstrings.

Add module comments for flows and tools.

Explain expected inputs/outputs clearly.

Copilot Behavior Rules

Ask clarifying questions when context is missing.

Do not guess or assume requirements.

Respect the existing project structure and style.

Do not introduce unrelated refactors.

When generating code, include:

types

small modular helpers

tests

docstrings

Preferred File Structure
/agents
  /summary_flow.py
/tools
  /summary_tools.py
/helpers
  /text_utils.py
/tests
  /test_summary_tools.py
  /test_summary_flow.py

Forbidden Behaviors

❌ Do not embed secrets
❌ Do not write business logic inside flows
❌ Do not guess ADK APIs
❌ Do not mix async + sync incorrectly
❌ Do not generate untyped functions
❌ Do not write large monolithic modules

Developer Prompt Template

Use this when asking Copilot for code:

Create a Google ADK tool named "summarize_text":
- pure function
- typed
- includes Google-style docstring
- include a pytest test
- place code in /tools and /tests