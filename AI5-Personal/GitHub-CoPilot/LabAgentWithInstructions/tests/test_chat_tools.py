"""Test suite for chat tools."""

import pytest
from tools.chat_tools import process_user_message, format_response


def test_process_user_message():
    """Test that process_user_message returns acknowledgment."""
    message = "Hello, agent!"
    result = process_user_message(message)
    assert "Received message:" in result
    assert message in result


def test_process_empty_message():
    """Test processing an empty message."""
    result = process_user_message("")
    assert "Received message:" in result


def test_format_response():
    """Test response formatting for UI."""
    response = "This is a test response"
    result = format_response(response)
    
    assert isinstance(result, dict)
    assert result["content"] == response
    assert result["status"] == "success"
    assert "timestamp" in result


def test_format_response_structure():
    """Test that formatted response has required fields."""
    result = format_response("test")
    required_fields = ["content", "status", "timestamp"]
    
    for field in required_fields:
        assert field in result
