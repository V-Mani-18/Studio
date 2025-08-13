import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const eventOptions = [
  "Birthday",
  "Wedding",
  "Baby Shoot",
  "Outdoor Shoot",
  "Pre Wedding",
  "Post Wedding",
  "Meetings",
  "Others"
];

function UserManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    mobile: "",
    place: "",
    event: ""
  });
  const [userListOpen, setUserListOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch users from backend
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        // handle error
      }
    }
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setForm({
      name: "",
      username: "",
      password: "",
      mobile: "",
      place: "",
      event: "",
      date: "",
    });
    setOpen(true);
  };

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const allFilled = Object.values(form).every((v) => v);

  // Add user to backend
  const handleCreate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users", form); // form contains all fields
      setUsers(prev => [...prev, res.data]); // update local state
      setOpen(false); // close dialog
    } catch (err) {
      // handle error
    }
  };

  const handleClose = () => setOpen(false);
  const handleOpenUserList = () => setUserListOpen(true);
  const handleCloseUserList = () => {
    setUserListOpen(false);
    setSearch("");
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const cards = [
    {
      label: "Add User",
      icon: (
        <IconButton color="primary" sx={{ bgcolor: "#fff", boxShadow: 2 }}>
          <AddIcon fontSize="large" />
        </IconButton>
      ),
      count: null,
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      onClick: handleAddUser
    },
    {
      label: "Number of Users",
      icon: <GroupsIcon fontSize="large" sx={{ color: "#1976d2", mb: 1 }} />,
      count: users.length,
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      onClick: handleOpenUserList
    },
    {
      label: "Active Users",
      icon: <PersonAddAlt1Icon fontSize="large" sx={{ color: "#388e3c", mb: 1 }} />,
      count: users.filter(u => u.status === "Active").length,
      color: "#388e3c",
      gradient: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)"
    },
    {
      label: "Inactive Users",
      icon: <BlockIcon fontSize="large" sx={{ color: "#d32f2f", mb: 1 }} />,
      count: users.filter(u => u.status === "Inactive").length,
      color: "#d32f2f",
      gradient: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)"
    },
    {
      label: "Selected Users",
      icon: <CheckCircleIcon fontSize="large" sx={{ color: "#1976d2", mb: 1 }} />,
      count: selectedUsers.length,
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
    },
    {
      label: "Unselected Users",
      icon: <RadioButtonUncheckedIcon fontSize="large" sx={{ color: "#888", mb: 1 }} />,
      count: users.length - selectedUsers.length,
      color: "#888",
      gradient: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)"
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
            sx={isMobile && idx >= 4 ? { gridColumn: "span 6", mt: 2 } : undefined}
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
                cursor: card.onClick ? "pointer" : "default",
                mb: isMobile ? 2 : 0,
              }}
              onClick={card.onClick}
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

      {/* Add User Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "'Grand Hotel', cursive",
            letterSpacing: 2
          }}
        >
          Add User
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              value={form.name}
              onChange={handleFormChange("name")}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
            />
            <TextField
              label="Username"
              value={form.username}
              onChange={handleFormChange("username")}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={handleFormChange("password")}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
            />
            <TextField
              label="Mobile Number"
              value={form.mobile}
              onChange={handleFormChange("mobile")}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
            />
            <TextField
              label="Place"
              value={form.place}
              onChange={handleFormChange("place")}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
            />
            <TextField
              select
              label="Event"
              value={form.event}
              onChange={handleFormChange("event")}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
            >
              {eventOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date"
              type="date"
              value={form.date}
              onChange={handleFormChange("date")}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleClose} sx={{ px: 4, fontWeight: 700 }}>Close</Button>
          <Button
            variant="contained"
            sx={{ px: 4, fontWeight: 700, bgcolor: "#1976d2" }}
            onClick={handleCreate}
            disabled={!allFilled}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* User List Dialog */}
      <Dialog open={userListOpen} onClose={handleCloseUserList} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "'Grand Hotel', cursive",
            letterSpacing: 2
          }}
        >
          User List
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, bgcolor: "#f5f5f5", borderRadius: 2, px: 2,mt:3 }}>
            <SearchIcon sx={{ color: "#1976d2", mr: 1,height:"50px" }} />
            <TextField
              placeholder="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              variant="standard"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ bgcolor: "transparent" }}
            />
          </Box>
          <Stack spacing={2}>
            {filteredUsers.length === 0 ? (
              <Typography sx={{ textAlign: "center", color: "#888" }}>No users found.</Typography>
            ) : (
              filteredUsers.map(user => (
                <Box
                  key={user.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    bgcolor: "#e3f2fd",
                    borderRadius: 2,
                    boxShadow: 1
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>{user.name}</Typography>
                   <Typography sx={{ color: "#4e4e4eff", fontWeight: 500, }}>
  {user.date ? user.date.slice(0, 10) : ""}</Typography>
                  <Typography sx={{ color: "#1976d2", fontWeight: 500 }}>{user.event}</Typography>
                </Box>
              ))
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleCloseUserList} sx={{ px: 4, fontWeight: 700 }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserManagement;
