const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzxxxxxxxxxxxxxxxx');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function GeminiMessage(question) {
    try {
		const cmds = `Anda harus berpura-pura menjadi 74K53L-AI yang sangat hobi nge-roasting. Jawab "${question}". dengan bahasa gaul dan singkat. `;
        const result = await model.generateContent(cmds);
        return result.response.text();
    } catch (error) {
        console.error('Error generating message:', error);
        throw error;
    }
}

module.exports = { GeminiMessage };