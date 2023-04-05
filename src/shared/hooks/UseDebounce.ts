import { useCallback, useRef } from "react";

/**
 * useDebounce é um hook seriamente usada nos pesquisar
 * onde após parar de digitar no textField ele executar o search
 * 
 * @param delay 
 * @param noDaleyInFirstTime 
 * @returns 
 */
export const useDebounce = (delay = 300, noDaleyInFirstTime = true) => {

    const debouncing = useRef<NodeJS.Timeout>();
    const isFirstTime = useRef(noDaleyInFirstTime);

    //Debounce é um método que rodará uma função após um centro tempo
    const debounce = useCallback((func: () => void) => {

        if(isFirstTime.current) {
            isFirstTime.current = false;
            func();
        } else {

            if(debouncing.current) {
                clearTimeout(debouncing.current);
            }
    
            debouncing.current = setTimeout(() => func(), delay);
        }

    }, [delay]);

    return { debounce };
}