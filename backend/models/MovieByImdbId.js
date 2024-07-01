const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const RatingSchema = new Schema({
  aggregate_rating: { type: Number, default: 0 },
  votes_count: { type: Number, default: 0 }
});

const SpokenLanguageSchema = new Schema({
  code: { type: String, default: '' },
  name: { type: String, default: '' }
});

const PosterSchema = new Schema({
  url: { type: String, default: '' }
});

const OriginCountrySchema = new Schema({
  code: { type: String, default: '' },
  name: { type: String, default: '' }
});

const CriticReviewSchema = new Schema({
  review_count: { type: Number, default: 0 },
  score: { type: Number, default: 0 }
});

const AvatarSchema = new Schema({
  url: { type: String, default: '' },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 }
})

const PersonSchema = new Schema({
  id: { type: String, default: '' },
  display_name: { type: String, default: '' },
  avatars: { type: [AvatarSchema], default: [] }
})

const CreditSchema = new Schema({
  name: { type: [PersonSchema], default: [] }
})

const NewMovieByImdbId = new Schema({
  imdb_id: { type: String, require: true, unique: true },
  original_title: { type: String, default: '' },
  primary_title: { type: String, default: '' },
  genres: { type: [String], default: [] },
  plot: { type: String, default: '' },
  is_adult: { type: Boolean, default: false },
  rating: { type: RatingSchema, default: () => ({}) },
  runtime_minutes: { type: Number, default: 0 },
  spoken_languages: { type: [SpokenLanguageSchema], default: [] },
  start_year: { type: Number, default: null },
  end_year: { type: Number, default: null },
  type: { type: String, default: '' },
  posters: { type: [PosterSchema], default: [] },
  origin_countries: { type: [OriginCountrySchema], default: [] },
  critic_review: { type: CriticReviewSchema, default: () => ({}) },
  directorsAdded: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DirectorNew'
   },
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
