import {useEffect, useState} from 'react';
import {
	getAllDogs, 
	orderDogs, 
	filterDogs, 
	getTemperaments, 
	filterByTemperament,
} from '../redux/actions.js';
import {useDispatch, useSelector} from 'react-redux';
import DogCard from './DogCard.jsx';
import Paginado from './Paginado.jsx';
import loading from '../css/images/loading-gif.gif';
import s from '../css/Home.module.css';

const Home = (props) => {

	const dispatch = useDispatch();
	const allDogs = useSelector((state) => state.dogs);
	const allTemperaments = useSelector(state => state.temperaments);
	const [isDarkModeActive, setIsDarkModeActive] = useState(localStorage.getItem("theme") === "dark" ? true : false);

	const [currentPage, setCurrentPage] = useState(1);
	const dogsByPage = 8;
	const dogsToRender = allDogs.slice((currentPage * dogsByPage) - dogsByPage, currentPage * dogsByPage);
	const paginado = (page) => {
		setCurrentPage(page);
	};

	useEffect(() =>{
		dispatch(getAllDogs())
	}, [dispatch]); 

	useEffect(() => {
		dispatch(getTemperaments());
	}, [dispatch])

	useEffect(() => {
		let body = document.getElementById('body');
		if(!isDarkModeActive){
			body.style.setProperty("--bg", '#EAEAE9')//body.style.backgroundColor = '#EAEAE9'
		}else{
			body.style.setProperty("--bg", 'hsl(0, 0%, 7%)')//body.style.backgroundColor = 'hsl(0, 0%, 7%)'
		}
	}, [isDarkModeActive])
	
	const handleOrder = (e) => {
		e.preventDefault();
		dispatch(orderDogs(e.target.value));
	};

	const FilterBySource = (e) => {
		e.preventDefault();
		dispatch(filterDogs(e.target.value));
	};

	const FilterByTemperament = (e) => {
		e.preventDefault();
		dispatch(filterByTemperament(e.target.value));
	}

	const handleClick = (e) => {
		e.preventDefault();
		if(!isDarkModeActive){
			localStorage.setItem("theme", "dark");
			setIsDarkModeActive(true);
		}else{
			localStorage.setItem("theme", "light");
			setIsDarkModeActive(false)
		}
	};

	return(
		<div>
			<div className={!isDarkModeActive ? s.contenedorFiltros : s.contenedorFiltrosDark} >
				<div>
					<select name="temperament" defaultValue='Filter by temperament'
					onChange={(e) => FilterByTemperament(e)}>
						<option disabled>Filter by temperament</option>
						{allTemperaments && allTemperaments.map(t => (
							<option value={t.name} key={t.id}>{t.name}</option>))}
					</select>

					<select name="razas" onChange={FilterBySource} defaultValue='Filter by created dogs'>
						<option disabled>Filter by created dogs</option>
						<option value="razasApi">Existing dogs</option>
						<option value="razasDB">Created dogs</option>
					</select>
				</div>

				<div>
					<select onChange={(e) => handleOrder(e)} defaultValue='Order by name'>
						<option disabled>Order by name</option>
						<option value="asc name">[A-Z]</option>
						<option value="desc name">[Z-A]</option>
					</select>

					<select name="Peso" onChange={handleOrder} defaultValue='Order by weight'>
						<option disabled>Order by weight</option>
						<option value="desc weight">Highest to Lowest</option>
						<option value="asc weight">Lowest to Highest</option>
					</select>
				</div>
				{
				!isDarkModeActive ? 
				<button 
				onClick={(e)=>handleClick(e)} 
				className={s.darkMode}
				>Night</button>
				:
				<button 
				onClick={(e)=>handleClick(e)} 
				className={s.lightMode}
				>Day</button>
				}
			</div>

			<div className={s.contenedorDogs} >
				{
					dogsToRender.length > 0 ? 
					dogsToRender.map(d => (
					<DogCard
					mode = {isDarkModeActive} 
					key = {d.id}
					name = {d.name}
					temperament = {d.temperament}
					temperaments = {d.temperaments}
					weight = {d.weight}
					image = {d.image}
					id= {d.id} /> ))
					: 
					allDogs.length > 0 ? 
					allDogs.map(d => (
					<DogCard 
					mode = {isDarkModeActive}
					key = {d.id}
					name = {d.name}
					temperament = {d.temperament}
					temperaments = {d.temperaments}
					weight = {d.weight}
					image = {d.image}
					id= {d.id} /> ))
					:
					<div  >
						<img src={loading} alt="" className={s.loading}/>
					</div>
				}
			</div>

		{/*Paginado*/}
			<div className={s.paginas} >
			{dogsToRender.length ? 
				<Paginado 
				mode = {isDarkModeActive}
				allDogs={allDogs}
				dogsByPage={dogsByPage}
				paginado={paginado}
				currentPage={currentPage}
				/>
				: null
			}
			</div>
		
		</div>
		)
};

export default Home;