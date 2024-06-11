import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function OptVerification({ formData, closeDialog, isDialogOpen }) {
  const router = useRouter();

  const [formotpData, setFormotpData] = useState({});

  useEffect(() => {
    setFormotpData(formData);
  }, [formData]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormotpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleotpSubmit = async (event) => {
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify(formotpData),
      headers: {
        "content-type": "application/json",
      },
    });
    setFormotpData(formData);

    if (response.status === 201) {
      router.push("/page");
      alert("Login successful");
    } else {
      alert("email is alredy exist");
    }
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle variant="h4" align="center" gutterBottom>
          OTP verification
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="enter your otp"
              name="otp"
              type="text"
              id="otp"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formotpData.otp}
              onChange={handleInputChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={() => {
              handleotpSubmit();
            }}
          >
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OptVerification;
