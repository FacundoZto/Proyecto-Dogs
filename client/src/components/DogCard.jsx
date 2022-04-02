import {Link} from 'react-router-dom';
import s from '../css/DogCard.module.css';
import error from '../css/images/error404.png';

const DogCard = (props) => {

	return(
		<div className={s.card} >
			<div>
				{props.image ? 
				<Link to={`/detail/${props.id}`}>
				<img src={props.image} alt=''  className={s.imagen}/>
				</Link>
				:
				<img src={error} alt='' className={s.error} />
				}
				{props.name ? <h3>{props.name}</h3> : <h3>Dog not found</h3>}
				<p>{props.temperaments ? props.temperaments.map((t, i) => ( 
				i === props.temperaments.length-1 ? `${t.name}` : `${t.name}, ` )) : props.temperament}</p>
				<br/>
				{props.weight && <p>{props.weight} kg</p>}
			</div>
		
		</div>
		)
}

export default DogCard;