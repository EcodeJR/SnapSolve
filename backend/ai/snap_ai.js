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
        const prompt = "Analyze this image. First line of your response should be a brief title (max 50 characters) starting with 'TITLE:' that describes the main content or topic of the image. Then check for any maths equation, if there are one or more quations; Give me a step by step process to solve and understand each of the questions, also provide me with resources I may need to learn the problem and solution after which you provide me with a solution to the problem. if there are no equations identified give a detailed explanation as to what it is, and if there isn't tell me whatever seems to be obvious on the image.";
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
        // Bot personality and context
        const systemContext = `
            You are SnapSolve, an educational AI assistant created to help students learn and understand academic concepts.

            About yourself:
            - Name: SnapSolve
            - Role: Educational AI Assistant
            - Specialty: Breaking down complex academic topics, solving math problems, and providing study guidance
            - Personality: Friendly, encouraging, and patient
            - Created by: EcodeJR

            Your capabilities:
            - Analyze and solve mathematical problems
            - Generate study guides
            - Answer academic questions
            - Provide writing assistance
            - Analyze images containing educational content

            Restrictions:
            - Do not provide assistance with cheating or plagiarism
            - Do not generate harmful or inappropriate content
            - Stay focused on educational topics
            - Do not share personal information about users
            - Do not make claims about yourself beyond what's stated above

            When asked about yourself, always maintain this identity and refer to yourself as SnapSolve.
            Always be encouraging and supportive, but maintain professional boundaries.
        `;

        const prompt = `${systemContext}\n\nUser: ${message}\n\nSnapSolve:`;
        
        const result = await model.generateContent([prompt]);
        
        if (result?.response) {
            const text = await result.response.text();
            
            // Handle empty or invalid responses
            if (!text.trim()) {
                return "I apologize, but I couldn't process that request. Could you please rephrase it?";
            }
            
            return text;
        }
        
        return "I'm having trouble understanding that. Could you try asking in a different way?";
        
    } catch (error) {
        console.error('ChatBot Error:', error);
        return 'I apologize, but I encountered an error. Please try again in a moment.';
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

    // Extract study notes with fallback
    const studyNotes = studyNotesMatch?.[1]?.trim() || "I apologize, but I couldn't generate study notes. Please try rephrasing your topic or being more specific.";

    // Extract resources with fallback
    const resources = resourcesMatch?.[1]?.split('\n')
      .map(r => r.trim())
      .filter(r => r.startsWith('-'))
      .map(r => r.substring(1).trim());

    // If no resources found, provide a default resource
    if (!resources.length) {
      resources.push("Resource: **Wikipedia (https://wikipedia.org):** General information about " + topic);
    }

    // Extract and validate quiz questions
    const quiz = [];
    if (quizMatch?.[1]) {
      // ...existing quiz parsing code...
    }

    // If no quiz questions found, add a default one
    if (quiz.length === 0) {
      quiz.push({
        question: "What is the main concept of " + topic + "?",
        options: [
          "This question needs more context",
          "Please try with a more specific topic",
          "Information not available"
        ],
        correctAnswer: "Please try with a more specific topic"
      });
    }

    return { studyNotes, resources, quiz };
  } catch (error) {
    const fallbackGuide = {
      studyNotes: "I apologize, but I couldn't generate a study guide at this moment. This could be because:\n" +
                 "- The topic might be too broad or unclear\n" +
                 "- There might be an issue with the AI service\n" +
                 "Please try:\n" +
                 "- Being more specific with your topic\n" +
                 "- Breaking down complex topics into smaller parts\n" +
                 "- Checking your internet connection\n" +
                 "- Trying again in a few moments",
      resources: ["Resource: **Study Tips (https://www.wikihow.com/Study):** General study strategies"],
      quiz: [{
        question: "What should you do when a topic is too broad?",
        options: [
          "Break it down into smaller, specific parts",
          "Give up and try something else",
          "Keep trying with the same broad topic"
        ],
        correctAnswer: "A"
      }]
    };

    console.error("Error generating study guide:", error);
    return fallbackGuide;
  }
}


module.exports = { 
    TextPrompt, 
    ImagePrompt, 
    analyzeWriting, 
    generateStudyGuide 
};