const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')


const PosterSchema = new Schema({
  url: { type: String, default: '' }
});


const NewMovieByImdbId = new Schema({
  imdb_id:        { type: String, require: true, unique: true },
  original_title: { type: String, default: '' },
  primary_title:  { type: String, default: '' },
  genres:         { type: [String], default: [] },
  plot:           { type: String, default: '' },
  is_adult:       { type: Boolean, default: false },

  runtime_minutes:  { type: Number, default: 0 },
  start_year:       { type: Number, default: null },
  end_year:         { type: Number, default: null },
  type:             { type: String, default: '' },
  postersUse:       { type: [PosterSchema], default: [] },
  directorsAddedUse: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DirectorNew'
    }
  ],
});

NewMovieByImdbId.plugin(uniqueValidator)

NewMovieByImdbId.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const MovieByImdbId = mongoose.model('MovieByTitleById', NewMovieByImdbId)
module.exports = MovieByImdbId
