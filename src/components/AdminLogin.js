import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const AdminLogin = ({ onBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle admin login logic
    alert(`Admin Login\nUsername: ${username}\nPassword: ${password}`);
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
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
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