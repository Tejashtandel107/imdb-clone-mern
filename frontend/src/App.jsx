import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import Admin from './pages/Admin';
import MovieForm from './pages/MovieForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const RootRedirect = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/home" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<RootRedirect />} />
            <Route path="/register" element={<Register />} />

            {/* Protected user routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/add-movie"
              element={
                <AdminRoute>
                  <MovieForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/edit-movie/:id"
              element={
                <AdminRoute>
                  <MovieForm />
                </AdminRoute>
              }
            />

            {/* Catch all - redirect to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
