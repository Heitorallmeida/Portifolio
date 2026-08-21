"use client";

import { useEffect, useState } from "react";
import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { AdminHeader } from "@/components/AdminHeader";
import { ExperienceStep } from "@/components/ExperienceStep";
import { ProfileStep } from "@/components/ProfileStep";
import { ProjectStep } from "@/components/ProjectStep";
import { ReviewStep } from "@/components/ReviewStep";
import { SkillsStep } from "@/components/SkillsStep";
import NavBar from "@/components/nav";
import { usePortfolioAdmin } from "@/hooks/usePortfolioAdmin";
import { getAccessTokenPayload, isExpiredToken } from "@/utils/auth";

const steps = ["Profile", "Experience", "Skills", "Projects", "Review"];

export default function AdminPage() {
  const router = useRouter();
  const queryId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const portfolio = usePortfolioAdmin(queryId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const token = localStorage.getItem("access_token");
    const payload = token ? getAccessTokenPayload(token) : null;
    const requestedPortfolioId = Number(queryId);

    if (!payload || isExpiredToken(payload) || !payload.portifolioId || payload.portifolioId !== requestedPortfolioId) {
      void router.replace("/login");
    }
  }, [queryId, router]);

  const content = [
    <ProfileStep key="profile" name={portfolio.name} lastname={portfolio.lastname} aboutMe={portfolio.aboutMe} role={portfolio.role} profileImageUrl={portfolio.profileImageUrl} portifolioId={portfolio.portifolioId} setName={portfolio.setName} setLastname={portfolio.setLastname} setAboutMe={portfolio.setAboutMe} setRole={portfolio.setRole} setProfileImageUrl={portfolio.setProfileImageUrl} onSubmit={portfolio.saveProfile} />,
    <ExperienceStep key="experience" experiences={portfolio.experiences} title={portfolio.experienceTitle} initialDate={portfolio.experienceInitialDate} finishDate={portfolio.experienceFinishDate} current={portfolio.experienceCurrent} image={portfolio.experienceImage} setTitle={portfolio.setExperienceTitle} setInitialDate={portfolio.setExperienceInitialDate} setFinishDate={portfolio.setExperienceFinishDate} setCurrent={portfolio.setExperienceCurrent} setImage={portfolio.setExperienceImage} onAdd={portfolio.addExperience} onBack={() => portfolio.setActiveStep(0)} onNext={() => portfolio.setActiveStep(2)} />,
    <SkillsStep key="skills" skills={portfolio.hardSkills} title={portfolio.hardSkillTitle} initialDate={portfolio.hardSkillInitialDate} finishDate={portfolio.hardSkillFinishDate} current={portfolio.hardSkillCurrent} percentage={portfolio.hardSkillPercentage} setTitle={portfolio.setHardSkillTitle} setInitialDate={portfolio.setHardSkillInitialDate} setFinishDate={portfolio.setHardSkillFinishDate} setCurrent={portfolio.setHardSkillCurrent} setPercentage={portfolio.setHardSkillPercentage} onAdd={portfolio.addHardSkill} onBack={() => portfolio.setActiveStep(1)} onNext={() => portfolio.setActiveStep(3)} />,
    <ProjectStep key="projects" projects={portfolio.projects} title={portfolio.projectTitle} description={portfolio.projectDescription} image={portfolio.projectImage} repositoryUrl={portfolio.projectRepositoryUrl} liveUrl={portfolio.projectLiveUrl} technologies={portfolio.projectTechnologies} initialDate={portfolio.projectInitialDate} finishDate={portfolio.projectFinishDate} current={portfolio.projectCurrent} featured={portfolio.projectFeatured} setTitle={portfolio.setProjectTitle} setDescription={portfolio.setProjectDescription} setImage={portfolio.setProjectImage} setRepositoryUrl={portfolio.setProjectRepositoryUrl} setLiveUrl={portfolio.setProjectLiveUrl} setTechnologies={portfolio.setProjectTechnologies} setInitialDate={portfolio.setProjectInitialDate} setFinishDate={portfolio.setProjectFinishDate} setCurrent={portfolio.setProjectCurrent} setFeatured={portfolio.setProjectFeatured} onAdd={portfolio.addProject} onBack={() => portfolio.setActiveStep(2)} onNext={() => portfolio.setActiveStep(4)} />,
    <ReviewStep key="review" name={portfolio.name} lastname={portfolio.lastname} profileImageUrl={portfolio.profileImageUrl} portifolioId={portfolio.portifolioId} experiences={portfolio.experiences} skills={portfolio.hardSkills} projects={portfolio.projects} onBack={() => portfolio.setActiveStep(3)} onSubmit={portfolio.submitPortfolio} />,
  ];

  return <Box sx={{ minHeight: "100vh", background: "linear-gradient(180deg, #f0f9ff 0%, #f8fafc 32%, #f8fafc 100%)" }}>
    <NavBar />
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
      <AdminHeader onViewPortfolios={() => router.push("/")} onDeletePortfolio={() => setIsDeleteDialogOpen(true)} onLogout={() => { localStorage.removeItem("access_token"); void router.replace("/login"); }} />
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: "1px solid #e2e8f0", borderRadius: 4, boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)" }}>
        <Stepper activeStep={portfolio.activeStep} alternativeLabel sx={{ mb: { xs: 4, md: 5 }, "& .MuiStepLabel-label": { mt: 1, fontWeight: 700, color: "#64748b" }, "& .Mui-active .MuiStepLabel-label": { color: "#0f172a" }, "& .Mui-completed .MuiStepLabel-label": { color: "#0e7490" }, "& .MuiStepIcon-root.Mui-active": { color: "#0891b2" }, "& .MuiStepIcon-root.Mui-completed": { color: "#14b8a6" } }}>{steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}</Stepper>
        {portfolio.activeStep < steps.length ? <Box sx={{ maxWidth: 720, mx: "auto" }}>{content[portfolio.activeStep]}</Box> : <Paper elevation={0} sx={{ maxWidth: 720, mx: "auto", p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: "#f0fdfa", border: "1px solid #99f6e4" }}><Typography variant="h5" fontWeight={700} gutterBottom>Your portfolio is live</Typography><Typography color="text.secondary">All steps are complete and your portfolio has been submitted successfully.</Typography><Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}><Button onClick={() => portfolio.setActiveStep(0)} variant="contained">Create another portfolio</Button><Button variant="outlined" onClick={() => router.push(`/portifolio?id=${portfolio.portifolioId ?? ""}`)}>View portfolio</Button></Box></Paper>}
      </Paper>
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} aria-labelledby="delete-portfolio-title">
        <DialogTitle id="delete-portfolio-title">Delete your portfolio?</DialogTitle>
        <DialogContent>
          <DialogContentText>This permanently removes your profile, experiences, skills, and projects. This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={async () => { if (await portfolio.deletePortfolio()) { setIsDeleteDialogOpen(false); void router.replace("/"); } }}>Delete portfolio</Button>
        </DialogActions>
      </Dialog>
      {portfolio.message && <Alert severity={portfolio.message.startsWith("Unable") || portfolio.message.startsWith("Please") ? "error" : "success"} sx={{ mt: 3, borderRadius: 2 }}>{portfolio.message}</Alert>}
    </Container>
  </Box>;
}
