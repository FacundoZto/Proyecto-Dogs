import {Link, useParams} from 'react-router-dom';
import {dogDetail} from '../redux/actions.js';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from '../css/DogDetail.module.css';
import loading from '../css/images/loading-gif.gif';

const DogDetail = () => {

	const params = useParams();
	const dispatch = useDispatch();
	const [isDarkModeActive] = useState(localStorage.getItem("theme") === "dark" ? true : false);
	
	useEffect(() => {
		let body = document.getElementById('body');
		if(isDarkModeActive){
			body.style.backgroundColor = 'hsl(0, 0%, 7%)'
		}
	}, [isDarkModeActive]);

	useEffect(() => {
		dispatch(dogDetail(params.id))
	}, [dispatch, params.id]) 

	const dog = useSelector(state => state.dogDetail);

	return(
		<div className={s.contenedor} >
			<Link to='/home'>
				<button className={isDarkModeActive ? s.homeDarkMode : s.home} >GO BACK</button>
			</Link>
			
			{dog.name ? 
			<div className={isDarkModeActive ? s.subcontenedorDarkMode : s.subcontenedor} >
			<div>
				<img src={dog.image} alt="" />
				<h2>{dog.name}</h2>
				<p>{dog.temperaments ? dog.temperaments.map((t, i) => ( 
				i === dog.temperaments.length-1 ? `${t.name}` : `${t.name}, ` )) : dog.temperament}</p>

				<p>Height: {dog.height} cms</p>

				<p> Weight: {dog.weight} kgs</p>

				<p>Life span: {dog.life_span.includes('years') ? dog.life_span : dog.life_span + ' years'}</p>
			</div>
			</div>
			:
			<img src={loading} alt="" />
			}	
		</div>
		)
};

export default DogDetail;