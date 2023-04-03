import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../environment';

//Url da api alvo
const Api = axios.create({
    baseURL: Environment.URL_BASE,
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