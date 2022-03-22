const axios = require('axios');
const {Temperament} = require('../../db.js');

//LLENO LA TABLA TEMPERAMENTOS EN LA DB
const tempInDb = async () => {
	let getTemperaments = await axios.get('https://api.thedogapi.com/v1/breeds');
	let temperaments = getTemperaments.data.map(d => d.temperament);
	//lo paso a string
	let str = temperaments.join(',');
	//separo por palabra y devuelvo un array
	let str2 = str.split(',');
	let eachTemperament = str2.map(t => t.trim());
	
	eachTemperament.forEach(async (t) => {
		if(t.length){//2 temperamentos con string vacios
		await Temperament.findOrCreate({
			where: {
				name: t
			}
		})
		}
	})
}
//cuando el force= false lo anterior no lo va a realizar porque la data ya esta cargada en la DB

module.exports = tempInDb;