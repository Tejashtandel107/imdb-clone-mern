import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { moviesAPI } from "../services/api";

const Admin = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await moviesAPI.getMovies({ limit: 100 });
      setMovies(response.data.movies);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await moviesAPI.deleteMovie(movieToDelete._id);
      setMovies(movies.filter((m) => m._id !== movieToDelete._id));
      setDeleteDialogOpen(false);
      setMovieToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete movie");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Header />
      <Container sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1">
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/add-movie")}
          >
            Add Movie
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : movies.length === 0 ? (
          <Alert severity="info">No movies found. Add your first movie!</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Title</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Director</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Rating</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Release Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Duration</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie._id} hover>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell>{movie.director}</TableCell>
                    <TableCell>{movie.rating}/10</TableCell>
                    <TableCell>{formatDate(movie.releaseDate)}</TableCell>
                    <TableCell>{movie.duration} min</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/admin/edit-movie/${movie._id}`)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(movie)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete "{movieToDelete?.title}"?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
};

export default Admin;
