import { useRef, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, TextField, Typography, CircularProgress, Link } from "@mui/material";
import * as yup from 'yup';

import { useAuth } from "../../context";

interface ILoginProps {
    children: React.ReactNode;
}

/*
const loginSchema = yup.object().shape({
    usuario: yup.string().required(),
    password: yup.string().min(5).required(),
});*/

const registerSchema = yup.object().shape({
    usuario: yup.string().required(),
    password: yup.string().min(5).required()
});

export const Login = ({ children }: ILoginProps) => {

    //useState do formulário inteiro, desse jeito fica mais fácil para poder
    //controlar os campos
    const [ formLogin, setFormLogin ] = useState({
        usuario: '',
        password: '',
        usuarioError: '',
        passwordError: '',
    });

    const [ formRegister, setFormRegister ] = useState({
        usuario: '',
        password: '',
        usuarioError: '',
        passwordError: '',
    });

    const [ isLoading, setIsLoading ] = useState(false);
    const [ modoRegistrar, setRegistrar ] = useState(false);

    //Cria uma referencia à um input para poder usar os métodos de input do javascript
    const passRef = useRef<HTMLInputElement>(null);

    const { isAuthenticated, login } = useAuth();

    const handleSubmitLogin = () => {

        setIsLoading(true);

        // loginSchema
        //     .validate({
        //         usuario: formLogin.usuario, 
        //         password: formLogin.password}, 
        //         {abortEarly: false})
        //     .then((dadosValidados) => {
                // login(dadosValidados.usuario, dadosValidados.password)
                //     .then(() => setIsLoading(false));
                login(formLogin.usuario, formLogin.password)
                    .then(() => setIsLoading(false));
            // })
            // .catch((errors: yup.ValidationError) => {

            //     setIsLoading(false);

            //     //Coloca os erros numa variável separada para poder commitar depois do foreach
            //     var arrErro = formLogin;
            //     errors.inner.forEach(error => {
            //         if(error.path)
            //             arrErro = {...arrErro, [`${error.path}Error`]: error.message}
            //     });

            //     //Commita os erros no setFormLogin
            //     setFormLogin(arrErro);

            // });
    };

    const handleSubmitRegister = () => {
        setIsLoading(true);

        registerSchema
            .validate({
                usuario: formRegister.usuario, 
                password: formRegister.password}, 
                {abortEarly: false})
            .then((dadosValidados) => {
                console.log(dadosValidados);
                setIsLoading(false);
            })
            .catch((errors: yup.ValidationError) => {

                setIsLoading(false);

                //Coloca os erros numa variável separada para poder commitar depois do foreach
                var arrErro = formRegister;
                errors.inner.forEach(error => {
                    if(error.path)
                        arrErro = {...arrErro, [`${error.path}Error`]: error.message}
                });

                //Commita os erros no setFormLogin
                setFormRegister(arrErro);
            });
    };

    const NavegarParaRegistrar = () => {
        setRegistrar(true);
    }

    const VoltarLogin = () => {
        setRegistrar(false);
    }

    if (isAuthenticated) {
        return (
            <>{children}</>
        )
    } else if(modoRegistrar) {
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
                                Registrar novo usuário
                            </Typography>

                            <TextField
                                disabled={isLoading}
                                error={!!formRegister.usuarioError}
                                helperText={formRegister.usuarioError}
                                fullWidth 
                                label="Usuário"
                                type="usuario"
                                value={formRegister.usuario}
                                onChange={e => setFormRegister({...formRegister, usuario: e.target.value})}
                                onKeyDown={(e) => {
                                    setFormRegister({...formRegister, usuarioError: ''});
                                    //Focar no password quando clicar no enter
                                    if(e.key === 'Enter')
                                        passRef.current?.focus();
                                }}
                            />

                            <TextField
                                disabled={isLoading}
                                error={!!formRegister.passwordError}
                                helperText={formRegister.passwordError}
                                fullWidth 
                                label="Senha"
                                inputRef={passRef}
                                type="password"
                                value={formRegister.password}
                                onChange={e => setFormRegister({...formRegister, password: e.target.value})}
                                onKeyDown={(e) => {
                                    setFormRegister({...formRegister, passwordError: ''});
                                    //Dar submit no formulário quando clicar no enter
                                    if(e.key === 'Enter') {
                                        handleSubmitLogin()
                                    }
                                }}
                            />
                        </Box>
                    </CardContent>

                    <CardActions>

                        <Box width="100%"
                            display="flex"
                            justifyContent="center"
                            gap={2}
                        >
                            <Button
                                variant="contained"
                                disabled={isLoading}
                                onClick={handleSubmitRegister}
                                endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" color="inherit" /> : undefined}
                            >
                                Confirmar
                            </Button>

                            <Button
                                variant="contained"
                                color="info"
                                disabled={isLoading}
                                onClick={VoltarLogin}
                                endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" color="inherit" /> : undefined}
                            >
                                Cancelar
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        );
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
                                Login
                            </Typography>

                            <TextField
                                disabled={isLoading}
                                error={!!formLogin.usuarioError}
                                helperText={formLogin.usuarioError}
                                fullWidth 
                                label="Usuário"
                                type="usuario"
                                value={formLogin.usuario}
                                onChange={e => setFormLogin({...formLogin, usuario: e.target.value})}
                                onKeyDown={(e) => {
                                    setFormLogin({...formLogin, usuarioError: ''});
                                    //Focar no password quando clicar no enter
                                    if(e.key === 'Enter')
                                        passRef.current?.focus();
                                }}
                            />

                            <TextField
                                disabled={isLoading}
                                error={!!formLogin.passwordError}
                                helperText={formLogin.passwordError}
                                fullWidth 
                                label="Senha"
                                inputRef={passRef}
                                type="password"
                                value={formLogin.password}
                                onChange={e => setFormLogin({...formLogin, password: e.target.value})}
                                onKeyDown={(e) => {
                                    setFormLogin({...formLogin, passwordError: ''});

                                    //Dar submit no formulário quando clicar no enter
                                    if(e.key === 'Enter') {
                                        handleSubmitLogin()
                                    }
                                }}
                            />
                        </Box>
                    </CardContent>

                    <CardActions>

                        <Box width="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                            alignItems="center"
                            gap={1}
                        >
                            <Button
                                variant="contained"
                                disabled={isLoading}
                                onClick={handleSubmitLogin}
                                endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" color="inherit" /> : undefined}
                            >
                                Entrar
                            </Button>

                            <Link href="#" onClick={NavegarParaRegistrar}>Registrar</Link>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        );
    }
}