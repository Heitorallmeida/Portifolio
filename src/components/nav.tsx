import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  Snackbar,
} from "@material-ui/core";
import React, { useState } from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { GiBrazilFlag, GiUsaFlag } from "react-icons/gi";
import useLanguage from "../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  name: {
    marginLeft: "auto",
    textDecoration: "underline",
    cursor: "pointer",
  },
  banner: {
    backgroundColor: "#151813",
    height: "60vh",
  },
  languageWrapper: {
    display: "flex",
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { language, setLanguage } = useLanguage();

  const handleMailClick = () => {
    setShowMessage(true);
  };

  const handleMailMessageClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
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
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      id="menu-appbar"
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleClose}
    >
      <MenuItem
        onClick={() => {
          window.open("https://www.linkedin.com/in/heitor-almeida-147ab7187/");
          handleClose();
        }}
      >
        Linkedin
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

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.languageWrapper}>
            <Typography variant="h6" onClick={handleProfileMenuOpen}>
              Language
            </Typography>
            <GiUsaFlag
              color={language === "en" ? "blue" : "white"}
              size={30}
              style={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={() => setLanguage("en")}
            />
            <GiBrazilFlag
              color={language === "pt-BR" ? "green" : "white"}
              size={30}
              style={{ marginLeft: "0.5rem", cursor: "pointer" }}
              onClick={() => setLanguage("pt-BR")}
            />
          </div>
          <Typography
            variant="h6"
            className={classes.name}
            onClick={handleProfileMenuOpen}
          >
            {language === "pt-BR" ? "Como me achar?" : "How to find me?"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
        onClose={handleMailMessageClose}
      >
        <Alert onClose={handleMailMessageClose} severity="success">
          Email copiado com sucesso!
        </Alert>
      </Snackbar>
      {renderMenu}
    </>
  );
}

export default NavBar;
