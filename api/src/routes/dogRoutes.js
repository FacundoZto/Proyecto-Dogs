const {Router} = require('express');
const dataFromApiAndDb = require('./data/dataFromApiAndDb.js');

const router = Router();

router.get('/', async (req, res, next) => {
	const name = req.query.name;
	try{
		let allInfo = await dataFromApiAndDb();
		if(name){
			let result = allInfo.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
			result.length ? res.status(200).json(result) : 
			res.json(['Not found']);
		}else{
			res.status(200).json(allInfo);
		}
	}catch(err){
		next(err)
	}
});

router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	try{
		let allInfo = await dataFromApiAndDb();
		if(id){
			let result = allInfo.find(d => d.id == id);
			result ? res.status(200).json(result) : 
			res.status(404).send('No se ha encontrado el dato ingresado');
		}
	}catch(err){
		next(err);
	}
});

module.exports = router;