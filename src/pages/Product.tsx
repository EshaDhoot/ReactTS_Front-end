import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import { useAuth } from './AuthContext';

interface Product {
  id: number;
  name: string;
  price: number;
}

const Products: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (isLoggedIn) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [isLoggedIn]);

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
