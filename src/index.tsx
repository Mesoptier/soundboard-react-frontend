import { css } from 'glamor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { fetchSamples } from './api';
import Root from './containers/Root';
import { configureStore, State } from './redux';
import { setSamples } from './redux/samples/actions';

css.global('html, body', {
    margin: 0,
});

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
