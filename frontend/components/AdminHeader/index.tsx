import { Box, Button, Paper, Typography } from "@mui/material";
import { headerStyles } from "./styles";

type AdminHeaderProps = {
  onViewPortfolios: () => void;
  onLogout: () => void;
  onDeletePortfolio: () => void;
};

export function AdminHeader({ onViewPortfolios, onLogout, onDeletePortfolio }: AdminHeaderProps) {
  return <Paper elevation={0} sx={headerStyles.container}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box><Typography variant="overline" sx={{ color: '#67e8f9', fontWeight: 800, letterSpacing: '0.16em' }}>PORTFOLIO WORKSPACE</Typography><Typography variant="h3" component="h1" sx={{ mt: 0.5, fontWeight: 800, letterSpacing: '-0.045em' }}>Build your portfolio</Typography><Typography sx={{ mt: 1, maxWidth: 560, color: '#cbd5e1' }}>Add your profile, experience, and skills in a few guided steps.</Typography></Box>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button variant="outlined" onClick={onViewPortfolios} sx={{ borderColor: '#67e8f9', color: '#cffafe', '&:hover': { borderColor: '#fff', color: '#fff' } }}>View portfolios</Button>
        <Button variant="text" color="error" onClick={onDeletePortfolio}>Delete portfolio</Button>
        <Button variant="text" onClick={onLogout} sx={{ color: '#cbd5e1', '&:hover': { color: '#fff' } }}>Log out</Button>
      </Box>
    </Box>
  </Paper>;
}
