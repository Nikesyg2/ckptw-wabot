const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "okick",
    category: "owner",
    handler: {
        botAdmin: true,
        group: true,
        owner: true,
        restrict: true
    },
    code: async (ctx) => {
        const {
            status,
            message
        } = await global.handler(ctx, module.exports.handler);
        if (status) return await ctx.reply(message);

        const senderJid = ctx.sender.jid;
        const senderNumber = senderJid.split(/[:@]/)[0];
        const mentionedJids = ctx.msg?.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const account = Array.isArray(mentionedJids) && mentionedJids.length > 0 ? mentionedJids[0] : null;

        if (!account) return await ctx.reply({
            text: `${quote(global.tools.msg.generateInstruction(["send"], ["text"]))}\n` +
                quote(global.tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, `@${senderNumber}`)),
            mentions: [senderJid]
        });

        try {
            if ((await global.tools.general.isAdmin(ctx, account))) return await ctx.reply(quote(`❎ Anggota ini adalah admin grup.`));

            await ctx.group().kick([account]);

            return await ctx.reply(quote(`✅ Berhasil dikeluarkan!`));
        } catch (error) {
            console.error(`[${global.config.pkg.name}] Error:`, error);
            return await ctx.reply(quote(`❎ Terjadi kesalahan: ${error.message}`));
        }
    }
};