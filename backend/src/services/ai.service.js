const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});


const generateResponse = async (content) =>{

    try{
        const response = await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:content,
        })
        return response.text;
    }catch(err){
        console.error("!!! ERROR in generateResponse:" , err.message);
        return "Sorry, I encountered an error generating a response.";
    }



}

const generateVector = async (content) =>{

    if (!content || content.trim() === "") {
        console.warn("generateVector received empty content. Returning undefined.");
        return undefined;
    }

    const response = await ai.models.embedContent({
        model:'gemini-embedding-001',
        contents:content,
        config:{
            outputDimensionality:768,
        }
    })

    // if (response.embeddings && response.embeddings.values) {
    //     return response.embeddings.values;
    // } else {
    //     // This case should not be hit if the API call succeeds
    //     throw new Error("API returned an unexpected response structure (embedding not found).");
    // }

    return response.embeddings[0].values

}

module.exports = {
    generateResponse,
    generateVector
}