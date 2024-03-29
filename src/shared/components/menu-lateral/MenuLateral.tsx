import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import {
    Drawer,
    Box,
    useTheme,
    Avatar,
    Divider,
    List,
    ListItemButton,
    Icon,
    ListItemIcon,
    ListItemText,
    useMediaQuery
} from '@mui/material';

import { useAppThemeContext, useAuth, useDrawerContext } from '../../context';

interface IListItemLinkProps {
    to: string;
    label: string;
    icon: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick}) => {

    const navigate = useNavigate();

    //Verifica se o caminho da URL bate com a variável to
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({path: resolvedPath.pathname, end: false})

    const handleClick = () => {
        navigate(to)
        onClick?.();
    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
    )
}

interface IMenuLateralProps {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
    const { themeName, toggleTheme } = useAppThemeContext();
    const { logout } = useAuth();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width="100%" height={theme.spacing(20)} display="flex"
                        alignItems="center" justifyContent="center">
                        <Avatar 
                            sx={{
                                height: theme.spacing(12),
                                width: theme.spacing(12)
                            }}
                            src='' />
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink 
                                    to={drawerOptions.path}
                                    key={drawerOptions.path}
                                    icon={drawerOptions.icon}
                                    label={drawerOptions.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined} />
                            ))}
                        </List>
                    </Box>
                    <Box>
                        <List component="nav">
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>{themeName === 'dark'? 'light_mode' : 'dark_mode'}</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Alternar tema"/>
                            </ListItemButton>
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    <Icon>logout</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Sair"/>
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    )
}