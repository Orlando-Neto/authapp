import { Box, Paper, useTheme, Icon, Button, Divider, Skeleton } from "@mui/material"

interface IFerramentasDeDetalheProps {
    textNewButton?: string;

    //Exibir botões
    showNewButton?: boolean;
    showSaveButton?: boolean;
    showBackButton?: boolean;
    showDelButton?: boolean;
    showSaveAndBackButton?: boolean;

    //Loading dos botões
    showNewButtonLoading?: boolean;
    showSaveButtonLoading?: boolean;
    showBackButtonLoading?: boolean;
    showDelButtonLoading?: boolean;
    showSaveAndBackButtonLoading?: boolean;

    //onClick dos botões
    onClickNewButton?: () => void;
    onClickBackButton?: () => void;
    onClickDelButton?: () => void;
    onClickSaveButton?: () => void;
    onClickSaveAndBackButton?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textNewButton = 'Novo',

    showBackButton = true,
    showDelButton = true,
    showNewButton = true,
    showSaveAndBackButton = false,
    showSaveButton = true,

    showBackButtonLoading = false,
    showDelButtonLoading = false,
    showNewButtonLoading = false,
    showSaveAndBackButtonLoading = false,
    showSaveButtonLoading = false,

    onClickBackButton,
    onClickDelButton,
    onClickNewButton,
    onClickSaveAndBackButton,
    onClickSaveButton

}) => {

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

            {(showSaveButton && !showSaveButtonLoading) && (<Button
                variant='contained'
                color='primary'
                disableElevation
                onClick={onClickSaveButton}
                startIcon={<Icon>save</Icon>}
            >Salvar</Button>)}

            {showSaveButtonLoading && (<Skeleton width={110} height={60} />)}

            {(showSaveAndBackButton && !showSaveAndBackButtonLoading) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={onClickSaveAndBackButton}
                startIcon={<Icon>save</Icon>}
            >Salvar e Voltar</Button>)}
            
            {showSaveAndBackButtonLoading && (<Skeleton width={180} height={60} />)}
            
            {(showDelButton && !showDelButtonLoading) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={onClickDelButton}
                startIcon={<Icon>delete</Icon>}
            >Apagar</Button>)}

            {showDelButtonLoading && (<Skeleton width={102} height={60} />)}

            {(showNewButton && !showNewButtonLoading) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={onClickNewButton}
                startIcon={<Icon>add</Icon>}
            >{textNewButton}</Button>)}

            {showNewButtonLoading && (<Skeleton width={100} height={60} />)}

            <Divider variant="middle" orientation="vertical" />

            {(showBackButton && !showBackButtonLoading) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={onClickBackButton}
                startIcon={<Icon>arrow_back</Icon>}
            >Voltar</Button>)}

            {showBackButtonLoading && (<Skeleton width={110} height={60} />)}
        </Box>
    );
}