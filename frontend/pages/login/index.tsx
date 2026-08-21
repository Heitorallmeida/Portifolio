import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useRouter } from 'next/router';
import { getAccessTokenPayload, isExpiredToken } from '@/utils/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        const token = localStorage.getItem('access_token');
        const payload = token ? getAccessTokenPayload(token) : null;

        if (payload?.portifolioId && !isExpiredToken(payload)) {
            void router.replace(`/admin?id=${payload.portifolioId}`);
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

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
                const error = await response.json().catch(() => null);
                throw new Error(error?.message || 'Unable to authenticate with these credentials.');
            }

            const data = await response.json();

            localStorage.setItem('access_token', data.access_token);
            if (!data.portifolioId) {
                throw new Error('No portfolio is associated with this account.');
            }
            router.push(`/admin?id=${data.portifolioId}`);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', color: 'text.primary', background: 'linear-gradient(145deg, #e0f2fe 0%, #f8fafc 42%, #f0fdfa 100%)' }}>
            <AppBar position="static" elevation={0} sx={{ background: 'rgba(15, 23, 42, 0.96)', borderBottom: '1px solid rgba(103, 232, 249, 0.2)' }}>
                <Toolbar sx={{ width: 'min(1180px, 100%)', minHeight: '68px !important', mx: 'auto', px: { xs: 2, md: 0 }, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LockOpenIcon sx={{ color: '#67e8f9' }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.04em' }}>HA<span style={{ color: '#67e8f9' }}>.</span></Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button color="inherit" href="/" sx={{ color: '#cbd5e1' }}>Home</Button>
                        <Button color="inherit" href="/portifolio" sx={{ color: '#cbd5e1' }}>Portfolio</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
                <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid #dbeafe', borderRadius: 4, boxShadow: '0 24px 60px rgba(15, 23, 42, 0.14)' }}>
                    <Box sx={{ px: { xs: 3, md: 5 }, py: 4, background: 'linear-gradient(135deg, #0f172a, #155e75)', color: '#fff' }}>
                        <Typography variant="overline" sx={{ color: '#67e8f9', fontWeight: 800, letterSpacing: '0.16em' }}>PORTFOLIO WORKSPACE</Typography>
                        <Typography variant="h4" component="h1" sx={{ mt: 0.5, fontWeight: 800, letterSpacing: '-0.04em' }}>
                            {isLogin ? 'Manage your portfolio' : 'Create your portfolio workspace'}
                        </Typography>
                        <Typography sx={{ mt: 1, color: '#cbd5e1' }}>
                            {isLogin ? 'Sign in to edit your information and preview your published portfolio.' : 'Create an account to build, manage, and share your own professional portfolio.'}
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2.5, p: { xs: 3, md: 5 } }}>
                        {errorMessage && <Alert severity="error" sx={{ borderRadius: 2 }}>{errorMessage}</Alert>}
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.35, fontWeight: 700, background: '#0891b2', '&:hover': { background: '#0e7490' } }}>
                            {loading ? 'Please wait...' : isLogin ? 'Access my portfolio workspace' : 'Create my portfolio workspace'}
                        </Button>
                        <Button type="button" variant="text" onClick={() => { setIsLogin((prev) => !prev); setErrorMessage(''); }} sx={{ color: '#0e7490', fontWeight: 700 }}>
                            {isLogin ? "New here? Create your portfolio workspace" : 'Already have a portfolio? Access your workspace'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
