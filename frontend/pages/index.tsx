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
    Divider,
    Button
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useRouter } from "next/router";
import NavBar from "../components/nav";
import Layout from "./layout";

interface Portfolio {
    id: number;
    name: string;
    lastname: string;
    profileImage?: {
        id: number;
        filename: string;
        url: string;
    };
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
            const res = await fetch(`http://localhost:3001/portifolio`);
            
            if (!res.ok) {
                throw new Error("Failed to fetch portfolios");
            }

            const data = await res.json();
            setPortfolios(data);
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
                <Container maxWidth="md" sx={{ py: 8 }}>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AdminPanelSettingsIcon />}
                            onClick={() => router.push('/admin')}
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
                            Admin Panel
                        </Button>
                    </Box>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                mb: 3
                            }}
                        >
                            Portfolios
                        </Typography>
                        
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                mb: 4
                            }}
                        >
                            Select a portfolio to view details
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
                                No portfolios found. Create one to get started!
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
                                                        src={portfolio.profileImage?.url}
                                                    >
                                                        {!portfolio.profileImage && <PersonIcon />}
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
