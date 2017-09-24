import { Action } from './actions';

export interface PlayerState {
    readonly playing: {
        readonly [sampleId: number]: number[];
    };
}

const initialState: PlayerState = {
    playing: {},
};

export default function samplesReducer(
    state: PlayerState = initialState,
    action: Action,
): PlayerState {
    switch (action.type) {
        case 'PLAY_STARTED':
            return {
                ...state,
                playing: {
                    ...state.playing,
                    [action.sample.id]: [
                        ...(state.playing[action.sample.id] || []),
                        action.soundId,
                    ],
                },
            };
        case 'PLAY_ENDED':
            return {
                ...state,
                playing: {
                    ...state.playing,
                    [action.sample.id]: state.playing[action.sample.id].filter(
                        soundId => soundId !== action.soundId,
                    ),
                },
            };
        default:
            return state;
    }
}
