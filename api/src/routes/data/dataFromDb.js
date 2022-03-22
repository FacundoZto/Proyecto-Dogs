const { Dog, Temperament } = require('../../db.js');

//TRAIGO LA DATA DE LA DB
const dataFromDb = async () => {
	try{
		return await Dog.findAll({
		include: {
			model: Temperament,
			attributes: ['name'],
			through: {
				attributes: [],//solamente traera el atributo name
			}
		}
	})
		//return dataDb; // [{},{}]
	}catch(err){
		console.log(err)
	}
};

module.exports = dataFromDb;