import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentasDeDetalhe } from "../../shared/components"

export const Dashboard: React.FC = () => {

    return (
        <LayoutBaseDePagina 
            title='Página inicial totalmente gigante, texto foda gigante gigante'
            toolbar={(<FerramentasDeDetalhe />)}>
            Testando
        </LayoutBaseDePagina>
    )
}