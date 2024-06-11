"use client";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

function Otp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    otp: "",
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

    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.status === 200) {
      router.push("/opt-verification");
      alert("Login successful");
    } else {
      alert("otp is invalid");
    }
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            OTP verefication
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="enter your OTP"
              name="otp"
              type="number"
              id="otp"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formData.otp}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              submit
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default Otp;
