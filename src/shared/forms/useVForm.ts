import { useCallback, useRef } from "react";
import { FormHandles } from "@unform/core";

export const useVForm = () => {
    
    //Pega uma referencia do HTML que está utilizando para utilizar essa referencia por fora
    const formRef = useRef<FormHandles>(null);

    const isSavingAndNew = useRef(false);
    const isSavingAndBack = useRef(false);

    const handleSave = useCallback(() => {
        isSavingAndNew.current = false;
        isSavingAndBack.current = false;

        formRef.current?.submitForm();
    }, []);

    const handleSaveAndNew = useCallback(() => {

        isSavingAndNew.current = true;
        isSavingAndBack.current = false;
        
        formRef.current?.submitForm();
    }, []);

    const handleSaveAndBack = useCallback(() => {

        isSavingAndNew.current = false;
        isSavingAndBack.current = true;
        
        formRef.current?.submitForm();
    }, []);

    const handleIsSaveAndNew = useCallback(() => {
        return isSavingAndNew.current;
    }, []);

    const handleIsSaveAndBack = useCallback(() => {
        return isSavingAndBack.current;
    }, []);

    return {
        formRef,
        save: handleSave,
        saveAndNew: handleSaveAndNew,
        saveAndBack: handleSaveAndBack,

        isSaveAndNew: handleIsSaveAndNew,
        isSaveAndBack: handleIsSaveAndBack,
    };
}