import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Slide,

} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  "Home",
  "Users",
  "Album",
  "Frame",
  "Price",
  "Contact",
  "About"
];

// Custom hook for scroll direction
function useScrollDirection() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      if (window.scrollY < lastScrollY || window.scrollY < 10) {
        setShow(true); // Scrolling up or near top
      } else {
        setShow(false); // Scrolling down
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return show;
}

const studioImages = [
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9", // <-- replaced with a valid Unsplash image
  "https://images.unsplash.com/photo-1465101178521-c1a4c8a0a8b7",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c"
];


// Dummy images for services (replace with your own URLs if needed)
const serviceImages = [
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308", // Portrait
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Wedding
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca", // Puberty
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429", // Birthday
  "https://images.unsplash.com/photo-1517841905240-472988babdf9", // Pre Wedding
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c", // Post Wedding
"https://images.unsplash.com/photo-1517841905240-472988babdf9",  // Outdoor
   "https://images.unsplash.com/photo-1506744038136-46273834b3fb",  // Meeting (changed)
];


const serviceData = [
  {
    title: "Baby Shoot",
    img: serviceImages[0],
    desc: "Professional portrait photography for individuals, families, and groups. Capture your best moments with stunning clarity and style.",
    details: `Baby Shoot
3 hours + coverage
High res, edited photos
12X8 Frame​

Price: Starting at 5000`
  },
  {
    title: "Wedding",
    img: serviceImages[1],
    desc: "Beautiful wedding event photography to cherish your special day forever. We cover candid, traditional, and creative wedding shoots.",
    details: `WEDDINGS
1 Main Photography
1 Main Videography
1 Creative Photographer
1 Cinematic Videographer
1 Premium Album 12X36
1 wedding Highlights video
2 Wall Frames
Outdoor Photography included
other small gifts included
Price: 120000/-`
  },
  {
    title: "Puberty",
    img: serviceImages[2],
    desc: "Celebrate coming-of-age moments with elegant puberty event photography. We make your memories last a lifetime.",
    details: `Puberty Event
Main Photography
Creative Photographer
Premium Album
Wall Frame
Price: 25000/-`
  },
  {
    title: "Birthday",
    img: serviceImages[3],
    desc: "Fun and vibrant birthday photography for all ages. Capture the joy and excitement of your celebration.",
    details: `Birthday
2 hours coverage
High res, edited photos
Wall Frame
Price: Starting at 8000`
  },
  {
    title: "Pre Wedding",
    img: serviceImages[4],
    desc: "Romantic pre-wedding shoots at beautiful locations. Tell your love story with creative photography.",
    details: `Pre Wedding
Outdoor Photography
Creative Photographer
Premium Album
Price: 30000/-`
  },
  {
    title: "Post Wedding",
    img: serviceImages[5],
    desc: "Relive your wedding memories with post-wedding photography. Perfect for anniversaries and special occasions.",
    details: `Post Wedding
Main Photography
Premium Album
Wall Frame
Price: 20000/-`
  },
  {
    title: "Outdoor",
    img: serviceImages[6],
    desc: "Stunning outdoor photography sessions in natural light and beautiful locations. Perfect for couples, families, and solo shoots.",
    details: `Outdoor Photography
2 hours coverage
Creative Photographer
All edited photos
Price: Starting at 7000`
  },
  {
    title: "Meeting",
    img: serviceImages[7],
    desc: "Professional coverage for meetings, conferences, and corporate events. Capture every important moment and interaction.",
    details: `Meeting Coverage
Full event coverage
Group and candid shots
All edited photos
Price: Starting at 10000`
  }
];

const AdminHome = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const showAppBar = useScrollDirection();
  const studioName = localStorage.getItem("studioName") || "LC Studio";
  const navigate = useNavigate();
  const location = useLocation();
  const isIndex = location.pathname === "/admin-home";

  // Image slider state
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % studioImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [flipped, setFlipped] = useState(Array(serviceData.length).fill(false));

  const handleFlip = (idx) => {
    setFlipped((prev) => prev.map((f, i) => (i === idx ? !f : f)));
  };

  return (
    <>
      <Slide appear={false} direction="down" in={showAppBar}>
        <AppBar position="fixed" sx={{ bgcolor: "#fff", boxShadow: isMobile ?1.2:3,height: isMobile ? 56 : 80 }}>
          <Toolbar sx={{ minHeight: isMobile ? 56 : 80, px: isMobile ? 1 : 3 }}>
            {/* Desktop: Studio name left, menu center */}
            {!isMobile ? (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Grand Hotel', cursive",
                    fontWeight: 700,
                    color: "black",
                    letterSpacing: 2,
                    mr: 2 // reduced margin
                  }}
                >
                  {studioName}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Grid container spacing={1} justifyContent="center">
                    {/* First row: Home, Users, Album, Frame */}
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        {menuItems.slice(0, 4).map((item) => (
                          <Typography
                            key={item}
                            variant="subtitle1"
                            sx={{
                              color: "black",
                              fontWeight: 600,
                              fontSize: 20,
                              cursor: "pointer",
                              px: 1,
                              py: 0.5,
                              borderRadius: 2,
                              "&:hover": { bgcolor: "rgba(0,0,0,0.08)" }
                            }}
                            onClick={() => {
                              if (item === "Users") navigate("/admin-home/users");
                              else if (item === "Home") navigate("/admin-home");
                              // Add more navigation if needed
                            }}
                          >
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>
                    {/* Second row: Price, Contact, About */}
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        {menuItems.slice(4).map((item) => (
                          <Typography
                            key={item}
                            variant="subtitle1"
                            sx={{
                              color: "black",
                              fontWeight: 600,
                              fontSize: 20, // increased font size
                              cursor: "pointer",
                              px: 1,
                              py: 0.5,
                              borderRadius: 2,
                              "&:hover": { bgcolor: "rgba(0,0,0,0.08)" }
                            }}
                          >
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              // Mobile: Studio name center, menu icon right
              <>
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                      fontFamily: "'Grand Hotel', cursive",
                      fontWeight: 700,
                      color: "black",
                      letterSpacing: 2,
                      mr: !isMobile ? 2 : 0 // reduced margin
                    }}
                  >
                    {studioName}
                  </Typography>
                </Box>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ ml: "auto" }}
                >
                  <MenuIcon sx={{ color: "black" }} />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                >
                  <Box sx={{ width: 220, pt: 2 }}>
                    <List>
                      {menuItems.map((item) => (
                        <ListItem
                          button
                          key={item}
                          onClick={() => {
                            setDrawerOpen(false);
                            if (item === "Users") navigate("/admin-home/users");
                            // Add more navigation if needed for other items
                          }}
                        >
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              fontWeight: 600,
                              fontSize: 20,
                              color: "black"
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
      {/* Page content */}
      {isIndex ? (
  <Box sx={{ p: 2, pt: isMobile ? 10 : 15 }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
      {/* Only one studio image visible at a time with fade effect */}
      <Box
        sx={{
          width: isMobile ? 340 : 1040,
          height: isMobile ? 220 : 540,
          overflow: "hidden",
          borderRadius: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          mb: 2,
          position: "relative",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          src={studioImages[currentImg]}
          alt={`studio-${currentImg}`}
          style={{
            width: isMobile ? 340 : 1040,
            height: isMobile ? 220 : 540,
            objectFit: "cover",
            borderRadius: 12,
            transition: "opacity 0.5s"
          }}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          maxWidth: 1000,
          textAlign: "center",
          color: "black",
          fontWeight: 500,
          fontSize: isMobile ? 18 : 24,
          lineHeight: 1.6
        }}
      >
        We are a Honolulu based photo studio serving the local community and beyond. From fashion to family portraits we are your one stop shop for all photo needs, and also act as a rental studio and an event gallery space.
      </Typography>
    </Box>
    {/* Services section */}
    <Box sx={{ mt: 6, mb: 2 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: 4,
          color: "black",
          letterSpacing: 2
        }}
      >
        Services
      </Typography>
      <Grid container spacing={6} columns={12} justifyContent="center">
        {serviceData.map((service, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={service.title}
            sx={{
              display: "flex",
              justifyContent: "center",
              
            }}
          >
            <Box
              sx={{
                perspective: "1200px",
                width: isMobile ? 320 : 340,
                height: isMobile ? 370 : 400,
                bgcolor: "transparent",
                mb: isMobile ? 4 : 0,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transition: "transform 0.6s",
                  transformStyle: "preserve-3d",
                  transform: flipped[idx] ? "rotateY(180deg)" : "none"
                }}
              >
                {/* Front Side */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    bgcolor: "#fff",
                    borderRadius: 4,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    style={{
                      width: isMobile ? 280 : 300,
                      height: isMobile ? 180 : 200,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 16
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1976d2",
                      mb: 1,
                      textAlign: "center"
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "black",
                      textAlign: "center",
                      mb: 2
                    }}
                  >
                    {service.desc}
                  </Typography>
                  <Box sx={{ textAlign: "center" }}>
                    <button
                      style={{
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "8px 20px",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: 16,
                        boxShadow: "0 2px 8px rgba(25,118,210,0.08)"
                      }}
                      onClick={() => handleFlip(idx)}
                    >
                      More Info
                    </button>
                  </Box>
                </Box>
                {/* Back Side */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    bgcolor: "#fff",
                    borderRadius: 4,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1976d2",
                      mb: 2,
                      textAlign: "center"
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "black",
                      textAlign: "center",
                      whiteSpace: "pre-line",
                      mb: 2
                    }}
                  >
                    {service.details}
                  </Typography>
                  <Box sx={{ textAlign: "center" }}>
                    <button
                      style={{
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "8px 20px",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: 16,
                        boxShadow: "0 2px 8px rgba(25,118,210,0.08)"
                      }}
                      onClick={() => handleFlip(idx)}
                    >
                      Back
                    </button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
) : (
  <Box sx={{ pt: isMobile ? 8 : 10 }}>
    <Outlet />
  </Box>
)}
      {/* Footer Section */}
      <Box
        sx={{
          bgcolor: "#a67c52", // mild brown
          color: "#fff",
          fontFamily: "'Times New Roman', Times, serif",
          mt: 8,
          pt: 4,
          pb: 2
        }}
      >
        <Grid container spacing={2} sx={{ maxWidth: 1200, mx: "auto" }}>
          {/* Left Column */}
          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, mb: { xs: 2, md: 0 } }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              STUDIO ART
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Wedding Film Makers
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              @studioartmdu
            </Typography>
          </Grid>
          {/* Center Column */}
          <Grid item xs={12} md={12} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body1" sx={{ textAlign: "center", fontSize: 18, mb: 2 }}>
              Studio Art is a wedding Photography and videography based in Tirunelveli whose style is candid and inspiring, with a touch of cinematic flair. Experienced in intimate weddings, destination weddings, and elopements, Studio Art is available for world travel wherever love may take them. Studio art Being Best Tirunelveli Photo studio. Best wedding photography in Tirunelveli.
            </Typography>
          </Grid>
          {/* Social Row */}
          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-end" }, justifyContent: "center" }}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              {/* WhatsApp */}
              <a href="https://wa.me/919123456789" target="_blank" rel="noopener noreferrer">
                <Box sx={{ bgcolor: "#25D366", borderRadius: "50%", p: 1 }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: 28, height: 28 }} />
                </Box>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                <Box sx={{ bgcolor: "#fff", borderRadius: "50%", p: 1 }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={{ width: 28, height: 28 }} />
                </Box>
              </a>
              {/* Gmail */}
              <a href="mailto:studioartmdu@gmail.com" target="_blank" rel="noopener noreferrer">
                <Box sx={{ bgcolor: "#fff", borderRadius: "50%", p: 1 }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Gmail" style={{ width: 28, height: 28 }} />
                </Box>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
                <Box sx={{ bgcolor: "#fff", borderRadius: "50%", p: 1 }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" style={{ width: 28, height: 28 }} />
                </Box>
              </a>
            </Box>
          </Grid>
          {/* Footer Bottom Row */}
          <Grid item xs={12} sx={{ borderTop: "1px solid #fff2", mt: 2,ml:20, pt: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              © 2023 by Studio Art
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              Made with Mediawave IT Solutions
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminHome;
