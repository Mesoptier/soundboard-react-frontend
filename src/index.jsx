// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { fetchSamples } from './api';
import SampleContainer from './components/SampleContainer';

const container = document.createElement('div');
if (document.body) {
    document.body.appendChild(container);
    render();
}

async function render() {
    const samples = await fetchSamples();
    ReactDOM.render(<SampleContainer samples={samples} />, container);
}
