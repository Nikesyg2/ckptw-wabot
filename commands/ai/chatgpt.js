const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "chatgpt",
    aliases: ["ai", "chatai", "gpt", "gpt4"],
    category: "ai",
    handler: {
        banned: true,
        cooldown: true
    },
    code: async (ctx) => {
        global.handler(ctx, module.exports.handler).then(({
            status,
            message
        }) => {
            if (status) return ctx.reply(message);
        });

        const input = ctx.args.join(" ") || null;

        if (!input) return ctx.reply(
            `${quote(global.tools.msg.generateInstruction(["send"], ["text"]))}\n` +
            quote(global.tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, "apa itu whatsapp"))
        );

        try {
            const apiUrl = global.tools.api.createUrl("ryzendesu", "/api/ai/chatgpt", {
                text: input,
                prompt: `Anda adalah bot WhatsApp bernama ${global.config.bot.name} yang dimiliki oleh ${global.config.owner.name}. Jika nama Anda mirip dengan tokoh di media, sesuaikan kepribadian Anda dengan nama tersebut. Jika tidak, tetaplah ramah, informatif, dan responsif.` // Dapat diubah sesuai keinginan Anda. 
            });
            const {
                data
            } = await axios.get(apiUrl);

            return ctx.reply(data.response);
        } catch (error) {
            console.error(`[${global.config.pkg.name}] Error:`, error);
            if (error.status !== 200) return ctx.reply(global.config.msg.notFound);
            return ctx.reply(quote(`❎ Terjadi kesalahan: ${error.message}`));
        }
    }
};