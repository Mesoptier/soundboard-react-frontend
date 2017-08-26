import { combineReducers, createStore, Store } from 'redux';
import samples, { SamplesState } from './samples/reducer';

export interface State {
    samples: SamplesState,
}

export function configureStore(): Store<State> {
    const reducer = combineReducers<State>({
        samples,
    });
    return createStore<State>(reducer);
}
