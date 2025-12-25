import express from 'express';
import {
  getMovies,
  searchMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes (protected by authentication)
router.get('/', protect, getMovies);
router.get('/search', protect, searchMovies);
router.get('/:id', protect, getMovie);

// Admin only routes
router.post('/', protect, authorize('admin'), createMovie);
router.put('/:id', protect, authorize('admin'), updateMovie);
router.delete('/:id', protect, authorize('admin'), deleteMovie);

export default router;
