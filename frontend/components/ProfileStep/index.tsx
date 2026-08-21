import { FormEvent } from "react";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { profileStepStyles } from "./styles";

type ProfileStepProps = {
  name: string;
  lastname: string;
  aboutMe: string;
  role: string;
  profileImageUrl: string;
  portifolioId: number | null;
  setName: (value: string) => void;
  setLastname: (value: string) => void;
  setAboutMe: (value: string) => void;
  setRole: (value: string) => void;
  setProfileImageUrl: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
};

export function ProfileStep({ name, lastname, aboutMe, role, profileImageUrl, portifolioId, setName, setLastname, setAboutMe, setRole, setProfileImageUrl, onSubmit }: ProfileStepProps) {
  return <Box>
    <Typography variant="body1" paragraph>Start with the essential information people will see first.</Typography>
    <Box component="form" onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} required fullWidth />
        <TextField label="Last name" value={lastname} onChange={(event) => setLastname(event.target.value)} required fullWidth />
        <TextField label="About me" value={aboutMe} onChange={(event) => setAboutMe(event.target.value)} required fullWidth multiline minRows={4} />
        <TextField label="Role" value={role} onChange={(event) => setRole(event.target.value)} placeholder="e.g. Senior Software Engineer" fullWidth />
        <TextField label="Profile image URL" type="url" value={profileImageUrl} onChange={(event) => setProfileImageUrl(event.target.value)} placeholder="https://example.com/profile.jpg" fullWidth />
        {profileImageUrl && (
          <Box sx={profileStepStyles.preview}>
            <img src={profileImageUrl} alt="Profile preview" style={profileStepStyles.previewImage} />
          </Box>
        )}
        {portifolioId && <Alert severity="success">Portfolio ID: {portifolioId}</Alert>}
        <Box sx={profileStepStyles.actions}>
          <Button type="submit" variant="contained" size="large" disabled={!name || !lastname}>{portifolioId ? 'Save & continue' : 'Create & continue'}</Button>
        </Box>
      </Stack>
    </Box>
  </Box>;
}
