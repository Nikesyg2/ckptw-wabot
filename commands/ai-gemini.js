const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const {
    MessageType
} = require("@mengkodingan/ckptw/lib/Constant");
const mime = require("mime-types");
const {
    uploadByBuffer
} = require("telegraph-uploader");

module.exports = {
    name: "gemini",
    category: "ai",
    code: async (ctx) => {
        const {
            status,
            message
        } = await global.handler(ctx, {
            banned: true,
            charger: true,
            cooldown: true,
            energy: "5"
        });
        if (status) return ctx.reply(message);

        const input = ctx.args.join(" ") || null;

        if (!input) return ctx.reply(
            `${quote(global.tools.msg.generateInstruction(["send"], ["text"]))}\n` +
            `${quote(global.tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, "apa itu whatsapp"))}\n` +
            quote("Catatan: AI ini dapat melihat gambar dan menjawab pertanyaan tentangnya. Kirim gambar dan tanyakan apa saja!")
        );

        const msgType = ctx.getMessageType();

        try {
            if (msgType !== MessageType.imageMessage || msgType !== MessageType.videoMessage || !(await ctx.quoted.media.toBuffer())?.conversation) {
                const apiUrl = global.tools.api.createUrl("sandipbaruwal", "/gemini", {
                    prompt: input
                });
                const {
                    data
                } = await axios.get(apiUrl);

                return ctx.reply(data.answer);
            } else {
                const buffer = await ctx.msg.media.toBuffer() || await ctx.quoted?.media.toBuffer();
                const uploadResponse = await uploadByBuffer(buffer, mime.lookup("png"));
                const apiUrl = global.tools.api.createUrl("sandipbaruwal", "/gemini2", {
                    prompt: input,
                    url: uploadResponse.link
                });
                const {
                    data
                } = await axios.get(apiUrl);

                return ctx.reply(data.answer);
            }
        } catch (error) {
            console.error(`[${global.config.pkg.name}] Error:`, error);
            if (error.status !== 200) return ctx.reply(global.config.msg.notFound);
            return ctx.reply(quote(`⚠ Terjadi kesalahan: ${error.message}`));
        }
    }
};