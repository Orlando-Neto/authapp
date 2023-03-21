import { Box, TextField, Button, Paper, useTheme, Icon } from '@mui/material'

interface IFerramentasDaListagemProps {

    //TextField
    textSearch?: string;
    showInputSearch?: boolean;
    onChangeTextSearch?: (newText: string) => void;

    //Botão Novo
    textNewButton?: string;
    showNewButton?: boolean;
    onClickNewButton?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    //TextField
    textSearch = '',
    showInputSearch = false,
    onChangeTextSearch,

    //Botão Novo
    textNewButton = 'Novo',
    showNewButton = true,
    onClickNewButton
}) => {

    //Usar o theme que tem os tamanhos de tela e usar o spacing
    const theme = useTheme();

    //Box(1) com o component paper para poder utilizar seus os atributos
    //Button sem elevação e com icone após o texto
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
            
            {showInputSearch && (<TextField 
                size='small'
                placeholder='Pesquisar...'
                InputProps={{
                    endAdornment: <Icon>search</Icon>
                }}
                value={textSearch}
                onChange={(e) => onChangeTextSearch?.(e.target.value)}
            />)}
            
            <Box
                flex={1}
                display="flex"
                justifyContent="end"
            >
                {showNewButton && (<Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    endIcon={<Icon>add</Icon>}
                    onClick={onClickNewButton}
                >{textNewButton}</Button>)}
            </Box>
        </Box>
    );
};