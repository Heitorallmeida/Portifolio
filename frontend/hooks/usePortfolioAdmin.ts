import { FormEvent, useCallback, useEffect, useState } from "react";
import { apiDelete, apiFetch, apiGet, apiPost } from "@/utils/fetcher";
import { Experience, HardSkill, Project } from "@/types/admin";

export function usePortfolioAdmin(queryId?: string) {
  const [activeStep, setActiveStep] = useState(0);
  const [portifolioId, setPortifolioId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [role, setRole] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [experienceTitle, setExperienceTitle] = useState("");
  const [experienceInitialDate, setExperienceInitialDate] = useState("");
  const [experienceFinishDate, setExperienceFinishDate] = useState("");
  const [experienceCurrent, setExperienceCurrent] = useState(false);
  const [experienceImage, setExperienceImage] = useState("");
  const [hardSkills, setHardSkills] = useState<HardSkill[]>([]);
  const [hardSkillTitle, setHardSkillTitle] = useState("");
  const [hardSkillInitialDate, setHardSkillInitialDate] = useState("");
  const [hardSkillFinishDate, setHardSkillFinishDate] = useState("");
  const [hardSkillCurrent, setHardSkillCurrent] = useState(false);
  const [hardSkillPercentage, setHardSkillPercentage] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectRepositoryUrl, setProjectRepositoryUrl] = useState("");
  const [projectLiveUrl, setProjectLiveUrl] = useState("");
  const [projectTechnologies, setProjectTechnologies] = useState("");
  const [projectInitialDate, setProjectInitialDate] = useState("");
  const [projectFinishDate, setProjectFinishDate] = useState("");
  const [projectCurrent, setProjectCurrent] = useState(false);
  const [projectFeatured, setProjectFeatured] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPortfolio = useCallback(async () => {
    try {
      const data = await apiGet(`/portifolio/${queryId ?? 1}`);
      if (!data) return;

      setName(data.name || "");
      setLastname(data.lastname || "");
      setAboutMe(data.aboutMe || "");
      setRole(data.role || "");
      setPortifolioId(data.id ?? null);
      setProfileImageUrl(data.profileImageUrl || "");
      setExperiences(Array.isArray(data.experiences) ? data.experiences.map((item: Experience) => ({ ...item, initialDate: String(item.initialDate).slice(0, 10), finishDate: item.finishDate ? String(item.finishDate).slice(0, 10) : "" })) : []);
      setHardSkills(Array.isArray(data.hardSkills) ? data.hardSkills.map((item: HardSkill) => ({ ...item, initialDate: String(item.initialDate).slice(0, 10), finishDate: item.finishDate ? String(item.finishDate).slice(0, 10) : "", percentage: Number(item.percentage) || 0 })) : []);
      setProjects(Array.isArray(data.projects) ? data.projects.map((item: Project) => ({ ...item, image: item.image || "", repositoryUrl: item.repositoryUrl || "", liveUrl: item.liveUrl || "", technologies: item.technologies || [], initialDate: String(item.initialDate).slice(0, 10), finishDate: item.finishDate ? String(item.finishDate).slice(0, 10) : "" })) : []);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setMessage("Unable to load portfolio information.");
    }
  }, [queryId]);

  useEffect(() => { void fetchPortfolio(); }, [fetchPortfolio]);

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const payload = { name, lastname, role, aboutMe, profileImageUrl: profileImageUrl || null };
      const data = portifolioId
        ? await apiFetch(`/portifolio/${portifolioId}`, { method: "PUT", body: JSON.stringify(payload) })
        : await apiPost("/portifolio", payload);
      setPortifolioId(data?.id ?? portifolioId);
      setMessage(portifolioId ? "Portfolio updated successfully." : `Portfolio created successfully. ID: ${data.id}`);
      setActiveStep(1);
    } catch (error) {
      console.error(error);
      setMessage(portifolioId ? "Unable to update portfolio." : "Unable to create portfolio.");
    }
  };

  const addExperience = () => {
    if (!experienceTitle || !experienceInitialDate) return;
    setExperiences((items) => [...items, { title: experienceTitle, initialDate: experienceInitialDate, finishDate: experienceFinishDate, current: experienceCurrent, image: experienceImage }]);
    setExperienceTitle(""); setExperienceInitialDate(""); setExperienceFinishDate(""); setExperienceCurrent(false); setExperienceImage("");
  };

  const addHardSkill = () => {
    if (!hardSkillTitle || !hardSkillInitialDate) return;
    setHardSkills((items) => [...items, { title: hardSkillTitle, initialDate: hardSkillInitialDate, finishDate: hardSkillFinishDate, current: hardSkillCurrent, percentage: hardSkillPercentage }]);
    setHardSkillTitle(""); setHardSkillInitialDate(""); setHardSkillFinishDate(""); setHardSkillCurrent(false); setHardSkillPercentage(0);
  };

  const addProject = () => {
    if (!projectTitle || !projectDescription || !projectInitialDate) return;
    setProjects((items) => [...items, {
      title: projectTitle, description: projectDescription, image: projectImage, repositoryUrl: projectRepositoryUrl, liveUrl: projectLiveUrl,
      technologies: projectTechnologies.split(",").map((item) => item.trim()).filter(Boolean), initialDate: projectInitialDate, finishDate: projectFinishDate, current: projectCurrent, featured: projectFeatured,
    }]);
    setProjectTitle(""); setProjectDescription(""); setProjectImage(""); setProjectRepositoryUrl(""); setProjectLiveUrl(""); setProjectTechnologies(""); setProjectInitialDate(""); setProjectFinishDate(""); setProjectCurrent(false); setProjectFeatured(false);
  };

  const submitPortfolio = async () => {
    if (!portifolioId) return setMessage("Please create the portfolio first.");
    try {
      await Promise.all(experiences.map((item) => apiPost("/experience", { ...item, portifolioId })));
      await Promise.all(hardSkills.map((item) => apiPost("/hardSkill", { ...item, portifolioId })));
      await Promise.all(projects.map((item) => apiPost("/project", { ...item, portifolioId })));
      setMessage("Portfolio submitted successfully.");
      setActiveStep(5);
    } catch (error) {
      console.error(error);
      setMessage("Unable to submit portfolio information.");
    }
  };

  const deletePortfolio = async (): Promise<boolean> => {
    if (!portifolioId) return false;
    try {
      await apiDelete(`/portifolio/${portifolioId}`);
      setMessage("Portfolio deleted successfully.");
      return true;
    } catch (error) {
      console.error(error);
      setMessage("Unable to delete portfolio.");
      return false;
    }
  };

  return {
    activeStep, setActiveStep, portifolioId, name, setName, lastname, setLastname, aboutMe, setAboutMe, role, setRole, profileImageUrl, setProfileImageUrl,
    experiences, experienceTitle, setExperienceTitle, experienceInitialDate, setExperienceInitialDate, experienceFinishDate, setExperienceFinishDate, experienceCurrent, setExperienceCurrent, experienceImage, setExperienceImage,
    hardSkills, hardSkillTitle, setHardSkillTitle, hardSkillInitialDate, setHardSkillInitialDate, hardSkillFinishDate, setHardSkillFinishDate, hardSkillCurrent, setHardSkillCurrent, hardSkillPercentage, setHardSkillPercentage,
    projects, projectTitle, setProjectTitle, projectDescription, setProjectDescription, projectImage, setProjectImage, projectRepositoryUrl, setProjectRepositoryUrl, projectLiveUrl, setProjectLiveUrl, projectTechnologies, setProjectTechnologies, projectInitialDate, setProjectInitialDate, projectFinishDate, setProjectFinishDate, projectCurrent, setProjectCurrent, projectFeatured, setProjectFeatured,
    message, saveProfile, addExperience, addHardSkill, addProject, submitPortfolio, deletePortfolio,
  };
}
