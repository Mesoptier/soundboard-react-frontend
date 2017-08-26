// @flow
import * as React from 'react';
import { render } from 'react-dom';

import App from './components/App';

const container = document.createElement('div');
if (document.body) {
    document.body.appendChild(container);
    render(<App />, container);
}
