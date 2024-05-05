import express, { json } from 'express';
import {corsMiddleWare} from "./middlewares/core.js";
import { rout } from './routes/movies.js';
const app = express();

app.use('/', corsMiddleWare());
app.use(json());
app.use('/movies', rout);

/*app.options('/movies/:id',(req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.sendStatus(200);
})*/


const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Esta listening en el puerto http://localhost:${PORT}`);
})

