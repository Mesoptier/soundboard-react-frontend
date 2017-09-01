import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { fetchSamples } from './api';
import Root from './containers/Root';
import { configureStore } from './redux';
import { setSamples } from './redux/samples/actions';

import './style';

const store = configureStore();

fetchSamples().then(samples => {
    store.dispatch(setSamples(samples));
});

const container = document.createElement('div');
document.body.appendChild(container);
render();

function render() {
    ReactDOM.render(<Root store={store} />, container);
}
