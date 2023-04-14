import { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, TextField, Typography, CircularProgress } from "@mui/material";
import * as yup from 'yup';

import { useAuth } from "../../context";

interface ILoginProps {
    children: React.ReactNode;
}

const loginSchema = yup.object().shape({
    usuario: yup.string().required(),
    password: yup.string().min(5).required(),
});

export const Login = ({ children }: ILoginProps) => {

    const [ usuario, setUsuario ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    
    const [ usuarioError, setUsuarioError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');

    const { isAuthenticated, login } = useAuth();

    const handleSubmit = () => {
        setIsLoading(true);

        loginSchema
            .validate({usuario, password}, {abortEarly: false})
            .then((dadosValidados) => {
                login(dadosValidados.usuario, dadosValidados.password)
                    .then(() => setIsLoading(false));
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                errors.inner.forEach(error => {
                    if(error.path === 'usuario') {
                        setUsuarioError(error.message);
                    } else if (error.path === 'password') {
                        setPasswordError(error.message);
                    }
                })
            });
    };

    if (isAuthenticated) {
        return (
            <>{children}</>
        )
    } else {

        return (
            
            <Box
                width='100vw'
                height="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Card>
                    <CardContent>
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            width={250}
                        >
                            <Typography variant="h6" align="center">
                                Identifique-se
                            </Typography>

                            <TextField
                                disabled={isLoading}
                                error={!!usuarioError}
                                helperText={usuarioError}
                                fullWidth 
                                label="Usuário"
                                type="usuario"
                                value={usuario}
                                onChange={e => setUsuario(e.target.value)}
                                onKeyDown={() => setUsuarioError('')}
                            />

                            <TextField
                                disabled={isLoading}
                                error={!!passwordError}
                                helperText={passwordError}
                                fullWidth 
                                label="Senha"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={() => setPasswordError('')}
                            />
                        </Box>
                    </CardContent>

                    <CardActions>
                        <Box width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                disabled={isLoading}
                                onClick={handleSubmit}
                                endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" color="inherit" /> : undefined}
                            >
                                Entrar
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        );
    }

}