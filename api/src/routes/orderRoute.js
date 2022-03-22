const {Router} = require('express');
const dataFromApiAndDb = require('./data/dataFromApiAndDb.js');

const router = Router();

router.get('/:order', async (req, res, next) => {
	const isOrder = req.params.order;
	try{
		let allInfo = await dataFromApiAndDb();
		//ordenamiento por nombre
		if(isOrder.includes('name')){
			if(isOrder == 'desc name') {
				let nameDesc = allInfo.sort((a, b) => {
					if(a.name.toLowerCase() > b.name.toLowerCase()) return -1 //a, b
					if(a.name.toLowerCase() < b.name.toLowerCase()) return 1//b, a
					return 0;
				});
				return res.status(200).json(nameDesc);
			}else {
				let nameAsc = allInfo.sort((a, b) => {
					if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
					return 0;
				})
				return res.status(200).json(nameAsc)
			}
		}
		//Ordenamiento por peso
		if(isOrder.includes('weight')){
			const allWeight = allInfo.filter(d => d.weight !== 'weight not found');
			if(isOrder === 'desc weight') {
				let weightDesc = allWeight.sort((a, b) => {
					return parseInt(b.weight) - parseInt(a.weight)
				})
				res.status(200).json(weightDesc);
			}else{
				let weightAsc = allWeight.sort((a, b) => {
					return parseInt(a.weight) - parseInt(b.weight);
				})
				res.status(200).json(weightAsc);
			}
		}
	}catch(err){
		next(err);
	}
});

module.exports = router;