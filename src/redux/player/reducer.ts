import { combineReducers, Reducer } from 'redux';
import { playStarted, playStopped } from './actions';

export interface PlayerState {
    readonly playing: {
        readonly [sampleId: number]: number[];
    };
}

const playing: Reducer<PlayerState['playing']> = (state = {}, action) => {
    if (playStarted.match(action)) {
        const { sample: { id: sampleId }, audioId } = action.payload;

        return {
            ...state,
            [sampleId]: [...(state[sampleId] || []), audioId],
        };
    }

    if (playStopped.match(action)) {
        const { sample: { id: sampleId }, audioId } = action.payload;

        return {
            ...state,
            [sampleId]: state[sampleId].filter(id => id !== audioId),
        };
    }

    return state;
};

export default combineReducers<PlayerState>({
    playing,
});
