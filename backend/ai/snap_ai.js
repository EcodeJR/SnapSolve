const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const genModel = process.env.AI_MODEL;

// Utility to format image data for Generative AI
function fileToGeneratePath(base64Image, mimeType) {
    return {
        inlineData: {
            data: base64Image,
            mimeType: mimeType,
        },
    };
}

const model = genAI.getGenerativeModel({ model: genModel });//gemini-1.5-pro //"gemini-2.0-flash-001"

// Function to save image to MongoDB and generate AI prompt
async function ImagePrompt(base64Image) {
    try {
        const prompt = "Analyze this image. First line of your response should be a brief title (max 50 characters) starting with 'TITLE:' that describes the main content or topic of the image. Then check for any maths equation, if there are give me a step by step process to solve and understand the question, also provide me with resources I may need to learn the problem and solution after which you provide me with a solution to the problem. if there are no equations identified give a detailed explanation as to what it is, and if there isn't tell me whatever seems to be obvious on the image.";
        const imageParts = [fileToGeneratePath(base64Image, "image/jpeg")];

        const result = await model.generateContent([prompt, ...imageParts]);
        const text = result.response.text();

        // Extract title from response
        const titleMatch = text.match(/^TITLE:(.*?)(?:\n|$)/);
        const title = titleMatch ? titleMatch[1].trim() : 'Image Analysis';
        
        // Remove title line from response
        const content = text.replace(/^TITLE:.*?\n/, '').trim();

        return {
            title,
            content
        };
    } catch (error) {
        console.log("Error generating content--:", error.message);
        return {
            title: 'Image Analysis',
            content: 'Internal Server Error! Try again later.'
        };
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

async function analyzeWriting(text) {
    try {
        const prompt = `
        Please analyze this text for grammar, clarity, and style.
        Respond in this exact format:
        
        CORRECTED_TEXT:
        [The corrected version of the text goes here]

        SUGGESTIONS:
        - [First suggestion]
        - [Second suggestion]
        - [Additional suggestions if needed]

        Original text to analyze: "${text}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        // Parse the AI response using specific markers
        const correctedTextMatch = responseText.match(/CORRECTED_TEXT:\n([\s\S]*?)\n\nSUGGESTIONS:/);
        const suggestionsMatch = responseText.match(/SUGGESTIONS:\n([\s\S]*?)$/);

        let correctedText = text; // Default to original
        let suggestions = [];

        if (correctedTextMatch && correctedTextMatch[1]) {
            correctedText = correctedTextMatch[1].trim();
        }

        if (suggestionsMatch && suggestionsMatch[1]) {
            suggestions = suggestionsMatch[1]
                .split('\n')
                .map(s => s.trim())
                .filter(s => s.startsWith('-'))
                .map(s => s.substring(1).trim()) // Remove the dash
                .filter(s => s.length > 0);
        }

        // Fallback if no corrections needed
        if (!correctedText || correctedText.length === 0) {
            correctedText = text;
        }

        // Add default suggestion if none found
        if (suggestions.length === 0) {
            suggestions = ["No improvements needed."];
        }

        return {
            correctedText,
            suggestions
        };
    } catch (error) {
        console.error("AI Analysis Error:", error);
        throw new Error("Failed to analyze text: " + error.message);
    }
}


async function generateStudyGuide(topic) {
  try {
    const prompt = `
    Create a comprehensive study guide for "${topic}" in the following format:

    STUDY_NOTES:
    [Detailed explanation of key concepts]

    RESOURCES:
    - [Resource 1]
    - [Resource 2]
    - [Resource 3]

    QUIZ:
    Q1. [Question]
    A) [Option A]
    B) [Option B]
    C) [Option C]
    Answer: [Letter of correct option]

    Q2. [Question]
    A) [Option A]
    B) [Option B]
    C) [Option C]
    Answer: [Letter of correct option]

    Q3. [Question]
    A) [Option A]
    B) [Option B]
    C) [Option C]
    Answer: [Letter of correct option]`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse sections using markers
    const studyNotesMatch = responseText.match(/STUDY_NOTES:\n([\s\S]*?)\n\nRESOURCES:/);
    const resourcesMatch = responseText.match(/RESOURCES:\n([\s\S]*?)\n\nQUIZ:/);
    const quizMatch = responseText.match(/QUIZ:\n([\s\S]*?)$/);

    // Extract study notes
    const studyNotes = studyNotesMatch?.[1]?.trim() || "No study notes available.";

    // Extract resources
    const resources = resourcesMatch?.[1]?.split('\n')
      .map(r => r.trim())
      .filter(r => r.startsWith('-'))
      .map(r => r.substring(1).trim()) || [];

    // Extract quiz questions
    const quiz = [];
    if (quizMatch?.[1]) {
      const quizText = quizMatch[1];
      const questionBlocks = quizText.split(/Q\d+\./).filter(Boolean);

      questionBlocks.forEach(block => {
        try {
          const lines = block.trim().split('\n').filter(Boolean);
          
          if (lines.length >= 5) { // Ensure we have question, 3 options, and answer
            const question = lines[0].trim();
            const options = lines.slice(1, 4).map(o => o.trim().substring(2).trim());
            const answerLine = lines[4].trim();
            const answer = answerLine.includes(':') ? 
              answerLine.split(':')[1].trim() : 
              answerLine;

            quiz.push({
              question,
              options,
              correctAnswer: answer
            });
          }
        } catch (err) {
          console.warn('Error parsing quiz question:', err);
        }
      });
    }

    // Validate the generated content
    if (!studyNotes || !resources.length || !quiz.length) {
      throw new Error('Incomplete study guide generated');
    }

    return { studyNotes, resources, quiz };
  } catch (error) {
    console.error("Error generating study guide:", error);
    throw new Error(`Failed to generate study guide: ${error.message}`);
  }
}


module.exports = { 
    TextPrompt, 
    ImagePrompt, 
    analyzeWriting, 
    generateStudyGuide 
};