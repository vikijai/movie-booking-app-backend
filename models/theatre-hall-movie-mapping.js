const { Schema, model } = require('mongoose')

const theatreHallMovieMappingSchema = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'movie',
      require: true,
    },
    theatreHallId: {
      type: Schema.Types.ObjectId,
      ref: 'theatreHall',
      require: true,
    },
    startTimestamp: {
      type: Number,
      require: true,
    },
    endTimestamp: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
)

theatreHallMovieMappingSchema.index(
  { movieId: 1, theatreHallId: 1, startTimestamp: 1, endTimestamp: 1 },
  { unique: true }
)
const TheatreHallMovieMapping = model(
  'theatreHallMovieMapping',
  theatreHallMovieMappingSchema
)

module.exports = TheatreHallMovieMapping
