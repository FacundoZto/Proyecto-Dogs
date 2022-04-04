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
				<button disabled className={!props.mode ? s.disabled : s.disabledDark}>Start</button> :  
				<button onClick={initialPage} className={!props.mode ? s.enabled : s.enabledDark}>Start</button>}
			{props.currentPage === 1 ? <button disabled className={!props.mode ? s.disabled : s.disabledDark}>Back</button> :  
				<button onClick={prevPage} className={!props.mode ? s.enabled : s.enabledDark}>Back</button>}
				<label className={!props.mode ? s.numero : s.numeroDark} >
				{pageNumbers && pageNumbers.slice(props.currentPage - 1, props.currentPage)} of {pageNumbers.length}
				</label>
			{props.currentPage === pageNumbers.length ? 
				<button disabled className={!props.mode ? s.disabled : s.disabledDark}>Next</button> : 
				<button onClick={nextPage} className={!props.mode ? s.enabled : s.enabledDark}>Next</button>}
			{props.currentPage === pageNumbers.length ? 
				<button disabled className={!props.mode ? s.disabled : s.disabledDark}>End</button> : 
				<button onClick={lastPage} className={!props.mode ? s.enabled : s.enabledDark}>End</button>}
			
		</div>
	)
}

export default Paginado;