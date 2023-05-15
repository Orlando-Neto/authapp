import { useEffect, useMemo, useState } from "react";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { GastosService } from "../../shared/services/api/gastos/GastosService";
import { Gasto } from "../../shared/models/Gasto";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { useApp } from "../../shared/context/AppContext";

export const ListagemDeGastos = () => {

    //Usando o seacrhParams para que a busca seja escrita na URL para poder compartilhar a busca
    const [searchParams, setSearchParams] = useSearchParams();

    //useDebounce é um método que espera x segundos após terminar de escrever na input
    const { debounce } = useDebounce(3000);

    const navigate = useNavigate();

    //States para a listagem de pessoas
    const [rows, setRows] = useState<Gasto[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    //Coloca em modo de carregando em verdade
    const [isLoading, setIsLoading] = useState(true);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    const page = useMemo(() => {
        return Number(searchParams.get('page') || 1);
    }, [searchParams]);

    const { mData } = useApp();

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            GastosService.getAll(page, search)
                .then((result) => {
                    
                    setIsLoading(false);

                    if(result instanceof Error) {
                        alert(result.message);
                    } else {
                        
                        console.log(result);
                        setRows(result.data);
                        setTotalCount(result.totalCount);
                    }
                });
        });
    }, [search, page, debounce]);

    const handleDelete = (id: number) => {

        if(window.confirm("Realmente deseja apagar?")) {
            GastosService.deleteById(id)
                .then(result => {
                    if(result instanceof Error) {
                        alert(result.message);
                    } else {
                        
                        
                        alert("Registro apagado com sucesso!");
                    }
                });
        }
    };

    return (
        <LayoutBaseDePagina 
            title="Listagem de Gastos"
            toolbar={
                <FerramentasDaListagem
                    textNewButton="Nova"
                    onClickNewButton={() => navigate('/pessoas/detalhe/nova')}
                    showInputSearch
                    textSearch={search}
                    onChangeTextSearch={text => setSearchParams({search: text, page: '1'}, {replace: true})}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{m: 1, width: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Empresa</TableCell>
                            <TableCell>Centro de Custo</TableCell>
                            <TableCell>Número Doc.</TableCell>
                            <TableCell>Grupo da Conta</TableCell>
                            <TableCell>Conta</TableCell>
                            <TableCell>Grupo do Gasto</TableCell>
                            <TableCell>Data Compet.</TableCell>
                            <TableCell>Data Liquid.</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Arquivo</TableCell>
                            <TableCell>Código</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            rows.map(row => (
                                <TableRow key={row.id}>
                                    
                                    <TableCell>{row.cod_empresa}</TableCell>
                                    <TableCell>{row.cod_centro_custo}</TableCell>
                                    <TableCell>{row.num_documento}</TableCell>
                                    <TableCell>{""}</TableCell>
                                    <TableCell>{row.cod_plano_contas}</TableCell>
                                    <TableCell>{row.cod_tipo}</TableCell>
                                    <TableCell>{mData(row.data_compet.toString())}</TableCell>
                                    <TableCell>{mData(row.data_liquid.toString())}</TableCell>
                                    <TableCell>{row.valor}</TableCell>
                                    <TableCell>{row.id_arq}</TableCell>
                                    <TableCell>{row.id}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>

                    {(totalCount === 0 && !isLoading) && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {
                            isLoading && (
                                <TableRow>
                                    <TableCell colSpan={11}>
                                            <LinearProgress variant="indeterminate" />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                            (totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                                <TableRow>
                                    <TableCell colSpan={5}>Total de {(totalCount)} registros</TableCell>
                                    <TableCell colSpan={6} align="right">
                                            <Pagination
                                                page={page}
                                                //ceil arredonda para o maior, assim gerando a paginação corretamente sem perda de dados
                                                count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)} 
                                                onChange={(_, newPage) => setSearchParams({search, page: newPage.toString()}, {replace: true})}
                                            />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}