import { Action } from 'redux';
import { Sample } from '../../api';

export interface SamplesState {
    samples: Sample[];
}

const initialState: SamplesState = {
    samples: [],
};

export default function samplesReducer(state: SamplesState = initialState, action: Action) {
    switch (action.type) {
        default:
            return state;
    }
}
