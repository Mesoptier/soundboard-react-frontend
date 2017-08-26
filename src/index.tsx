import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';

import { configureStore, State } from './redux';
import Root from './containers/Root';

const store = configureStore();

const container = document.createElement('div');
document.body.appendChild(container);
render(store);

function render(store: Store<State>) {
    ReactDOM.render(<Root store={store} />, container);
}
