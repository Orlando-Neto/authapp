import { Api } from "../axios-config";

interface IAuth {
    accessToken: string;
    error: string;
    nome_emp: string;
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

const register = async (usuario: string, password: string): Promise<IAuth | Error> => {

    const { data } = await Api.post('/register', {
        usuario: usuario, 
        senha: password
    });

    if(data) {
        return data;
    }

    return new Error('Erro ao enviar os dados.');
}

export const AuthService = {
    auth, register
}