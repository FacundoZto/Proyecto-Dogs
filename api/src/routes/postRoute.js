const {Router} = require('express');
const { Dog, Temperament } = require('../db.js');
const dataFromApi = require('./data/dataFromApi.js'); 

const router = Router();

router.post('/', async (req, res, next) => {
	const {name, height, weight, life_span, image, temperament} = req.body;

	 try{
	 	const allInfo = await dataFromApi();
	 	const exist = allInfo.find(d => d.name === name);
	 	let dog = await Dog.findOne({
	 		where: {
	 			name: name
	 		}
	 	})
	 	if(dog || exist){
	 		return res.send('Ya existe la raza con dicho nombre')
	 	} else {

			let dogCreated = await Dog.create({
				name,
				height,
				weight,
				life_span,
				image
			})

			let temperamentDb = await Temperament.findAll({
				  	where: { 
				  		name: temperament 
				  	} 
				 })
				
			await dogCreated.addTemperament(temperamentDb);

			res.send('La raza ha sido creada');
		}

	 }catch(err){
	 	next(err)
	 }	
});

module.exports = router;