import { MovieModel } from '../models/movie.js';
import { validar, validatePartial } from '../Schemes/movies.js';

export class MovieController{

    static async getAll (req, res){
        const { genre }= req.query;
        const movies = await MovieModel.getAll({genre});
        res.json(movies);
    }

    static async getByID (req, res) {
        const {id} = req.params;
        const movie = await MovieModel.getByID({id});
        if(movie) return res.json(movie);
        res.status(404).json({message: 'Movie no esta'});
    
    }

    static async newMovie (req, res) {
    
        const result = validar(req.body);
    
        if(result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
    
        const newMovie = await MovieModel.create({input: result.data});
    
        res.status(201).json(newMovie);
    }

    static async deleteMovie (req, res) {
        const {id} = req.params;
        const result = await MovieModel.delete({id});
        if(result === false) return res.status(404).json({Message: 'Movie dont here'});
    
        return res.json({message: 'Deleteada'});
    }

    static async movieMod (req, res) {
        const result = validatePartial(req.body);
    
        if(result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)});
        }
    
        const {id} = req.params;
    
       const updatedMovie = await MovieModel.update({id, input: result.data});
    
        return res.json(updatedMovie);
    
    }

}