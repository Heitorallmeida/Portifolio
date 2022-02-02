import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  name:{
    marginLeft: 'auto',
  },
  banner: {
    backgroundColor: '#151813', 
    height: '60vh'
  }
}));

function NavBar() {
    const name = "Heitor Almeida";
    const classes = useStyles();

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={classes.name}>
                    {name}
                </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavBar;
