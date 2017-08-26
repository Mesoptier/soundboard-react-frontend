import { Sample } from '../../api';
import { Action } from './actions';

export interface SamplesState {
    samples: Sample[];
}

const initialState: SamplesState = {
    samples: [],
};

export default function samplesReducer(state: SamplesState = initialState, action: Action): SamplesState {
    switch (action.type) {
        case 'SET_SAMPLES':
            return { ...state, samples: action.samples };
        default:
            return state;
    }
}
