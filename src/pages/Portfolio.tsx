import React, { useEffect, useState } from 'react';
import axios from 'axios';
import withAuth from './AuthChecker';

import { 
    Container, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    CircularProgress, 
    Typography, 
    Box 
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

interface Product {
    ID: string,
    BuyerName: string,
    SellerName: string,
    UnitPrice: number,
    TotalUnits: number,
}

interface Order {
    _id: string,
    ProductId: string,
    UserId: string,
    NoOfUnits: number,
    Product: Product,
    TotalPrice: number,
}

const Portfolio = () => {
    const params = useParams<{ userid: string }>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/orders/${params.userid}`, { withCredentials: true });
                setOrders(response.data.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [params.userid]);

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <>
        <Navbar/>
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Portfolio
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Number of Units</TableCell>
                                <TableCell align="center">Total Price</TableCell>
                                <TableCell align="center">Buyer Name</TableCell>
                                <TableCell align="center">Seller Name</TableCell>
                                <TableCell align="center">Unit Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell align="center">{order.NoOfUnits}</TableCell>
                                    <TableCell align="center">{order.TotalPrice}</TableCell>
                                    <TableCell align="center">{order.Product.BuyerName}</TableCell>
                                    <TableCell align="center">{order.Product.SellerName}</TableCell>
                                    <TableCell align="center">{order.Product.UnitPrice}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
        </>
    );
};

export default withAuth(Portfolio);
