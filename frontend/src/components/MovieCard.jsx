import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const MovieCard = ({ movie }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={movie.poster}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          <Rating value={movie.rating / 2} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
            {movie.rating}/10
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {movie.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CalendarTodayIcon fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {formatDate(movie.releaseDate)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {movie.duration} min
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {movie.genre?.slice(0, 3).map((g, index) => (
            <Chip key={index} label={g} size="small" />
          ))}
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Director: {movie.director}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
