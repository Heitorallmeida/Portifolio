"use client"

import { ChangeEvent, FormEvent, useState, useEffect, useCallback } from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    FormControlLabel,
    Stack,
    Divider,
    Card,
    CardContent,
    Grid,
    Stepper,
    Step,
    StepLabel,
    StepContent
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";
import { apiGet, apiPost, apiFetch } from "../../utils/fetcher";

interface Certificate {
    title: string;
    image_name: string;
    image: string;
}

interface Experience {
    title: string;
    initialDate: string;
    finishDate: string;
    current: boolean;
    image: string;
}

interface HardSkill {
    title: string;
    initialDate: string;
    finishDate: string;
    current: boolean;
    percentage: number;
}

interface Portfolio {
    id: number;
    name: string;
    lastname: string;
    aboutMe: string;
}

const CreatePortifolio = () => {
    const router = useRouter();
    const { id } = router.query;
    const [activeStep, setActiveStep] = useState(0);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [portifolio, setPortifolio] = useState<Portfolio | null>(null);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [portifolioId, setPortifolioId] = useState<number | null>(null);
    const [file, setFile] = useState<File | undefined>();
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
    const [fileData, setFileData] = useState<any>(null);
    const [aboutMe, setAboutMe] = useState("");
    
    // Experience state
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [experienceTitle, setExperienceTitle] = useState("");
    const [experienceInitialDate, setExperienceInitialDate] = useState("");
    const [experienceFinishDate, setExperienceFinishDate] = useState("");
    const [experienceCurrent, setExperienceCurrent] = useState(false);
    const [experienceImage, setExperienceImage] = useState("");
    
    // Hard Skill state
    const [hardSkills, setHardSkills] = useState<HardSkill[]>([]);
    const [hardSkillTitle, setHardSkillTitle] = useState("");
    const [hardSkillInitialDate, setHardSkillInitialDate] = useState("");
    const [hardSkillFinishDate, setHardSkillFinishDate] = useState("");
    const [hardSkillCurrent, setHardSkillCurrent] = useState(false);
    const [hardSkillPercentage, setHardSkillPercentage] = useState(0);

    const [message, setMessage] = useState("");

    const steps = [
        'Upload Image (Optional)',
        'Create Portfolio',
        'Add Experiences',
        'Add Hard Skills',
        'Review & Submit'
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const fetchPortfolio = useCallback(async () => {
        console.log("Fetching portfolio with ID:", id);
        try {
            const data = await apiGet(`/portifolio/${id}`);
            setPortifolio(data);

            if (data) {
                setName(data.name || "");
                setLastname(data.lastname || "");
                setAboutMe(data.aboutMe || "");
                setPortifolioId(data.id ?? null);

                if (data.profileImage) {
                    setFileData(data.profileImage);
                    setUploadedImageUrl(data.profileImage.url || data.profileImage.filename || "");
                }

                if (Array.isArray(data.experiences)) {
                    const mapped = data.experiences.map((exp: any) => ({
                        title: exp.title || "",
                        initialDate: exp.initialDate ? String(exp.initialDate).slice(0,10) : "",
                        finishDate: exp.finishDate ? String(exp.finishDate).slice(0,10) : "",
                        current: !!exp.current,
                        image: exp.image || ""
                    }));
                    setExperiences(mapped);
                }

                if (Array.isArray(data.hardSkills)) {
                    const mapped = data.hardSkills.map((s: any) => ({
                        title: s.title || "",
                        initialDate: s.initialDate ? String(s.initialDate).slice(0,10) : "",
                        finishDate: s.finishDate ? String(s.finishDate).slice(0,10) : "",
                        current: !!s.current,
                        percentage: Number(s.percentage) || 0
                    }));
                    setHardSkills(mapped);
                }
                
            }

            console.log(data);
        } catch (error) {
            console.error("Error fetching portfolios:", error);
        }
    }, [id]);

    useEffect(()=>{
        if(id){
            void fetchPortfolio();
        }
    }, [id, fetchPortfolio]);

    // Fetch all portfolios for selection
    const fetchPortfoliosList = useCallback(async () => {
        try {
            const data = await apiGet('/portifolio');
            if (!data) return;
            if (Array.isArray(data)) setPortfolios(data);
        } catch (error) {
            console.error('Error fetching portfolios list:', error);
        }
    }, []);

    useEffect(() => {
        void fetchPortfoliosList();
    }, [fetchPortfoliosList]);


    // Step 1: Upload file
    const handleFileUpload = async (e: FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append('file', file as Blob);
        
        try {
            const data = await apiFetch('/files', { method: 'POST', body: formData });
            setUploadedImageUrl(data.filename || data.url || "");
            setFileData(data);
            // const fileName = data.fileName;
            // if (fileName) {
            //     const getRes = await fetch(`http://localhost:3001/files/${fileName}`);
            //     const fileData = await getRes.json();
               
            // }
            
            setMessage("File uploaded successfully!");
            handleNext();
        } catch (error) {
            setMessage("Error uploading file");
            console.error(error);
        }
    };
    console.log("Uploaded File Data:", fileData);

    // Step 2: Create Portfolio
    const handleCreatePortfolio = async (e: FormEvent) => {
        e.preventDefault();
            try {
                let data: any = null;
                if (portifolioId) {
                    data = await apiFetch(`/portifolio/${portifolioId}`, { method: 'PUT', body: JSON.stringify({ name, lastname, aboutMe, profileImageId: fileData ? fileData.id : null }) });
                    setMessage(`Portfolio updated successfully! ID: ${portifolioId}`);
                } else {
                    data = await apiPost('/portifolio', { name, lastname, aboutMe, profileImageId: fileData ? fileData.id : null });
                    setMessage(`Portfolio created successfully! ID: ${data.id}`);
                }

            // Ensure portifolioId is set for subsequent steps
            setPortifolioId(data?.id ?? portifolioId);
            handleNext();
        } catch (error) {
            setMessage(portifolioId ? "Error updating portfolio" : "Error creating portfolio");
            console.error(error);
        }
    };

    // Add Certificate

    // Add Experience
    const handleAddExperience = () => {
        if (experienceTitle && experienceInitialDate) {
            setExperiences([...experiences, {
                title: experienceTitle,
                initialDate: experienceInitialDate,
                finishDate: experienceFinishDate,
                current: experienceCurrent,
                image: experienceImage
            }]);
            setExperienceTitle("");
            setExperienceInitialDate("");
            setExperienceFinishDate("");
            setExperienceCurrent(false);
            setExperienceImage("");
        }
    };

    // Add Hard Skill
    const handleAddHardSkill = () => {
        if (hardSkillTitle && hardSkillInitialDate) {
            setHardSkills([...hardSkills, {
                title: hardSkillTitle,
                initialDate: hardSkillInitialDate,
                finishDate: hardSkillFinishDate,
                current: hardSkillCurrent,
                percentage: hardSkillPercentage
            }]);
            setHardSkillTitle("");
            setHardSkillInitialDate("");
            setHardSkillFinishDate("");
            setHardSkillCurrent(false);
            setHardSkillPercentage(0);
        }
    };


    // Step 4: Submit all experiences
    const handleSubmitExperiences = async () => {
        if (!portifolioId) {
            setMessage("Please create portfolio first");
            return;
        }

            try {
                for (const exp of experiences) {
                    const result = await apiPost('/experience', { ...exp, portifolioId: Number(portifolioId) });
                    console.log('Experience created:', result);
                }
                setMessage("Experiences created successfully!");
            } catch (error: unknown) {
                setMessage(`Error creating experiences: ${error instanceof Error ? error.message : 'Unknown error'}`);
                console.error(error);
            }
    };

    // Step 5: Submit all hard skills
    const handleSubmitHardSkills = async () => {
        if (!portifolioId) {
            setMessage("Please create portfolio first");
            return;
        }

            try {
                for (const skill of hardSkills) {
                    const result = await apiPost('/hardSkill', { ...skill, portifolioId: Number(portifolioId) });
                    console.log('Hard skill created:', result);
                }
                setMessage("Hard skills created successfully!");
            } catch (error: unknown) {
                setMessage(`Error creating hard skills: ${error instanceof Error ? error.message : 'Unknown error'}`);
                console.error(error);
            }
    };

    // Submit everything
    const handleSubmitAll = async () => {
        await handleSubmitExperiences();
        await handleSubmitHardSkills();
        setMessage("Complete portfolio created successfully!");
        handleNext();
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="body1" paragraph>
                            Upload an image file that will be used in your portfolio.
                        </Typography>
                        <Box component="form" onSubmit={handleFileUpload}>
                            <Stack spacing={2}>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Choose File
                                    <input 
                                        name='file' 
                                        type='file' 
                                        hidden
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if(e.target.files){
                                                setFile(e.target.files[0]);
                                            }
                                        }}
                                    />
                                </Button>
                                <Typography variant="body2" color="text.secondary">
                                    {file ? file.name : "No file selected"}
                                </Typography>
                                {uploadedImageUrl && (
                                    <Alert severity="info">
                                        Uploaded: {uploadedImageUrl}
                                    </Alert>
                                )}
                                {console.info(fileData)}
                                {fileData && fileData.url && (
                                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Image Preview:
                                        </Typography>
                                        <img 
                                            src={fileData.url} 
                                            alt="Uploaded file" 
                                            style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                        />
                                    </Box>
                                )}
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        disabled={!file}
                                    >
                                        Upload & Continue
                                    </Button>
                                    <Button onClick={handleNext} variant="outlined">
                                        Skip
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                );
            
            case 1:
                return (
                    <Box>
                        <Typography variant="body1" paragraph>
                            Create your portfolio profile with your name and lastname.
                        </Typography>
                        
                        <Box component="form" onSubmit={handleCreatePortfolio}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Lastname"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="About me"
                                    value={aboutMe}
                                    onChange={(e) => setAboutMe(e.target.value)}
                                    required
                                    fullWidth
                                />
                                {portifolioId && (
                                    <Alert severity="success">
                                        Portfolio ID: {portifolioId}
                                    </Alert>
                                )}
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button onClick={handleBack}>
                                        Back
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        variant="contained"
                                        disabled={!name || !lastname}
                                    >
                                        {portifolioId ? 'Save & Continue' : 'Create & Continue'}
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                )
            case 2:
                return (
                    <Box>
                        <Typography variant="body1" paragraph>
                            Add your professional experiences and work history.
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Title"
                                value={experienceTitle}
                                onChange={(e) => setExperienceTitle(e.target.value)}
                                fullWidth
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Initial Date"
                                        type="date"
                                        value={experienceInitialDate}
                                        onChange={(e) => setExperienceInitialDate(e.target.value)}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Finish Date"
                                        type="date"
                                        value={experienceFinishDate}
                                        onChange={(e) => setExperienceFinishDate(e.target.value)}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        disabled={experienceCurrent}
                                    />
                                </Grid>
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={experienceCurrent} 
                                        onChange={(e) => setExperienceCurrent(e.target.checked)} 
                                    />
                                }
                                label="Current"
                            />
                            <TextField
                                label="Image URL"
                                value={experienceImage}
                                onChange={(e) => setExperienceImage(e.target.value)}
                                fullWidth
                            />
                            <Button 
                                onClick={handleAddExperience} 
                                variant="outlined"
                                startIcon={<AddIcon />}
                                disabled={!experienceTitle || !experienceInitialDate}
                            >
                                Add Experience
                            </Button>
                            
                            {experiences.length > 0 && (
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Added Experiences ({experiences.length})
                                    </Typography>
                                    <List>
                                        {experiences.map((exp, idx) => (
                                            <ListItem key={idx} divider>
                                                <ListItemText 
                                                    primary={exp.title} 
                                                    secondary={`${exp.initialDate} to ${exp.finishDate || 'Present'} ${exp.current ? "(Current)" : ""}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                            
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button onClick={handleBack}>
                                    Back
                                </Button>
                                <Button 
                                    onClick={handleNext} 
                                    variant="contained"
                                >
                                    Continue
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                );
            
            case 3:
                return (
                    <Box>
                        <Typography variant="body1" paragraph>
                            Add your technical skills and expertise levels.
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Title"
                                value={hardSkillTitle}
                                onChange={(e) => setHardSkillTitle(e.target.value)}
                                fullWidth
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Initial Date"
                                        type="date"
                                        value={hardSkillInitialDate}
                                        onChange={(e) => setHardSkillInitialDate(e.target.value)}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Finish Date"
                                        type="date"
                                        value={hardSkillFinishDate}
                                        onChange={(e) => setHardSkillFinishDate(e.target.value)}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        disabled={hardSkillCurrent}
                                    />
                                </Grid>
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={hardSkillCurrent} 
                                        onChange={(e) => setHardSkillCurrent(e.target.checked)} 
                                    />
                                }
                                label="Current"
                            />
                            <TextField
                                label="Percentage (0-100)"
                                type="number"
                                inputProps={{ min: 0, max: 100 }}
                                value={hardSkillPercentage}
                                onChange={(e) => setHardSkillPercentage(Number(e.target.value))}
                                fullWidth
                            />
                            <Button 
                                onClick={handleAddHardSkill} 
                                variant="outlined"
                                startIcon={<AddIcon />}
                                disabled={!hardSkillTitle || !hardSkillInitialDate}
                            >
                                Add Hard Skill
                            </Button>
                            
                            {hardSkills.length > 0 && (
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Added Hard Skills ({hardSkills.length})
                                    </Typography>
                                    <List>
                                        {hardSkills.map((skill, idx) => (
                                            <ListItem key={idx} divider>
                                                <ListItemText 
                                                    primary={skill.title} 
                                                    secondary={`${skill.percentage}% ${skill.current ? "(Current)" : ""}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                            
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button onClick={handleBack}>
                                    Back
                                </Button>
                                <Button 
                                    onClick={handleNext} 
                                    variant="contained"
                                >
                                    Continue
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                );
            
            case 4:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Review Your Portfolio
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Review all your information and submit your complete portfolio.
                        </Typography>
                        
                        <Stack spacing={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        Portfolio Information
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Name:</strong> {name} {lastname}
                                    </Typography>
                                    {portifolioId && (
                                        <Typography variant="body2">
                                            <strong>Portfolio ID:</strong> {portifolioId}
                                        </Typography>
                                    )}
                                    {uploadedImageUrl && (
                                        <Typography variant="body2">
                                            <strong>Image:</strong> {uploadedImageUrl}
                                        </Typography>
                                    )}
                                    {fileData && fileData.url && (
                                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                                            <img 
                                                src={fileData.url} 
                                                alt="Portfolio image" 
                                                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        Experiences
                                    </Typography>
                                    <Typography variant="body2">
                                        Total: {experiences.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        Hard Skills
                                    </Typography>
                                    <Typography variant="body2">
                                        Total: {hardSkills.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                            
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button onClick={handleBack}>
                                    Back
                                </Button>
                                <Button 
                                    onClick={handleSubmitAll} 
                                    disabled={!portifolioId}
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    endIcon={<SendIcon />}
                                >
                                    Submit Complete Portfolio
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                );
            
            default:
                return 'Unknown step';
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h3" component="h1">
                    Create Complete Portfolio
                </Typography>
                <Button 
                    variant="outlined" 
                    onClick={() => router.push('/')}
                >
                    View Profiles
                </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ minWidth: 240 }}>
                    <InputLabel id="portfolio-select-label">Select Portfolio</InputLabel>
                    <Select
                        labelId="portfolio-select-label"
                        value={portifolioId ?? ''}
                        label="Select Portfolio"
                        onChange={(e) => {
                            const val = Number(e.target.value as unknown as string);
                            setPortifolioId(isNaN(val) ? null : val);
                            if (!isNaN(val)) {
                                void router.push({ pathname: '/admin', query: { id: val } });
                            }
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {portfolios.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.name} {p.lastname} - {p.id}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            
            {message && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {message}
                </Alert>
            )}

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            {getStepContent(index)}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        All steps completed - your portfolio has been submitted!
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button onClick={handleReset} variant="contained">
                            Create Another Portfolio
                        </Button>
                        <Button 
                            variant="outlined" 
                            onClick={() => router.push('/portifolio')}
                        >
                            View Profiles
                        </Button>
                    </Box>
                </Paper>
            )}
        </Container>
    );
}

export default CreatePortifolio;