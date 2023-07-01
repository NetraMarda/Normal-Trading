import * as React from "react";
import {
  Box,
  Grid,
  Button,
  TextField,
  Avatar,
  Typography,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import Image from "../../../asset/login2.jpg";
import { getAllUsersData } from "../../api/users/users";
import { useState } from "react";
import CompanySelection from "../companySelection/companySelectionRecord";
import { useIds } from "../IdsContext/IdsContext";

export default function LoginIn() {
  const { ids, setIds } = useIds();

  const [data, setData] = useState({
    userId: "",
    password: "",
    id: null,
  });
  const [redirectToCompanySelection, setRedirectToCompanySelection] =
    useState(false);

  const handleChange = (e) => {
    setData((usersData) => ({
      ...usersData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getAllUsersData();
      console.log(response.data);

      const info = {
        userId: data.userId,
        password: data.password,
        id: data.id,
      };
      console.log(info);

      const matchedUser = response.data.find(
        (user) =>
          user.userId === info.userId && user.userPassword === info.password
      );

      if (matchedUser) {
        // console.log(
        //   matchedUser.userId,
        //   matchedUser.userPassword,
        //   matchedUser.id,
        //   info.userId,
        //   info.password
        // );
        const userId = matchedUser.id;
        setIds((prev) => ({ ...prev, userId }));
        setRedirectToCompanySelection(true);

        window.location.href = "/companySelection";
      } else {
        alert("Invalid UserName or Password");
      }
      console.log("outside");
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <>
      {redirectToCompanySelection ? (
        <CompanySelection />
      ) : (
        <Card
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "whitesmoke",
              width: "fit-content",
              borderRadius: 5,
              boxShadow: 5,
              pt: 4,
              pb: 4,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>

            <Typography variant="h5">Login</Typography>

            <Box sx={{ mt: 1, width: "70%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="User Id"
                name="userId"
                value={data.userId}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={data.password}
                label="Password"
                type="password"
                onChange={handleChange}
                //id="password"
                //autoComplete="current-password"
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                onClick={handleSubmit}
              >
                {/* <Link
                  to="/companySelection"
                  style={{ color: "white", textDecoration: "none" }}
                > */}
                  Submit
                {/* </Link> */}
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </>
  );
}
