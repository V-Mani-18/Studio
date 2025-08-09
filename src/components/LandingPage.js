import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("/LandingBack.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "#fff",
          fontWeight: 700,
          letterSpacing: 4,
          textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
          mt: {xs:40, sm: 40, md: 50},
          fontFamily: "'Grand Hotel', cursive", // Instagram-like font
          fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem" },
          opacity: 0.5,
        }}
      >
        LC STUDIO
      </Typography>
    </Box>
  );
};

export default LandingPage;