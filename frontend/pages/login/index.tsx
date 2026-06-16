import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useRouter } from 'next/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const url = isLogin ? 'http://localhost:3001/auth/login' : 'http://localhost:3001/auth/register';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            localStorage.setItem('access_token', data.access_token);
            router.push('/admin');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', margin: '-10px' }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LockOpenIcon />
                        <Typography variant="h6">Portfólio</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button color="inherit" href="/">Home</Button>
                        <Button color="inherit" href="/portifolio">Portfólio</Button>
                        <Button color="inherit" href="/login">Login</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {isLogin ? 'Acessar conta' : 'Criar conta'}
                        </Typography>
                        <Typography color="text.secondary">
                            Use seu e-mail e senha para acessar o painel.
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={loading}>
                            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Registrar'}
                        </Button>
                        <Button type="button" variant="text" color="secondary" onClick={() => setIsLogin((prev) => !prev)}>
                            {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Faça login'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}