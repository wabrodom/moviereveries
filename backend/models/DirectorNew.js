const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const AvatarSchema = new Schema({
  url: { type: String, default: '' },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 }
})

const schema = new mongoose.Schema({
  nameId: {
    type: String,
    required: true,
    unique: true,
  },
  display_name: {
    type: String,
    required: true,
  },
  avatars: { type: [AvatarSchema], default: [] },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MovieByTitleById'
    }
  ],
  moviesImdb : [{ type: String }]
})

schema.plugin(uniqueValidator)

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('DirectorNew', schema)