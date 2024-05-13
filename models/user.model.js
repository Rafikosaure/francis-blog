export default ( Sequelize, DataTypes ) => {

    Sequelize.define(
    'User',
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        // allowNull est "true" par defaut
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: true }
  )
}