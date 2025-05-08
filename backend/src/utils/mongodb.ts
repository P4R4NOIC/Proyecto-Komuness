import mongoose from 'mongoose';
let isConnected = false;

export async function connectBD(url: string): Promise<void> {
  if (isConnected) return; // Evitar conexiones duplicadas
  if (!url) throw new Error("❌ MongoDB URI no proporcionada");

  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    isConnected = true;
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error);
    throw error;
  }
}