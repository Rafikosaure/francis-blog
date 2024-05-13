// Je recup ma connexion dans la variable sequilize
// et mes types de champs SQL dans DataTypes
export default ( connection, DataTypes ) => {

    connection.define(
        'User',
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false // important : allowNull est "true" par defaut
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true
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