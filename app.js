const { WaBot } = require('fhy-wabot');
const { Octokit } = require('@octokit/rest');
const { GeminiMessage } = require('./libs/Gemini');
const { CheckSEO } = require('./libs/SEO');

const AutoResponse = {};
const ManualResponse = {};

(async () => {
    const sock = await WaBot(false, null, AutoResponse, ManualResponse, false);

    sock.ev.on('messages.upsert', async (messageUpdate) => {
        const message = messageUpdate.messages[0];
        const sender = message.key.remoteJid;
        const text = message.message.conversation || message.message.extendedTextMessage?.text || '';
        
        if (text.startsWith('.ai ')) {
            const question = text.replace('.ai ', '').trim();
            await sock.sendMessage(sender, { react: { text: "⌛", key: message.key } });

            try {
                const responseMessage = await GeminiMessage(question);
                await sock.sendMessage(sender, { text: responseMessage, quoted: message });
                await sock.sendMessage(sender, { react: { text: "✅", key: message.key } });
            } catch (error) {
                console.error(`Error occurred while processing .ai command: ${error.message}`);
                await sock.sendMessage(sender, { react: { text: "❌", key: message.key } });
            }
        }
        
        if (text.startsWith('.github ')) {
            const username = text.replace('.github ', '').trim();
            await sock.sendMessage(sender, { react: { text: "⌛", key: message.key } });

            try {
                const octokit = new Octokit();
                const { data } = await octokit.rest.users.getByUsername({ username });
                const responseMessage = `User Github Info for ${data.login}:\n\n` +
                    `- Name: ${data.name || 'No name available'}\n` +
                    `- Bio: ${data.bio || 'No bio available'}\n` +
                    `- Location: ${data.location || 'No location available'}\n` +
                    `- Company: ${data.company || 'No company available'}\n` +
                    `- Followers: ${data.followers}\n` +
                    `- Following: ${data.following}\n` +
                    `- Repositories: ${data.public_repos}\n` +
                    `- Public Gists: ${data.public_gists}\n` +
                    `- Blog: ${data.blog ? `${data.blog}` : 'No blog available'}\n` +
                    `- Created At: ${new Date(data.created_at).toLocaleDateString()}`;
                
                const ghostingMessage = await GeminiMessage(responseMessage);
                await sock.sendMessage(sender, { text: ghostingMessage, quoted: message });
                await sock.sendMessage(sender, { react: { text: "✅", key: message.key } });
            } catch (error) {
                console.error(`Error occurred while fetching GitHub user: ${error.message}`);
                await sock.sendMessage(sender, { react: { text: "❌", key: message.key } });
            }
        }
        
        if (text.startsWith('.seo ')) {
            const domain = text.replace('.seo ', '').trim();
            await sock.sendMessage(sender, { react: { text: "⌛", key: message.key } });

            try {
                const responseMessage = await CheckSEO(domain);
                const formattedMessage = 
                    '- SEO Success Rate: ' + responseMessage.seoSuccessRate + '\n' +
                    '- Title: ' + responseMessage.title + '\n' +
                    '- Meta Description: ' + responseMessage.metaDescription + '\n' +
                    '- Meta Keywords: ' + responseMessage.metaKeywords + '\n' +
                    '- Open Graph Title: ' + responseMessage.ogTitle + '\n' +
                    '- Open Graph Description: ' + responseMessage.ogDescription + '\n' +
                    '- Open Graph Image: ' + responseMessage.ogImage + '\n' +
                    '- Canonical URL: ' + responseMessage.canonicalUrl + '\n' +
                    '- Is Indexable: ' + (responseMessage.isIndexable ? 'Yes' : 'No');

                const ghostingMessage = await GeminiMessage(formattedMessage);
                await sock.sendMessage(sender, { text: ghostingMessage, quoted: message });
                await sock.sendMessage(sender, { react: { text: "✅", key: message.key } });
            } catch (error) {
                console.error(`Error occurred while checking SEO: ${error.message}`);
                await sock.sendMessage(sender, { react: { text: "❌", key: message.key } });
            }
        }
    });
})();
