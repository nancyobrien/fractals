import { fromJS } from "immutable";
import { createSelector } from "reselect";

export const CONSTANTS = {
	toggleSeason: 'main/toggleSeason',
	ACTION2: 'main/triggerRedraw'
}

export const toggleSeason = text => ({
	type: CONSTANTS.toggleSeason,
	payload: {text}
});

export const triggerRedraw = text => ({
	type: CONSTANTS.toggleSeason,
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