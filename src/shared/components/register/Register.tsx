import { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material";


export const Register = () => {

    const [ usuario, setUsuario ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    
    const [ usuarioError, setUsuarioError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');

    const handleSubmit = () => {
        setIsLoading(true);
    };

    return (
        <div>

            Olá registrando
        </div>
    );
}