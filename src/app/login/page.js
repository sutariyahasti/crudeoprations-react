"use client";
import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:4000/login/", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const receivedToken = response.token;
      localStorage.setItem("token", receivedToken);

      if (response.status === 200) {
        router.push("/page");
        console.log("Login successful");
      } else {
        alert("Login failed. Please check your credentials.");
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            id="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            name="password"
            id="Password"
            fullWidth
            margin="normal"
            type="password"
            variant="outlined"
            required
            value={formData.password}
            onChange={handleInputChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            login
          </Button>
          <div style={{ marginTop: 10 }}>
            create new?{" "}
            <Link style={{ color: "blue" }} href="/">
              Signup
            </Link>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
