
export interface Gasto {
    mes: number;
    ano: number;
    historico: string;
    id: number;
    cod_empresa: number;
    cod_plano_contas: string;
    cod_centro_custo: string;
    tipo_documento: string;
    num_documento: string;
    valor: number;
    data_compet: Date;
    data_liquid: Date;
    id_arq: number;
    cod_tipo: number;
    tipo_cadastro: string;
    cod_fornecedor: number;
    vei_placa: string;
    tipo_imp: string;
    cod_cliente: string;
    cod_centro_lucro: string;
    status_reg: number;
}