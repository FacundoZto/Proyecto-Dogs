const {Router} = require('express');
const dataFromApi = require('./data/dataFromApi.js');
//const dataFromDb = require('./data/dataFromDb.js');
const { Dog, Temperament } = require('../db.js');

const router = Router();

router.get('/:filter', async (req, res, next) => {
	const filter = req.params.filter
	try{
		if(filter === 'razasApi'){
			let razasApi = await dataFromApi();
			res.status(200).json(razasApi);
		}else {
			const razasDB = await Dog.findAll({ //dataFromDb();
				include: Temperament
			});
			razasDB.length > 0 ?
			res.status(200).json(razasDB)
 			: res.json(['Not Found'])
		}
	}catch(err){
		next(err);
	}
});

module.exports = router;

