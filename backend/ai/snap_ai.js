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
async function ImagePrompt(img) {
    try {
        console.log('img:', img); // Check the value of img

        if (!img) {
            throw new Error('Image is undefined or invalid.');
        }

        const prompt = "Check the image for any maths equation, if there is give me a solution to the problem and if there isn't identify and give a detailed explanation as to what it is, and if there isn't tell me whatever seems to be obvious on the image.";
        const imageParts = [fileToGeneratePath(img, "image/jpeg")];

        // Safeguard against potential errors during model content generation
        const result = await model.generateContent([prompt, ...imageParts]);

        if (!result || !result.response) {
            throw new Error('Failed to generate content or missing response.');
        }

        // Ensure the response is handled properly
        const response = await result.response;
        const text = await response.text();  // Await the response text
        console.log(text);
        return text;
    } catch (error) {
        // Catch any error that occurs and log it
        console.error('An error occurred in ImagePrompt:', error.message);
        return "An Error Occurred. Try Again"
    }
}



//This block of code gets promts from a users text.
async function TextPrompt(message) {
    try {
        const prompt = message;
        
        // Assuming 'model.generateContent' returns a promise that resolves to an object
        const result = await model.generateContent([prompt]);
        console.log(prompt);
        
        if (result && result.response) {
            const response = result.response;
            const text = await response.text();  // Await the response text
            
            console.log('Generated text:', text);  // Log the generated text
            return text;  // Return the generated text
        } else {
            console.log('No valid response received:', result);
            return 'Could not understand your message! Try again be a little more clear and detailed.';  // Return an empty string if the response is invalid
        }
    } catch (error) {
        console.log('Error generating content:', error);
        return 'Internal Server Error! Try again later.';  // Return an empty string in case of an error
    }
}

  
// imagePrompt();
// textPrompt()
module.exports = { TextPrompt, ImagePrompt };