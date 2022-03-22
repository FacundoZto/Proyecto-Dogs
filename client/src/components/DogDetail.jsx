import {Link, useParams} from 'react-router-dom';
import {dogDetail} from '../redux/actions.js';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from '../css/DogDetail.module.css';
import loading from '../css/images/loading-gif.gif';

const DogDetail = () => {

	const params = useParams();
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(dogDetail(params.id))
	}, [dispatch, params.id]) 

	const dog = useSelector(state => state.dogDetail);

	return(
		<div className={s.contenedor} >
			<div className={s.prueba}>
			<Link to='/home'>
				<button className={s.home} >Back</button>
			</Link>

			<div className={s.subcontenedor} >
				{dog.name ? 
				<div>
					<h3>{dog.name}</h3>

					<img src={dog.image} alt="" width='350px' height='300px' />

					<p>{dog.temperaments ? dog.temperaments.map((t, i) => ( 
					i === dog.temperaments.length-1 ? `${t.name}` : `${t.name}, ` )) : dog.temperament}</p>

					<p>Height: {dog.height} cms</p>

					<p> Weight: {dog.weight} kgs</p>

					<p>Life span: {dog.life_span.includes('years') ? dog.life_span : dog.life_span + ' years'}</p>
				</div>

				:
				<div className={s.loading}>
					<img src={loading} alt=""/>
				</div>
				}
			</div>
			</div>
		</div>
		)
};

export default DogDetail;