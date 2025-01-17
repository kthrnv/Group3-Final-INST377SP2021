export default (sequelize, DataTypes) => {
    const Songs = sequelize.define(
        'songs',
        {
        song_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        song_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        explicit: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {freezeTableName: true, timestamps: false}
    );
    return Songs;
} ;