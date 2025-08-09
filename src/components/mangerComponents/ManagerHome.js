import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Fab,
  useMediaQuery,
  Stack
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import BlockIcon from "@mui/icons-material/Block";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function ManagerHome() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    studio: "",
    username: "",
    password: "",
    mobile: "",
    place: ""
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [clients, setClients] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    active: 0,
    blocked: 0
  });
  const [showActiveDialog, setShowActiveDialog] = useState(false);
  const [showBlockedDialog, setShowBlockedDialog] = useState(false);
  const [showPaidDialog, setShowPaidDialog] = useState(false);
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/clients")
      .then(res => res.json())
      .then(data => {
        setClients(data);
        setCounts({
          total: data.length,
          active: data.filter(c => c.status === "Active").length,
          blocked: data.filter(c => c.status === "Blocked").length
        });
      });
  }, [open, snackbar.open]); // refetch when dialog closes or snackbar opens

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setForm({ name: "", studio: "", username: "", password: "", mobile: "", place: "" });
        handleClose();
        setSnackbar({
          open: true,
          message: "Client added successfully!",
          severity: "success"
        });
      } else {
        setSnackbar({
          open: true,
          message: "Failed to add client.",
          severity: "error"
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Server error.",
        severity: "error"
      });
    }
  };

  const handleClientsClick = () => {
    navigate("/manager-dashboard/clients");
  };

  const handleActiveClientsClick = () => setShowActiveDialog(true);
  const handleBlockedClientsClick = () => setShowBlockedDialog(true);

  const handleStatusChange = async (client) => {
    const newStatus = client.status === "Active" ? "Blocked" : "Active";
    await fetch(`http://localhost:5000/api/clients/${client._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...client, status: newStatus })
    });
    // Refetch clients
    fetch("http://localhost:5000/api/clients")
      .then(res => res.json())
      .then(data => {
        setClients(data);
        setCounts({
          total: data.length,
          active: data.filter(c => c.status === "Active").length,
          blocked: data.filter(c => c.status === "Blocked").length
        });
      });
  };

  const cards = [
    {
      label: "Add Client",
      icon: (
        <IconButton color="primary" sx={{ bgcolor: "#fff", boxShadow: 2 }}>
          <AddIcon fontSize="large" />
        </IconButton>
      ),
      count: null,
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
    },
    {
      label: "Number of Clients",
      icon: <GroupsIcon fontSize="large" sx={{ color: "#1976d2", mb: 1 }} />,
      count: counts.total,
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      onClick: handleClientsClick
    },
    {
      label: "Active Clients",
      icon: <PersonAddAlt1Icon fontSize="large" sx={{ color: "#388e3c", mb: 1 }} />,
      count: counts.active,
      color: "#388e3c",
      gradient: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
      onClick: handleActiveClientsClick
    },
    {
      label: "Blocked Clients",
      icon: <BlockIcon fontSize="large" sx={{ color: "#d32f2f", mb: 1 }} />,
      count: counts.blocked,
      color: "#d32f2f",
      gradient: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
      onClick: handleBlockedClientsClick
    },
    {
      label: "Paid Clients",
      icon: <GroupsIcon fontSize="large" sx={{ color: "#43ea7b", mb: 1 }} />,
      count: clients.filter(c => c.paymentState === "Paid").length,
      color: "#43ea7b",
      gradient: "linear-gradient(135deg, #e0f7fa 0%, #b2dfdb 100%)",
      onClick: () => setShowPaidDialog(true)
    },
    {
      label: "Pending Payment ",
      icon: <GroupsIcon fontSize="large" sx={{ color: "#ffd600", mb: 1 }} />,
      count: clients.filter(c => c.paymentState === "Pending").length,
      color: "#ffd600",
      gradient: "linear-gradient(135deg, #fffde7 0%, #ffe082 100%)",
      onClick: () => setShowPendingDialog(true)
    }
  ];

  return (
    <Box sx={{ p: isMobile ? 1 : 4, bgcolor: "#fff", minHeight: "100vh", width: "95vw", position: "relative", marginTop: isMobile ? 0 : "30px" }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        {cards.map((card, idx) => (
          <Grid
            item
            xs={isMobile ? 6 : 12}
            sm={6}
            md={4}
            key={card.label}
            sx={
              isMobile && idx >= 4
                ? { gridColumn: "span 6", mt: 2 }
                : undefined
            }
          >
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 4,
                textAlign: "center",
                background: card.gradient,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.03)",
                  boxShadow: 8,
                },
                py: isMobile ? 2 : 3,
                px: isMobile ? 1 : 2,
                cursor:
                  card.label === "Add Client" || card.label === "Number of Clients"
                    ? "pointer"
                    : "default",
                mb: isMobile ? 2 : 0,
              }}
              onClick={card.onClick ? card.onClick : card.label === "Add Client" ? handleOpen : card.label === "Number of Clients" ? handleClientsClick : undefined}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 1 }}>
                  {card.icon}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: card.color }}>
                  {card.label}
                </Typography>
                {card.count !== null && (
                  <Typography variant="h4" sx={{ color: card.color, fontWeight: 800 }}>
                    {card.count}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Client Form Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: isMobile ? "90vw" : 400,
            maxWidth: "95vw",
            maxHeight: isMobile ? "80vh" : "auto",
            m: "auto",
            borderRadius: 3,
            bgcolor: "#f5f5f5",
            p: 2,
            boxShadow: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 22,
            py: 2,
            borderRadius: "12px 12px 0 0"
          }}
        >
          Add Client
        </DialogTitle>
        <DialogContent sx={{ px: 2, py: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Studio Name"
              name="studio"
              fullWidth
              value={form.studio}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="User Name"
              name="username"
              fullWidth
              value={form.username}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Password"
              name="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Mobile No"
              name="mobile"
              fullWidth
              value={form.mobile}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Place"
              name="place"
              fullWidth
              value={form.place}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleClose} sx={{ px: 4, fontWeight: 700 }}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate} sx={{ px: 4, fontWeight: 700, bgcolor: "#1976d2" }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Active Clients Dialog */}
      <Dialog open={showActiveDialog} onClose={() => setShowActiveDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#e8f5e9", color: "#388e3c", fontWeight: 700 }}>Active Clients</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {clients.filter(c => c.status === "Active").map((client, idx) => (
              <Box
                key={client._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                  bgcolor: "#f1f8e9",
                  borderRadius: 2,
                  mt: idx === 0 ? 0.6 : 0 // Move first row down 5px
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{client.name} ({client.studio})</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleStatusChange(client)}
                  sx={{
                    fontWeight: 700,
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    background: "linear-gradient(90deg,#ff5252 0%,#ff1744 100%)",
                    color: "#fff",
                    boxShadow: 3,
                    transition: "all 0.2s",
                    "&:hover": {
                      background: "linear-gradient(90deg,#d50000 0%,#ff1744 100%)",
                      boxShadow: 6,
                      transform: "scale(1.05)"
                    }
                  }}
                >
                  Block
                </Button>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowActiveDialog(false)}
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: 4,
              boxShadow: 2,
              background: "linear-gradient(90deg,#1976d2 0%,#64b5f6 100%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg,#115293 0%,#1976d2 100%)"
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Blocked Clients Dialog */}
      <Dialog open={showBlockedDialog} onClose={() => setShowBlockedDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#ffebee", color: "#d32f2f", fontWeight: 700 }}>Blocked Clients</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {clients.filter(c => c.status === "Blocked").map((client, idx) => (
              <Box
                key={client._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                  bgcolor: "#ffebee",
                  borderRadius: 2,
                  mt: idx === 0 ? 0.6 : 0 // Move first row down 5px
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{client.name} ({client.studio})</Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleStatusChange(client)}
                  sx={{
                    fontWeight: 700,
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    background: "linear-gradient(90deg,#43ea7b 0%,#1de9b6 100%)",
                    color: "#fff",
                    boxShadow: 3,
                    transition: "all 0.2s",
                    "&:hover": {
                      background: "linear-gradient(90deg,#00bfa5 0%,#43ea7b 100%)",
                      boxShadow: 6,
                      transform: "scale(1.05)"
                    }
                  }}
                >
                  Activate
                </Button>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowBlockedDialog(false)}
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: 4,
              boxShadow: 2,
              background: "linear-gradient(90deg,#1976d2 0%,#64b5f6 100%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg,#115293 0%,#1976d2 100%)"
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Paid Clients Dialog */}
      <Dialog open={showPaidDialog} onClose={() => setShowPaidDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#e0f7fa", color: "#43ea7b", fontWeight: 700 }}>Paid Clients</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {clients.filter(c => c.paymentState === "Paid").map((client, idx) => (
              <Box
                key={client._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                  bgcolor: "#e0f7fa",
                  borderRadius: 2,
                  mt: idx === 0 ? 0.6 : 0
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{client.name} ({client.studio})</Typography>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowPaidDialog(false)}
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: 4,
              boxShadow: 2,
              background: "linear-gradient(90deg,#1976d2 0%,#64b5f6 100%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg,#115293 0%,#1976d2 100%)"
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pending Payment Clients Dialog */}
      <Dialog open={showPendingDialog} onClose={() => setShowPendingDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#fffde7", color: "#ffd600", fontWeight: 700 }}>Pending Payment Clients</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {clients.filter(c => c.paymentState === "Pending").map((client, idx) => (
              <Box
                key={client._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                  bgcolor: "#fffde7",
                  borderRadius: 2,
                  mt: idx === 0 ? 0.6 : 0
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{client.name} ({client.studio})</Typography>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowPendingDialog(false)}
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: 4,
              boxShadow: 2,
              background: "linear-gradient(90deg,#1976d2 0%,#64b5f6 100%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg,#115293 0%,#1976d2 100%)"
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default ManagerHome;