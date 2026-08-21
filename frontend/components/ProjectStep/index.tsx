import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Checkbox, FormControlLabel, Grid, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { Project } from "@/types/admin";
import { resolveImageSrc } from "@/utils/image";
import { projectStepStyles } from "./styles";

type ProjectStepProps = {
  projects: Project[];
  title: string; description: string; image: string; repositoryUrl: string; liveUrl: string; technologies: string; initialDate: string; finishDate: string; current: boolean; featured: boolean;
  setTitle: (value: string) => void; setDescription: (value: string) => void; setImage: (value: string) => void; setRepositoryUrl: (value: string) => void; setLiveUrl: (value: string) => void; setTechnologies: (value: string) => void; setInitialDate: (value: string) => void; setFinishDate: (value: string) => void; setCurrent: (value: boolean) => void; setFeatured: (value: boolean) => void;
  onAdd: () => void; onBack: () => void; onNext: () => void;
};

export function ProjectStep({ projects, title, description, image, repositoryUrl, liveUrl, technologies, initialDate, finishDate, current, featured, setTitle, setDescription, setImage, setRepositoryUrl, setLiveUrl, setTechnologies, setInitialDate, setFinishDate, setCurrent, setFeatured, onAdd, onBack, onNext }: ProjectStepProps) {
  return <Box>
    <Typography variant="body1" paragraph>Showcase the products and projects you are most proud of.</Typography>
    <Stack spacing={2}>
      <TextField label="Project title" value={title} onChange={(event) => setTitle(event.target.value)} fullWidth />
      <TextField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth multiline minRows={3} />
      <Grid container spacing={2}><Grid item xs={12} sm={6}><TextField label="Image URL or file name" value={image} onChange={(event) => setImage(event.target.value)} fullWidth /></Grid><Grid item xs={12} sm={6}><TextField label="Technologies" value={technologies} onChange={(event) => setTechnologies(event.target.value)} helperText="Separate technologies with commas" fullWidth /></Grid></Grid>
      {image && <Box sx={projectStepStyles.preview}><img src={resolveImageSrc(image)} alt="Project image preview" style={projectStepStyles.previewImage} /></Box>}
      <Grid container spacing={2}><Grid item xs={12} sm={6}><TextField label="Repository URL" type="url" value={repositoryUrl} onChange={(event) => setRepositoryUrl(event.target.value)} fullWidth /></Grid><Grid item xs={12} sm={6}><TextField label="Live URL" type="url" value={liveUrl} onChange={(event) => setLiveUrl(event.target.value)} fullWidth /></Grid></Grid>
      <Grid container spacing={2}><Grid item xs={12} sm={6}><TextField label="Start date" type="date" value={initialDate} onChange={(event) => setInitialDate(event.target.value)} fullWidth InputLabelProps={{ shrink: true }} /></Grid><Grid item xs={12} sm={6}><TextField label="End date" type="date" value={finishDate} onChange={(event) => setFinishDate(event.target.value)} fullWidth InputLabelProps={{ shrink: true }} disabled={current} /></Grid></Grid>
      <Box><FormControlLabel control={<Checkbox checked={current} onChange={(event) => setCurrent(event.target.checked)} />} label="Current project" /><FormControlLabel control={<Checkbox checked={featured} onChange={(event) => setFeatured(event.target.checked)} />} label="Feature this project" /></Box>
      <Button onClick={onAdd} variant="outlined" startIcon={<AddIcon />} disabled={!title || !description || !initialDate}>Add project</Button>
      {projects.length > 0 && <Box><Typography variant="h6" gutterBottom>Added projects ({projects.length})</Typography><List>{projects.map((project, index) => <ListItem key={`${project.title}-${index}`} divider><ListItemText primary={project.title} secondary={project.technologies.join(', ') || 'No technologies added'} /></ListItem>)}</List></Box>}
      <Box sx={projectStepStyles.navigation}><Button onClick={onBack}>Back</Button><Button onClick={onNext} variant="contained">Continue</Button></Box>
    </Stack>
  </Box>;
}
