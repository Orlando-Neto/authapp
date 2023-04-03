import { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, TextField, Typography, CircularProgress } from "@mui/material";
import * as yup from 'yup';

import { useAuth } from "../../context";

interface ILoginProps {
    children: React.ReactNode;
}

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
});

export const Login = ({ children }: ILoginProps) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState<any>();
    const [ isLoading, setIsLoading ] = useState(false);
    
    const [ emailError, setEmailError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');

    const { isAuthenticated, login } = useAuth();

    const handleSubmit = () => {
        setIsLoading(true);

        loginSchema
            .validate({email, password}, {abortEarly: false})
            .then((dadosValidados) => {
                login(dadosValidados.email, dadosValidados.password)
                    .then(() => setIsLoading(false));
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                errors.inner.forEach(error => {
                    if(error.path === 'email') {
                        setEmailError(error.message);
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
                                error={!!emailError}
                                helperText={emailError}
                                fullWidth 
                                label="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={() => setEmailError('')}
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