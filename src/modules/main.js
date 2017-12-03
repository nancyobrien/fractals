import { fromJS } from "immutable";
import { createSelector } from "reselect";

export const CONSTANTS = {
	ACTION1: 'main/action1',
	ACTION2: 'main/action2'
}

export const actionItem = text => ({
	type: CONSTANTS.ACTION1,
	payload: {text}
});

const initialState = {}

const reducer = (state = fromJS(initialState), action) => {
	const { type, payload } = action;

	switch (type) {
		case CONSTANTS.ACTION1:
			return state
		case CONSTANTS.ACTION2:
			return state
		default:
			return state
	}
}

export default reducer;

//Selectors
const getStateImmutable = state => state.get('main', fromJS(initialState));

export const getState = createSelector([getStateImmutable], stateObj => 
	stateObj.toJS()
);
