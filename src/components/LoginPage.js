import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import ManagerLogin from "./ManagerLogin";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loginType, setLoginType] = useState(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          minWidth: isMobile ? 300 : 400,
          p: 3,
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <CardContent>
          {loginType === null && (
            <>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      fontFamily: "'Grand Hotel', cursive",
                      fontSize: { xs: "1.8rem", sm: "2rem", md: "2rem" },
                      display: "flex",
                      alignItems: "center",
                      mr: { xs: 11, sm: 17, md: 17 },
                    }}
                  >
                    L
                    <IconButton
                      onClick={() => setLoginType("manager")}
                      sx={{
                        p: 0,
                        mx: "2px",
                        background: "transparent",
                        "&:hover": { background: "transparent" },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#8f8f8fff",
                          width: 25,
                          height: 25,
                          boxShadow: 1,
                          mb: -1.5,
                        }}
                      >
                        <PersonIcon sx={{ width: 15, height: 15 }} />
                      </Avatar>
                    </IconButton>
                    gin
                  </Typography>
                </Box>
              </Box>
              <Box mt={4} mb={2} display="flex" justifyContent="center">
                <Stack direction="row" spacing={4}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <IconButton onClick={() => setLoginType("admin")}>
                      <Avatar sx={{ bgcolor: "#2575fc", width: 56, height: 56 }}>
                        <AdminPanelSettingsIcon fontSize="large" />
                      </Avatar>
                    </IconButton>
                    <Typography mt={1} fontSize={14}>
                      Admin
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <IconButton onClick={() => setLoginType("user")}>
                      <Avatar sx={{ bgcolor: "#6a11cb", width: 56, height: 56 }}>
                        <AccountCircleIcon fontSize="large" />
                      </Avatar>
                    </IconButton>
                    <Typography mt={1} fontSize={14}>
                      User
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </>
          )}
          {loginType === "manager" && <ManagerLogin onBack={() => setLoginType(null)} />}
          {loginType === "admin" && <AdminLogin onBack={() => setLoginType(null)} />}
          {loginType === "user" && <UserLogin onBack={() => setLoginType(null)} />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;