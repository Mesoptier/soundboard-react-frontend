import { Sample } from '../../api';

export type Action = {
    type: 'SET_SAMPLES',
    samples: Sample[],
};

export const setSamples = (samples: Sample[]): Action => ({
    type: 'SET_SAMPLES',
    samples,
});
