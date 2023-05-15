import React, { createContext, useContext } from 'react';


interface IAppContextData {
    mData: (data: string) => string;
}

const AppContext = createContext({} as IAppContextData);

interface IAppProviderProps {
    children: React.ReactNode
}

export const AppProvider = ({ children }: IAppProviderProps) => {

    //Nesse caso a data tem que vir como vem no banco YYYY-MM-DD
    const mData = (data: string) => {

        let tmp = data.split('-');

        let newData = tmp[2]+'/'+tmp[1]+'/'+tmp[0];

        return newData;
    }

    return (
        <AppContext.Provider value={{
            mData
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);