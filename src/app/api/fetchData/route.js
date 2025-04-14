import axios from "axios";
import OpenAI from "openai";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Get the URL from query params (assuming ?url=example.com)
        const url = searchParams.get("url");

        if (!url) {
            return new Response(
                JSON.stringify({ error: "URL parameter is required." }),
                { status: 400 }
            );
        }

        const apiResponse = await axios.get(url);
        const data = apiResponse.data;



        // Initialize OpenAI
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        // AI Prompt
        const prompt1 = `
        You are an expert data analyst. Given the following JSON dataset, analyze it and provide the **Summary**
        

        Here is the JSON dataset:
        ${JSON.stringify(data, null, 2)}
        `;

        const prompt2 = `
        You are an expert data analyst. Given the following JSON dataset, analyze it and provide the **Recommended Charts**: Recommend the best visualizations for the data (e.g., LineChart, BarChart, PieChart, etc.)
        

        Here is the JSON dataset:
        ${JSON.stringify(data, null, 2)}
        `;


        const prompt3 = `
        You are an expert data analyst. Given the following JSON dataset, analyze it and provide the **Additional Insights**: Extract key insights, trends, and anomalies in the dataset.

        Here is the JSON dataset:
        ${JSON.stringify(data, null, 2)}
        `;

        // Call OpenAI API
        const gptResponse1 = await openai.chat.completions.create({
            model: "gpt-4o", // or "gpt-3.5-turbo" for a cheaper option  
            messages: [{ role: "user", content: prompt1 }],
        })

        const gptResponse2 = await openai.chat.completions.create({
            model: "gpt-4o", // or "gpt-3.5-turbo" for a cheaper option  
            messages: [{ role: "user", content: prompt2 }],
        })

        const gptResponse3 = await openai.chat.completions.create({
            model: "gpt-4o", // or "gpt-3.5-turbo" for a cheaper option  
            messages: [{ role: "user", content: prompt3 }],
        })
        // Extract response
        const summary = gptResponse1.choices[0]?.message?.content || "No response";
        const charts = gptResponse2.choices[0]?.message?.content || "No response";
        const insights = gptResponse3.choices[0]?.message?.content || "No response"


        return Response.json({
            Summary: summary, "Recommended Charts": charts, "Additional Insights": insights
        });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Failed to fetch data or process AI response" }, { status: 500 });
    }
}