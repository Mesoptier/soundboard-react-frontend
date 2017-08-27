import { Sample } from '../../api';

export type Action = {
    type: 'SET_SAMPLES',
    samples: Sample[],
} | {
    type: 'SET_QUERY',
    query: string,
};

export const setSamples = (samples: Sample[]): Action => ({
    type: 'SET_SAMPLES',
    samples,
});

export const setQuery = (query: string): Action => ({
    type: 'SET_QUERY',
    query,
});
