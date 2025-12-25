import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { moviesAPI } from '../services/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchMovies();
  }, [page, sortBy, sortOrder]);

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await moviesAPI.getMovies({
        page,
        limit: 12,
        sortBy,
        sortOrder,
      });
      setMovies(response.data.movies);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setPage(1);
  };

  return (
    <>
      <Header />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Movies
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} label="Sort By">
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="releaseDate">Release Date</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
              <MenuItem value="createdAt">Newest</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Order</InputLabel>
            <Select value={sortOrder} onChange={handleSortOrderChange} label="Order">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : movies.length === 0 ? (
          <Alert severity="info">No movies found</Alert>
        ) : (
          <>
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
      <Footer />
    </>
  );
};

export default Home;
