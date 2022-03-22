//importar las variables de las actions type aca
import {GET_ALL_DOGS, GET_DOG_BY_NAME, ORDER_DOGS, FILTER_DOGS, GET_TEMPERAMENTS, 
	FILTER_BY_TEMPERAMENT, CREATE_DOG, DOG_DETAIL} from './actions.js';

const initialState = {
	dogs: [],
	temperaments: [],
	copyDogs: [],
	dogDetail: {}
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case GET_ALL_DOGS:
			return {
				...state,
				dogs: action.payload,
				copyDogs: action.payload
			}
		case GET_DOG_BY_NAME:
			return {
				...state,
				dogs: action.payload
			}
		case ORDER_DOGS:
			return {
				...state,
				dogs: action.payload //razas ordenadas alfabeticamente
			}
		case FILTER_DOGS:
			return {
				...state,
				dogs: action.payload // razas api o DB
			}
		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: action.payload //temperamentos
			}
		case FILTER_BY_TEMPERAMENT:
			const temperamentApi = state.copyDogs.filter(d => d.temperament ? d.temperament.includes(action.payload) : null);
			const temperamentDb = (arr) => {//le paso la copia de dogs
				let temps = [];
					for (let i=0; i<state.copyDogs.length; i++) {
						if(state.copyDogs[i].temperaments){
							for(let j=0; j<state.copyDogs[i].temperaments.length; j++){
								if(state.copyDogs[i].temperaments[j].name === action.payload) {
									temps.push(state.copyDogs[i]);
								}
							}
						}
					}
					return temps;
				}
			const temperaments = temperamentApi.concat(temperamentDb(state.copyDogs));
			return {
				...state,
				dogs: temperaments
			}
		case CREATE_DOG:
			return {...state}
		case DOG_DETAIL:
			return {
				...state,
				dogDetail: action.payload
			}
		default:
			return {...state}
	}
};

export default reducer;