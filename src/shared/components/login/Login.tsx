import { useRef, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, TextField, Typography, CircularProgress, Link } from "@mui/material";
import * as yup from 'yup';

import { useAuth } from "../../context";
import { Usuario } from "../../models/Usuario";

interface ILoginProps {
    children: React.ReactNode;
}

const loginSchema = yup.object().shape({
    usuario: yup.string().required(),
    password: yup.string().min(5).required(),
});

const registerSchema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    usuario: yup.string().required(),
    password: yup.string().min(5).required(),
    password_confirm: yup.string().oneOf([yup.ref('password')], 'Senha tem que ser igual')
});

export const Login = ({ children }: ILoginProps) => {

    //useState do formulário inteiro, desse jeito fica mais fácil para poder
    //controlar os campos
    const [ formLogin, setFormLogin ] = useState({
        usuario: '',
        password: '',
        error_list: {
            usuario: '',
            password: '',
        }
    });

    const [ formRegister, setFormRegister ] = useState({
        usuario: '',
        password: '',
        nome: '',
        password_confirm: '',
        email: '',
        error_list: { //Listagem de erros, fica melhor para quando retornar o erro do back end
            nome: '',
            email: '',
            usuario: '',
            password: '',
            password_confirm: ''
        },
    });

    const [ isLoading, setIsLoading ] = useState(false);
    const [ modoRegistrar, setRegistrar ] = useState(false);

    //Cria uma referencia à um input para poder usar os métodos de input do javascript
    const passRef = useRef<HTMLInputElement>(null);

    const { isAuthenticated, login, register } = useAuth();

    const handleSubmitLogin = () => {

        setIsLoading(true);

        loginSchema
            .validate({
                usuario: formLogin.usuario, 
                password: formLogin.password}, 
                {abortEarly: false})
            .then((dadosValidados) => {
                login(dadosValidados.usuario, dadosValidados.password)
                    .then((res) => {
                        setIsLoading(false);
                        
                        if(res && res.status === 422) {
                            setFormLogin({...formLogin, error_list: res.validation_errors});
                        }
                    });
            })
            .catch((errors: yup.ValidationError) => {

                setIsLoading(false);

                //Coloca os erros numa variável separada para poder commitar depois do foreach
                var arrErro = formLogin.error_list;
                errors.inner.forEach(error => {
                    if(error.path)
                        arrErro = {...arrErro, [error.path]: error.message}
                });

                //Commita os erros no setFormLogin
                setFormLogin({...formLogin, error_list: arrErro});

            });
    };

    const handleSubmitRegister = () => {
        setIsLoading(true);

        registerSchema
            .validate({
                nome: formRegister.nome, 
                email: formRegister.email, 
                usuario: formRegister.usuario, 
                password: formRegister.password, 
                password_confirm: formRegister.password_confirm},
                {abortEarly: false})
            .then((dadosValidados) => {

                const novoUsuario: Usuario = {
                    nome: dadosValidados.nome,
                    password: dadosValidados.password,
                    usuario: dadosValidados.usuario,
                    email: dadosValidados.email
                }

                register(novoUsuario)
                    .then((res) => {
                        
                        setIsLoading(false);
                        
                        if(res.status === 200) {
                            
                        } else {
                            setFormRegister({...formRegister, error_list: res.validation_errors});
                        }
                    });
            })
            .catch((errors: yup.ValidationError) => {

                setIsLoading(false);

                //Coloca os erros numa variável separada para poder commitar depois do foreach
                var arrErro = formRegister.error_list;
                errors.inner.forEach(error => {
                    if(error.path)
                        arrErro = {...arrErro, [error.path]: error.message}
                });

                //Commita os erros no setFormLogin
                setFormRegister({...formRegister, error_list: arrErro});
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
                                error={!!formRegister.error_list.nome}
                                helperText={formRegister.error_list.nome}
                                fullWidth 
                                label="Nome"
                                type="text"
                                value={formRegister.nome}
                                onChange={e => setFormRegister({...formRegister, nome: e.target.value})}
                                onKeyDown={(e) => {
                                    let error_list = formRegister.error_list;
                                    error_list.nome = '';
                                    setFormRegister({...formRegister, error_list});
                                }}
                            />

                            <TextField
                                disabled={isLoading}
                                error={!!formRegister.error_list.email}
                                helperText={formRegister.error_list.email}
                                fullWidth 
                                label="Email"
                                type="email"
                                value={formRegister.email}
                                onChange={e => setFormRegister({...formRegister, email: e.target.value})}
                                onKeyDown={(e) => {
                                    let error_list = formRegister.error_list;
                                    error_list.email = '';
                                    setFormRegister({...formRegister, error_list});
                                }}
                            />

                            <TextField
                                disabled={isLoading}
                                error={!!formRegister.error_list.usuario}
                                helperText={formRegister.error_list.usuario}
                                fullWidth 
                                label="Usuário"
                                type="text"
                                value={formRegister.usuario}
                                onChange={e => setFormRegister({...formRegister, usuario: e.target.value})}
                                onKeyDown={(e) => {
                                    let error_list = formRegister.error_list;
                                    error_list.usuario = '';
                                    setFormRegister({...formRegister, error_list});
                                }}
                            />
                            
                            <TextField
                                disabled={isLoading}
                                error={!!formRegister.error_list.password}
                                helperText={formRegister.error_list.password}
                                fullWidth 
                                label="Senha"
                                inputRef={passRef}
                                type="password"
                                value={formRegister.password}
                                onChange={e => setFormRegister({...formRegister, password: e.target.value})}
                                onKeyDown={(e) => {
                                    let error_list = formRegister.error_list;
                                    error_list.password = '';
                                    setFormRegister({...formRegister, error_list});
                                }}
                            />
                            
                            <TextField
                                disabled={isLoading}
                                error={!!formRegister.error_list.password_confirm}
                                helperText={formRegister.error_list.password_confirm}
                                fullWidth 
                                label="Confirmar Senha"
                                type="password"
                                value={formRegister.password_confirm}
                                onChange={e => setFormRegister({...formRegister, password_confirm: e.target.value})}
                                onKeyDown={(e) => {
                                    let error_list = formRegister.error_list;
                                    error_list.password_confirm = '';
                                    setFormRegister({...formRegister, error_list});
                                    //Dar submit no formulário quando clicar no enter
                                    if(e.key === 'Enter') {
                                        handleSubmitRegister()
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
                                error={!!formLogin.error_list.usuario}
                                helperText={formLogin.error_list.usuario}
                                fullWidth 
                                label="Usuário"
                                type="usuario"
                                value={formLogin.usuario}
                                onChange={e => setFormLogin({...formLogin, usuario: e.target.value})}
                                onKeyDown={(e) => {
                                    let error_list = formLogin.error_list;
                                    error_list.usuario = '';
                                    setFormLogin({...formLogin, error_list});
                                    //Focar no password quando clicar no enter
                                    if(e.key === 'Enter')
                                        passRef.current?.focus();
                                }}
                            />

                            <TextField
                                disabled={isLoading}
                                error={!!formLogin.error_list.password}
                                helperText={formLogin.error_list.password}
                                fullWidth 
                                label="Senha"
                                inputRef={passRef}
                                type="password"
                                value={formLogin.password}
                                onChange={e => setFormLogin({...formLogin, password: e.target.value})}
                                onKeyDown={(e) => {

                                    let error_list = formLogin.error_list;
                                    error_list.password = '';
                                    setFormLogin({...formLogin, error_list});

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