import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material"

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const Dashboard: React.FC = () => {

    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [totalCountCidades, setTotalCountCidades] = useState(0);
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [totalCountPessoas, setTotalCountPessoas] = useState(0);

    useEffect(() => {
        setIsLoadingCidades(true);
        setIsLoadingPessoas(true);

        CidadesService.getAll(1)
            .then((result) => {
                
                setIsLoadingCidades(false);

                if(result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result);

                    setTotalCountCidades(result.totalCount);
                }
            });
            
        PessoasService.getAll(1)
            .then((result) => {
                
                setIsLoadingPessoas(false);

                if(result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result);

                    setTotalCountPessoas(result.totalCount);
                }
            });
    }, []);

    return (
        <LayoutBaseDePagina 
            title='Página inicial'
            toolbar={(<FerramentasDaListagem
                showNewButton={false}
            />)}>
            <Box width='100%' display='flex'>
                <Grid container margin={1}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Pessoas
                                    </Typography>
                                    <Box 
                                        padding={6}
                                        display='flex'
                                        justifyContent='center'
                                        alignItems='center'
                                    >
                                        {isLoadingPessoas ? (
                                            <Typography variant="h6">
                                                Carregando...
                                            </Typography>
                                        ):(
                                            <Typography variant="h1">
                                                {totalCountPessoas}
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Cidades
                                    </Typography>
                                    <Box 
                                        padding={6}
                                        display='flex'
                                        justifyContent='center'
                                        alignItems='center'
                                    >
                                        {isLoadingCidades ? (
                                            <Typography variant="h6">
                                                Carregando...
                                            </Typography>
                                        ):(
                                            <Typography variant="h1">
                                                {totalCountCidades}
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    )
}