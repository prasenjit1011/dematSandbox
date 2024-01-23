const express   = require('express');
const isAuth    = require('../middleware/isAuth');
const router    = express.Router();


const movieCtrl = require('../controllers/movieController');
router.get('/movies', movieCtrl.getMovieList);
router.get('/search', movieCtrl.getSearchMovieList);

router.post('/movies', isAuth, movieCtrl.addMovie);
router.put('/movies/:id',  movieCtrl.updateMovie);
router.delete('/movies/:id', isAuth, movieCtrl.deleteMovie);

module.exports = router;