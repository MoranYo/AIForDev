from agno.utils import pprint
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.user_control_flow import UserControlFlowTools
from typing import List
from agno.tools.function import UserInputField
from agno.tools import tool
import requests
from secret_key import openai_api_key
import os
os.environ["OPENAI_API_KEY"] = openai_api_key

@tool()
def get_product_price(product_name: str):
    """ Get a product price for a given product name """
    
    response = requests.get("https://fakestoreapi.com/products")
    all_products = response.json()
    # get the item by product name
    product_price = None
    for product in all_products:
        if product['title'].lower() == product_name.lower():
            product_price = product['price']
            break
    if product_price is None:
        return f"Product {product_name} not found."
    return product_price

tool()
def evaluate(expression: str) -> float:
    """ Evaluate a mathematical expression """
    return eval(expression)

    
agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    tools=[get_product_price, evaluate, UserControlFlowTools()],
    markdown=True,
    instructions=['Verify you have the product name and the discount percentage. If not, get them from the user']

)

run_response = agent.run('What is the final price after discount?')


while run_response.is_paused:
    for tool in run_response.tools_requiring_user_input:
        input_schema: List[UserInputField] = tool.user_input_schema
        
        for field in input_schema:
            field_type = field.field_type
            field_description = field.description
            print(f'Field: {field.name}')
            print(f'Description: {field_description}')
            print(f'Type: {field_type}')
            
            if field.value is None:
                user_value = input(f'Please enter a value for {field.name}: ')
            else:
                print(f'Value: {field.value}')
                user_value = field.value
            
            field.value = user_value
    run_response = agent.continue_run(run_response=run_response)
    
    if not run_response.is_paused:
        pprint.pprint_run_response(run_response)
        break


pprint.pprint_run_response(run_response)