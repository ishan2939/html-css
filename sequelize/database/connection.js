const path = require('path');

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', 'constants', '.env') });

const sequelize = new Sequelize('ecommerce', process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
}); //create sequelize object with database name, username and password


const connect_to_DB = async () => { //connect to db

    try{
        await sequelize.authenticate();
        console.log("Connected to DB successfully.");
        return sequelize;
    }
    catch(err){
        console.log(`Error occured while connecting to database: ${err.message}`);
    }

};

const start = async () => {
    await connect_to_DB();
};

start();

module.exports = sequelize;