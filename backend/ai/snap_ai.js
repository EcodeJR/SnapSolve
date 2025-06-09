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
    Create a comprehensive study guide for "${topic}" with the following format:

    STUDY_NOTES:
    [Provide detailed explanation of key concepts, theories, and examples]

    RESOURCES:
    - [Resource 1: Include title and URL]
    - [Resource 2: Include title and URL]
    - [At least 3 relevant academic resources]

    QUIZ:
    [Generate exactly 5 multiple-choice questions that test understanding of key concepts]
    Format each question as:
    Q1. [Clear, specific question]
    A) [Plausible option]
    B) [Plausible option]
    C) [Plausible option]
    D) [Plausible option]
    Correct: [Letter of correct answer]
    Explanation: [Brief explanation of why this is correct]

    [Repeat for Q2 through Q5]`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse sections using regex
    const studyNotesMatch = responseText.match(/STUDY_NOTES:\n([\s\S]*?)\n\nRESOURCES:/);
    const resourcesMatch = responseText.match(/RESOURCES:\n([\s\S]*?)\n\nQUIZ:/);
    const quizMatch = responseText.match(/QUIZ:\n([\s\S]*?)$/);

    // Extract study notes
    const studyNotes = studyNotesMatch?.[1]?.trim() || 'No study notes available. Please try again with a more specific topic.';

    // Extract resources
    const resources = resourcesMatch?.[1]?.split('\n')
        .map(r => r.trim())
        .filter(r => r.startsWith('-'))
        .map(r => r.substring(1).trim()) || [];

    // Parse quiz questions
    const quiz = [];
    if (quizMatch?.[1]) {
      const quizText = quizMatch[1].trim();
      const questions = quizText.split(/Q\d+\./g).filter(q => q.trim());

      questions.forEach((q) => {
        const questionMatch = q.match(/(.*?)\nA\)(.*?)\nB\)(.*?)\nC\)(.*?)\nD\)(.*?)\nCorrect:\s*([A-D])/s);
        
        if (questionMatch) {
          const [, question, optionA, optionB, optionC, optionD, correct] = questionMatch;
          quiz.push({
            question: question.trim(),
            options: [
              optionA.trim(),
              optionB.trim(),
              optionC.trim(),
              optionD.trim()
            ],
            correctAnswer: correct.trim(),
            explanation: q.match(/Explanation:\s*(.*?)(?:\n|$)/s)?.[1]?.trim() || ''
          });
        }
      });
    }

    // If we don't have enough quiz questions, add defaults
    if (quiz.length < 5) {
      const defaultQuestions = [
        {
          question: `What is a key concept in ${topic}?`,
          options: [
            "Fundamental principles and theories",
            "Historical development",
            "Modern applications",
            "Future implications"
          ],
          correctAnswer: "A",
          explanation: "Understanding fundamental principles is essential for mastering any topic."
        },
        {
          question: `How is ${topic} applied in practice?`,
          options: [
            "Through research methods",
            "Through real-world applications",
            "Through theoretical models",
            "Through historical analysis"
          ],
          correctAnswer: "B",
          explanation: "Practical applications demonstrate real-world relevance."
        }
      ];

      while (quiz.length < 5) {
        const defaultQ = defaultQuestions[quiz.length % defaultQuestions.length];
        quiz.push({...defaultQ}); // Use spread to create a new object
      }
    }

    return { 
      studyNotes, 
      resources: resources.length ? resources : ['No specific resources provided.'], 
      quiz 
    };
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