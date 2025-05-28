import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectBD } from './utils/mongodb';
import usuarioRoutes from './routes/usuario.routes';
import publicacionRoutes from './routes/publicaciones.routes';
import bibliotecaRoutes from './routes/biblioteca.routes';
import { sendEmail } from './utils/mail';
import cookieParser from 'cookie-parser';

const app: Express = express();
dotenv.config();

app.disable('x-powered-by');
app.use(cookieParser())
app.use(express.json());
app.use(cors(
    {
        origin: [
            'http://localhost:3001',
            'http://localhost:3000',
            'https://proyecto-komuness-front.vercel.app',
            'https://komuness-project.netlify.app'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));

//routes
app.use('/usuario', usuarioRoutes);
app.use('/publicaciones', publicacionRoutes);
app.use('/biblioteca', bibliotecaRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

const port = process.env.PORT || 5000;

// Conexión a MongoDB y exportación
(async () => {
    await connectBD(process.env.BD_URL!);
    console.log("✅ MongoDB conectado");
})();


export default app;

// esto es para que no se ejecute el server al importarlo en otro archivo
if (require.main === module) {
    console.log(process.env.AWS_ACCESS_KEY_ID, process.env.S3_ENDPOINT);
    connectBD(process.env.BD_URL || '').then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    });
}
