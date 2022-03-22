import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {getDogByName} from '../redux/actions.js';
import {getAllDogs} from '../redux/actions.js';
import {Link} from 'react-router-dom';
import s from '../css/SearchBar.module.css';

const SearchBar = () => {

	const dispatch = useDispatch();
	const [search, setSearch] = useState('');

	const reload = (e) => {
		e.preventDefault();
		dispatch(getAllDogs());
	};

	const handleChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	}

	const onSubmit = (e) => {
		if(!search || search.trim().length === 0){
			return alert('Name is required')
		}
		e.preventDefault();
		dispatch(getDogByName(search));
		setSearch('');
	};

	return (
		<div className={s.contenedor} >

			<button onClick={reload}>
				DOGS
			</button>

			<div>
				<input className={s.barra}
					type="text" 
					name="search" 
					value={search}
					onChange= {(e) => handleChange(e)}
					placeholder = 'Search...'
					/>
				
				<button type='submit' onClick={onSubmit}>SEARCH</button>
			</div>
			
			<Link to='/create'>
				<button>
					CREATE DOG
				</button>
			</Link>

		</div>
		)
}

export default SearchBar;