import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type TVTextFieldProps = TextFieldProps & {
    name: string;
}

export const VTextField = ({ name, ...rest }: TVTextFieldProps) => {

    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (ref, newValue) => setValue(newValue)
        })
    }, [registerField, fieldName, value]);

    return (
        <TextField
            {...rest}

            error={!!error}
            helperText={error}
            defaultValue={defaultValue}

            onKeyDown={(e) => {error && clearError(); rest.onKeyDown?.(e); }}
            value={value}
            onChange={(e) => {setValue(e.target.value); rest.onChange?.(e);}}
        />
    );
};