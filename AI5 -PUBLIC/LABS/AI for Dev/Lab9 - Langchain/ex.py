from langchain.prompts import ChatPromptTemplate
from langchain_core.prompts import PromptTemplate
from langchain.schema.output_parser import StrOutputParser
from langchain_openai import ChatOpenAI

from secret_keys import openai
import os
os.environ["OPENAI_API_KEY"] = openai


model = ChatOpenAI(model="gpt-3.5-turbo")

# template for code generation
prompt_template_code = ChatPromptTemplate(
    [
        ("system", "You are a very expeerienced python programmer."),
        ("human", "Write code for {app_goal}, return only the code without any explanation of text.")
    ]
)


# template for unit test generation
prompt_template_unit_test = PromptTemplate(
    input_variables=["code"],
    template="Write proper unit test for the following code: {code}, return only the unit test code without any explanation of text."
)

chain_code = prompt_template_code | model | StrOutputParser()
chain_unit_test = prompt_template_unit_test | model | StrOutputParser()

full_chain = chain_code | {
    "code": chain_code,
    "unit_test": chain_unit_test
}

result = full_chain.invoke({"app_goal": "sorting an array of numbers using bubble sort algorithm in python"})
print(result["code"])
print(result["unit_test"])