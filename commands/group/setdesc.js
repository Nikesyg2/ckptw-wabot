const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "setdesc",
    category: "group",
    handler: {
        admin: true,
        banned: true,
        botAdmin: true,
        cooldown: true,
        group: true
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
            quote(global.tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, "by itsreimau"))
        );

        try {
            await ctx.group().updateDescription(input);

            return ctx.reply(quote(`✅ Berhasil mengubah deskripsi grup!`));
        } catch (error) {
            console.error(`[${global.config.pkg.name}] Error:`, error);
            return ctx.reply(quote(`❎ Terjadi kesalahan: ${error.message}`));
        }
    }
};