const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    require: true,
    unique: true,
    set: (value) => value.toLowerCase()
  },
})

genreSchema.plugin(uniqueValidator)

genreSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Genre = mongoose.model('Genre', genreSchema)
module.exports = Genre