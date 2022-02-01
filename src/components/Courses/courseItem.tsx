import { Card, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin:'0.75rem',
      minWidth:'25vh',
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
  
function CourseItem({nome, imagem}){

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

export default CourseItem;