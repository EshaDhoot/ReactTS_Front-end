import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OtpVerificationModal from "./Otpmodal"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const user = {
      firstname,
      lastname,
      emailId,
      phonenumber,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/signup", user);

      if (response.status === 201 || response.status === 200) {
        setIsOtpModalOpen(true);
      } else {
        toast.error("Registration failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error("Error: " + (error.response.data.message || "Unknown error from server"));
        } else if (error.request) {
          toast.error("Error: No response from server. Please try again later.");
        } else {
          toast.error("Error: " + error.message);
        }
      }
    }
  };

  const handleOtpVerify = async (otp: string) => {
    const otpPayload = {
      emailId,
      otp,
    };
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/verify-otp", otpPayload);
      console.log(response)
      if (response.status === 200) {
        toast.success("OTP verification successful!");
        setIsOtpModalOpen(false);
        toast.success("Registration and LogIn Successful!");
        navigate("/");
      } else {
        toast.error("OTP verification failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error("Error: " + (error.response.data.message || "Unknown error from server"));
        } else if (error.request) {
          toast.error("Error: No response from server. Please try again later.");
        } else {
          toast.error("Error: " + error.message);
        }
      }
    }
  };

  return (
    <>

      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastname"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailId"
                  label="Email Address"
                  name="emailId"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phonenumber"
                  label="Phone Number"
                  id="phonenumber"
                  value={phonenumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <OtpVerificationModal
        open={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerify={handleOtpVerify}
      />
      <ToastContainer />
    </>
  );
};

export default Register;
