const {Router} = require('express');
const { Dog, Temperament } = require('../db.js');

const router = Router();

router.get('/', async (req, res, next) => {
	try{
		let tempsFromDb = await Temperament.findAll();
		res.status(200).json(tempsFromDb); 
	}catch(err){
		next(err);
	}
});

module.exports = router;