import { useEffect, useMemo, useState } from "react";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Pessoa } from "../../shared/models/Pessoa";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";

export const ListagemDePessoas = () => {

    //Usando o seacrhParams para que a busca seja escrita na URL para poder compartilhar a busca
    const [searchParams, setSearchParams] = useSearchParams();

    //useDebounce é um método que espera x segundos após terminar de escrever na input
    const { debounce } = useDebounce(3000);

    const navigate = useNavigate();

    //States para a listagem de pessoas
    const [rows, setRows] = useState<Pessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    //Coloca em modo de carregando em verdade
    const [isLoading, setIsLoading] = useState(true);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    const page = useMemo(() => {
        return Number(searchParams.get('page') || 1);
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(page, search)
                .then((result) => {
                    
                    setIsLoading(false);

                    if(result instanceof Error) {
                        alert(result.message);
                    } else {
                        
                        setRows(result.data);
                        setTotalCount(result.totalCount);
                    }
                });
        });
    }, [search, page, debounce]);

    const handleDelete = (id: number) => {

        if(window.confirm("Realmente deseja apagar?")) {
            PessoasService.deleteById(id)
                .then(result => {
                    if(result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(oldRows => [
                                ...oldRows.filter(oldRow => oldRow.id !== id)
                        ]);

                        alert("Registro apagado com sucesso!");
                    }
                });
        }
    };

    return (
        <LayoutBaseDePagina 
            title="Listagem de Pessoas"
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
                            <TableCell width={100}>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                            <Icon>delete</Icon>
                                        </IconButton>
                                        <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{row.nomeCompleto}</TableCell>
                                    <TableCell>{row.email}</TableCell>
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
                                    <TableCell colSpan={3}>
                                            <LinearProgress variant="indeterminate" />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                            (totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                            <Pagination
                                                page={page}
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