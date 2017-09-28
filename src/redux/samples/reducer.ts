import { combineReducers, Reducer } from 'redux';

import { Sample } from '../../api';
import { setQuery, setSamples } from './actions';

export interface SamplesState {
    readonly samples: Sample[];
    readonly query: string;
}

const samples: Reducer<SamplesState['samples']> = (state = [], action) => {
    if (setSamples.match(action)) {
        return action.payload;
    }

    return state;
};

const query: Reducer<SamplesState['query']> = (state = '', action) => {
    if (setQuery.match(action)) {
        return action.payload;
    }

    return state;
};

export default combineReducers<SamplesState>({
    samples,
    query,
})
