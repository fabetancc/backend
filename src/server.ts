import express from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import dbConnection from './db/config';
import users from './routes/users';
import auth from './routes/auth';
import task from './routes/task';

export class Server {

    public app = express();
    private port: string;
    private server: any;

    private paths = {
        usuarios: '/api/usuarios',
        auth: '/api/auth',
        task: '/api/task'
    };

    constructor() {

        this.port = process.env.PORT || '3000';
        this.server = http.createServer(this.app);

        // Conectar a base de datos
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    routes(){

        this.app.use(this.paths.usuarios, users);
        this.app.use(this.paths.auth, auth);
        this.app.use(this.paths.task, task);

    }

    async conectarDB(){

        await dbConnection();

    }

    listen(){
        
        this.server.listen(this.port, () =>{

            console.log('Servidor activo en el puerto', this.port);
            
        });

    }

    middlewares(){

        this.app.use(cors(
            {
                
                origin: process.env.ORIGIN || 'http://localhost:4200',
                allowedHeaders: ['Content-Type', 'x-token'],
                credentials: true
            }
        ));

        this.app.use(express.json());
   
    }

}