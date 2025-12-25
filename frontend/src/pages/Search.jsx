import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { moviesAPI } from '../services/api';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        searchMovies();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, page]);

  const searchMovies = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    setSearched(true);
    
    try {
      const response = await moviesAPI.searchMovies(searchQuery, {
        page,
        limit: 12,
      });
      setMovies(response.data.movies);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Movies
        </Typography>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search by title, description, director, or genre..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : !searched ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              Enter a search query to find movies
            </Typography>
          </Box>
        ) : movies.length === 0 ? (
          <Alert severity="info">No movies found matching your search</Alert>
        ) : (
          <>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Found {movies.length} result{movies.length !== 1 ? 's' : ''}
            </Typography>

            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Container>
      <Footer/>
    </>
  );
};

export default Search;
