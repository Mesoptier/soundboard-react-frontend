import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';

import { configureStore, State } from './redux';
import Root from './containers/Root';
import { fetchSamples } from './api';
import { setSamples } from './redux/samples/actions';

const store = configureStore();

fetchSamples().then(samples => {
    store.dispatch(setSamples(samples));
});

const container = document.createElement('div');
document.body.appendChild(container);
render(store);

function render(store: Store<State>) {
    ReactDOM.render(<Root store={store} />, container);
}
