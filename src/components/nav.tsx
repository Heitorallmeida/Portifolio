import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography,  MenuItem, Menu, Snackbar } from '@material-ui/core';
import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  name:{
    marginLeft: 'auto',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  banner: {
    backgroundColor: '#151813', 
    height: '60vh'
  }
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function NavBar() {
    const name = "Como me achar?";
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen =  Boolean(anchorEl);
    const [showMessage, setShowMessage] = React.useState(false);

    const handleMailClick = () => {
      setShowMessage(true);
    };

    const handleMailMessageClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setShowMessage(false);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        id="menu-appbar"
        keepMounted
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={isMenuOpen}
        onClose={handleClose}
      >
        <MenuItem 
          onClick = {()=> {
            window.open("https://www.linkedin.com/in/heitor-almeida-147ab7187/");
            handleClose();
            }}
          >Linkedin
          </MenuItem>
        <MenuItem 
          onClick={() => {
            navigator.clipboard.writeText("Heitornmalmeida@gmail.com");
            handleMailClick();
            handleClose();
          }}
        >
          Email
        </MenuItem>
      </Menu>
    );

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                  <div style={{marginLeft: "auto"}}></div>
                    <Typography variant="h6" className={classes.name} onClick={handleProfileMenuOpen}>
                      {name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Snackbar open={showMessage} autoHideDuration={6000} onClose={handleMailMessageClose}>
            <Alert onClose={handleMailMessageClose} severity="success">
              Email copiado com sucesso!
            </Alert>
          </Snackbar>
            {renderMenu}
        </>
    );
};

export default NavBar;
