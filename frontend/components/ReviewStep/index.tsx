import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Experience, HardSkill, Project } from "@/types/admin";
import { reviewStepStyles } from "./styles";

type ReviewStepProps = {
  name: string; lastname: string; profileImageUrl: string; portifolioId: number | null;
  experiences: Experience[]; skills: HardSkill[]; projects: Project[]; onBack: () => void; onSubmit: () => void;
};

export function ReviewStep({ name, lastname, profileImageUrl, portifolioId, experiences, skills, projects, onBack, onSubmit }: ReviewStepProps) {
  return <Box>
    <Typography variant="h5" fontWeight={700} gutterBottom>Ready to publish?</Typography>
    <Typography variant="body1" paragraph>Review the information below before publishing your portfolio.</Typography>
    <Stack spacing={3}>
      <Card><CardContent><Typography variant="h6" color="primary" gutterBottom>Portfolio information</Typography><Typography variant="body2"><strong>Name:</strong> {name} {lastname}</Typography>{portifolioId && <Typography variant="body2"><strong>Portfolio ID:</strong> {portifolioId}</Typography>}{profileImageUrl && <Box sx={{ mt: 2, textAlign: 'center' }}><img src={profileImageUrl} alt="Portfolio profile" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} /></Box>}</CardContent></Card>
      <Card><CardContent><Typography variant="h6" color="primary" gutterBottom>Experiences</Typography><Typography variant="body2">Total: {experiences.length}</Typography></CardContent></Card>
      <Card><CardContent><Typography variant="h6" color="primary" gutterBottom>Skills</Typography><Typography variant="body2">Total: {skills.length}</Typography></CardContent></Card>
      <Card><CardContent><Typography variant="h6" color="primary" gutterBottom>Projects</Typography><Typography variant="body2">Total: {projects.length}</Typography></CardContent></Card>
      <Box sx={reviewStepStyles.navigation}><Button onClick={onBack}>Back</Button><Button onClick={onSubmit} disabled={!portifolioId} variant="contained" color="success" size="large" endIcon={<SendIcon />}>Submit portfolio</Button></Box>
    </Stack>
  </Box>;
}
