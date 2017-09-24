import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
    Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import player, { PlayerState } from './player/reducer';
import playerSaga from './player/saga';
import samples, { SamplesState } from './samples/reducer';

export interface State {
    samples: SamplesState;
    player: PlayerState;
}

function* rootSaga() {
    yield all([playerSaga()]);
}

export function configureStore(): Store<State> {
    const reducer = combineReducers<State>({
        samples,
        player,
    });

    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];

    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore<State>(
        reducer,
        composeEnhancers(applyMiddleware(...middleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
