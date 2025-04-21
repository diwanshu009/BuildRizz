import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google/generative-ai'

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    },
})

const CodeGenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
}

export const chatSession = model.startChat({
    history: [],
})

export const GenAiCode = model.startChat({
    generationConfig: CodeGenerationConfig,
    history: [
        {
            role: "user",
            parts: [
                {text: "Generate to do app: Generate a project in React. Create multiple components"}
            ]
        },
        {
            role: "model",
            parts: [
                {text: `{
  "projectTitle": "To Do App",
  "components": [
    {
      "name": "Header",
      "description": "The header component for the to-do app"
    },
    {
      "name": "TodoList",
      "description": "Component that lists all to-dos"
    },
    {
      "name": "TodoItem",
      "description": "Component for a single to-do item"
    },
    {
      "name": "Footer",
      "description": "The footer component of the to-do app"
    }
  ]
}`
                }
            ]
        }
    ]
});
