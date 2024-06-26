import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

interface Product {
  ID: string;
  BuyerName: string;
  SellerName: string;
  UnitPrice: number;
  TotalUnits: number;
  Tenure: number;
  DiscountRate: number;
  Xirr: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/products');
      console.log(response.data.data)
      if (response.data.data) {
        setProducts(response.data.data);
      } else {
        setError('No products found');
      }
    } catch (error) {
      setError('Error fetching products');
      
    } finally {
      setLoading(false);
     
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  return (
    <Grid container spacing={10} sx={{ m: 2, p: 2 }}>
      {products.map((product) => (
        <Grid item  xs={12} sm={6} md={4}>
          <Typography variant="body1">BuyerName: {product.BuyerName}</Typography>
          <Typography variant="body1">SellerName: {product.SellerName}</Typography>
          <Typography variant="body1">UnitPrice: Rs.{product.UnitPrice}</Typography>
          <Typography variant="body1">TotalUnits: {product.TotalUnits}</Typography>
          <Typography variant="body1">Tenure: {product.Tenure} Days</Typography>
          <Typography variant="body1">Xirr: {product.Xirr}%</Typography>
        </Grid>
      ))}
    </Grid>
   
  );
};

export default Products;
