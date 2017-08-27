import { Sample } from '../../api';
import { Action } from './actions';

export interface SamplesState {
    samples: Sample[];
    query: string;
}

const initialState: SamplesState = {
    samples: [],
    query: '',
};

export default function samplesReducer(state: SamplesState = initialState, action: Action): SamplesState {
    switch (action.type) {
        case 'SET_SAMPLES':
            return { ...state, samples: action.samples };
        case 'SET_QUERY':
            return { ...state, query: action.query };
        default:
            return state;
    }
}
