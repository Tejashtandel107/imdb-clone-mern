import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a movie title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    releaseDate: {
      type: Date,
      required: [true, 'Please provide a release date'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide duration in minutes'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [0, 'Rating must be at least 0'],
      max: [10, 'Rating cannot exceed 10'],
    },
    genre: {
      type: [String],
      required: [true, 'Please provide at least one genre'],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'At least one genre is required',
      },
    },
    director: {
      type: String,
      required: [true, 'Please provide director name'],
      trim: true,
    },
    cast: {
      type: [String],
      default: [],
    },
    poster: {
      type: String,
      default: 'https://via.placeholder.com/300x450?text=No+Poster',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search and sorting
movieSchema.index({ title: 'text', description: 'text' });
movieSchema.index({ rating: -1 });
movieSchema.index({ releaseDate: -1 });
movieSchema.index({ duration: 1 });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
