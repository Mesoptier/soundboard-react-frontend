import actionCreatorFactory from 'typescript-fsa';

import { Sample } from '../../api';

const actionCreator = actionCreatorFactory('player');

export const playSample = actionCreator<Sample>('PLAY_SAMPLE');
export const playStarted = actionCreator<{ sample: Sample; audioId: number }>(
    'PLAY_SAMPLE_STARTED',
);
export const playStopped = actionCreator<{ sample: Sample; audioId: number }>(
    'PLAY_SAMPLE_STOPPED',
);

export const stopAllSamples = actionCreator('STOP_ALL_SAMPLES');
