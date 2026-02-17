"use client"

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
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
}

const CreatePortifolio = () => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [portifolioId, setPortifolioId] = useState<number | null>(null);
    const [file, setFile] = useState<File | undefined>();
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
    const [fileData, setFileData] = useState<any>(null);
    
    // Certificate state
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [certificateTitle, setCertificateTitle] = useState("");
    const [certificateImageName, setCertificateImageName] = useState("");
    const [certificateImage, setCertificateImage] = useState("");
    
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
        'Add Certificates',
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
            const res = await fetch(`http://localhost:3001/files`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            setUploadedImageUrl(data.filename || data.url || "");
            
            // Get the uploaded file data
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
            const res = await fetch(`http://localhost:3001/portifolio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, lastname, profileImageId: fileData ? fileData.id : null })
            });
            const data = await res.json();
            setPortifolioId(data.id);
            setMessage(`Portfolio created successfully! ID: ${data.id}`);
            handleNext();
        } catch (error) {
            setMessage("Error creating portfolio");
            console.error(error);
        }
    };

    // Add Certificate
    const handleAddCertificate = () => {
        if (certificateTitle && certificateImageName) {
            setCertificates([...certificates, {
                title: certificateTitle,
                image_name: certificateImageName,
                image: certificateImage
            }]);
            setCertificateTitle("");
            setCertificateImageName("");
            setCertificateImage("");
        }
    };

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

    // Step 3: Submit all certificates
    const handleSubmitCertificates = async () => {
        if (!portifolioId) {
            setMessage("Please create portfolio first");
            return;
        }

        try {
            for (const cert of certificates) {
                const response = await fetch(`http://localhost:3001/certificate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...cert, portifolioId: Number(portifolioId) })
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Certificate creation failed:', errorData);
                    throw new Error(`Failed to create certificate: ${JSON.stringify(errorData)}`);
                }
                
                const result = await response.json();
                console.log('Certificate created:', result);
            }
            setMessage("Certificates created successfully!");
        } catch (error: unknown) {
            setMessage(`Error creating certificates: ${error instanceof Error ? error.message : 'Unknown error'}`);
            console.error(error);
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
                const response = await fetch(`http://localhost:3001/experience`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...exp, portifolioId: Number(portifolioId) })
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Experience creation failed:', errorData);
                    throw new Error(`Failed to create experience: ${JSON.stringify(errorData)}`);
                }
                
                const result = await response.json();
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
                const response = await fetch(`http://localhost:3001/hardSkill`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...skill, portifolioId: Number(portifolioId) })
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Hard skill creation failed:', errorData);
                    throw new Error(`Failed to create hard skill: ${JSON.stringify(errorData)}`);
                }
                
                const result = await response.json();
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
        await handleSubmitCertificates();
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
                                        Create & Continue
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                );
            
            case 2:
                return (
                    <Box>
                        <Typography variant="body1" paragraph>
                            Add your certificates to showcase your achievements.
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Title"
                                value={certificateTitle}
                                onChange={(e) => setCertificateTitle(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Image Name"
                                value={certificateImageName}
                                onChange={(e) => setCertificateImageName(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Image URL"
                                value={certificateImage}
                                onChange={(e) => setCertificateImage(e.target.value)}
                                fullWidth
                            />
                            <Button 
                                onClick={handleAddCertificate} 
                                variant="outlined"
                                startIcon={<AddIcon />}
                                disabled={!certificateTitle || !certificateImageName}
                            >
                                Add Certificate
                            </Button>
                            
                            {certificates.length > 0 && (
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Added Certificates ({certificates.length})
                                    </Typography>
                                    <List>
                                        {certificates.map((cert, idx) => (
                                            <ListItem key={idx} divider>
                                                <ListItemText 
                                                    primary={cert.title} 
                                                    secondary={cert.image_name}
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
            
            case 4:
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
            
            case 5:
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
                                        Certificates
                                    </Typography>
                                    <Typography variant="body2">
                                        Total: {certificates.length}
                                    </Typography>
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