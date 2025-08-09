import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  useMediaQuery
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/PhoneIphone";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function PaymentPage() {
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch clients from backend
  const fetchClients = () => {
    axios.get("http://localhost:5000/api/clients")
      .then(res => setClients(res.data))
      .catch(() => setClients([]));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpenDetails = (client) => {
    setSelected(client);
    setForm({
      amount: client.amount || "",
      receivedAmount: client.receivedAmount || "",
      pendingAmount: client.pendingAmount || "",
      planStart: client.planStart ? client.planStart.slice(0, 10) : "",
      planEnd: client.planEnd ? client.planEnd.slice(0, 10) : "",
      paymentState: client.paymentState || "Pending"
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCloseDialog = () => {
    setSelected(null);
    setForm({});
  };

  const handleSave = async () => {
    try {
      // Calculate pending and paymentState
      const pending =
        form.pendingAmount !== ""
          ? Number(form.pendingAmount)
          : form.amount && form.receivedAmount
          ? Number(form.amount) - Number(form.receivedAmount)
          : 0;

      const paymentState = Number(pending) === 0 ? "Paid" : "Pending";

      const updateData = {
        amount: Number(form.amount),
        receivedAmount: Number(form.receivedAmount),
        pendingAmount: pending,
        planStart: form.planStart,
        planEnd: form.planEnd,
        paymentState
      };

      await axios.put(`http://localhost:5000/api/clients/${selected._id}`, updateData);
      fetchClients();
      handleCloseDialog();
    } catch (err) {
      alert("Failed to save payment details");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: isMobile ? 600 : 1100, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textAlign: "center" }}>
        <PaymentIcon sx={{ mr: 1, verticalAlign: "middle", color: "#1976d2" }} />
        Payments
      </Typography>
      <Stack spacing={2}>
        {clients.map((client) => {
          // Calculate expiry color
          let expiryColor = "inherit";
          if (client.planEnd) {
            const daysLeft = Math.ceil((new Date(client.planEnd) - new Date()) / (1000 * 60 * 60 * 24));
            if (daysLeft <= 10) expiryColor = "error.main";
          }
          return (
            <Paper
              key={client._id}
              elevation={4}
              sx={{
                p: 2,
                borderRadius: 4,
                bgcolor: client.paymentState === "Paid" ? "#e3fcec" : "#fffde7",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: client.paymentState === "Paid"
                  ? "0 4px 16px #43ea7b33"
                  : "0 4px 16px #ffd60033",
                transition: "box-shadow 0.2s",
                cursor: "pointer"
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: 3,
                      mt: 1
                    }}
                  >
                    {isMobile ? (
                      <>
                        {/* First row: Amount & Expiry */}
                        <Box sx={{ display: "flex", gap: 3 }}>
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            Amount: ₹{client.amount}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "success.main" }}>
                            Received: ₹{client.receivedAmount}
                          </Typography>
                          
                        </Box>
                        {/* Second row: Received & Pending */}
                        <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                          
                          <Typography variant="body2" sx={{ color: "warning.main" }}>
                            Pending: ₹{client.pendingAmount}
                          </Typography>
                          <Typography variant="body2" sx={{ color: expiryColor }}>
                            Expiry: {client.planEnd ? client.planEnd.slice(0, 10) : "N/A"}
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      // Desktop: all in one row
                      <>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          Amount: ₹{client.amount}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "success.main" }}>
                          Received: ₹{client.receivedAmount}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "warning.main" }}>
                          Pending: ₹{client.pendingAmount}
                        </Typography>
                        <Typography variant="body2" sx={{ color: expiryColor }}>
                          Expiry: {client.planEnd ? client.planEnd.slice(0, 10) : "N/A"}
                        </Typography>
                      </>
                    )}
                  </Box>
                
                </Box>
              </Box>
              <Button
                variant="contained"
                color={client.paymentState === "Paid" ? "success" : "warning"}
                sx={{
                  minWidth: isMobile ? 80 : 120,
                  fontWeight: 700,
                  fontSize: isMobile ? 12 : 16,
                  px: isMobile ? 1 : 4,
                  py: isMobile ? 0.5 : 1.5,
                  borderRadius: 3,
                  boxShadow: 3,
                  background: client.paymentState === "Paid"
                    ? "linear-gradient(90deg,#43ea7b 0%,#1de9b6 100%)"
                    : "linear-gradient(90deg,#ffd600 0%,#fff176 100%)",
                  color: "#fff",
                  transition: "all 0.2s",
                  "&:hover": {
                    background: client.paymentState === "Paid"
                      ? "linear-gradient(90deg,#00bfa5 0%,#43ea7b 100%)"
                      : "linear-gradient(90deg,#fff176 0%,#ffd600 100%)",
                    boxShadow: 6,
                    transform: "scale(1.05)"
                  }
                }}
              >
                {client.paymentState}
              </Button>
            </Paper>
          );
        })}
      </Stack>

      {/* Payment Details Dialog */}
      <Dialog
        open={!!selected}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth={isMobile ? "xs" : "sm"}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: isMobile ? 1 : 3,
            background: "linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)"
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
          <PaymentIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Payment Details
          <Button
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: { xs: 8, sm: 16, md: 24 },
              top: { xs: 8, sm: 16, md: 30 },
              color: "#fff",
              minWidth: 0,
              p: 0.5,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#115293" }
            }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 100 }}>
                Name:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PaymentIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 100 }}>
                Studio Name:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.studio}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PlaceIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 100 }}>
                Place:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.place}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIphoneIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 100 }}>
                Mobile:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {selected?.mobile}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CurrencyRupeeIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 100 }}>
                Amount:
              </Typography>
              <TextField
                name="amount"
                size="small"
                value={form.amount}
                onChange={handleChange}
                sx={{ ml: 1, width: isMobile ? 120 : 200 }}
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CurrencyRupeeIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 100 }}>
                Amount Received:
              </Typography>
              <TextField
                name="receivedAmount"
                size="small"
                value={form.receivedAmount}
                onChange={handleChange}
                sx={{ ml: 1, width: isMobile ? 120 : 200 }}
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CurrencyRupeeIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 100 }}>
                Amount Pending:
              </Typography>
              <TextField
                name="pendingAmount"
                size="small"
                value={form.pendingAmount}
                onChange={handleChange}
                sx={{ ml: 1, width: isMobile ? 120 : 200 }}
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarMonthIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 100 }}>
                Plan Start:
              </Typography>
              <TextField
                type="date"
                name="planStart"
                size="small"
                value={form.planStart}
                onChange={handleChange}
                sx={{ ml: 1, width: isMobile ? 120 : 200 }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarMonthIcon color="primary" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: 100 }}>
                Plan End:
              </Typography>
              <TextField
                type="date"
                name="planEnd"
                size="small"
                value={form.planEnd}
                onChange={handleChange}
                sx={{ ml: 1, width: isMobile ? 120 : 200 }}
                InputLabelProps={{ shrink: true }}
              />
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
          >
            Close
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="success"
            sx={{
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
              boxShadow: 2,
              bgcolor: "linear-gradient(90deg,#43ea7b 0%,#1de9b6 100%)",
              color: "#fff",
              "&:hover": { bgcolor: "#00bfa5" }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PaymentPage;