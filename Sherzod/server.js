const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors({ origin: 'http://127.0.0.1:5500' }));


// Foydalanuvchi ro'yxatidagi suratlar saqlanadigan joy
const USER_IMAGES_DIR = path.join(__dirname, 'user_images');

// Middleware
app.use(bodyParser.json({ limit: '10mb' })); // JSON request uchun
app.use(express.static('public')); // Static fayllar uchun

// Foydalanuvchini tekshirish uchun endpoint
app.post('/verify', (req, res) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ success: false, message: 'No image provided' });
    }

    // Baza bilan solishtirish (eng oddiy yo'li: rasm fayl sifatida saqlangan deb hisoblaymiz)
    const imageData = image.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(imageData, 'base64');

    const userImages = fs.readdirSync(USER_IMAGES_DIR);

    let isVerified = false;
    for (const file of userImages) {
        const filePath = path.join(USER_IMAGES_DIR, file);
        const storedImageBuffer = fs.readFileSync(filePath);

        // Oddiy taqqoslash (hash yoki yuzni aniqlash kutubxonasi qo'shishingiz mumkin)
        if (buffer.equals(storedImageBuffer)) {
            isVerified = true;
            break;
        }
    }

    if (isVerified) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Foydalanuvchini ro'yxatdan o'tkazish uchun endpoint
app.post('/register', (req, res) => {
    console.log("keldi");
    
    const { image, username } = req.body;

    if (!image || !username) {
        return res.status(400).json({ success: false, message: 'Image and username are required' });
    }

    const imageData = image.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(imageData, 'base64');

    // Rasmni saqlash
    const filePath = path.join(USER_IMAGES_DIR, `${username}.png`);
    fs.writeFileSync(filePath, buffer);

    res.json({ success: true, message: 'User registered successfully' });
});

// Tekshiruv: serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    // Foydalanuvchi rasmlari uchun papka yaratish
    if (!fs.existsSync(USER_IMAGES_DIR)) {
        fs.mkdirSync(USER_IMAGES_DIR);
    }
});
