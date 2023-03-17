import { Box, Typography, useTheme, IconButton, Icon, useMediaQuery } from '@mui/material';
import { useDrawerContext } from '../context';

interface ILayoutBaseDePaginaProps {
    children: React.ReactNode;
    titulo: string;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({children, titulo}) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1}  display="flex" gap={1} height={theme.spacing(12)}
                alignItems="center">
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}

                <Typography variant='h5'>
                    {titulo}
                </Typography>
            </Box>

            <Box>
                Barra de ferramenta
            </Box>

            <Box>
                {children}
            </Box>
        </Box>
    );
};