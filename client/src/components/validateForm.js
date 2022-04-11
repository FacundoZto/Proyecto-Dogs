export const validate = (input) => {
	let errors = {};

	if(input.name){
		if(!/^[a-zA-Z ]*$/.test(input.name)) { 
			errors.name = 'Alphabetic characters only'
		} else if(input.name.length > 40) {
			errors.name = 'Name too long';
		}
	}

	if(input.heightMin){
		if(!/^\d+$/.test(input.heightMin)) {
			errors.heightMin = 'Numeric characters only';
		} else if(input.heightMin.length > 3) {
			errors.heightMin = 'Only 3 numeric characters'
		} else if(parseInt(input.heightMin) < 1 || parseInt(input.heightMin) > parseInt(input.heightMax) || 
			parseInt(input.heightMin) > 200) {
			errors.heightMin = 'Must be less than the maximum height';
		}
	} 

	if(input.heightMax){
		if(!/^\d+$/.test(input.heightMax)) {
			errors.heightMax = 'Numeric characters only';
		} else if(input.heightMax.length > 3) {
			errors.heightMax = 'Only 3 numeric characters'
		} else if( parseInt(input.heightMax) < 5 || parseInt(input.heightMax) < parseInt(input.heightMin) || 
			parseInt(input.heightMax) > 200) {
			errors.heightMax = 'Must be greater than the minimum height';
		}
	}

	if(input.weightMin){
		if(!/^\d+$/.test(input.weightMin)) {
			errors.weightMin = 'Numeric characters only';
		} else if(input.weightMin.length > 3) {
			errors.weightMin = 'Only 3 numeric characters'
		} else if( parseInt(input.weightMin) <= 0 || parseInt(input.weightMin) > parseInt(input.weightMax) || 
			parseInt(input.weightMin) > 100) {
			errors.weightMin = 'Must be less than the maximum weight';
		}
	}

	if(input.weightMax){
		if(!/^\d+$/.test(input.weightMax)) {
			errors.weightMax = 'Numeric characters only';
		} else if(input.weightMax.length > 3) {
			errors.weightMax = 'Only 3 numeric characters'
		} else if( parseInt(input.weightMax) <= 0 || parseInt(input.weightMax) < parseInt(input.weightMin) || 
			parseInt(input.weightMax) > 200) {
			errors.weightMax = 'Must be greater than the minimum weight';
		}
	}

	if(input.life_span){
		if(!/^\d+$/.test(input.life_span)) {
			errors.life_span = 'Numeric characters only';
		} else if(input.life_span.length > 2) {
			errors.life_span = 'Only 2 numeric characters'
		} else if( input.life_span <= 0 ) {
			errors.life_span = 'Must be greater than 0';
		}
	}
	
	if(input.image){
		if(input.image.length > 255) {
			errors.image = 'The address is too long';
		} else if(!input.image.includes('jpg') && !input.image.includes('jpeg') && 
			!input.image.includes('png')) {
			errors.image = 'Allowed format: jpg, jpeg or png';
		} else if(!input.image.includes('https') && !input.image.includes('http') && 
			!input.image.includes('ftp')) {
			errors.image = 'Must be an url image';
		}
	}

	return errors;
}


export const isEmpty = (input) => {
	let errors = {};

	if(input.name === '' || input.name.trim().length === 0){
		errors.name = 'Complete name';
	};

	if(input.heightMin === '') {
		errors.heightMin = 'Complete minimum height';
	};

	if(input.heightMax === '') {
		errors.heightMax = 'Complete maximum height';
	}; 

	if(input.weightMin === '') {
		errors.weightMin = 'Complete minimum weight';
	};

	if(input.weightMax === '') {
		errors.weightMax = 'Complete maximum weight';
	}; 

	if(input.life_span === '') {
		errors.life_span = 'Complete life span';
	};

	if(input.image === '' || input.image.trim().length === 0) {
		errors.image = 'Complete with image address'
	};

	if(input.temperament.length === 0) {
		errors.temperament = 'Select temperament'
	};

	return errors;
}