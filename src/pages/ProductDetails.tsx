import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid, Typography, Card, CardContent, CardHeader, CircularProgress,
  Alert, Button, Box, LinearProgress, Container
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

import axios from 'axios';
import Navbar from './Navbar';
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
  padding: theme.spacing(3),
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

  const progress = (units / product.TotalUnits) * 100;

  return (
    <StyledCard>
      <StyledCardHeader
        title={`Buyer: ${product.BuyerName}`}
        subheader={`Seller: ${product.SellerName}`}
      />
      <StyledCardContent>
        <Typography variant="body1">Unit Price: ₹{product.UnitPrice}</Typography>
        <Typography variant="body1">Tenure: {product.Tenure} Days</Typography>
        <Typography variant="body1">Xirr: {product.Xirr}%</Typography>
        <Typography variant="body1">Total Units Left: {product.TotalUnits - units} / {product.TotalUnits}</Typography>

        <LinearProgress variant="determinate" value={progress} sx = {{height: 10, borderRadius: 30, m:2} } />

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

const ProductDetails = () => {
  const params = useParams<{ productid: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/product/${params.productid}`, { withCredentials: true });
        if (response.data && response.data.data) {
          setProduct(response.data.data);
        } else {
          throw new Error('Product data not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.productid]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return product ? (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <ProductCard product={product} />
      </Box>
    </Container>
  ) : (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <Typography variant="h6">Product not found</Typography>
      </Box>
    </Container>
  );
};

const App: React.FC = () => (
  <>
    <Navbar />

    <ThemeProvider theme={theme}>
      <ProductDetails />
    </ThemeProvider>
  </>
);

export default withAuth(App);
