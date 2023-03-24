import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const Dashboard: React.FC = () => {

    return (
        <LayoutBaseDePagina 
            title='Página inicial totalmente gigante, texto foda gigante gigante'
            toolbar={(<FerramentasDeDetalhe />)}>
            Testando
        </LayoutBaseDePagina>
    )
}