"use client";
import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EditBox = () => {
  const router = useRouter();
  const { id } = useParams();
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log(editedData);

  const userdtl = async () => {
    const response = await fetch("http://localhost:4000/" + id, {
      method: "GET",
    });
    const data1 = await response.json();
    setEditedData({
      ...editedData,
      name: data1[0].name,
      email: data1[0].email,
      password: data1[0].password,
      phone: data1[0].phone,
      address: data1[0].address,
    });
  };

  useEffect(() => {
    userdtl();
  }, []);

  //crud -put update data
  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:4000/" + id, {
        method: "PUT",
        body: JSON.stringify(editedData),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/page");
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    handleUpdate();

    router.push("/page");
  };

  return (
    <div className="bg-blue">
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Edit
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              type="name"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={editedData.name}
              onChange={handleEditInputChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={editedData.email}
              onChange={handleEditInputChange}
            />
            <TextField
              label="Password"
              name="password"
              fullWidth
              margin="normal"
              type="password"
              variant="outlined"
              required
              value={editedData.password}
              onChange={handleEditInputChange}
            />
            <TextField
              label="phone"
              name="phone"
              type="phone"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={editedData.phone}
              onChange={handleEditInputChange}
            />
            <TextField
              label="address"
              name="address"
              type="address"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={editedData.address}
              onChange={handleEditInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              save
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default EditBox;
