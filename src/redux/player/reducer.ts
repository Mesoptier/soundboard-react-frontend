import { Sample } from '../../api';
import { Action } from './actions';

export interface PlayerState {
    playing: Sample[];
}

const initialState: PlayerState = {
    playing: [],
};

export default function samplesReducer(
    state: PlayerState = initialState,
    action: Action,
): PlayerState {
    switch (action.type) {
        case 'PLAY_SAMPLE':
            return { ...state, playing: [action.sample] };
        default:
            return state;
    }
}
