import * as AWS from 'aws-sdk';
;
const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');


const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    //!TODO: IMPLEMENTAR ESTO QUE HACE FALTA, PARA CUANDO INTEGRE LO DE DIGITAL OCEAN SPACES
    // accessKeyId: process.env.DO_SPACES_KEY,
    // secretAccessKey: process.env.DO_SPACES_SECRET,
})
/**
 * upload file to digitalOcean spaces, a modular function that can be used in any file in this project
 * 
 * @param file : Express.Multer.File Archivo a subir al bucket
 * @param folder : string Carpeta donde se va a subir el archivo si es null se subira a la raiz
 * @returns : Promise<string | null> URL del archivo subido de manera publica  o null si ocurre un error
 */
export const uploadFile = async (file: Express.Multer.File, folder?: string): Promise<{ location: string, key: string } | null> => {
    const params = {
        Bucket: 'archivos', // Reemplaza con el nombre de tu bucket  process.env.DO_SPACES_BUCKET!,
        Key: `${folder || 'any'}/${file.originalname}`,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
        // ContentDisposition: 'inline',
        // CreateBucketConfiguration: {
        //     LocationConstraint: 'nyc3',
        // }
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
