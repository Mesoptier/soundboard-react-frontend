import { combineReducers, compose, createStore, Store } from 'redux';
import samples, { SamplesState } from './samples/reducer';

export interface State {
    samples: SamplesState,
}

export function configureStore(): Store<State> {
    const reducer = combineReducers<State>({
        samples,
    });

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore<State>(reducer, composeEnhancers());
}
