import { Card, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin:'auto',
      marginBottom: "2rem",
      minWidth:'30vh',
      marginRight: 'auto',
      "&:hover": {
        boxShadow : "5px 5px gray"
      }
    },
    media: {
        minWidth: '25vh',
        maxWidth: '30vh',
        height: '20vh',
        margin: '2rem',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});
  
function ExperienceItem({nome, imagem}){

    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <CardMedia
                component="img"
                className={classes.media}
                image={imagem}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{'fontWeight': 'bold'}}>
                    {nome}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ExperienceItem;