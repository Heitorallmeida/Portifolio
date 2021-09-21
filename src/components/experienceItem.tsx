import { Card, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin:'2rem',
      width:'30vh',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    media: {
        width: '25vh',
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