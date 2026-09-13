
// // const { GoogleGenAI } = require("@google/genai");
// // const { z } = require("zod");
// // const { zodToJsonSchema } = require("zod-to-json-schema");

// // const ai = new GoogleGenAI({
// //     apiKey: process.env.GOOGLE_GENAI_API_KEY
// // });

// // const interviewReportSchema = z.object({
// //     matchScore: z.number()
// //         .describe("A score between 0 and 100 indicating how well a candidate profile matches the job description"),

// //     technicalQuestions: z.array(
// //         z.object({
// //             question: z.string()
// //                 .describe("The technical question that can be asked in the interview"),

// //             intention: z.string()
// //                 .describe("The intention behind asking this question"),

// //             answer: z.string()
// //                 .describe("How to answer this question and what points to cover")
// //         })
// //     ),

// //     behaviouralQuestions: z.array(
// //         z.object({
// //             question: z.string()
// //                 .describe("The behavioural question that can be asked in the interview"),

// //             intention: z.string()
// //                 .describe("The intention behind asking this question"),

// //             answer: z.string()
// //                 .describe("How to answer this question and what points to cover")
// //         })
// //     ),

// //     skillGaps: z.array(
// //         z.object({
// //             skill: z.string()
// //                 .describe("The skill that the candidate is lacking"),

// //             severity: z.enum(["low", "medium", "high"])
// //                 .describe("The severity of this skill gap")
// //         })
// //     ),

// //     preparationPlan: z.array(
// //         z.object({
// //             day: z.number()
// //                 .describe("The day number in the preparation plan"),

// //             focus: z.string()
// //                 .describe("The main focus of this day"),

// //             tasks: z.array(z.string())
// //                 .describe("List of tasks to complete on this day")
// //         })
// //     )
// // });


// // async function generateInterviewReport({
// //     resume,
// //     selfDescription,
// //     jobDescription
// // }) {

// //     const prompt = `
// // Generate an interview report for the candidate.

// // Resume:
// // ${resume}

// // Self Description:
// // ${selfDescription}

// // Job Description:
// // ${jobDescription}

// // Analyze the candidate carefully and return the interview report according to the required JSON schema.
// // `;

// //     try {

// //         const response = await ai.models.generateContent({
// //             model: "gemini-3.5-flash-lite",

// //             contents: prompt,

// //             config: {
// //                 responseMimeType: "application/json",

// //                 responseJsonSchema: zodToJsonSchema(
// //                     interviewReportSchema
// //                 )
// //             }
// //         });

// //         console.log("RAW RESPONSE:");
// //         console.log(response.text);

// //         const result = JSON.parse(response.text);

// //         return result;

// //     } catch (error) {

// //         console.error("Error generating interview report:", error);

// //         throw error;
// //     }
// // }

// // module.exports = generateInterviewReport;

// const { GoogleGenAI } = require("@google/genai");
// const { z } = require("zod");
// const { zodToJsonSchema } = require("zod-to-json-schema");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// });

// const interviewReportSchema = z.object({
//     matchScore: z.number()
//         .min(0)
//         .max(100),

//     technicalQuestions: z.array(
//         z.object({
//             question: z.string(),
//             intention: z.string(),
//             answer: z.string()
//         })
//     ),

//     behaviouralQuestions: z.array(
//         z.object({
//             question: z.string(),
//             intention: z.string(),
//             answer: z.string()
//         })
//     ),

//     skillGaps: z.array(
//         z.object({
//             skill: z.string(),
//             severity: z.enum(["low", "medium", "high"])
//         })
//     ),

//     preparationPlan: z.array(
//         z.object({
//             day: z.number(),
//             focus: z.string(),
//             tasks: z.array(z.string())
//         })
//     )
// });

// async function generateInterviewReport({
//     resume,
//     selfDescription,
//     jobDescription
// }) {
//     try {
//         const prompt = `
// You are an AI interview preparation assistant.

// Analyze the following candidate information and job description.

// RESUME:
// ${resume}

// SELF DESCRIPTION:
// ${selfDescription}

// JOB DESCRIPTION:
// ${jobDescription}

// Generate an interview preparation report.

// IMPORTANT:
// Return data strictly according to the JSON schema provided.

// Do not add any extra fields.

// The response must contain ONLY these top-level fields:

// matchScore
// technicalQuestions
// behaviouralQuestions
// skillGaps
// preparationPlan
// `;

//         // Convert Zod schema to JSON schema
//         const jsonSchema = zodToJsonSchema(interviewReportSchema);

//         console.log("SCHEMA:");
//         console.log(JSON.stringify(jsonSchema, null, 2));

//         const response = await ai.models.generateContent({
//             model: "gemini-3.5-flash-lite",

//             contents: prompt,

//             config: {
//                 responseMimeType: "application/json",
//                 responseJsonSchema: jsonSchema
//             }
//         });

//         console.log("RAW RESPONSE:");
//         console.log(response.text);

//         // Convert response text into JavaScript object
//         const parsedResponse = JSON.parse(response.text);

//         // Validate that Gemini followed our schema
//         const validatedResponse =
//             interviewReportSchema.parse(parsedResponse);

//         console.log("VALIDATED RESPONSE:");
//         console.log(validatedResponse);

//         return validatedResponse;

//     } catch (error) {
//         console.error("Error generating interview report:");

//         if (error.errors) {
//             console.error(JSON.stringify(error.errors, null, 2));
//         } else {
//             console.error(error);
//         }

//         throw error;
//     }
// }

// module.exports = generateInterviewReport;

const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


const interviewReportSchema = z.object({

    matchScore: z.number()
        .min(0)
        .max(100),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behaviouralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum([
                "low",
                "medium",
                "high"
            ])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    ).min(5).max(5),
    title: z.string().describe("The title of the interview report is generated"),

});


async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    try {

        const prompt = `
You are an AI interview preparation assistant.

Analyze the following candidate information.

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Generate an interview preparation report.

IMPORTANT INSTRUCTIONS:

Return ONLY valid JSON.

Follow the exact structure specified in the JSON schema.

Do not add extra fields.

technicalQuestions MUST be an array of objects.

Each technical question object MUST contain:

question
intention
answer

behaviouralQuestions MUST be an array of objects.

Each behavioural question object MUST contain:

question
intention
answer

skillGaps MUST be an array of objects containing:

skill
severity

preparationPlan MUST be an array of exactly 5 objects, one for each day from 1 to 5. Each object must contain:

day
focus
tasks

The preparation plan should be a structured 5-day roadmap with increasing priority and realistic milestones.

Do not return candidateName.
Do not return summary.
Do not return strengths.
Do not return weaknesses.
Do not return recommendation.
Do not return any fields other than those specified in the schema.

IMPORTANT:
Do not invent projects, experiences, achievements, or incidents that are not explicitly mentioned in the Resume or Self Description.

For behavioural questions, provide a suggested approach or answer framework when the candidate has no relevant real experience. Clearly indicate that the candidate should use their own genuine experience.

Also ensure the array length for preparationPlan is exactly 5.
`;


        // Zod v4 native JSON Schema conversion
        const jsonSchema = z.toJSONSchema(interviewReportSchema);


        console.log("SCHEMA BEING SENT TO GEMINI:");
        console.log(JSON.stringify(jsonSchema, null, 2));


        const response = await ai.models.generateContent({

            model: "gemini-3.5-flash-lite",

            contents: prompt,

            config: {
                responseMimeType: "application/json",
                responseJsonSchema: jsonSchema
            }

        });


        console.log("RAW RESPONSE:");
        console.log(response.text);


        const parsedResponse = JSON.parse(response.text);


        // Validate the Gemini response
        const validatedResponse =
            interviewReportSchema.parse(parsedResponse);


        console.log("VALIDATED RESPONSE:");
        console.log(validatedResponse);


        return validatedResponse;

    }
    catch (error) {

        console.error("Error generating interview report:");

        if (error instanceof z.ZodError) {

            console.error(
                JSON.stringify(error.issues, null, 2)
            );

        } else {

            console.error(error);

        }

        throw error;
    }
}


module.exports = generateInterviewReport;