"""Chat flow for orchestrating agent interactions."""

from google.genai.flows import Flow, step
from ..tools.chat_tools import process_user_message, format_response


class ChatFlow(Flow):
    """Flow that orchestrates chat interactions between UI and agent."""
    
    @step()
    def validate_input(self, ctx):
        """Validate user input from UI."""
        user_message = ctx.input.get("message", "")
        if not user_message or not isinstance(user_message, str):
            raise ValueError("Invalid message format")
        return user_message
    
    @step()
    def process_message(self, ctx):
        """Process the user message."""
        message = self.validate_input(ctx)
        return process_user_message(message)
    
    @step()
    def generate_response(self, ctx):
        """Generate agent response (placeholder for actual agent call)."""
        processed = self.process_message(ctx)
        # In real implementation, this would call the agent
        response = f"Agent response to: {processed}"
        return response
    
    @step()
    def format_output(self, ctx):
        """Format response for UI."""
        response = self.generate_response(ctx)
        return format_response(response)
