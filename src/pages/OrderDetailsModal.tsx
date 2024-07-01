import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Product {
  _id: string;
  BuyerName: string;
  SellerName: string;
  UnitPrice: number;
  TotalUnits: number;
  Tenure: number;
  DiscountRate: number;
  Xirr: number;
}

interface OrderDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  units: number;
}

const OrderDetailsPopup: React.FC<OrderDetailsPopupProps> = ({ open, onClose, product, units }) => {
  if (!product) return null;

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
        <Button>Confirm Order</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsPopup;
