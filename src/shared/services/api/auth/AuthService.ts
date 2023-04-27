import { Usuario } from "../../../models/Usuario";
import { Api } from "../axios-config";

interface IAuth {
    token?: string;
    error?: string;
    nome_emp?: string;
}

interface IRegister {
    status?: number,
    username?: string,
    token?: string,
    message?: string,
    validation_errors?: object
}

const auth = async (usuario: string, password: string): Promise<IAuth | Error> => {
    
    try {

        const { data } = await Api.post('/login', {
            usuario: usuario, 
            senha: password, 
            token_emp: '92939fa8d79b9d034ade147a28db7f4ec353ae08'
        });

        if(data) {
            return data;
        }

        return new Error('Erro no login.');
        
    } catch(error) {

        console.error(error);
        return new Error((error as {message: string}).message || 'Erro no login.');
    }
};

const register = async (usuario: Usuario): Promise<IRegister | Error> => {

    await Api.get('/sanctum/csrf-cookie');

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
}

export const AuthService = {
    auth, register
}