import s from '../css/Paginado.module.css';

const Paginado = (props) => {
	const pageNumbers = [];

	for(let i=0; i<Math.ceil(props.allDogs.length/props.dogsByPage); i++) {
		pageNumbers.push(i + 1);
	}
	
	const nextPage = () => {
		if(props.currentPage !== pageNumbers.length){
			props.paginado(props.currentPage + 1)
		}
	}

	const prevPage = () => {
		if(props.currentPage !== 1){
			props.paginado(props.currentPage - 1)
		}
	}

	const initialPage = () => {
		props.paginado(1);
	}

	const lastPage = () => {
		props.paginado(pageNumbers.length);
	}

	return(

		<div className={s.contenedor} >
			
			{props.currentPage === 1 ? 
				<button disabled className={s.disabled}>Start</button> :  
				<button onClick={initialPage} className={s.enabled}>Start</button>}
			{props.currentPage === 1 ? <button disabled className={s.disabled}>Back</button> :  
				<button onClick={prevPage} className={s.enabled}>Back</button>}
				<label className={s.numero} >
				{pageNumbers && pageNumbers.slice(props.currentPage - 1, props.currentPage)} of {pageNumbers.length}
				</label>
			{props.currentPage === pageNumbers.length ? 
				<button disabled className={s.disabled}>Next</button> : 
				<button onClick={nextPage} className={s.enabled}>Next</button>}
			{props.currentPage === pageNumbers.length ? 
				<button disabled className={s.disabled}>End</button> : 
				<button onClick={lastPage} className={s.enabled}>End</button>}
			
		</div>
	)
}

export default Paginado;