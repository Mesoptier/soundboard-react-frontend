// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Root from './containers/Root';
import configureStore from './configureStore';

const store = configureStore();

const container = document.createElement('div');
if (document.body) {
    document.body.appendChild(container);
    render(store);
}

function render(store) {
    ReactDOM.render(<Root store={store} />, container);
}
