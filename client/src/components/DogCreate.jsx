import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createDog, getTemperaments} from '../redux/actions.js';
import s from '../css/DogCreate.module.css';
import {validate, isEmpty} from './validateForm.js';

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
		if(Object.entries(isEmpty({
			...input,
			[e.target.name]: e.target.value
		})).length !== 0){
			setErrors(isEmpty({
				...input,
				[e.target.name]: e.target.value
			}))
		} else{
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
		}
	};

	const handleDeleteTemp = (e) => {
		e.preventDefault();
		setInput({
			...input,
			temperament: input.temperament.filter((t, i) => i !== input.temperament.length - 1 && t)
		})
	}

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
						{errors.temperament && <section>{errors.temperament}</section>}
			
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
					{Object.entries(errors).length !== 0 ? 
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