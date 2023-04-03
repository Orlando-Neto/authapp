import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import Typography from "@mui/material/Typography";
import * as yup from 'yup';

import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3),
});

export const DetalheDeCidades = () => {

    //Busca o parametro id como primeiro parametro, para colocar outro paramentro só colocar vírgula
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    //Pega uma referencia do HTML que está utilizando para utilizar essa referencia por fora
    const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();

    //isLoading para deixar o site em modo carregando enquanto carrega as variáveis async
    const [isLoading, setIsLoading] = useState(false);

    //name que será utilizado para mostrar o nome da pessoa a ser alterada (caso for editar uma pessoa)
    const [name, setName] = useState('');

    useEffect(() => {
        if(id !== 'nova') {

            setIsLoading(true);

            CidadesService.getById(Number(id))
                .then(result => {
                    setIsLoading(false);

                    if(result instanceof Error) {
                        alert(result.message);
                        navigate('/cidades');
                    } else {
                        
                        setName(result.nome);
                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                nome: ''
            });
        }
    }, [id, navigate, formRef]);

    const handleSave = (dados: IFormData) => {

        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {

                setIsLoading(true);

                if(id === 'nova') {
        
                    CidadesService.create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
        
                            if(result instanceof Error) {
                                alert(result.message);
                            } else {
                                if(isSaveAndBack()) {
                                    navigate('/cidades');
                                } else {
                                    navigate(`/cidades/detalhe/${result}`);
                                }
                            }
                        });
                } else {
        
                    CidadesService.updateById(Number(id), {id: Number(id), ...dadosValidados})
                        .then((result) => {
                            setIsLoading(false);
        
                            if(result instanceof Error) {
                                alert(result.message);
                            } else {
                                if(isSaveAndBack()) {
                                    navigate('/cidades');
                                }
                            }
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};
                errors.inner.forEach(error => {
                    if(!error.path) return;

                    validationErrors[error.path] = error.message;
                });

                formRef.current?.setErrors(validationErrors);
            });
    }

    const handleDelete = (id: number) => {

        if(window.confirm("Realmente deseja apagar?")) {
            CidadesService.deleteById(id)
                .then(result => {
                    if(result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert("Registro apagado com sucesso!");
                        navigate('/cidades');
                    }
                });
        }
    }

    return (
        <LayoutBaseDePagina
            title={id === 'nova' ? 'Nova Cidade' : name}
            toolbar={<FerramentasDeDetalhe 
                textNewButton="Nova"
                showSaveAndBackButton
                showDelButton={id !== 'nova'}
                showNewButton={id !== 'nova'}

                onClickSaveButton={ save }
                onClickSaveAndBackButton={ saveAndBack }
                onClickDelButton={() => handleDelete(Number(id)) }
                onClickNewButton={() => { navigate('/cidades/detalhe/nova') }}
                onClickBackButton={() => { navigate('/cidades') }}

                showBackButtonLoading={isLoading}
                showDelButtonLoading={isLoading}
                showNewButtonLoading={isLoading}
                showSaveAndBackButtonLoading={isLoading}
                showSaveButtonLoading={isLoading}
            />}
        >
            <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column"
                    component={Paper} variant="outlined"
                >
                    <Grid container direction="column" padding={2} spacing={2}>

                        {(isLoading) && (
                            <Grid item>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">
                                Geral
                            </Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    disabled={isLoading}
                                    fullWidth 
                                    label="Nome"
                                    name="nome"
                                    onChange={e => setName(e.target.value)}
                                    />
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </VForm>
        </LayoutBaseDePagina>
    )
}