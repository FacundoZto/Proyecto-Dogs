import {Link} from 'react-router-dom';
import s from '../css/Landing.module.css';


const Landing = () => {
	return( 
		<div className={s.contenedor} >
			<Link to='/home' className={s.enlace} >
				<h1>WELCOME</h1>
			</Link>
		</div>
		)
};

export default Landing;