import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Checkbox, FormControlLabel, Grid, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { HardSkill } from "@/types/admin";
import { skillsStepStyles } from "./styles";

type SkillsStepProps = {
  skills: HardSkill[];
  title: string; initialDate: string; finishDate: string; current: boolean; percentage: number;
  setTitle: (value: string) => void; setInitialDate: (value: string) => void; setFinishDate: (value: string) => void; setCurrent: (value: boolean) => void; setPercentage: (value: number) => void;
  onAdd: () => void; onBack: () => void; onNext: () => void;
};

export function SkillsStep({ skills, title, initialDate, finishDate, current, percentage, setTitle, setInitialDate, setFinishDate, setCurrent, setPercentage, onAdd, onBack, onNext }: SkillsStepProps) {
  return <Box>
    <Typography variant="body1" paragraph>Highlight the technologies and areas where you bring the most value.</Typography>
    <Stack spacing={2}>
      <TextField label="Title" value={title} onChange={(event) => setTitle(event.target.value)} fullWidth />
      <Grid container spacing={2}><Grid item xs={12} sm={6}><TextField label="Start date" type="date" value={initialDate} onChange={(event) => setInitialDate(event.target.value)} fullWidth InputLabelProps={{ shrink: true }} /></Grid><Grid item xs={12} sm={6}><TextField label="End date" type="date" value={finishDate} onChange={(event) => setFinishDate(event.target.value)} fullWidth InputLabelProps={{ shrink: true }} disabled={current} /></Grid></Grid>
      <FormControlLabel control={<Checkbox checked={current} onChange={(event) => setCurrent(event.target.checked)} />} label="Currently using" />
      <TextField label="Proficiency (0-100)" type="number" inputProps={{ min: 0, max: 100 }} value={percentage} onChange={(event) => setPercentage(Number(event.target.value))} fullWidth />
      <Button onClick={onAdd} variant="outlined" startIcon={<AddIcon />} disabled={!title || !initialDate}>Add skill</Button>
      {skills.length > 0 && <Box><Typography variant="h6" gutterBottom>Added skills ({skills.length})</Typography><List>{skills.map((skill, index) => <ListItem key={`${skill.title}-${index}`} divider><ListItemText primary={skill.title} secondary={`${skill.percentage}% ${skill.current ? '(Current)' : ''}`} /></ListItem>)}</List></Box>}
      <Box sx={skillsStepStyles.navigation}><Button onClick={onBack}>Back</Button><Button onClick={onNext} variant="contained">Continue</Button></Box>
    </Stack>
  </Box>;
}
