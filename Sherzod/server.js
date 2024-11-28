
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const canvas = require('canvas');
const faceapi = require('face-api.js');
const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Foydalanuvchi rasm papkasi
const USER_IMAGES_DIR = path.join(__dirname, 'user_images');

// TensorFlow.js-ni o'rnatish
require('@tensorflow/tfjs-node');

// NodeCanvas adapteri
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

// Modellarni yuklash
const MODEL_PATH = path.join(__dirname, 'models');
async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
}

// Yuzni aniqlash va xususiyatlarni olish funksiyasi
async function getFaceDescriptor(imageBuffer) {
    const img = await canvas.loadImage(imageBuffer);
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    return detections ? detections.descriptor : null;
}

// Foydalanuvchini ro'yxatga olish endpointi
app.post('/register', async (req, res) => {
    const { image, username } = req.body;

    if (!image || !username) {
        return res.status(400).json({ success: false, message: 'Image and username are required' });
    }

    const imageData = image.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(imageData, 'base64');

    // Yuz xususiyatlarini olish
    const descriptor = await getFaceDescriptor(buffer);
    if (!descriptor) {
        return res.status(400).json({ success: false, message: 'No face detected in the image' });
    }

    // Rasmni saqlash
    const filePath = path.join(USER_IMAGES_DIR, `${username}.png`);
    fs.writeFileSync(filePath, buffer);

    // Yuz xususiyatlarini saqlash
    const descriptorPath = path.join(USER_IMAGES_DIR, `${username}.json`);
    fs.writeFileSync(descriptorPath, JSON.stringify(descriptor));

    res.json({ success: true, message: 'User registered successfully' });
});

// Foydalanuvchini tekshirish endpointi
app.post('/verify', async (req, res) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ success: false, message: 'No image provided' });
    }

    const imageData = image.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(imageData, 'base64');

    // Yuz xususiyatlarini olish
    const uploadedDescriptor = await getFaceDescriptor(buffer);
    if (!uploadedDescriptor) {
        return res.status(400).json({ success: false, message: 'No face detected in the image' });
    }

    // Foydalanuvchi rasm va descriptorlarini tekshirish
    const userImages = fs.readdirSync(USER_IMAGES_DIR);
    let isVerified = false;

    for (const file of userImages) {
        if (file.endsWith('.json')) {
            const storedDescriptor = JSON.parse(fs.readFileSync(path.join(USER_IMAGES_DIR, file)));
            const distance = faceapi.euclideanDistance(uploadedDescriptor, storedDescriptor);

            if (distance < 0.6) { // Ostonaviy qiymat (threshold)
                isVerified = true;
                break;
            }
        }
    }

    if (isVerified) {
        res.json({ success: true, message: 'Face verified successfully' });
    } else {
        res.json({ success: false, message: 'Face verification failed' });
    }
});

// Serverni ishga tushurish
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    if (!fs.existsSync(USER_IMAGES_DIR)) {
        fs.mkdirSync(USER_IMAGES_DIR);
    }

    await loadModels();
    console.log('Face-api.js models loaded successfully');
});

