import React  from 'react';
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import mainState from 'modules/main';

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
	const composeEnhancers = composeWithDevTools(
		{
			//options
		}
	);

	middleware = composeEnhancers(applyMiddleware(...middleware));
} else {
	middleware = applyMiddleware(...middleware);
}

const combinedReducers = combineReducers({
	mainState
});

export const store = createStore(combinedReducers, middleware);

const provider = children => {
	return <Provider store={store}>{children}</Provider>;
}

export default provider;