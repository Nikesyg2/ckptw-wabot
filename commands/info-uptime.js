const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "uptime",
    category: "info",
    code: async (ctx) => {
        const {
            status,
            message
        } = await global.handler(ctx, {
            banned: true,
            cooldown: true
        });
        if (status) return ctx.reply(message);

        const uptime = global.tools.general.convertMsToDuration(Date.now() - ctx.readyAt) || "kurang dari satu detik";
        return ctx.reply(quote(`Bot telah aktif selama ${uptime}.`));
    }
};