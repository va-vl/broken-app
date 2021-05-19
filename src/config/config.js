import dotenv from 'dotenv';

dotenv.config();

export const DB_HOST = process.env.DB_HOST;
export const DB = process.env.DB;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const PORT = process.env.PORT || 4000;

export const JWT_KEY = 'lets_play_sum_games_man';
export const JWT_EXPIRATION_TIME = 60 * 60 * 24;
