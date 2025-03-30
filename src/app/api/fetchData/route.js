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

        const apiResponse = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        // const data = apiResponse.data;

        const data = [
            { date: "2025-01-01", sales: 100 },
            { date: "2025-01-02", sales: 120 },
            { date: "2025-01-03", sales: 110 },
            { date: "2025-01-04", sales: 130 },
            { date: "2025-01-05", sales: 150 }
        ];


        // Initialize OpenAI
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        // AI Prompt
        const prompt = `
        You are an expert data analyst. Given the following JSON dataset, analyze it and provide the following:
        1. **Summary**: 
        2. **Recommended Charts**: Recommend the best visualizations for the data (e.g., LineChart, BarChart, PieChart, etc.) as an object
        3. **Additional Insights**: Extract key insights, trends, and anomalies in the dataset.

        Here is the JSON dataset:
        ${JSON.stringify(data, null, 2)}


        can you return the response in a dictionary format? No unneccessary prefix or text before and after the dictionary...., just the dictionary. as a stringed dictionary. like  this '{}', so i can use Json.parse
        `;

        // Call OpenAI API
        const gptResponse = await openai.chat.completions.create({
            model: "gpt-4o", // or "gpt-3.5-turbo" for a cheaper option  
            messages: [{ role: "user", content: prompt }],
        })

        // Extract response
        const responseText = gptResponse.choices[0]?.message?.content || "No response";
        console.log(responseText)

        return Response.json(JSON.parse(responseText));
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Failed to fetch data or process AI response" }, { status: 500 });
    }
}
