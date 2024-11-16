// Modul dan dependensi yang diperlukan
const pkg = require("./package.json");
const {
    monospace,
    italic,
    quote
} = require("@mengkodingan/ckptw");

// Konfigurasi
global.config = {
    // Informasi bot dasar
    bot: {
        name: "Entah", // Nama bot
        prefix: /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i, // Karakter awalan perintah yang diizinkan
        phoneNumber: "6281332383711", // Nomor telepon bot (opsional jika menggunakan QR code)
        thumbnail: "https://e1.pxfuel.com/desktop-wallpaper/943/672/desktop-wallpaper-whatsapp-bot-what-is-it-and-how-to-use-messenger-chatbots-chatbot.png", // Gambar thumbnail bot
        website: "https://chat.whatsapp.com/FlqTGm4chSjKMsijcqAIJs" // Website untuk WhatsApp bot
    },

    // Pesan bot yang disesuaikan untuk situasi tertentu
    msg: {
        admin: quote("❎ Perintah hanya dapat diakses oleh admin grup!"), // Pesan ketika perintah hanya untuk admin
        banned: quote("❎ Tidak dapat memproses karena Anda telah dibanned!"), // Pesan untuk pengguna yang dibanned
        botAdmin: quote("❎ Bot bukan admin, tidak bisa menggunakan perintah!"), // Pesan jika bot bukan admin di grup
        cooldown: quote("❎ Perintah ini sedang dalam cooldown, tunggu..."), // Pesan saat cooldown perintah
        coin: quote("❎ Anda tidak punya cukup koin!"), // Pesan ketika koin tidak cukup
        group: quote("❎ Perintah hanya dapat diakses dalam grup!"), // Pesan untuk perintah grup
        owner: quote("❎ Perintah hanya dapat diakses Owner!"), // Pesan untuk perintah yang hanya owner bisa akses
        premium: quote("❎ Anda bukan pengguna Premium!"), // Pesan jika pengguna bukan Premium
        private: quote("❎ Perintah hanya dapat diakses dalam obrolan pribadi!"), // Pesan untuk perintah obrolan pribadi
        restrict: quote("❎ Perintah ini telah dibatasi karena alasan keamanan!"), // Pesan pembatasan perintah

        watermark: `@${pkg.name} / v${pkg.version}`, // Watermark nama dan versi pada bot
        footer: italic("Developed by ItsReimau"), // Footer di pesan bot
        readmore: "\u200E".repeat(4001), // String read more

        wait: quote("🔄 Tunggu sebentar..."), // Pesan loading
        notFound: quote("❎ Tidak ada yang ditemukan! Coba lagi nanti."), // Pesan item tidak ditemukan
        urlInvalid: quote("❎ URL tidak valid!") // Pesan jika URL tidak valid
    },

    // Informasi owner bot
    owner: {
        name: "Tanaa", // Nama owner bot
        number: "628133238711", // Nomor telepon owner bot
        organization: "Mireu Group", // Nama organisasi owner bot
        co: [""] // Nomor co-owner bot
    },

    // Konfigurasi stiker bot
    sticker: {
        packname: "Stiker ini dibuat oleh", // Nama paket stiker
        author: "@ckptw-wabot" // Pembuat stiker
    },

    // Pengaturan sistem bot
    system: {
        autoRead: false, // Apakah bot otomatis membaca pesan masuk
        autoTypingOnCmd: false, // Aktifkan status mengetik ketika memproses perintah
        cooldown: 5000, // Waktu cooldown antar perintah dalam milidetik
        restrict: false, // Membatasi perintah tertentu untuk keamanan
        selfOwner: true, // Apakah bot menjadi owner
        selfReply: true, // Apakah bot merespon pesan yang dikirim bot sendiri
        timeZone: "Asia/Jakarta", // Zona waktu bot
        usePairingCode: true // Menggunakan kode pairing untuk koneksi
    }
};
