const nodeCache     = require("node-cache");
const myCache       = new nodeCache();
const MovieModel    = require('../models/movieModel');

const Employee      = require("../models/employee");
const Department    = require("../models/department");

exports.getEmployeeDept = async (req, res, next) => {
    console.log('----getMovieProductList----');

    let data        = [];
    let subjects    = ['Math', 'Science', 'Geography', 'Politics', 'History'];
    let employees   = ['Sanjay', 'Rahul', 'Vijay', 'Sunil', 'Riyan']
    let deptData    = undefined;

    //data = await Employee.find();
    //console.log(data);

    data = await Employee.find()
                    .populate("dept_id")
                    .then(function(dbProduct) {
                        console.log(dbProduct);
                        return dbProduct;
                    })
                    .catch(function(err) {
                        console.log(err);
                        return err;
                    });
    
    /*
    subjects.map((subject, key)=>{
        console.log(subject);
        deptData = new Department({title: subject});
        deptData.save();
        data.push(deptData);
        console.log('Dept ID : ', deptData['_id']);

        empData = new Employee({name: employees[key], dept_id:deptData['_id']});
        empData.save();
        data.push(empData);
        console.log('Emp ID : ', empData['_id']);
    });
    /* */
    
    console.log('========================');
    return res.end(JSON.stringify(data));
}


exports.getMovieListPage  = async (req, res, next) => {
    console.log('========================');
    res.render('./movies/list');
}

exports.getMovieList = async (req, res, next)=>{
    let data   = myCache.get("movieList");

    if(data === undefined){
        console.log('--Non-Cache Data--');
        data = await MovieModel.find();
        myCache.set( "movieList", data, 10000 );
        return res.send({status:true, msg:"Movie List", data : data});
    }
    else{
        console.log('--Cache Data--');
        return res.send({status:true, msg:"Movie List", data : data});
    }
}


exports.getSearchMovieList = async (req, res, next) => {
    let param     = req.query.q;

    MovieModel
        .find(
            {$or:[
                {title: {$regex: param, $options: 'i'}},
                {genre: {$regex: param, $options: 'i'}}
            ]}
        )
        .then(data=>{
            console.log(data);
            return res.send({status:true, msg:"Search data", data : data});
        })
        .catch((err)=>{
            return res.send({status:false, msg:"Error occured during search!"});
        });
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
                    return res.send({status:true, msg:"Data inserted successfully!", data : data});
                })
                .catch((err)=>{
                    //console.log(err);
                    return res.send({status:false, msg:"Movie not saved successfully!"});
                });

}


exports.updateMovie = async (req, res, next) => {
    let obj     = [];
    let movieId = req.params.id;

    MovieModel
        .findById(movieId)
        .then(movie =>{
            movie.title     = req.body.title;
            movie.genre     = req.body.genre;
            movie.rating    = req.body.rating;
            movie.link      = req.body.link;
            return movie.save();
        })
        .then(data => {
            myCache.del( "movieList" );
            return res.send({status:true, msg:"Movie updated successfully.", data:data});
        })
        .catch(err=>{
            return res.send({status:false, msg:"Movie not updated successfully!"});
        });
}


exports.deleteMovie = async (req, res, next) => {
    let movieId = req.params.id;

    MovieModel
        .findByIdAndDelete(movieId)
        .then(data=>{
            myCache.del( "movieList" );
            return res.send({status:true, msg:"Movie deleted successfully."});
        })
        .catch(err=>{
            return res.send({status:false, msg:"Movie not deleted successfully!"});
        });
}


