import { useEffect, useMemo, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material"

import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";

type TAutoCompleteOption = {
    id: number;
    label: string;
};

interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCidade = ({ isExternalLoading = false }: IAutoCompleteCidadeProps) => {

    const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');

    const { debounce } = useDebounce();

    const [ selectedId, setSelectedId ] = useState<number | undefined>(defaultValue);

    const [ opcoes, setOpcoes ] = useState<TAutoCompleteOption[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ search, setSearch ] = useState('');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        })
    }, [registerField, fieldName, selectedId]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            CidadesService.getAll(1, search)
                .then((result) => {
                    setIsLoading(false);
                    
                    if(result instanceof Error) {
                        // alert(result.message);
                    } else {
                        console.log(result);
                        setOpcoes(result.data.map(city => ({id: city.id, label: city.nome})));
                    }
                });
        });
    }, [search, setSearch, debounce]);

    const autoCompleteSelectedOption = useMemo(() => {
        if(!selectedId) return null;

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if(!selectedOption) return null;

        return selectedOption;
    }, [selectedId, opcoes]);

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem opções"
            loadingText="Carregando..."
            clearText="Limpar"

            disablePortal

            loading={isLoading}
            options={opcoes}
            value={autoCompleteSelectedOption}
            disabled={isExternalLoading}
            onInputChange={(_, newValue) => setSearch(newValue)}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
            onChange={(_, newValue) => {setSelectedId(newValue?.id); setSearch(''); clearError();}}
            renderInput={(params) => (
                <TextField 
                    {...params}
                    label="Cidade"
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    )
}