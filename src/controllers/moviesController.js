const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { promiseImpl } = require('ejs');


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,{
        include: [{association:"genero"}] } )
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    'add': (req, res) => {        
        db.Genre.findAll()
            .then(generos => {             
                res.render('moviesAdd.ejs',{allGenres:generos})
            })
    },
    
    create: function (req,res) {
        db.Movie.create({//creamos las columnas de la tabla
            title: req.body.title, //recuperar los datos de form, respetando los name del form 
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        })
        res.redirect('/movies');
    },
    edit: function(req,res) {
        db.Movie.findByPk(req.params.id)//recuperamos el id de la url
            .then(movie => {
                res.render('moviesEdit', {Movie:movie})
            })
    },
    modifica: function(req,res) {
        id = req.params.id
        db.Movie.findByPk(req.params.id,
            { 
                include: [{association:"genero"}] } )//recuperamos el id de la url                
        .then (movie =>{
            res.render("moviesUpdate/:id",{Movie:movie,Genero:genre})
        })

    },
    update: function (req,res) {
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id:req.body.genre_id
        },{ //el where es fundamental xq sino me va a reemplazar toda la info de la base de datos
            where:{
                id:req.params.id //accedemos a la url por pararms
            }
        })
        res.redirect('/movies');
    }
    /*delete: function (req,res) {
        let id= req.params.id;
        db.Movie.findByPk(req.params.id)//recuperamos el id de la url
            .then(movie => {
                res.render('moviesDelete', {Movie:movie})
            })
    },
    
    destroy: function (req,res) {
        let id= req.params.id
        db.Movie.destroy({             
                include: [{association:"genero"},{association:"actors"}], 
            where: {id :id}
        })
        .then (movies =>{
            res.send("baja exitosa")
        })
    }*/
}

module.exports = moviesController;