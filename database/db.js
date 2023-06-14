const tedious = require('tedious');
const { Sequelize } = require('sequelize');
const populateData = require('./populate');
const { dbName, dbConfig } = require('./config.json');

module.exports = db = { Dog: {} };

initialize();

async function initialize() {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    await ensureDbExists(dbName);

    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

    db.Dog = require('./dog.model.js')(sequelize);

    await sequelize.sync({ alter: true });

    db.Dog.findAll().then(values => {
        if (values.length === 0) {
            populateData(db);
        }
    })
}

async function ensureDbExists(dbName) {
    return new Promise((resolve, reject) => {
        const connection = new tedious.Connection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error(err);
                reject(`Connection Failed: ${err.message}`);
            }

            const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') 
            CREATE DATABASE [${dbName}];`;
            const request = new tedious.Request(createDbQuery, (err) => {
                if (err) {
                    console.error(err);
                    reject(`Create DB Query Failed: ${err.message}`);
                }
                resolve();
            });
            connection.execSql(request);
        });
    });
}
