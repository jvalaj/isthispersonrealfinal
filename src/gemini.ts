import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not set in .env file");
}
//wdwd
// Configure the client
const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

// Define the grounding tool
const groundingTool = {
  googleSearch: {},
};

// Configure generation settings
const config = {
  tools: [groundingTool],
};

export async function searchWithGemini(name: string, contextaboutperson: string): Promise<string> {
  const prompt = `Search for real, verifiable information about the person named "${name}".  

Please look for:
1. Professional profiles (LinkedIn, X.com, Facebook, Instagram, company websites, academic institutions)
2. News articles or press releases mentioning this person
3. Social media profiles that look like they actually belong to a real human being
4. Any publicly available records or achievements worth bragging about
5. Check forums, blogs, or other corners of the internet where this person might have left a trail
6. Even check the weirder spots — Reddit, Quora, random discussion boards. You never know.

The user also gave you some context about this person, which may help in your sleuthing: ${contextaboutperson}

Format your response as:
- Name: ${name}
- seemsReal: [real if there is consistent, credible information about the person, might not be real if not found on more than 2-3 sites,definitely not real otherwise]
- who is this?: [Add descriptive tags like "cuber, boxer, student, foodie, startup bro" or just "unknown", e.g., description like "software engineer", "marketing guru", "cat lover",]
- Searched: [List specific sites/platforms where you found info, or say "Not found anywhere"]

Be precise. Avoid boring disclaimers. Don’t explain how you did the search — just drop the facts (and jokes where appropriate). If you can’t find anything credible, say so clearly and don’t make stuff up.
`;

  try {
    // Make the request using the correct API structure
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config,
    });

    const text = response.text;
    
    // Add a disclaimer to the response
    const disclaimer = "\n\n⚠️ Always verify information independently.";
    
    return text + disclaimer;
  } catch (error) {
    console.error("Error searching with Gemini:", error);
    throw new Error("Failed to get results from Gemini. Please try again.");
  }
}
