import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectBD } from './utils/mongodb';
import usuarioRoutes from './routes/usuario.routes';
import publicacionRoutes from './routes/publicaciones.routes';
import { sendEmail } from './utils/mail';

const app: Express = express();
dotenv.config();

app.disable('x-powered-by');
app.use(express.json());
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));

//routes
app.use('/usuario', usuarioRoutes);
app.use('/publicaciones', publicacionRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

const port = process.env.PORT || 5000;

connectBD(process.env.BD_URL || '').then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        sendEmail('eduardo10vm@gmail.com', 'Prueba', 'Prueba de correo');
        console.log('Server is running on http://localhost:3000');
    });
});
