const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minLength: 3
  },
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  favoriteGenre: {
    type: String,
    require: true,
    default: 'memoir',
    minLengh: 3
  },
  passwordHash : {
    type: String,
    require: true
  },
  
  movieLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MovieList'
    }
  ],

  saveLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MovieList'
    }
  ]

})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User


/*
  before change to movieList, the old attribure is movies
    movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]

*/