const express   = require('express');
const isAuthJwt = require('../middleware/isAuthJwt');
const router    = express.Router();


const movieCtrl = require('../controllers/movieController');
router.get('/movies/list', movieCtrl.getMovieListPage);
router.get('/movies', movieCtrl.getMovieList);
router.get('/search', movieCtrl.getSearchMovieList);

router.post('/movies', isAuthJwt, movieCtrl.addMovie);
router.put('/movies/:id', isAuthJwt,  movieCtrl.updateMovie);
router.delete('/movies/:id', isAuthJwt, movieCtrl.deleteMovie);

router.get('/employee/departtment/list', movieCtrl.getEmployeeDept);

module.exports = router;