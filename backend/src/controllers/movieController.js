import Movie from '../models/Movie.js';

// Get all movies with pagination and sorting
export const getMovies = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    let sortOptions = {};
    if (sortBy === 'name') {
      sortOptions.title = sortOrder;
    } else if (sortBy === 'rating') {
      sortOptions.rating = sortOrder;
    } else if (sortBy === 'releaseDate') {
      sortOptions.releaseDate = sortOrder;
    } else if (sortBy === 'duration') {
      sortOptions.duration = sortOrder;
    } else {
      sortOptions.createdAt = sortOrder;
    }

    const movies = await Movie.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email');

    const total = await Movie.countDocuments();

    res.status(200).json({
      success: true,
      count: movies.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Search movies
export const searchMovies = async (req, res, next) => {
  try {
    const query = req.query.q || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let searchQuery = {};
    if (query) {
      searchQuery = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { director: { $regex: query, $options: 'i' } },
          { genre: { $in: [new RegExp(query, 'i')] } },
        ],
      };
    }

    const movies = await Movie.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email');

    const total = await Movie.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      count: movies.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Get single movie
export const getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    next(error);
  }
};

// Create movie (admin only)
export const createMovie = async (req, res, next) => {
  try {
    const movieData = {
      ...req.body,
      createdBy: req.user.id,
    };

    const movie = await Movie.create(movieData);

    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      movie,
    });
  } catch (error) {
    next(error);
  }
};

// Update movie (admin only)
export const updateMovie = async (req, res, next) => {
  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      movie,
    });
  } catch (error) {
    next(error);
  }
};

// Delete movie (admin only)
export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
