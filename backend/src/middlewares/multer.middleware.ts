import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, '../tmp/uploads');
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})

export const upload = multer({
    storage,
    limits: {
        fileSize: 1000000 * 100 // 100 MB
    },
});