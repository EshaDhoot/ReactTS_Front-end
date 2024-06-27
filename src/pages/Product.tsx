import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardContent, CardHeader, CircularProgress, Alert, Button, Box, LinearProgress, Container } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Navbar from './Navbar';

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

const theme = createTheme({
  typography: {
    fontFamily: 'monospace',
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  },
  borderRadius: 15,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: '#80e3dd',
  textAlign: 'center',
  color: '#2c0ddb',
  '& .MuiCardHeader-subheader': {
    color: '#005ae1',
  },
  padding: theme.spacing(2),
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
}));

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/products', { withCredentials: true });
      console.log(response.data.data);
      if (response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        setError('No products found');
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Grid>
    );
  }

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <StyledCard>
      <StyledCardHeader
        title={`Buyer: ${product.BuyerName}`}
        subheader={`Seller: ${product.SellerName}`}
      />
      <StyledCardContent>
        <Button component={Link} to={`/productdetails/${product._id}`} sx={{ textDecoration: 'none','&:hover': { cursor: 'pointer', color: 'blue', backgroundColor:'white'},backgroundColor: '#c0e5f2' }}>
          Buy Now
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};

const App: React.FC = () => (
  <>
    <Navbar />

    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'row' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Products />
        </Box>
      </Box>
    </ThemeProvider>
  </>
);

export default App;
