import mongoose from 'mongoose';
export async function connectBD(url: string): Promise<void> {
    // Connect to MongoDB
    if (url === '') {
        console.log('No se ha especificado una URL para la base de datos');
        return;
    }
    try {

        await mongoose.connect(url, {
            serverSelectionTimeoutMS: 30000, // 30 segundos
            connectTimeoutMS: 30000,
        });
    } catch (error) {
        console.error(error);
        console.log('Error connecting to MongoDB');
    }
}