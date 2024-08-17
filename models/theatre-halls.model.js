const { Schema, model } = require('mongoose')

const theatreHallsSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
      min: 0
    },
    theatreId: {
      type: Schema.Types.ObjectId,
      ref: 'theatre',
      require: true,
    },
  },
  { timestamps: true }
)

theatreHallsSchema.index({number: 1, theatreId: 1},{unique:true})
const TheatreHall = model('theatreHall', theatreHallsSchema)

module.exports = TheatreHall
