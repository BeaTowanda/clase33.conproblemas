module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL.UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT,
        genre_id: dataTypes.BIGINT
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Movie = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    Movie.associate = function(models){
        Movie.belongsTo(models.Genre,{
            as: "genero",
            foreignKey: "genre_id"
        });
   /* Movie.associate = function(models){
            Movie.belongsToMany(models.Actor,{
                as:"actorMovie",
                through : "actor_movie",
                foreingKey : "actor_id",
                otherKey : "movie_id",
                timestamps:false
            } )
    } */
    return Movie }
};