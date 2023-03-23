import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(1000);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    useEffect(() => {
        
        debounce(() => {
            
            PessoasService.getAll(1, search)
                .then((result) => {
                    if(result instanceof Error) {
                        alert(result.message);
                    } else {
                        console.log(result);
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

        </LayoutBaseDePagina>
    )
}