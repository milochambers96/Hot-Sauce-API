import express from 'express'

const app = express() 

const movieData = [
  { name: 'Diehard', movieId: 1 },
  { name: 'The Grinch', movieId: 2 },
  { name: 'Home Alone', movieId: 3 }
]

const router = express.Router()

// ! getting my movies
router.route('/api/movies').get((req, res) => {
  res.send(movieData)
})

// ! Getting an individual movie
router.route('/api/movies/:movieId').get((req, res) => {
  // ? req.params.movieId gives us the param named movieId
  const movieId = Number(req.params.movieId) // ! Get the id you're asking for, as a number
  console.log(movieId)
  const foundMovie = movieData.find((movie) => { // ! finding the movie that matches the movieId we're asking for.
    return movieId === movie.movieId // ! Returns true if the movieId matches the movieId we're asking for.
  })
  res.send(foundMovie)
})

// ! Posting a movie
router.route('/api/movies').post((req, res) => {
  // ? If I sent a movie, how do I get what I sent in here?
  console.log('POSTING!', req.body)
  const movie = req.body
  movie.movieId = movieData.length + 1 // ! A hack to add an id to a movie for now.
  movieData.push(movie) // ! Adds movie to the array
  res.send(movieData)
})

// ! To get POSTing to work, we need to add this line:
app.use(express.json())

app.use(router)

app.listen(8000, () => {
  console.log('Express API is running on http://localhost:8000')
})