import { combineReducers, compose, createStore, Store } from 'redux';

import player, { PlayerState } from './player/reducer';
import samples, { SamplesState } from './samples/reducer';

export interface State {
    samples: SamplesState;
    player: PlayerState;
}

export function configureStore(): Store<State> {
    const reducer = combineReducers<State>({
        samples,
        player,
    });

    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore<State>(reducer, composeEnhancers());
}
