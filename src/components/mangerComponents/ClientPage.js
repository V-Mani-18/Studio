import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Button, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, IconButton, useTheme,
  useMediaQuery, Avatar
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PlaceIcon from "@mui/icons-material/Place";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog as MuiDialog } from "@mui/material"; // For confirmation dialog
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function ClientPage() {
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editField, setEditField] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch clients from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/clients")
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  // Update client in backend and state
  const updateClient = async (id, updatedFields) => {
    const res = await fetch(`http://localhost:5000/api/clients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields)
    });
    const updated = await res.json();
    setClients(prev =>
      prev.map(client => (client._id === id ? updated : client))
    );
    setSelected(selected => (selected && selected._id === id ? updated : selected));
  };

  const handleToggleStatus = (id) => {
    const client = clients.find(c => c._id === id);
    const newStatus = client.status === "Active" ? "Blocked" : "Active";
    updateClient(id, { ...client, status: newStatus });
  };

  const handleOpenDetails = (client) => {
    setSelected(client);
    setEditField(null);
    setEditValues({});
  };

  const handleEdit = (field) => {
    setEditField(field);
    setEditValues({ ...editValues, [field]: selected[field] });
  };

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [editField]: e.target.value });
  };

  const handleEditSave = () => {
    updateClient(selected._id, { ...selected, [editField]: editValues[editField] });
    setEditField(null);
  };

  const handleCloseDialog = () => {
    setSelected(null);
    setEditField(null);
    setEditValues({});
  };

  // Delete client from backend and state
  const handleDeleteUser = async () => {
    if (!selected) return;
    await fetch(`http://localhost:5000/api/clients/${selected._id}`, {
      method: "DELETE"
    });
    setClients(prev => prev.filter(c => c._id !== selected._id));
    setSelected(null);
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: isMobile ? 600 : 1100, mx: "auto" }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <PersonIcon sx={{ mr: 1, verticalAlign: "middle", color: "#1976d2" }} />
        Clients View
      </Typography>
      <Stack spacing={2}>
        {clients.map((client) => (
          <Paper
            key={client._id}
            elevation={4}
            sx={{
              p: 2,
              borderRadius: 4,
              bgcolor: client.status === "Active" ? "#e3fcec" : "#fdecea",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              boxShadow: client.status === "Active"
                ? "0 4px 16px #43ea7b33"
                : "0 4px 16px #ff525233",
              transition: "box-shadow 0.2s"
            }}
            onClick={() => handleOpenDetails(client)}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "#1976d2" }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {client.studio} ({client.name})
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Status: {client.status}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              color={client.status === "Active" ? "error" : "success"}
              onClick={e => {
                e.stopPropagation();
                handleToggleStatus(client._id);
              }}
              sx={{
                minWidth: isMobile ? 80 : 120,
                fontWeight: 700,
                fontSize: isMobile ? 12 : 16,
                px: isMobile ? 1 : 4,
                py: isMobile ? 0.5 : 1.5,
                borderRadius: 3,
                boxShadow: 3,
                background: client.status === "Active"
                  ? "linear-gradient(90deg,#ff5252 0%,#ff1744 100%)"
                  : "linear-gradient(90deg,#43ea7b 0%,#1de9b6 100%)",
                color: "#fff",
                transition: "all 0.2s",
                "&:hover": {
                  background: client.status === "Active"
                    ? "linear-gradient(90deg,#d50000 0%,#ff1744 100%)"
                    : "linear-gradient(90deg,#00bfa5 0%,#43ea7b 100%)",
                  boxShadow: 6,
                  transform: "scale(1.05)"
                }
              }}
            >
              {client.status === "Active" ? "Block User" : "Activate User"}
            </Button>
          </Paper>
        ))}
      </Stack>

      {/* User Details Dialog */}
      <Dialog
        open={!!selected}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth={isMobile ? "xs" : "sm"}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: isMobile ? 1 : 3,
            background: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)"
          }
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            textAlign: "center",
            pb: 1,
            bgcolor: "#1976d2",
            color: "#fff",
            borderRadius: "16px 16px 0 0"
          }}
        >
          <VerifiedUserIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          User Details
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: { xs: 8, sm: 16, md: 24 },
              top: { xs: 8, sm: 16, md: 30 },
              color: "#fff"
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 80 }}>
                Name:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccountCircleIcon color="primary" /> {/* Changed icon */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 80 }}>
                Studio Name:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.studio}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccountCircleIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 80 }}>
                Username:
              </Typography>
              {editField === "username" ? (
                <TextField
                  size="small"
                  value={editValues.username}
                  onChange={handleEditChange}
                  sx={{ ml: 1, width: isMobile ? 120 : 200 }}
                  variant="outlined"
                  autoFocus
                />
              ) : (
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {selected?.username}
                </Typography>
              )}
              <IconButton size="small" onClick={() => handleEdit("username")} sx={{ ml: 1 }}>
                <EditIcon fontSize="small" color="action" />
              </IconButton>
              {editField === "username" && (
                <Button
                  size="small"
                  onClick={handleEditSave}
                  variant="contained"
                  sx={{
                    ml: 1,
                    bgcolor: "#1976d2",
                    color: "#fff",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#115293" }
                  }}
                >
                  Save
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LockIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 80 }}>
                Password:
              </Typography>
              {editField === "password" ? (
                <TextField
                  size="small"
                  value={editValues.password}
                  onChange={handleEditChange}
                  sx={{ ml: 1, width: isMobile ? 120 : 200 }}
                  variant="outlined"
                  autoFocus
                />
              ) : (
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {selected?.password || "********"}
                </Typography>
              )}
              <IconButton size="small" onClick={() => handleEdit("password")} sx={{ ml: 1 }}>
                <EditIcon fontSize="small" color="action" />
              </IconButton>
              {editField === "password" && (
                <Button
                  size="small"
                  onClick={handleEditSave}
                  variant="contained"
                  sx={{
                    ml: 1,
                    bgcolor: "#1976d2",
                    color: "#fff",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#115293" }
                  }}
                >
                  Save
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VerifiedUserIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 80 }}>
                Status:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.status}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                color={selected?.status === "Active" ? "error" : "success"}
                onClick={() => handleToggleStatus(selected._id)}
                endIcon={<SwapHorizIcon />}
                sx={{
                  ml: 2,
                  fontWeight: 700,
                  borderRadius: 2,
                  borderWidth: 2,
                  borderColor: selected?.status === "Active" ? "#ff1744" : "#43ea7b",
                  "&:hover": {
                    bgcolor: selected?.status === "Active" ? "#ffebee" : "#e8f5e9"
                  }
                }}
              >
                Change
              </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIphoneIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 80 }}>
                Mobile:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.mobile || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PlaceIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 80 }}>
                Place:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.place || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhotoCameraIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 80 }}>
                Studio Name:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.studio}
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
              boxShadow: 2,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#115293" }
            }}
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(true)}
            variant="contained"
            color="error"
            sx={{
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
              boxShadow: 2,
              bgcolor: "#d32f2f",
              "&:hover": { bgcolor: "#b71c1c" }
            }}
            startIcon={<DeleteIcon />}
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <MuiDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" sx={{
              fontWeight: 700,
              borderRadius: 2,
              color: "#fff",
              px: 4,
              boxShadow: 2,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#115293" }
            }} onClick={() => setDeleteDialogOpen(false)} >
               {<CloseIcon />}
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </DialogActions>
      </MuiDialog>
    </Box>
  );
}

export default ClientPage;