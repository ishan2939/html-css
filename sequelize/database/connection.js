const path = require('path');

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', 'constants', '.env') });

exports.connect_to_DB = () => {

    const sequelize = new Sequelize('ecommerce', process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql'
    });

    sequelize.authenticate()
        .then(() => { console.log("Connected to DB successfully.") })
        .catch((err) => { console.log(`Error occured while connecting to database: ${err.message}`) });

};
