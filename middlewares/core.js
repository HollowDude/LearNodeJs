import cors from 'cors';

export const corsMiddleWare = () => cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:1234',
            'http://localhost:8080',
            'http://127.0.0.1:5500',
        ]

        if(ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        if(!origin) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed cors'))
    }
})