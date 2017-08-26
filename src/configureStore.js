// @flow
import { createStore } from 'redux';

export default function configureStore() {
    const reducer = () => {};
    return createStore(reducer);
}
