const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const listSchema = new mongoose.Schema({
  listName: {
    type: String,
    unique: true,
    required: true
  },

  description: {
    type: String,
  },

  list: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieImdb',
        required: true
      },
      primary_title: { type: String },
      original_title: { type: String },
      imdb_id: {
        type: String,
        required: true
      },
      impression: {
        type: String,
        required: true
      }
    }
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
},
  { timestamps: true }
)

listSchema.plugin(uniqueValidator)

listSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const MovieList = mongoose.model('MovieList', listSchema);

module.exports = MovieList;
