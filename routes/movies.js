import { Router } from "express";
import movies from '../movies.json' with { type: 'json'};
import { validar, validatePartial } from '../Schemes/movies.js';
import { randomUUID } from 'node:crypto';



export const rout = Router();

//Los Get

rout.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    

    const { genre }= req.query;
    if(genre){
        const filtro = movies.filter(
            movie => movie.genre.some(g=>g.toLowerCase() === genre.toLowerCase())
        );
        return res.json(filtro);
    }
    res.json(movies);
})

rout.get('/:id', (req, res) => {
    const {id} = req.params;
    const movie = movies.find(movie => movie.id === id);
    if(movie) return res.json(movie);
    
    res.status(404).json({message: 'Movie no esta'});

})

//Postear nuevo

rout.post('/', (req, res) => {
    
    const result = validar(req.body);

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: randomUUID(),
        ...result.data

    }

    //Deberia de guardarlo en base de datos, no en memoria, esto viola lo de la arquitectura REST!!
    movies.push(newMovie);

    res.status(201).json(newMovie);
})

//Borrar

rout.delete('/:id', (req, res) => {
    const {id} = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1) return res.status(404).json({Message: 'Movie dont here'})

    movies.splice(movieIndex, 1);

    return res.json({message: 'Deleteada'});
})

//Modificar

rout.patch('/:id', (req, res) => {
    const result = validatePartial(req.body);

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const {id} = req.params;

    const movieIndex = movies.findIndex(movie => movie.id === id);
    if(movieIndex === -1 ) return res.status(404).json({message:'No se encotro peli con ese ID'});

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie;

    return res.json(updateMovie);

})