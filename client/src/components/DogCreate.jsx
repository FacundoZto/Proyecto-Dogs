import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createDog, getTemperaments} from '../redux/actions.js';
import s from '../css/DogCreate.module.css';

const validate = (input) => {
	let errors = {};

	if(!input.name || input.name.trim().length === 0) {
		errors.name = 'Complete name';
	} else if(!/^[a-zA-Z ]*$/.test(input.name)) { 
		errors.name = 'Alphabetic characters only'
	} else if(input.name.length > 40) {
		errors.name = 'Name too long';
	}

	if(!input.heightMin) {
		errors.heightMin = 'Complete minimum height';
	} else if(!/^\d+$/.test(input.heightMin)) {
		errors.heightMin = 'Numeric characters only';
	} else if(input.heightMin.length > 3) {
		errors.heightMin = 'Only 3 numeric characters'
	} else if(parseInt(input.heightMin) < 1 || parseInt(input.heightMin) > parseInt(input.heightMax) || 
		parseInt(input.heightMin) > 200) {
		errors.heightMin = 'Must be less than the maximum height';
	} 

	if(!input.heightMax) {
		errors.heightMax = 'Complete maximum height';
	} else if(!/^\d+$/.test(input.heightMax)) {
		errors.heightMax = 'Numeric characters only';
	} else if(input.heightMax.length > 3) {
		errors.heightMax = 'Only 3 numeric characters'
	} else if( parseInt(input.heightMax) < 5 || parseInt(input.heightMax) < parseInt(input.heightMin) || 
		parseInt(input.heightMax) > 200) {
		errors.heightMax = 'Must be greater than the minimum height';
	}

	if(!input.weightMin) {
		errors.weightMin = 'Complete minimum weight';
	} else if(!/^\d+$/.test(input.weightMin)) {
		errors.weightMin = 'Numeric characters only';
	} else if(input.weightMin.length > 3) {
		errors.weightMin = 'Only 3 numeric characters'
	} else if( parseInt(input.weightMin) <= 0 || parseInt(input.weightMin) > parseInt(input.weightMax) || 
		parseInt(input.weightMin) > 100) {
		errors.weightMin = 'Must be less than the maximum weight';
	}

	if(!input.weightMax) {
		errors.weightMax = 'Complete maximum weight';
	} else if(!/^\d+$/.test(input.weightMax)) {
		errors.weightMax = 'Numeric characters only';
	} else if(input.weightMax.length > 3) {
		errors.weightMax = 'Only 3 numeric characters'
	} else if( parseInt(input.weightMax) <= 0 || parseInt(input.weightMax) < parseInt(input.weightMin) || 
		parseInt(input.weightMax) > 200) {
		errors.weightMax = 'Must be greater than the minimum weight';
	}

	if(!input.life_span) {
		errors.life_span = 'Complete life span';
	} else if(!/^\d+$/.test(input.life_span)) {
		errors.life_span = 'Numeric characters only';
	} else if(input.life_span.length > 2) {
		errors.life_span = 'Only 2 numeric characters'
	} else if( input.life_span <= 0 ) {
		errors.life_span = 'Must be greater than 0';
	}
	
	if(!input.image || input.image.trim().length === 0) {
		errors.image = 'Complete with image address'
	} else if(input.image.length > 255) {
		errors.image = 'The address is too long';
	} else if(!input.image.includes('jpg') && !input.image.includes('jpeg') && 
		!input.image.includes('png')) {
		errors.image = 'Allowed format: jpg, jpeg or png';
	} else if(!input.image.includes('https') && !input.image.includes('http') && 
		!input.image.includes('ftp')) {
		errors.image = 'Must be an url image';
	}

	return errors;
}

const DogCreate = (props) => {

	const temperaments = useSelector(state => state.temperaments);
	const dispatch = useDispatch();
	const [isDarkModeActive] = useState(localStorage.getItem("theme") === "dark" ? true : false);
	const [errors, setErrors] = useState({});
	const [input, setInput] = useState({
		name: '',
		heightMin: '',
		heightMax: '',
		height: '',
		weightMin: '',
		weightMax: '',
		weight: '',
		life_span: '',
		image: '',
		temperament: []
	})

	useEffect(() => {
		let body = document.getElementById('body');
		if(isDarkModeActive){
			body.style.backgroundColor = 'hsl(0, 0%, 7%)'
		}
	}, [isDarkModeActive]);

	useEffect(() => {
		dispatch(getTemperaments());
	}, [dispatch]);

	const handleChange = (e) => {
		e.preventDefault();
		setInput({
			...input,
			[e.target.name]: e.target.value,
			height: `${input.heightMin} - ${input.heightMax}`,
			weight: `${input.weightMin} - ${input.weightMax}`
		})
		setErrors(validate({ 
			...input,
			[e.target.name]: e.target.value
		}))
	};

	const handleSelect = (e) => {
		e.preventDefault();
		if(input.temperament.length < 12){
			if(!input.temperament.includes(e.target.value)) {
			setInput({
				...input,
				temperament: [...input.temperament, e.target.value]
			})
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let response = await dispatch(createDog(input));
		alert(response)
		setInput({
			name: '',
			heightMin: '',
			heightMax: '',
			weightMin: '',
			weightMax: '',
			life_span: '',
			image: '',
			temperament: []
		})
	};

	const handleDeleteTemp = (e) => {
		e.preventDefault();
		setInput({
			...input,
			temperament: input.temperament.filter((t, i) => i !== input.temperament.length - 1 && t)
		})
	}
console.log(isDarkModeActive);
	return(
		<div className={s.contenedor}>

			<div className={isDarkModeActive ? s.formContenedorDarkMode : s.formContenedor} >
				<h2>Create Dog</h2>
				<form action="" onSubmit={handleSubmit}>
					<div className={isDarkModeActive ? s.infoDarkMode : s.info} >
						<label htmlFor="">Name: </label>
						<input type="text" name='name' onChange={handleChange} value={input.name} />
						{errors.name && <section>{errors.name}</section>}
					</div>

					<div className={isDarkModeActive ? s.infoDarkMode : s.info} >
						<label htmlFor="">Minimum height (cm): </label>
						<input type="text" name='heightMin' onChange={handleChange} value={input.heightMin} />
						{errors.heightMin && <section>{errors.heightMin}</section>}
					</div>
					<div className={isDarkModeActive ? s.infoDarkMode : s.info} >
						<label htmlFor="">Maximum height (cm): </label>
						<input type="text" name='heightMax' onChange={handleChange} value={input.heightMax} />
						{errors.heightMax && <section>{errors.heightMax}</section>}
					</div>

					<div className={isDarkModeActive ? s.infoDarkMode : s.info} >
						<label htmlFor="">Minimum weight (kg): </label>
						<input type="text" name='weightMin' onChange={handleChange} value={input.weightMin} />
						{errors.weightMin && <section>{errors.weightMin}</section>}
					</div>
					<div className={isDarkModeActive ? s.infoDarkMode : s.info} >
						<label htmlFor="">Maximum weight (kg): </label>
						<input type="text" name='weightMax' onChange={handleChange} value={input.weightMax} />
						{errors.weightMax && <section>{errors.weightMax}</section>}
					</div>

					<div className={isDarkModeActive ? s.infoDarkMode : s.info} >
						<label htmlFor="">Life span: </label>
						<input type="text" name='life_span' onChange={handleChange} value={input.life_span} />
						{errors.life_span && <section>{errors.life_span}</section>}
					</div>

					<div className={isDarkModeActive ? s.infoDarkMode : s.info} >
						<label htmlFor="">Image: </label>
						<input type="text" name='image' onChange={handleChange} value={input.image}/>
						{errors.image && <section>{errors.image}</section>}
					</div>

					<div className={isDarkModeActive ? s.infoDarkMode : s.info} >
						<label htmlFor="">Temperament: </label>
						<select name="temperament" defaultValue='Select temperament' onChange={handleSelect}>
							<option disabled>Select temperament</option>
							{temperaments && temperaments.map(t => (
							<option value={t.name} key={t.id}>{t.name}</option>))}
						</select>
			
						<div className={isDarkModeActive ? s.temperamentosDarkMode : s.temperamentos} >
						{input.temperament.map((t, i) => (
							i !== input.temperament.length - 1 ? t + ', ' : t))}
						</div>
						<button onClick={handleDeleteTemp} className={isDarkModeActive ? s.borrarDarkMode : s.borrar} >
							Remove<br/>
							Temperament
						</button>
					</div>

					<div className={s.crear} >
					{!input.name || errors.name || errors.heightMin || errors.heightMax 
					|| errors.heightMin || errors.weightMin || errors.weightMax 
					|| errors.life_span || errors.image || input.temperament.length === 0 ? 
						<button type='submit' disabled>
							Create
						</button>  
						: 
						<button type='submit'>
							Create
						</button> }
					</div>

				</form>
			</div>
			
		</div>
		)
}

export default DogCreate;