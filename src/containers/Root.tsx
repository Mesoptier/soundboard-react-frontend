import { ThemeProvider } from 'glamorous';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import App from '../components/App';
import { State } from '../redux';
import theme from '../theme';

export interface RootProps {
    store: Store<State>;
}

export default function Root({ store }: RootProps) {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    );
}
