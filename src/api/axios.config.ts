import axios from "axios";

const API_ENDPOINT = process.env.API_ENDPOINT;
export const api = axios.create({
    baseURL: API_ENDPOINT,
});
