const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

// Utility to format image data for Generative AI
function fileToGeneratePath(base64Image, mimeType) {
    return {
        inlineData: {
            data: base64Image,
            mimeType: mimeType,
        },
    };
}

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });//gemini-1.5-pro

// Function to save image to MongoDB and generate AI prompt
async function ImagePrompt(base64Image) {
    try {
        const prompt = "Check the image for any maths equation, if there is give me a solution to the problem and if there isn't identify and give a detailed explanation as to what it is, and if there isn't tell me whatever seems to be obvious on the image.";
        const imageParts = [fileToGeneratePath(base64Image, "image/jpeg")];

        // Generate AI content
        const result = await model.generateContent([prompt, ...imageParts]);

        // Access the generated text correctly
        const text = result.response.text();
        return text;
    } catch (error) {
        console.log("Error generating content:", error.message);
        // throw new Error("Failed to generate content");
        return 'Internal Server Error! Try again later.';
    }
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
            
            return text;  // Return the generated text
        } else {
            return 'Could not understand your message! Try again be a little more clear and detailed.';  // Return an empty string if the response is invalid
        }
    } catch (error) {
        console.log('Error generating content:', error);
        return 'Internal Server Error! Try again later.';  // Return an empty string in case of an error
    }
}

module.exports = { TextPrompt, ImagePrompt };