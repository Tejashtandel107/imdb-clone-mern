import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieIcon from '@mui/icons-material/Movie';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <MovieIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movie App
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {user?.name}
          </Typography>
          
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/home')}
          >
            Home
          </Button>
          
          <Button
            color="inherit"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/search')}
          >
            Search
          </Button>
          
          {isAdmin && (
            <Button
              color="inherit"
              startIcon={<AdminPanelSettingsIcon />}
              onClick={() => navigate('/admin')}
            >
              Admin
            </Button>
          )}
          
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
