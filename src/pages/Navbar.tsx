import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{ m: 0, p: 2 }}>
        <Toolbar>
          <Grid container alignItems="center" spacing={10}>
            {/* <Grid item>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Grid> */}
            <Grid item>
              <Typography variant="h6" component={Link} to="/"
                sx={{
                  color: 'grey', '&:hover': { cursor: 'pointer', color: 'blue' },
                  flexGrow: 1,
                  textDecoration: 'none'
                }}>
                Explore
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component={Link} to="/products"
                sx={{
                  color: 'grey', '&:hover': { cursor: 'pointer', color: 'blue' },
                  flexGrow: 1,
                  textDecoration: 'none'
                }}>
                ID
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6"
                sx={{
                  color: 'grey', '&:hover': { cursor: 'pointer', color: 'blue' },
                  flexGrow: 1
                }}>
                Wealth
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component={Link} to = "/protected"
                sx={{
                  color: 'grey', '&:hover': { cursor: 'pointer', color: 'blue' },
                  flexGrow: 1,
                  textDecoration: 'none'
                }}>
                Portfolio
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Button color="inherit" component={Link} to="/login">SIGN IN</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
