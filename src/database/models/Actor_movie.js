module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor_movie';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        
    };
    let config = {
        timestamps: false
      
    }
    const Actor_movie = sequelize.define(alias, cols, config); 
    Actor_movie.associate = function(models){
        Actor_movie.hasMany(models.Movie,{
            as:"actorMovie",           
            foreingKey : "actor_id",
            otherKey : "movie_id",
            timestamps:false
        } ),
     Actor_movie.associate = function(models){
         Actor_movie.hasMany(models.Actor,{
                as:"actorMovie",           
                foreingKey : "movie_id",
                otherKey : "actor_id",
                timestamps:false
            } )
    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
        }
    return Actor_movie }
    }
