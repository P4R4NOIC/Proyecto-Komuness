import express,{Request,Response,Express} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectBD } from './utils/mongodb';
import { Usuario } from './interfaces/usuario.interface';
import { modelUsuario } from './models/usuario.model';
import { Publicacion } from './interfaces/publicacion.interface';
import { modelPublicacion } from './models/publicacion.model';

const app: Express = express();
dotenv.config();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors(
    {
        origin:'*',
        methods:['GET','POST','PUT','DELETE'],
        credentials:true
    }
));

app.get('/',(req:Request,res:Response)=>{
    res.send('Hello World');
});

/**
 * inicio para crear las colecciones de la base de datos
 */
app.post('/usuario',async (req:Request,res:Response)=>{
    try {
        const usuario: Usuario = req.body;
        const user = new modelUsuario(usuario);
        const saveuser = await user.save();
        res.status(201).json(saveuser);
    } catch (error) {
        const err = error as Error;
    }
});

app.post('/publicacion',async (req:Request,res:Response)=>{
    try {
        const usuario: Publicacion = req.body;
        const post = new modelPublicacion(usuario);
        const savepost = await post.save();
        res.status(201).json(savepost);
    } catch (error) {
        const err = error as Error;
    }
});



const port = process.env.PORT || 5000;

connectBD(process.env.BD_URL || '').then(()=>{
    console.log('Connected to MongoDB');
    app.listen(port,()=>{
        console.log('Server is running on http://localhost:3000');
    });
});
