import { createContext, useCallback, useContext, useState } from "react";

interface IDrawerOption {
    icon: string;
    label: string;
    path: string;
}

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOption: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

interface IDrawerProviderProps {
    children: React.ReactNode;
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({children}) => {


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOpctions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOpctions(newDrawerOptions);
    }, []);

    return (
        <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOption: handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    )
}