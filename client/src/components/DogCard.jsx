import {Link} from 'react-router-dom';
import s from '../css/DogCard.module.css';
import error from '../css/images/error404.png';

const DogCard = (props) => {

	return(
		<div className={s.card} >
			<div>
				{props.name ? <h3>{props.name}</h3> : <h3>Dog not found</h3>}
				{props.image ? 
				<Link to={`/detail/${props.id}`}>
				<img src={props.image} alt='' width='250px' height='200px' className={s.imagen}/>
				</Link>
				:
				<img src={error} alt='' width='250px' height='200px' className={s.error} />
				}
				
				<p>{props.temperaments ? props.temperaments.map((t, i) => ( 
				i === props.temperaments.length-1 ? `${t.name}` : `${t.name}, ` )) : props.temperament}</p>
				
				{props.weight && <p>{props.weight} kg</p>}
			</div>
		
		</div>
		)
}

export default DogCard;