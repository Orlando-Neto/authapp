import { Usuario } from "../../../models/Usuario";
import { Api } from "../axios-config";

interface iAuth {
    message: string;
    status: number;
    token: string
    username: string
}

const auth = async (usuario: string, password: string): Promise<iAuth | Error> => {
    
    try {

        const res = await Api.get('/sanctum/csrf-cookie');

        if(res.status === 204) {

            const { data } = await Api.post('/api/login', { usuario, password });

            if(data) {
                return data;
            }

            return new Error('Erro no login.');
        } else {
            return new Error('Cross Origin não está ligado.');
        }
    } catch(error) {

        console.error(error);
        return new Error((error as {message: string}).message || 'Erro no login.');
    }
};


const register = async (usuario: Usuario): Promise<any | Error> => {

    const res = await Api.get('/sanctum/csrf-cookie');

    if(res.status === 204) {

        const { data } = await Api.post('/api/register', {
            usuario: usuario.usuario, 
            password: usuario.password,
            nome: usuario.nome,
            email: usuario.email
        });
    
        if(data) {
            return data;
        }
    
        return new Error('Erro ao enviar os dados.');
    } else {
        return new Error('Cross Origin não está ligado.');
    }
}

export const AuthService = {
    auth, register
}