"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import OptVerification from "../componanat/opt-verification";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [addSection, setAddSection] = useState(false);
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const [showbutton, setShowbutton] = useState(true);
  const [formData, setFormData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const openDialog = () => {
  //   setIsDialogOpen(true);
  // };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //===========================================post
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/send-otp", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });

    console.log("Form data=====", formData);
    console.log("response data=====", response);

    if (response.status === 200) {
      setIsDialogOpen(true);
    } else {
      alert("email is alredy exist");
    }
  };

  return (
    <div className="bg-blue1">
      {/* <div className="bg-blue1"></div> */}
      <Container maxWidth="sm" sx={{ padding: 3, marginTop: 10 }}>
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              type="text"
              id="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
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
            <TextField
              label="phone"
              name="phone"
              type="number"
              id="phone"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
            <TextField
              label="address"
              name="address"
              type="text"
              id="address"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formData.address}
              onChange={handleInputChange}
            />
            {/* {showbutton && ( */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              // onClick={() => openDialog()}
            >
              Sign Up
            </Button>
            {/* )} */}
            {/* // <p>{JSON.stringify(formData)}</p> */}
          </form>
          {/* {showAdditionalField && (
          <form onSubmit={handleotpSubmit}>
            <TextField
              label="enter your otp"
              name="otp"
              type="text"
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
              onClick={handleotpSubmit}
            >
              Sign Up
            </Button>
          </form>
        )} */}
          <OptVerification
            formData={formData}
            closeDialog={closeDialog}
            isDialogOpen={isDialogOpen}
          />
          <div>
            alredy have account?{" "}
            <Link style={{ color: "blue" }} href="/login">
              Login
            </Link>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
