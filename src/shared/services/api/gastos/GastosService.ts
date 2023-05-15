import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import { Gasto } from "../../../models/Gasto";

type TGastosComTotalCount = {
    data: Gasto[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TGastosComTotalCount | Error> => {
    
    try {

        const res = await Api.get('/sanctum/csrf-cookie');

        if(res.status === 204) {

            const relativeUrl = `/api/gastos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
            
            const { data } = await Api.get(relativeUrl);
            
            if(data) {
                return data;
            }

            return new Error('Erro ao listar os registros.');
        } else {
            return new Error('Cross Origin não está ligado.');
        }
        
    } catch(error) {
        console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao listar os registros.');
    }
};

const getById = async (id: number): Promise<Gasto | Error> => {
    
    try {

        const { data } = await Api.get(`/api/gastos/${id}`);

        if(data) {
            return data;
        }

        return new Error('Erro ao consultar o registro.');
        
    } catch(error) {
        console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao consultar o registro.');
    }
};

const create = async (dados: Omit<Gasto, 'id'>): Promise<number | Error> => {
    
    try {

        const { data } = await Api.post<Gasto>('/gastos', dados);

        if(data) {
            return Number(data.id);
        }

        return new Error('Erro ao criar o registro.');
        
    } catch(error) {
        console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: Gasto): Promise<void | Error> => {
    
    try {
        await Api.put(`/gastos/${id}`, dados);
    } catch(error) {
        console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    
    try {
        await Api.delete(`/gastos/${id}`);
    } catch(error) {
        console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao apagar o registro.');
    }
};

export const GastosService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};