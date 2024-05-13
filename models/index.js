import Sequelize from "sequelize";
const sequelize = new Sequelize(
    'francis', // Nom de la base de données
    'root', // identifiant Sequelize
    '', // mot de passe MySQL
    {
        host: 'localhost', // Port 3306 => MySQL
        dialect: 'mysql'
    }
);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
};