import * as AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
const spacesEndpoint = new AWS.Endpoint(process.env.S3_ENDPOINT!);

const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    //!TODO: IMPLEMENTAR ESTO QUE HACE FALTA, PARA CUANDO INTEGRE LO DE DIGITAL OCEAN SPACES
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})
/**
 * upload file to digitalOcean spaces, a modular function that can be used in any file in this project
 * 
 * @param file : Express.Multer.File Archivo a subir al bucket
 * @param folder : string Carpeta donde se va a subir el archivo si es null se subira a la raiz
 * @returns : Promise<string | null> URL del archivo subido de manera publica  o null si ocurre un error
 */
export const uploadFile = async (file: Express.Multer.File, folder?: string): Promise<{ location: string, key: string } | null> => {
    // Generar nombre único con timestamp y nombre original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname.replace(/\s+/g, '-'); // Reemplazar espacios por guiones
    const uniqueFileName = `${uniqueSuffix}-${originalName}`;

    const params = {
        Bucket: process.env.BUCKET_NAME!,
        Key: `${folder || 'any'}/${uniqueFileName}`,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
    };
    try {
        const data = await s3.upload(params).promise();
        return {
            location: data.Location,
            key: data.Key
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * deleteFile: delete file from digitalOcean spaces
 * 
 * @param key : string Key del archivo a eliminar
 * @returns boolean true si se elimino correctamente, false si ocurre un error
 */
export const deleteFile = async (key: string): Promise<boolean> => {
    const params = {
        Bucket: process.env.BUCKET_NAME!, // Reemplaza con el nombre de tu bucket  process.env.DO_SPACES_BUCKET!,
        Key: key,
    };
    try {
        const result = await s3.deleteObject(params).promise();
        if (!result.$response.error) {
            return true;
        } else {
            console.log('Error deleting file:', result.$response.error);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}