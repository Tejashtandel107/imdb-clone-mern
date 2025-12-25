import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Alert,
  Chip,
  InputAdornment,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { moviesAPI } from "../services/api";

const MovieForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    duration: "",
    rating: "",
    genre: "",
    director: "",
    cast: "",
    poster: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetchMovie();
    }
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await moviesAPI.getMovie(id);
      const movie = response.data.movie;
      setFormData({
        title: movie.title,
        description: movie.description,
        releaseDate: new Date(movie.releaseDate).toISOString().split("T")[0],
        duration: movie.duration,
        rating: movie.rating,
        genre: movie.genre.join(", "),
        director: movie.director,
        cast: movie.cast.join(", "),
        poster: movie.poster,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch movie");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Process data
    const movieData = {
      ...formData,
      genre: formData.genre
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      cast: formData.cast
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      duration: parseInt(formData.duration),
      rating: parseFloat(formData.rating),
    };

    try {
      if (isEdit) {
        await moviesAPI.updateMovie(id, movieData);
        setSuccess("Movie updated successfully!");
      } else {
        await moviesAPI.createMovie(movieData);
        setSuccess("Movie created successfully!");
      }
      setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin")}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {isEdit ? "Edit Movie" : "Add New Movie"}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              required
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              required
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              required
              label="Director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              required
              type="date"
              label="Release Date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              required
              type="number"
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">minutes</InputAdornment>
                ),
              }}
              inputProps={{ min: 1 }}
            />

            <TextField
              fullWidth
              required
              type="number"
              label="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              margin="normal"
              inputProps={{ min: 0, max: 10, step: 0.1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">/10</InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              required
              label="Genres"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              margin="normal"
              helperText="Separate multiple genres with commas (e.g., Action, Drama, Thriller)"
            />

            <TextField
              fullWidth
              label="Cast"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              margin="normal"
              helperText="Separate multiple actors with commas"
            />

            <TextField
              fullWidth
              label="Poster URL"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              margin="normal"
              helperText="Leave empty for default placeholder"
            />

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                disabled={loading}
                fullWidth
              >
                {loading
                  ? "Saving..."
                  : isEdit
                  ? "Update Movie"
                  : "Create Movie"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/admin")}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default MovieForm;
