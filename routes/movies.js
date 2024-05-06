import { Router } from 'express';
import { MovieController } from '../controllers/movie.js';

export const rout = Router();

//Los Get

rout.get('/', MovieController.getAll )
rout.get('/:id', MovieController.getByID )

//Postear nuevo

rout.post('/', MovieController.newMovie )

//Borrar

rout.delete('/:id', MovieController.deleteMovie )

//Modificar

rout.patch('/:id', MovieController.movieMod )