// @flow
import * as React from 'react';
import { Provider } from 'react-redux';

import App from '../components/App';

type Props = {
    // TODO: Use proper type
    store: *,
};

function Root({ store }: Props) {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default Root;
