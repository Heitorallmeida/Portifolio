"use client"

import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Avatar,
    CircularProgress,
    Alert,
    Paper,
    Button
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useRouter } from "next/router";
import NavBar from "../components/nav";
import Layout from "./layout";
import { apiGet } from "../utils/fetcher";

interface Portfolio {
    id: number;
    name: string;
    lastname: string;
    profileImageUrl?: string;
}

export default function Home() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            setLoading(true);
            const data = await apiGet<any>('/portifolio');
            if (!Array.isArray(data)) {
                throw new Error('Invalid response from server');
            }
            setPortfolios(data as Portfolio[]);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching portfolios:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <NavBar />
                <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Box>
                            <Typography variant="overline" sx={{ color: '#0891b2', fontWeight: 800, letterSpacing: '0.14em' }}>PORTFOLIO DIRECTORY</Typography>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, letterSpacing: '-0.04em' }}>Explore published portfolios</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AdminPanelSettingsIcon />}
                            onClick={() => router.push('/login')}
                            sx={{
                                px: 3,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderRadius: 2,
                                boxShadow: 2,
                                '&:hover': {
                                    boxShadow: 4,
                                }
                            }}
                        >
                            Create or manage my portfolio
                        </Button>
                    </Box>
                    <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, border: '1px solid #e2e8f0', borderRadius: 4, boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)' }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                mb: 3
                            }}
                        >
                            Find a portfolio
                        </Typography>
                        
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                mb: 4
                            }}
                        >
                            Choose a profile below to view its experience, skills, and featured work. To build or edit your own, use the workspace button above.
                        </Typography>

                        {loading && (
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                                <CircularProgress />
                            </Box>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {!loading && !error && portfolios.length === 0 && (
                            <Alert severity="info">
                                No published portfolios yet. Create your own portfolio workspace to get started.
                            </Alert>
                        )}

                        {!loading && !error && portfolios.length > 0 && (
                            <List >
                                {portfolios?.map((portfolio, index) => (
                                    <Box key={portfolio.id}>
                                            <ListItemButton
                                                onClick={() => router.push(`/portifolio?id=${portfolio.id}`)}
                                                sx={{
                                                    py: 2,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                    },
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        sx={{
                                                            backgroundColor: 'primary.main',
                                                            width: 50,
                                                            height: 50,
                                                        }}
                                                        src={portfolio.profileImageUrl}
                                                    >
                                                        {!portfolio.profileImageUrl && <PersonIcon />}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="h6" component="span">
                                                            {portfolio.name} {portfolio.lastname}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography variant="body2" color="text.secondary">
                                                            Portfolio ID: {portfolio.id}
                                                        </Typography>
                                                    }
                                                />
                                                <ArrowForwardIosIcon sx={{ color: 'text.secondary' }} />
                                            </ListItemButton>
                                        </Box>
                                ))}
                            </List>
                        )}
                    </Paper>
                </Container>
        </Layout>
    );
}
