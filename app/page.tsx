"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, CardActions, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: "#1976D2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Humanitarian Hub
          </Typography>
          <Button color="inherit" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => router.push("/signup")}>
            Signup
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Empowering Change, One Project at a Time
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Connect with donors, volunteers, and resources to drive impactful humanitarian efforts.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }} onClick={() => router.push("/dashboard")}>
            Get Started
          </Button>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Container sx={{ mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {["Funding", "Volunteers", "Resources"].map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card sx={{ p: 3, boxShadow: 3, width: 300 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                    {item}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Engage in {item.toLowerCase()} to support humanitarian projects.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" onClick={() => router.push("/signup")}>
                    Join Now
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* Call to Action */}
      <Box sx={{ mt: 10, py: 6, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Join Our Mission
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ maxWidth: "600px", margin: "auto" }}>
          Create an account today and start making a difference. Every contribution, big or small, creates a lasting impact.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }} onClick={() => router.push("/signup")}>
          Sign Up
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#1976D2", color: "white", py: 4, textAlign: "center" }}>
        <Typography variant="body2">&copy; {new Date().getFullYear()} Humanitarian Hub. All Rights Reserved.</Typography>
      </Box>
    </>
  );
}
