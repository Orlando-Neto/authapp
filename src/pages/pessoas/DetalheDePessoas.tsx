import { useEffect, useRef, useState } from "react";
import { Box, Grid, LinearProgress, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import Typography from "@mui/material/Typography";
import * as yup from 'yup';

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

interface IFormData {
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nomeCompleto: yup.string().required().min(3, 'O campo precisa ter no mínimo 3 caracteres'),
    email: yup.string().required('O campo é obrigatório').email(),
    cidadeId: yup.number().required(),
});

export const DetalheDePessoas = () => {

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

            PessoasService.getById(Number(id))
                .then(result => {
                    setIsLoading(false);

                    if(result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        
                        setName(result.nomeCompleto);
                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                nomeCompleto: '',
                email: '',
                cidadeId: ''
            });
        }
    }, [id, navigate]);

    const handleSave = (dados: IFormData) => {

        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {

                setIsLoading(true);

                if(id === 'nova') {
        
                    PessoasService.create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
        
                            if(result instanceof Error) {
                                alert(result.message);
                            } else {
                                if(isSaveAndBack()) {
                                    navigate('/pessoas');
                                } else {
                                    navigate(`/pessoas/detalhe/${result}`);
                                }
                            }
                        });
                } else {
        
                    PessoasService.updateById(Number(id), {id: Number(id), ...dadosValidados})
                        .then((result) => {
                            setIsLoading(false);
        
                            if(result instanceof Error) {
                                alert(result.message);
                            } else {
                                if(isSaveAndBack()) {
                                    navigate('/pessoas');
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
            PessoasService.deleteById(id)
                .then(result => {
                    if(result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert("Registro apagado com sucesso!");
                        navigate('/pessoas');
                    }
                });
        }
    }

    return (
        <LayoutBaseDePagina
            title={id === 'nova' ? 'Nova Pessoa' : name}
            toolbar={<FerramentasDeDetalhe 
                textNewButton="Nova"
                showSaveAndBackButton
                showDelButton={id !== 'nova'}
                showNewButton={id !== 'nova'}

                onClickSaveButton={ save }
                onClickSaveAndBackButton={ saveAndBack }
                onClickDelButton={() => handleDelete(Number(id)) }
                onClickNewButton={() => { navigate('/pessoas/detalhe/nova') }}
                onClickBackButton={() => { navigate('/pessoas') }}

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
                                    label="Nome Completo"
                                    name="nomeCompleto"
                                    onChange={e => setName(e.target.value)}
                                    />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    disabled={isLoading}
                                    fullWidth 
                                    label="Email"
                                    name="email"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    disabled={isLoading}
                                    fullWidth 
                                    label="Cidade"
                                    name="cidadeId"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBaseDePagina>
    )
}