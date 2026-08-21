import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Checkbox, FormControlLabel, Grid, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { Experience } from "@/types/admin";
import { resolveImageSrc } from "@/utils/image";
import { experienceStepStyles } from "./styles";

type ExperienceStepProps = {
  experiences: Experience[];
  title: string; initialDate: string; finishDate: string; current: boolean; image: string;
  setTitle: (value: string) => void; setInitialDate: (value: string) => void; setFinishDate: (value: string) => void; setCurrent: (value: boolean) => void; setImage: (value: string) => void;
  onAdd: () => void; onBack: () => void; onNext: () => void;
};

export function ExperienceStep({ experiences, title, initialDate, finishDate, current, image, setTitle, setInitialDate, setFinishDate, setCurrent, setImage, onAdd, onBack, onNext }: ExperienceStepProps) {
  return <Box>
    <Typography variant="body1" paragraph>Add the roles and teams that shaped your career.</Typography>
    <Stack spacing={2}>
      <TextField label="Title" value={title} onChange={(event) => setTitle(event.target.value)} fullWidth />
      <Grid container spacing={2}><Grid item xs={12} sm={6}><TextField label="Start date" type="date" value={initialDate} onChange={(event) => setInitialDate(event.target.value)} fullWidth InputLabelProps={{ shrink: true }} /></Grid><Grid item xs={12} sm={6}><TextField label="End date" type="date" value={finishDate} onChange={(event) => setFinishDate(event.target.value)} fullWidth InputLabelProps={{ shrink: true }} disabled={current} /></Grid></Grid>
      <FormControlLabel control={<Checkbox checked={current} onChange={(event) => setCurrent(event.target.checked)} />} label="Current role" />
      <TextField label="Image URL" value={image} onChange={(event) => setImage(event.target.value)} fullWidth />
      {image && <Box sx={experienceStepStyles.preview}><img src={resolveImageSrc(image)} alt="Experience image preview" style={experienceStepStyles.previewImage} /></Box>}
      <Button onClick={onAdd} variant="outlined" startIcon={<AddIcon />} disabled={!title || !initialDate}>Add experience</Button>
      {experiences.length > 0 && <Box><Typography variant="h6" gutterBottom>Added experiences ({experiences.length})</Typography><List>{experiences.map((experience, index) => <ListItem key={`${experience.title}-${index}`} divider><ListItemText primary={experience.title} secondary={`${experience.initialDate} to ${experience.finishDate || 'Present'} ${experience.current ? '(Current)' : ''}`} /></ListItem>)}</List></Box>}
      <Box sx={experienceStepStyles.navigation}><Button onClick={onBack}>Back</Button><Button onClick={onNext} variant="contained">Continue</Button></Box>
    </Stack>
  </Box>;
}
