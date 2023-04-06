import { ReactNode, useEffect } from 'react';
import { Box, Typography, useTheme, IconButton, Icon, useMediaQuery } from '@mui/material';

import { useDrawerContext } from '../context';

interface ILayoutBaseDePaginaProps {
    children: React.ReactNode;
    title: string;
    toolbar: ReactNode | undefined;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({children, title, toolbar}) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const { toggleDrawerOpen } = useDrawerContext();

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <Box
            height="100%"
            display="flex"
            flexDirection="column"
            gap={1}
        >
            <Box 
                padding={1}
                display="flex"
                gap={1}
                height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
                alignItems="center"
            >
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}

                <Typography 
                    variant={smDown ? 'h5': mdDown ? 'h4' : 'h3'}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow='ellipsis'
                >
                    {title}
                </Typography>
            </Box>

            {toolbar && (<Box>
                {toolbar}
            </Box>)}

            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    );
};