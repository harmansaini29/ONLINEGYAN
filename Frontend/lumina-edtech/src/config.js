// src/config.js
const isProduction = import.meta.env.MODE === 'production';

export const API_BASE_URL = isProduction 
    ? "https://onlinegyan-production.up.railway.app/api" 
    : "http://localhost:9000/api";