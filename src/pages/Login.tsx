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


const Login = () => {
  const [emailId, setEmail] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const navigate = useNavigate();
 
 
  const handleLogin = async () => {
    const user = {
      emailId,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/signin", user, {withCredentials: true});
   
      if (response.status === 200) {
        console.log(response)
        setIsOtpModalOpen(true);
        // navigate("/");
      } else {
        toast.error("Login failed: " + (response.data.message || "Unknown error"));
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
      const response = await axios.post("http://localhost:8000/api/v1/users/verify-otp", otpPayload, {withCredentials: true});
      console.log(response)
      if (response.status === 200) {
        toast.success("OTP verification successful!");
        setIsOtpModalOpen(false);
        toast.success("Login successful!");
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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailId"
                  label="Email Address"
                  name="emailId"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </Grid>

            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
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

export default Login;
