import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManagerLogin = ({ onBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary check for username and password
    if (username === "lc" && password === "123") {
      setError("");
      navigate("/manager-dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          fontFamily: "'Grand Hotel', cursive",
          fontSize: { xs: "1.5rem", sm: "1.7rem", md: "1.7rem" },
          mb: 2,
          textAlign: "center",
        }}
      >
        Manager Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        {error && (
          <Typography color="error" fontSize={14} textAlign="center">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
        <Button variant="text" color="secondary" fullWidth onClick={onBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ManagerLogin;