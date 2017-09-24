import { Sample } from '../../api';
import Player from '../../helpers/Player';

export type Action =
    | { type: 'PLAY_REQUESTED'; sample: Sample }
    | { type: 'PLAY_STARTED'; sample: Sample; soundId: number }
    | { type: 'PLAY_ENDED'; sample: Sample; soundId: number };

export const playSample = (sample: Sample): Action => {
    return {
        type: 'PLAY_REQUESTED',
        sample,
    };
};

export const playStarted = (sample: Sample, soundId: number): Action => {
    return {
        type: 'PLAY_STARTED',
        sample,
        soundId,
    };
};

export const playEnded = (sample: Sample, soundId: number): Action => {
    return {
        type: 'PLAY_ENDED',
        sample,
        soundId,
    };
};
