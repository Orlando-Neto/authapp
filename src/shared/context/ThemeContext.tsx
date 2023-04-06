import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, Box } from '@mui/material';

import { DarkTheme, LightTheme } from '.././themes';

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

interface IAppThemeProviderProps {
    children: React.ReactNode;
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({children}) => {

    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {

        setThemeName(oldeThemeName => {
            
            localStorage.setItem('THEME', oldeThemeName === 'light' ? 'dark' : 'light')
            
            return oldeThemeName === 'light' ? 'dark' : 'light';
        });

    }, []);
    
    const theme = useMemo(() => {
        if(themeName === 'light') return LightTheme;
        
        return DarkTheme;
        
    }, [themeName]);

    useEffect(() => {

        const theme = localStorage.getItem('THEME');

        if(theme && (theme === 'dark' || theme === 'light')) {
            setThemeName(theme);
        }
    }, [])

    return (
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={theme} >
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}