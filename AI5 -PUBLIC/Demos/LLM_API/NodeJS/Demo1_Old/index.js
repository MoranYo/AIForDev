const { OpenAIApi, Configuration } = require("openai")


const config = new Configuration({
    apiKey: "YOUR_OPENAI_API_KEY",
})

const model = new OpenAIApi(config)

messages = [
    { role: "system", content: "You are a helpful assistant." },
]

async function callLLM(prompt) {
    messages.push({ role: "user", content: prompt })
    const response = await model.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
    })
    console.log(response.data.choices[0].message.content)
}

callLLM("Hello world")