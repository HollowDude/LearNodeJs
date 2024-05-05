import z from 'zod';

const Schema = z.object({
  title: z.string({
      invalid_type_error: 'Deberia ser un String el title',
      required_error: 'El titulo es necesario'
  }),
  year: z.number({
      invalid_type_error: 'Tenemos que estar hablando de un entero',
      required_error: 'No debes dejar esto en blanco mi chama!'
  }).int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
      message: 'Poster debe ser un URL valido'
  }),
  genre: z.array(
      z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']),
      {
          required_error: 'El genero es requerido',
          invalid_type_error: 'Debe ser un array of enum Genre'
      }
  )

})

export function validar(object){
  return Schema.safeParse(object);
};

export function validatePartial(input){
  return Schema.partial().safeParse(input);
}
