import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';


//Url da api alvo, usando o axios.create
const Api = axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:8000',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

if(localStorage.getItem("APP_ACCESS_TOKEN")) {
    Api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("APP_ACCESS_TOKEN") || '""')}`;
}

Api.defaults.withCredentials = true;

//Responderá o sucesso com o responseInterceptor e os erros com o errorInterceptor
Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { Api };