const nodeCache     = require("node-cache");
const myCache       = new nodeCache();
const MovieModel    = require('../models/movieModel');


exports.getMovieList = async (req, res, next)=>{
    let cacheData   = myCache.get("movieList");

    if(cacheData === undefined){
        let data = await MovieModel.find();
        myCache.set( "movieList", data, 10000 );
        return res.send(data);
    }
    else{
        //console.log('-: cacheData :- ', cacheData);
        return res.send(cacheData);
    }
}


exports.addMovie = (req, res, next) => {
    let obj = {
                title: req.body.title, 
                genre: req.body.genre, 
                rating: req.body.rating, 
                link: req.body.link
            };
    let movieData = new MovieModel(obj);

    return movieData
                .save()
                .then(data=>{
                    myCache.del( "movieList" );
                    return res.send({result:"Data inserted successfully!", resdata : data});
                })
                .catch((err)=>{
                    //console.log(err);
                    return res.send('-: Error occured in data insert process :-');
                });

}


exports.updateMovie = async (req, res, next) => {
    let obj     = [];
    let movieId = req.params.id;

    if(!req.body.title){
        obj = {...obj, title: req.body.title};
    }

    if(!req.body.genre){
        obj = {...obj, genre: req.body.genre};
    }

    if(!req.body.rating){
        obj = {...obj, rating: req.body.rating};
    }

    if(!req.body.link){
        obj = {...obj, link: req.body.link};
    }

    MovieModel.findByIdAndUpdate(movieId, obj);
    myCache.del( "movieList" );

    return res.send({status:true, msg:"Movie updated successfully."});
}


exports.deleteMovie = async (req, res, next) => {
    let movieId = req.params.id;
    let data    = await MovieModel.findByIdAndDelete(movieId);

    if(data != null){
        myCache.del( "movieList" );
        return res.send({status:true, msg:"Deleted successfully."});
    }
    else{
        return res.send({status:false, msg:"Movie not deleted successfully."});
    }
}


