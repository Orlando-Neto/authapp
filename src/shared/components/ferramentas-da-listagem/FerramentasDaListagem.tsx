import { Box, TextField, Button, Paper, useTheme, Icon } from '@mui/material'

interface IFerramentasDaListagemProps {

    //TextField
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextDeBusca?: (novoTexto: string) => void;

    //Botão Novo
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    //TextField
    textoDaBusca = '',
    mostrarInputBusca = false,
    aoMudarTextDeBusca,

    //Botão Novo
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    aoClicarEmNovo
}) => {

    //Usar o theme que tem os tamanhos de tela e usar o spacing
    const theme = useTheme();

    return (
        <Box 
            margin={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            gap={1} 
            height={theme.spacing(5)}
            component={Paper}>
            
            {mostrarInputBusca && (<TextField 
                size='small'
                placeholder='Pesquisar...'
                InputProps={{
                    endAdornment: <Icon>search</Icon>
                }}
                value={textoDaBusca}
                onChange={(e) => aoMudarTextDeBusca?.(e.target.value)}
            />)}

            <Box
                flex={1}
                display="flex"
                justifyContent="end"
            >
                {mostrarBotaoNovo && (<Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    endIcon={<Icon>add</Icon>}
                    onClick={aoClicarEmNovo}
                >{textoBotaoNovo}</Button>)}
            </Box>
        </Box>
    );
};