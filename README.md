# FHY-WaBot Roasting

Rancangan sebuah bot WhatsApp untuk memberikan respons roasting yang kreatif dan humoris berdasarkan perintah pengguna. Dengan memanfaatkan teknologi AI generatif dan berbagai API, bot ini mampu menghasilkan balasan yang lucu dan menghibur, menjadikannya pilihan ideal untuk komunitas yang menghargai humor dan interaksi yang mengasyikkan.

## Pengaturan API

Bot ini menggunakan api dari Gemini, Anda bisa mendapatkan ApiKeys disini [Google AI Studio](https://aistudio.google.com/).

Untuk mengonfigurasi API yang digunakan oleh bot, Anda perlu mengedit file `/libs/gemini.js`.

```javascript
const genAI = new GoogleGenerativeAI('AIzxxxxxxxxxxxxxxxx');
```

Pastikan untuk mengganti `'AIzxxxxxxxxxxxxxxxx'` dengan kunci API yang valid.

## Pengaturan Perintah AI

Anda juga bisa mengatur perintah yang akan dikirim ke AI. Di dalam file yang sama `/libs/gemini.js`:

```javascript
const cmds = `Anda bisa mengubahnya disini sesuai selera.`;

```

## Cara Instalasi

Untuk menginstal **fhy-wabot-roasting**, ikuti langkah-langkah berikut:

- Clone Repositori:

```bash
git clone https://github.com/fitri-hy/fhy-wabot-roasting.git
```

- Masuk ke Direktori Proyek:

```bash
cd fhy-wabot-roasting
```
- Instal Dependensi

Pastikan Anda memiliki Node.js dan npm terinstal di sistem Anda. Kemudian jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan:

```bash
npm install
```

- Jalankan Bot

Setelah instalasi selesai, Anda dapat menjalankan bot dengan perintah:

```bash
npm start
```

Selanjutnya scan qrcode yang ada di terminal untuk menautkan ke akun whastapp Anda.

## Perintah

| prompt                | Deskripsi      |
|-----------------------|------------------|
| `.ai {pertanyaan}`    | Bertanya ke bot AI |
| `.github {username}`    | Roasting akun username github |
| `.seo {domain}`    | Roasting seo situs |

> Package: [fhy-wabot](https://www.npmjs.com/package/fhy-wabot)