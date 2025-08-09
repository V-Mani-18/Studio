import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  useMediaQuery,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import PaymentIcon from "@mui/icons-material/Payment"; // Add this import
import { useTheme } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Clients", icon: <PeopleIcon /> },
  { label: "Payment", icon: <PaymentIcon /> }, // Change to PaymentIcon
  { label: "About", icon: <InfoIcon /> },
];

const logoUrl = "/LandingBack.jpeg"; // Replace with your logo/image

function ManagerAdministration() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [navValue, setNavValue] = useState(0);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      {isMobile ? (
        <>
          {/* Top AppBar for mobile */}
          <AppBar position="static" color="white" elevation={3} sx={{ boxShadow: 3,width:"104vw" }}>
            <Toolbar sx={{ justifyContent: "center", alignItems: "center" }}>
              <img
                src={logoUrl}
                alt="Logo"
                style={{ height: 32, marginRight: 12, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
              />
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  fontFamily: "'Grand Hotel', cursive",
                  fontSize: 20,
                  letterSpacing: 2,
                }}
              >
                LC Studio Management
              </Typography>
            </Toolbar>
          </AppBar>
          {/* Main content placeholder */}
          <Box sx={{ flex: 1, bgcolor: "#fff", minHeight: "80vh", width:"100%" }}>
            <Outlet />
          </Box>
          {/* Attractive Fixed Bottom Navigation */}
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: "16px 16px 0 0",
              boxShadow: "0 -2px 12px rgba(0,0,0,0.12)",
              mx: "auto",
              maxWidth: 480,
            }}
            elevation={6}
          >
            <BottomNavigation
              showLabels
              value={navValue}
              onChange={(e, newValue) => setNavValue(newValue)}
              sx={{ bgcolor: "#fff", borderRadius: "16px 16px 0 0" }}
            >
              {menuItems.map((item, idx) => (
                <BottomNavigationAction
                  key={item.label}
                  label={item.label}
                  icon={React.cloneElement(item.icon, {
                    sx: {
                      color: navValue === idx ? theme.palette.primary.main : "#888",
                      transition: "color 0.2s",
                      "&:hover": { color: theme.palette.secondary.main },
                    },
                  })}
                  sx={{
                    "& .MuiBottomNavigationAction-label": {
                      fontWeight: navValue === idx ? 700 : 500,
                      color: navValue === idx ? theme.palette.primary.main : "#888",
                      transition: "color 0.2s",
                    },
                    "&:hover .MuiSvgIcon-root": {
                      color: theme.palette.secondary.main,
                    },
                    "&:hover .MuiBottomNavigationAction-label": {
                      color: theme.palette.secondary.main,
                    },
                  }}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    if (item.label === "Home") navigate("/manager-dashboard/home");
                    if (item.label === "Clients") navigate("/manager-dashboard/clients");
                    if (item.label === "Payment") navigate("/manager-dashboard/payment"); // Add this line
                    // Add more navigation for other items if needed
                  }}
                />
              ))}
            </BottomNavigation>
          </Paper>
        </>
      ) : (
        // Desktop horizontal AppBar
        <>
          <AppBar
            position="static"
            color="primary"
            elevation={3}
            sx={{ boxShadow: 3, bgcolor: "#1976d2",width: "100vw" }}
          >
            <Toolbar sx={{ minHeight: 56, px: 4 }}>
              {/* <img
                src={logoUrl}
                alt="Logo"
                style={{ height: 32, marginRight: 16, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
              /> */}
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 0,
                  fontSize: "28px",
                  fontFamily: "'Grand Hotel', cursive",
                  letterSpacing: 2,
                  mr: 30,
                  ml: 15,
                  color: "#fff",
                }}
              >
                LC Studio Management
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: "#fff", opacity: 0.2 }} />
              {/* Desktop nav bar menu items */}
              <Box sx={{ display: "flex", gap: 4, ml: 2 }}>
                {menuItems.map((item, idx) => (
                  <Box
                    key={item.label}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: hovered === idx ? "#fff" : "transparent",
                      color: hovered === idx ? theme.palette.primary.main : "#fff",
                      fontWeight: 500,
                      fontSize: 18,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "#fff",
                        color: theme.palette.primary.main,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      },
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => {
                      if (item.label === "Home") navigate("/manager-dashboard/home");
                      if (item.label === "Clients") navigate("/manager-dashboard/clients");
                      if (item.label === "Payment") navigate("/manager-dashboard/payment"); // Add this line
                      // Add more navigation for other items if needed
                    }}
                  >
                    {item.label}
                  </Box>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
          {/* Main content placeholder */}
          <Box sx={{ flex: 1, bgcolor: "#fff", minHeight: "80vh" }}>
            <Outlet />
          </Box>
        </>
      )}
    </Box>
  );
}

export default ManagerAdministration;