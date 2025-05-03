import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { Request, Response } from 'express';

export const upload = multer({
    storage: multerS3({
        s3: new S3Client({
            endpoint: 'https://nyc3.digitaloceanspaces.com',
            credentials: {
                accessKeyId: process.env.DO_SPACES_KEY!,
                secretAccessKey: process.env.DO_SPACES_SECRET!,
            }
        }),
        bucket: process.env.DO_SPACES_BUCKET!,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req: Request, file: Express.MulterS3.File, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req: Request, file: Express.MulterS3.File, cb) {
            cb(null, `${file.fieldname}/${Date.now().toString()}-${file.originalname}`);
        },
    }),
});
