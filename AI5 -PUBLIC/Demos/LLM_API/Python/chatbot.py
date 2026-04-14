from secret_key import openai
from openai import OpenAI

client = OpenAI(api_key=openai)


messages = []
messages.append({"role": "system", "content": "You are a drummer musician."})

while True:
    user_input = input("Prompt: ")
    messages.append({"role": "user", "content": user_input})
    response = client.chat.completions.create( model="gpt-3.5-turbo",messages=messages)
    ai_message = response.choices[0].message.content
    messages.append({"role": "assistant", "content": ai_message})
    print(response.usage)

