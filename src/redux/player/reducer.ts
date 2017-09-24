import { combineReducers, Reducer } from 'redux';
import { playStarted, playStopped } from './actions';

export interface PlayerState {
    readonly playing: {
        readonly [sampleId: number]: number[];
    };
}

const playing: Reducer<PlayerState['playing']> = (state = {}, action) => {
    if (playStarted.match(action)) {
        const { sample: { id: sampleId }, soundId } = action.payload;

        return {
            ...state,
            [sampleId]: [...(state[sampleId] || []), soundId],
        };
    }

    if (playStopped.match(action)) {
        const { sample: { id: sampleId }, soundId } = action.payload;

        return {
            ...state,
            [sampleId]: state[sampleId].filter(id => id !== soundId),
        };
    }

    return state;
};

export default combineReducers<PlayerState>({
    playing,
});
