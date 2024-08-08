const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

function fileToGeneratePath(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType: mimeType,
        },
    };
}


const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

//This block of code gets prompts from images uploaded by the user.
async function imagePrompt() {
    const prompt = "";

    const imageParts = [fileToGeneratePath("math.jpeg", "image/jpeg")];
  
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

//This block of code gets promts from a users text.
async function textPrompt() {
    const prompt = "Give me steps to build navigation bar with html, css and javascript.";
  
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}
  
// imagePrompt();
textPrompt()