import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components"

export const Dashboard: React.FC = () => {

    return (
        <LayoutBaseDePagina 
            titulo='Página inicial totalmente gigante, texto foda gigante gigante'
            barraDeFerramentas={(<FerramentasDeDetalhe />)}>
            Testando
        </LayoutBaseDePagina>
    )
}