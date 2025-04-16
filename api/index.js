const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const tempInDb = require('./src/routes/data/TempInDb.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => { //conn es la instancia de sequelize
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    tempInDb(); //lleno la tabla temperamentos en la DB
  });
});
