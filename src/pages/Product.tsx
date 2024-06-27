import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardContent, CardHeader, CircularProgress, Alert, Button, Box } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import withAuth from './AuthChecker';

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

const IncrementDecrementBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  
}));

const IncrementDecrementButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  backgroundColor: '#61c5e9',
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
    <Grid container spacing={3} sx={{ m: 2, p: 2 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.ID}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [units, setUnits] = useState(0);

  const incrementUnits = () => {
    if (units < product.TotalUnits) {
      setUnits(units + 1);
    }
  };

  const decrementUnits = () => {
    if (units > 0) {
      setUnits(units - 1);
    }
  };

  return (
    <StyledCard>
      <StyledCardHeader
        title={`Buyer: ${product.BuyerName}`}
        subheader={`Seller: ${product.SellerName}`}
      />
      <StyledCardContent>
        <Typography variant="body1">Unit Price: Rs.{product.UnitPrice}</Typography>
        <Typography variant="body1">Total Units: {product.TotalUnits}</Typography>
        <Typography variant="body1">Tenure: {product.Tenure} Days</Typography>
        <Typography variant="body1">Xirr: {product.Xirr}%</Typography>
        <IncrementDecrementBox>
          <IncrementDecrementButton variant="contained" color="primary" onClick={decrementUnits} disabled={units === 0}>
            -
          </IncrementDecrementButton>
          <Typography variant="body1" display="inline" mx={2}>
            {units}
          </Typography>
          <IncrementDecrementButton variant="contained" color="primary" onClick={incrementUnits} disabled={units >= product.TotalUnits}>
            +
          </IncrementDecrementButton>
        </IncrementDecrementBox>
      </StyledCardContent>
    </StyledCard>
  );
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Products />
  </ThemeProvider>
);

export default withAuth(App);
