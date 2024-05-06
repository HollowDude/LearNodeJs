import express, { json } from 'express';
import {corsMiddleWare} from "./middlewares/core.js";
import { rout } from './routes/movies.js';
const app = express();

app.use(json());
app.use(corsMiddleWare());
app.use('/movies', rout);



const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Esta listening en el puerto http://localhost:${PORT}`);
})

