"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { GiBrazilFlag, GiUsaFlag } from "react-icons/gi";
import Link from "next/link";
import useLanguage from "../hooks/useLanguage";


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NavBar() {
  const emailAddress = "Heitornmalmeida@gmail.com";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { language, setLanguage } = useLanguage();

  const handleMailClick = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(emailAddress);
      setShowMessage(true);
      window.setTimeout(() => setShowMessage(false), 4000);
    } catch {
      window.location.href = `mailto:${emailAddress}`;
    }

    handleClose();
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
          void handleMailClick();
        }}
      >
        Email
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ background: "rgba(11, 17, 32, 0.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(148, 163, 184, 0.16)" }}
      >
        <Toolbar sx={{ minHeight: "68px !important", width: "min(1180px, 100%)", mx: "auto", px: { xs: 2, md: 0 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.04em", mr: { xs: 2, sm: 4 } }}>
            HA<span style={{ color: "#67e8f9" }}>.</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" }, color: "#cbd5e1", fontWeight: 700, mr: 1.5 }}>
              {language === "pt-BR" ? "Idioma" : "Language"}
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
          <Link href="/" style={{ marginLeft: "auto", color: "#cbd5e1", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>
            {language === "pt-BR" ? "Portfólios" : "Portfolios"}
          </Link>
          <Typography
            variant="body2"
            sx={{ marginLeft: 3, color: "#67e8f9", fontWeight: 700, cursor: "pointer", "&:hover": { color: "#fff" } }}
            onClick={handleProfileMenuOpen}
          >
            {language === "pt-BR" ? "Contato" : "Contact"}
          </Typography>
        </Toolbar>
      </AppBar>
      {showMessage && (
        <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 1400 }}>
          <Alert onClose={() => setShowMessage(false)} severity="success">
          Email copiado com sucesso!
          </Alert>
        </div>
      )}
      {renderMenu}
    </>
  );
}

export default NavBar;
