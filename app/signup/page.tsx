'use client';

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        height: "100vh",
      }}
    >
      {/* Form Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Typography variant="h4" mb={2} fontWeight="bold">
          Create an Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400 }}>
          <TextField fullWidth label="Name" name="name" onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} margin="normal" required />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <img src="/signup-image.png" alt="Signup" style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
      </Box>
    </Box>
  );
}
