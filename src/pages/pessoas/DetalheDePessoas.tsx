import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";


export const DetalheDePessoas = () => {

    //Busca o parametro id como primeiro parametro, para colocar outro paramentro só colocar vírgula
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
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
                        console.log(result);

                        setName(result.nomeCompleto);
                    }
                });
        }
    }, [id, navigate]);

    const handleSave = () => {
        console.log('Save');
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

                onClickSaveButton={ handleSave }
                onClickSaveAndBackButton={ handleSave }
                onClickDelButton={() => handleDelete(Number(id)) }
                onClickNewButton={() => { navigate('/pessoas/detalhe/nova') }}
                onClickBackButton={() => { navigate('/pessoas') }}
            />}
        >
            {(isLoading) && (
                <LinearProgress variant="indeterminate" />
            )}
            {id}
        </LayoutBaseDePagina>
    )
}