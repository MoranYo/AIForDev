import OpenAI from "openai";
const client = new OpenAI({
    apiKey:"YOUR_OPENAI_API_KEY"
    
});
const response = await client.responses.create({
  model: "gpt-5",
  input: "Tell me a joke.",
  
  
});

console.log(response.output_text);