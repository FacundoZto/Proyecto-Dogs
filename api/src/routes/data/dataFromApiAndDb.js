const dataFromApi = require('./dataFromApi.js');
const dataFromDb = require('./dataFromDb.js');

//CONCATENO INFO API CON INFO DB
const dataFromApiAndDb = async () => {
	const infoApi = await dataFromApi(); 
	const infoDb = await dataFromDb();
	const allDogs = [...infoApi, ...infoDb];
	return allDogs; // [api + DB]
};

module.exports = dataFromApiAndDb;