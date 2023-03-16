import { Drawer, Box, useTheme } from '@mui/material';


interface IMenuLateralProps {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {

    const theme = useTheme();

    return (
        <>
            <Drawer variant='permanent'>
                Teste
            </Drawer>
            <Box height="100vh" marginLeft={theme.spacing(28)}>
                {children}
            </Box>
        </>
    )
}