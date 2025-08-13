import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([
    { name: "Original Photos", icon: <FolderIcon sx={{ color: "#1976d2" }} /> },
    { name: "Copy Photos", icon: <FolderIcon sx={{ color: "#388e3c" }} /> }
  ]);
  const [addDialog, setAddDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Fetch user data by ID
  useEffect(() => {
    async function fetchUser() {
      const res = await axios.get(`http://localhost:5000/api/users/${id}`);
      setUser(res.data);
    }
    fetchUser();
  }, [id]);

  // Handle add folder flow
  const handleAddFolder = () => setConfirmDialog(true);
  const handleConfirmYes = () => {
    setConfirmDialog(false);
    setAddDialog(true);
  };
  const handleConfirmNo = () => setConfirmDialog(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      setFolders(prev => [
        ...prev,
        { name: newFolderName, icon: <FolderIcon sx={{ color: "#ffa726" }} /> }
      ]);
      setNewFolderName("");
      setAddDialog(false);
    }
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ pt: 10, px: 2, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* User Name */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: "#1976d2",
          textAlign: "center",
          mb: 3,
          fontFamily: "'Grand Hotel', cursive",
          letterSpacing: 2
        }}
      >
        {user.name}
      </Typography>

      {/* User Details Table */}
      <TableContainer component={Paper} sx={{ maxWidth: 600, mx: "auto", mb: 4, boxShadow: 4, borderRadius: 3 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#1976d2" }}>User ID</TableCell>
              <TableCell>{user.userId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#1976d2" }}>Username</TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#1976d2" }}>Mobile</TableCell>
              <TableCell>{user.mobile}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#1976d2" }}>Place</TableCell>
              <TableCell>{user.place}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#1976d2" }}>Event</TableCell>
              <TableCell>{user.event}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#1976d2" }}>Status</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#1976d2" }}>Date</TableCell>
              <TableCell>{user.date ? user.date.slice(0, 10) : ""}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Folders Section */}
      <Box sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          {folders.map((folder, idx) => (
            <Grid item xs={12} sm={6} key={folder.name}>
              <Paper sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                bgcolor: idx === 0 ? "#e3f2fd" : idx === 1 ? "#e8f5e9" : "#fff"
              }}>
                {folder.icon}
                <Typography sx={{ ml: 2, fontWeight: 700, fontSize: 18 }}>
                  {folder.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
          {/* Add Folder Icon */}
          <Grid item xs={12} sm={6}>
            <Paper sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              bgcolor: "#fff"
            }}>
              <IconButton onClick={handleAddFolder} color="primary">
                <AddIcon fontSize="large" />
              </IconButton>
              <Typography sx={{ ml: 2, fontWeight: 700, fontSize: 18 }}>
                Add Folder
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Confirm Dialog */}
      <Dialog open={confirmDialog} onClose={handleConfirmNo}>
        <DialogTitle>Do you want to create a new folder?</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmNo}>No</Button>
          <Button onClick={handleConfirmYes} variant="contained" color="primary">Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Add Folder Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogTitle>Enter Folder Name</DialogTitle>
        <DialogContent>
          <TextField
            label="Folder Name"
            value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button
            onClick={handleCreateFolder}
            variant="contained"
            color="primary"
            disabled={!newFolderName.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserDetails;