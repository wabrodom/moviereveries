const omdbApiRouter = require('express').Router() 
const axios = require('axios');

omdbApiRouter.post('/', async (req, res) => {
  const { title, type, year } = req.body;
  const OMDB_API_KEY = process.env.OMDB_API_KEY;

  try {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        s: title,
        type: type,
        y: year,
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from OMDB API' });
  }
});

module.exports = omdbApiRouter