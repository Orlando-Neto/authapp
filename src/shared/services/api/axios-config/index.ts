import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';

//Url da api alvo, usando o axios.create
const Api = axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:3333',
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("APP_ACCESS_TOKEN") || '""')}`
    }
});

//Responderá o sucesso com o responseInterceptor e os erros com o errorInterceptor
Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { Api };