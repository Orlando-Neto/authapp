import { useEffect, useMemo, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";

export const ListagemDePessoas = () => {

    //Usando o seacrhParams para que a busca seja escrita na URL para poder compartilhar a busca
    const [searchParams, setSearchParams] = useSearchParams();

    //useDebounce é um método que espera x segundos após terminar de escrever na input
    const { debounce } = useDebounce(1000);

    //States para a listagem de pessoas
    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    //Coloca em modo de carregando em verdade
    const [isLoading, setIsLoading] = useState(true);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(1, search)
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
    }, [search]);

    return (
        <LayoutBaseDePagina 
            title="Listagem de Pessoas"
            toolbar={
                <FerramentasDaListagem
                    textNewButton="Nova"
                    showInputSearch
                    textSearch={search}
                    onChangeTextSearch={text => setSearchParams({search: text}, {replace: true})}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{m: 1, width: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell></TableCell>
                                    <TableCell>{row.nomeCompleto}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}