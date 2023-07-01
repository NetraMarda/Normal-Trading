import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getAllUsersData } from "../../api/users/users";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getAllUsersData();
    console.log(response.data);

    const matchedUser = response.data.find(
      (user) => user.emailAddress === email
    );

    if (matchedUser) {
      console.log("redirect Button");
    } else {
      alert("Invalid Email Address");
    }

    //console.log("Forgot Password:", email);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="h6" gutterBottom>
        Enter your email address to reset your password.
      </Typography>

      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={handleChange}
        required
        sx={{ mt: 2, width: "300px" }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Reset Password
      </Button>
    </Box>
  );
};

export default ForgotPassword;
