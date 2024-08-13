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
async function ImagePrompt() {
    const prompt = "";

    const imageParts = [fileToGeneratePath("math.jpeg", "image/jpeg")];
  
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

//This block of code gets promts from a users text.
async function TextPrompt(message) {
    try {
        const prompt = message;
        
        // Assuming 'model.generateContent' returns a promise that resolves to an object
        const result = await model.generateContent([prompt]);
        
        if (result && result.response) {
            const response = result.response;
            const text = await response.text();  // Await the response text
            
            console.log('Generated text:', text);  // Log the generated text
            return text;  // Return the generated text
        } else {
            console.error('No valid response received:', result);
            return 'Could not understand your message! Try againg bea little more clear and detailed.';  // Return an empty string if the response is invalid
        }
    } catch (error) {
        console.error('Error generating content:', error);
        return 'Internal Server Error! Try again later.';  // Return an empty string in case of an error
    }
}

  
// imagePrompt();
// textPrompt()
module.exports = { TextPrompt, ImagePrompt };