import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface OtpVerificationModalProps {
  open: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({ open, onClose, onVerify }) => {
  const [otp, setOtp] = useState("");
  const handleVerify = () => {
    onVerify(otp);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Enter OTP
        </Typography>
        <TextField
          fullWidth
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button fullWidth variant="contained" color="primary" onClick={handleVerify}>
          Verify
        </Button>
      </Box>
    </Modal>
  );
};

export default OtpVerificationModal;
