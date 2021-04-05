export default (sequelize, DataTypes) => {
    const Artists = sequelize.define(
      'Artists',
      {
        artist_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        artist_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        montly_listeners: {
          type: DataTypes.INTEGER,
          allowNull: true
        }
      },
      { freezeTableName: true, timestamps: false }
    );
    return Artists;
};