import { fromJS } from "immutable";
import { createSelector } from "reselect";

export const CONSTANTS = {
	toggleSeason: 'main/toggleSeason',
	setWindSpeed: 'main/setWindSpeed',
	triggerRedraw: 'main/triggerRedraw'
}

export const toggleSeason = text => ({
	type: CONSTANTS.toggleSeason,
	payload: { text }
});

export const setWindSpeed = value => ({
	type: CONSTANTS.setWindSpeed,
	payload: value 
});

export const triggerRedraw = text => ({
	type: CONSTANTS.triggerRedraw,
	payload: {text}
});

const initialState = {
	falling: false,
	redraw: 0
}

const reducer = (state = fromJS(initialState), action) => {
	const { type, payload } = action;

	switch (type) {
		case CONSTANTS.toggleSeason:
			const currentFallSate = state.get('falling');
			return state.set('falling', !currentFallSate);

		case CONSTANTS.setWindSpeed:
			console.log(payload);
			return state.set('windspeed', payload);

		case CONSTANTS.triggerRedraw:
			const redrawCounter = state.get('redraw') + 1;
			return state.set('redraw', redrawCounter);
		default:
			return state
	}
}

export default reducer;

//Selectors
const getStateImmutable = state => state.get('mainState', fromJS(initialState));

export const getState = createSelector([getStateImmutable], stateObj => 
	stateObj.toJS()
);

export const isFalling = createSelector([getStateImmutable], stateObj => 
	stateObj.get('falling')
);
export const redraw = createSelector([getStateImmutable], stateObj => 
	stateObj.get('redraw')
);
export const getWindSpeed = createSelector([getStateImmutable], stateObj =>
	(typeof stateObj.get('windspeed') === 'undefined') ? 0 : stateObj.get('windspeed') * -1
);
