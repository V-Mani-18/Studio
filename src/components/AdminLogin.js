import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      // Find a client with matching username and password
      const admin = res.data.find(
        (c) => c.username === username && c.password === password
      );
      if (admin) {
        navigate("/admin-home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Try again.");
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
        Admin Login
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
          <Typography color="error" sx={{ textAlign: "center" }}>
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

export default AdminLogin;
