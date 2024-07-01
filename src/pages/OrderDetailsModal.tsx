import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import withAuth from './AuthChecker';


interface Product {
  _id: string;
  BuyerName: string;
  SellerName: string;
  UnitPrice: number;
  TotalUnits: number;
  Tenure: number;
  DiscountRate: number;
  Xirr: number;
  ID: string;
}

interface OrderDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  units: number;
}

const OrderDetailsPopup: React.FC<OrderDetailsPopupProps> = ({ open, onClose, product, units }) => {
  const navigate = useNavigate();
  if (!product) return null;


const handleConfirmOrder = async () => {
    try {
      const requestData = {
        ProductId: product.ID,
        NoOfUnits: units,
      };
      // console.log(product)
      console.log('Request Data:', requestData);
      const response = await axios.post(
        'http://localhost:8000/api/v1/order', requestData, { withCredentials: true }
      );
      console.log(response.data.data.UserId)
      
      navigate(`/portfolio/${response.data.data.UserId}`)

    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here are the details of your order:
          <ul>
            <li>Item: {product.BuyerName}</li>
            <li>Price: ₹{product.UnitPrice}</li>
            <li>Quantity: {units}</li>
            <li>Total: ₹{(product.UnitPrice * units).toFixed(2)}</li>
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleConfirmOrder} sx={{ textDecoration: 'none', '&:hover': { cursor: 'pointer', color: 'blue', backgroundColor: 'white' }, backgroundColor: '#c0e5f2', m:3 }}>Confirm Order</Button>
      </DialogActions>
    </Dialog>
  );
};

export default withAuth(OrderDetailsPopup);
